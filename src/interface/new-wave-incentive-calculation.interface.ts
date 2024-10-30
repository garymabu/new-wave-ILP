export interface IncentiveCalculationWithValueByDate extends IncentiveCalculationByDate {
  estimatedSettlementValue: number;
  estimatedExtraordinarySettlementValue: number;
  estimatedOrdinarySettlementValue: number;
}

export interface IncentiveCalculationByDate {
  referenceDate: string;
  unvestedPoints: number;
  vestedPoints: number;
}