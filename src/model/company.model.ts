import { WithSharepointReturnMetadata } from "../interface/sharepoint.interface";

export interface Company {
  Id: number;
  Title: string;
  Cor: string;
  ValorporPonto: number;
  Valor_x0020_Distribuido: string;
  ValorAlvo: number;
  Logo_x0020_da_x0020_EmpresaId: number;
  LogoUrl?: string;
}

export interface SharepointCompany
  extends WithSharepointReturnMetadata<Company> {}
