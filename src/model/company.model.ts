import { WithSharepointReturnMetadata } from "../interface/sharepoint.interface";

export interface Company {
  Id: number;
  Title: string;
  Logo: string;
  Cor: string;
  ValorporPonto: number;
  Valor_x0020_Distribuido: string;
  ValorAlvo: number;
}

export interface SharepointCompany
  extends WithSharepointReturnMetadata<Company> {}
