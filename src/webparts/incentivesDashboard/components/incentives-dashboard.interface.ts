import { SPHttpClient } from "@microsoft/sp-http";
import { SPUser } from "@microsoft/sp-page-context";

export interface IncentivesDashboardProps {
  spHttpClient: SPHttpClient;
  spUser: SPUser;
  webSiteName: string;
}

export enum TabOptions {
  Organograma,
  Cards,
}
