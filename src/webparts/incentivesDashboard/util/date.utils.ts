import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getDateDiffUntilTodayInLargestUnit = (date: Date): string => {
  const today = new Date();
  return formatDistance(date, today, { addSuffix: true, locale: ptBR });
};

export const fromSharepointDateToDate = (sharepointDate: string): Date => {
  return new Date(sharepointDate);
};
