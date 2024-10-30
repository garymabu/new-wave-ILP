import {
  SharepointUserODATA,
  WithSharepointReturnMetadata,
} from "../interface/sharepoint.interface";
import { IncompletePosition } from "./position.model";

export interface Participant {
  Participante: SharepointUserODATA;
  Entrada: string;
  Cargo: IncompletePosition;
  Porcentagem_x0020_do_x0020_valor: number;
  Dedica_x00e7__x00e3_o: string;
  Unvested_x0020_Points: string;
  PNW: string;
  Empresa: {
    Title: string;
    Id: number;
  };
}

export interface SharepointParticipant
  extends WithSharepointReturnMetadata<Participant> {}
