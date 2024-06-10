import { WithSharepointReturnMetadata } from "../interface/sharepoint.interface";

export interface Company {
  Id: number;
  Title: string;
  Logo: string;
  Cor: string;
  ValorporPonto: number;
}

export interface SharepointCompany
  extends WithSharepointReturnMetadata<Company> {}
