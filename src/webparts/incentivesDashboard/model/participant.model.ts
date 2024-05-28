import {
  SharepointUserODATA,
  WithSharepointReturnMetadata,
} from "../interface/sharepoint.interface";

export interface Participant {
  Participante: SharepointUserODATA;
  Entrada: string;
  Cargo: string;
  Dedica_x00e7__x00e3_o: string;
  PNW: string;
  Teto: string;
  Empresa: {
    Title: string;
    Id: number;
  };
}

export interface SharepointParticipant
  extends WithSharepointReturnMetadata<Participant> {}
