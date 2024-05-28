import { WithSharepointReturnMetadata } from "../interface/sharepoint.interface";

export interface Company {
  Id: number;
  Title: string;
  Logo: string;
}

export interface SharepointCompany
  extends WithSharepointReturnMetadata<Company> {}
