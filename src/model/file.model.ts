import { WithSharepointReturnMetadata } from "../interface/sharepoint.interface";

export interface File {
  Title: string;
  Imagem: string;
}

export interface SharepointFile extends WithSharepointReturnMetadata<File> {}
