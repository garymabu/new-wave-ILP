import { SPHttpClient } from "@microsoft/sp-http";
import { SPUser } from "@microsoft/sp-page-context";

export type sPHttpClientType = SPHttpClient;

export type sPUserType = SPUser;

export interface SharepointUserODATA {
  EMail: string;
  Id: number;
  JobTitle: string;
}

export type WithSharepointReturnMetadata<T = unknown> = T & {
  "@odata.editLink": string;
};
