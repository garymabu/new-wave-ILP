import { SPHttpClient } from "@microsoft/sp-http";

export interface IncentiveSimulatorProps {
  webSiteName: string;
  spHttpClient: SPHttpClient;
}

export enum Dedication {
  EXCLUSIVO = "Exclusivo",
  PARCIAL = "Parcial",
}