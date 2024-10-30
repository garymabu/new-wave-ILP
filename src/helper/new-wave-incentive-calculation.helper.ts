import { IncentiveCalculationByDate, IncentiveCalculationWithValueByDate } from "../interface/new-wave-incentive-calculation.interface";
import { addYears } from 'date-fns';
import { SharepointParticipant } from "../model/participant.model";
import { Dedication, DistributionType } from "../webparts/incentiveSimulator/components/incentive-simulator.interface";
import { SharepointCompany } from "../model/company.model";
import { CompletePosition } from "../model/position.model";

function generateYearlyDates(startDate: Date, targetDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = startDate;

  // eslint-disable-next-line no-unmodified-loop-condition
  while (currentDate <= targetDate) {
    dates.push(currentDate);
    currentDate = addYears(currentDate, 1);
  }

  return dates;
}

const vestingLimitYearAmount = 3;
const multiplierForExtraordinarySettlement = 0.2;
const multiplierForOrdinarySettlement = 0.8;
const multiplierForDirectDistribution = 0.7;
const multiplierForSelectiveDistribution = 0.3;

export const calculateParticipantPoints = (projectionDate: Date, participant?: SharepointParticipant): IncentiveCalculationByDate[] => {
  const projectionDates = generateYearlyDates(new Date(), projectionDate);

  const dedication = participant?.Dedica_x00e7__x00e3_o ?? Dedication.EXCLUSIVO;
  const pointsPerYear = Number((dedication === Dedication.EXCLUSIVO ? participant?.Cargo.field_1 : participant?.Cargo.field_4) ?? '0');

  const vestedPoints = Number(participant?.PNW ?? '0');
  const unvestedPoints = Number(participant?.Unvested_x0020_Points ?? '0');
  const ceiling = Number(participant?.Cargo?.Teto ?? '0');

  const pointsPerDate : IncentiveCalculationByDate[] = projectionDates.map(
    (date, position) => {
      const referenceDate = date.toISOString().split('T')[0];

      const yearsSinceVesting = ((unvestedPoints/pointsPerYear) + position) - vestingLimitYearAmount;

      const maxUnvestedPoints = Math.max(vestingLimitYearAmount * pointsPerYear, unvestedPoints);

      const unceiledVestedPoints = yearsSinceVesting >= 0 ? vestedPoints + (pointsPerYear * yearsSinceVesting) : vestedPoints;
      const newVestedPoints = unceiledVestedPoints >= ceiling ? ceiling : unceiledVestedPoints;
      const newUnvestedPoints = yearsSinceVesting < 0 ? (yearsSinceVesting + vestingLimitYearAmount) * pointsPerYear : (
        (newVestedPoints + maxUnvestedPoints) >= ceiling ? (
          ceiling - newVestedPoints
        ) : (
          maxUnvestedPoints
        )
      )

      return {
        referenceDate,
        vestedPoints: (unceiledVestedPoints  < 0 ? 0 : newVestedPoints),
        unvestedPoints: (newUnvestedPoints < 0 ? 0 : newUnvestedPoints),
      }
    }
  )

  return pointsPerDate;
}

export const calculateParticipantPointsAndValues = (
  projectionDate: Date,
  participant?: SharepointParticipant,
  allParticipants?: SharepointParticipant[],
  company?: SharepointCompany,
  positions?: CompletePosition[]
): IncentiveCalculationWithValueByDate[] => {
  console.log('participant', participant);

  const allOtherParticipantsPointsUntilProjectionDate = allParticipants?.filter(
    // we cant consider the points of the participant we are calculating
    (currentParticipant) => currentParticipant?.Participante.Id !== participant?.Participante.Id
  ).map(
    (currentParticipant) => {
      return {
        pointsByDate: calculateParticipantPoints(projectionDate, currentParticipant)
        .sort((a, b) => a.referenceDate.localeCompare(b.referenceDate)),
        currentParticipant,
      };
    }
  );

  console.log('allOtherParticipantsPointsUntilProjectionDate', allOtherParticipantsPointsUntilProjectionDate);

  const positionMap = (positions ?? []).map(
    (position) => {
      return {
        [position.ID]: position,
      }
    }
  ).reduce((a, b) => ({...a, ...b}), {});

  console.log('positionMap', positionMap);

  const companyValue = Number(company?.Valor_x0020_Distribuido ?? '0');

  const participantPoints = calculateParticipantPoints(projectionDate, participant).sort((a, b) => a.referenceDate.localeCompare(b.referenceDate));

  console.log('participantPoints', participantPoints);

  const participantIncentiveCalculationByDate : IncentiveCalculationWithValueByDate[] = participantPoints.map(
    (points, index) => {
      const participantPosition = positionMap[participant?.Cargo.ID ?? '0'];
      const participantDistributionType = participantPosition?.field_3;

      let companyTotalPoints = points.vestedPoints + points.unvestedPoints;
      let companyDirectPoints = participantPosition.field_3 === DistributionType.DIRECT ? points.vestedPoints + points.unvestedPoints : 0;

      allOtherParticipantsPointsUntilProjectionDate?.forEach(
        (participantPoints) => {
          const currentParticipantPosition = positionMap[participantPoints.currentParticipant?.Cargo.ID ?? '0'];
          const otherParticipantPoints = participantPoints.pointsByDate[index];

          companyTotalPoints += otherParticipantPoints.vestedPoints + otherParticipantPoints.unvestedPoints;
          if(currentParticipantPosition.field_3 === DistributionType.DIRECT) {
            companyDirectPoints += otherParticipantPoints.vestedPoints + otherParticipantPoints.unvestedPoints;
          }
        }
      );

      const companySelectivePoints = companyTotalPoints - companyDirectPoints;

      console.log('companyTotalPoints', companyTotalPoints);
      console.log('companyDirectPoints', companyDirectPoints);
      console.log('companySelectivePoints', companySelectivePoints);

      const participantCategoryTotal = participantDistributionType === DistributionType.DIRECT ? companyDirectPoints : companySelectivePoints;
      const distributionMultiplier = (participantDistributionType === DistributionType.DIRECT ? multiplierForDirectDistribution : multiplierForSelectiveDistribution);

      console.log('participantCategoryTotal', participantCategoryTotal);
      console.log('distributionMultiplier', distributionMultiplier);

      const participantCategoryPercentage = (points.vestedPoints + points.unvestedPoints) / (participantCategoryTotal || 1);

      console.log('participantCategoryPercentage (', points.vestedPoints, '+', points.unvestedPoints, ') /', (participantCategoryTotal || 1));

      const estimatedOrdinarySettlementValue = (
        companyValue * distributionMultiplier * multiplierForOrdinarySettlement * participantCategoryPercentage
      );
      console.log('estimatedOrdinarySettlementValue', companyValue, '*', distributionMultiplier, '*', multiplierForOrdinarySettlement, '*', participantCategoryPercentage, estimatedOrdinarySettlementValue);

      const estimatedExtraordinarySettlementValue = (
        companyValue * distributionMultiplier * multiplierForExtraordinarySettlement * Number(participant?.Porcentagem_x0020_do_x0020_valor ?? '0')
      );
      console.log('estimatedExtraordinarySettlementValue', companyValue, '*', distributionMultiplier, '*', multiplierForExtraordinarySettlement, '*', Number(participant?.Porcentagem_x0020_do_x0020_valor ?? '0'), estimatedExtraordinarySettlementValue);



      return {
        ...points,
        estimatedOrdinarySettlementValue,
        estimatedExtraordinarySettlementValue,
        estimatedSettlementValue: estimatedOrdinarySettlementValue + estimatedExtraordinarySettlementValue,
      }
    }
  )

  return participantIncentiveCalculationByDate;
  // allOtherParticipantsPointsUntilProjectionDate?.forEach(
  //   (participantPoints) => {
  //     participantPoints.forEach(
  //       (point, index) => {
  //         if(index > 0) {
  //           point.vestedPoints += participantPoints[index - 1].vestedPoints;
  //           point.unvestedPoints += participantPoints[index - 1].unvestedPoints;
  //         }
  //       }
  //     )
  //   }
  // );
}