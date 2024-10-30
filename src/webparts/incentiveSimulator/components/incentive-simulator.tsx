import * as React from 'react';
import styles from './incentive-simulator.module.scss';
import { Dedication, IncentiveSimulatorProps } from './incentive-simulator.interface';
import { SharepointClient } from '../../../client/sharepoint.client';
import { FileService } from '../../../integration/services/file.service';
import { CompanyService } from '../../../integration/services/company.service';
import { SharepointCompany } from '../../../model/company.model';
import { SharepointParticipant } from '../../../model/participant.model';
import { ParticipantService } from '../../../integration/services/participant.service';
import IncentiveSimulatorTable, { IncentiveSimulatorTableRow } from './incentive-simulator-table';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { calculateParticipantPointsAndValues } from '../../../helper/new-wave-incentive-calculation.helper';
import { PositionService } from '../../../integration/services/position.service';
import { CompletePosition } from '../../../model/position.model';

export default function IncentiveSimulator({
  spHttpClient,
  webSiteName
}: IncentiveSimulatorProps) {
  const [companyOptions, setCompanyOptions] = React.useState<SharepointCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = React.useState<SharepointCompany>();
  const [participants, setParticipants] = React.useState<SharepointParticipant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = React.useState<SharepointParticipant>();
  const [projectionDate, setProjectionDate] = React.useState<Date>(addDays(new Date(), 1));

  const [positions, setPositions] = React.useState<CompletePosition[]>([]);

  const sharepointClient = React.useMemo(() => new SharepointClient(spHttpClient, webSiteName), [spHttpClient, webSiteName]);
  const fileService = React.useMemo(() => new FileService(sharepointClient), []);
  const companyService = React.useMemo(() => new CompanyService(sharepointClient, fileService), [sharepointClient])
  const participantService = React.useMemo(() => new ParticipantService(sharepointClient), [sharepointClient])
  const positionService = React.useMemo(() => new PositionService(sharepointClient), [sharepointClient])

  React.useEffect(
    () : void => {
      console.log('companyService', companyService)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      companyService.getAll().then(
        (data) => {
          setCompanyOptions(data);
          setSelectedCompany(data[0]);
        }
      )
    }
  , [companyService])

  React.useEffect(
    () : void => {
      console.log('selectedCompany', selectedCompany)
      if(selectedCompany) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        participantService.getParticipantDataByCompany(selectedCompany.Id).then(
          (data) => {
            console.log('data', data)
            setParticipants(data);
            setSelectedParticipant(data[0]);
          }
        )
      }
    }
  , [selectedCompany, participantService]);

  React.useEffect(
    () : void => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      positionService.getAllPositions().then(
        (data) => {
          setPositions(data);
        }
      )
    }
  , [positionService]);

  const dedication = selectedParticipant?.Dedica_x00e7__x00e3_o ?? Dedication.EXCLUSIVO;
  const pointsPerYear = Number((dedication === Dedication.EXCLUSIVO ? selectedParticipant?.Cargo.field_1 : selectedParticipant?.Cargo.field_4) ?? '0');

  console.log('projectionDate', projectionDate);
  // console.log('projectionDates', projectionDates);
  // const companyValue = Number(selectedCompany?.Valor_x0020_Distribuido ?? '0');

  // we have selective and direct participants, that is defined by their position.
  // in order to have the liquidation value of a participant, we need both the selective and direct points


  const selectedParticipantData: IncentiveSimulatorTableRow[] = 
    projectionDate && selectedParticipant && participants?.length && selectedCompany && positions?.length ?
    calculateParticipantPointsAndValues(projectionDate, selectedParticipant, participants, selectedCompany, positions).map(
      (data) => {
        return {
          ...data,
          name: `${selectedParticipant?.Participante.FirstName} ${selectedParticipant?.Participante.LastName}`,
          email: selectedParticipant?.Participante.EMail ?? '',
          jobTitle: selectedParticipant?.Cargo.Title ?? '',
          companyName: selectedParticipant?.Empresa.Title ?? '',
          dedication,
          pointsPerYear,
          startDate: selectedParticipant?.Entrada ? new Date(selectedParticipant?.Entrada).toISOString().split('T')[0] : "",
          percentageOfExtraordinaryValue: selectedParticipant.Porcentagem_x0020_do_x0020_valor
        }
      }
    ) : []
  // projectionDates.map(
  //   (date, position) => {
  //     const referenceDate = date.toISOString().split('T')[0];

  //     const yearsSinceVesting = ((unvestedPoints/pointsPerYear) + position) - vestingLimitYearAmount;

  //     const maxUnvestedPoints = Math.max(vestingLimitYearAmount * pointsPerYear, unvestedPoints);

  //     const unceiledVestedPoints = yearsSinceVesting >= 0 ? vestedPoints + (pointsPerYear * yearsSinceVesting) : vestedPoints;
  //     const newVestedPoints = unceiledVestedPoints >= ceiling ? ceiling : unceiledVestedPoints;
  //     const newUnvestedPoints = yearsSinceVesting < 0 ? (yearsSinceVesting + vestingLimitYearAmount) * pointsPerYear : (
  //       (newVestedPoints + maxUnvestedPoints) >= ceiling ? (
  //         ceiling - newVestedPoints
  //       ) : (
  //         maxUnvestedPoints
  //       )
  //     )

  //     return {
  //       name: `${selectedParticipant?.Participante.FirstName} ${selectedParticipant?.Participante.LastName}`,
  //       email: selectedParticipant?.Participante.EMail ?? '',
  //       jobTitle: selectedParticipant?.Cargo.Title ?? '',
  //       companyName: selectedParticipant?.Empresa.Title ?? '',
  //       dedication,
  //       vestedPoints: (unceiledVestedPoints  < 0 ? 0 : newVestedPoints),
  //       unvestedPoints: (newUnvestedPoints < 0 ? 0 : newUnvestedPoints),
  //       referenceDate,
  //       pointsPerYear,
  //       startDate: selectedParticipant?.Entrada ? new Date(selectedParticipant?.Entrada).toISOString().split('T')[0] : "",
  //       estimatedSettlementValue: 10,
  //     }
  //   }
  // );
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}> 
      <div className={styles.incentiveSimulatorContainer}>
        <div className={styles.headerRow}>
          <h1>Simulador de elegíveis</h1>
          <p className={styles.headerDisclaimer}>*O cálculo de valor considera que outros participantes também receberão pontos, e que, a liquidação será feita de forma completa. É possível que o valor seja diferente em determinado momento dependendo do percentual do valor extraordinário e de eventuais eventos que possam afetar o escopo do simulador, como por exemplo uma troca de cargos.</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.incentiveSimulatorSelections}>
            <p>Selecione a empresa</p>
            <select className={styles.select} onChange={(ev) => {
              const selectedCompany = companyOptions.filter((company) => company.Id.toString() === ev.target.value)[0]
              setSelectedCompany(selectedCompany)
            }}>
              {companyOptions.map((company) => (
                <option key={company.Id} value={company.Id}>{company.Title}</option>
              ))}
            </select>
            {
            selectedCompany && (
              <>
                <p>Selecione o elegível</p>
                <select className={styles.select} onChange={(ev) => {
                  const selectedParticipant = participants.filter((participant) => participant.Participante.Id.toString() === ev.target.value)[0]
                  setSelectedParticipant(selectedParticipant);
                }}>
                  {participants.map((participant) => (
                    <option key={participant.Participante.Id} value={participant.Participante.Id}>{participant.Participante.FirstName} {participant.Participante.LastName}</option>
                  ))}
                </select>
              </>
            )
          }
          </div>
          <div className={styles.incentiveSimulatorCalendar}>
            <p>Selecione a data de projeção</p>
            <DatePicker
              value={projectionDate}
              onChange={(date) => setProjectionDate(date || new Date())}
            />
          </div>
        </div>
          {
            selectedParticipant && (
              <IncentiveSimulatorTable selectedParticipantData={selectedParticipantData}/>
            )
          }
      </div>
      </LocalizationProvider>
  )
}
