import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointParticipant } from "../../model/participant.model";

const TABLE_NAME = "Elegíveis";

export class ParticipantService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public getAllParticipantDataRelatedBy(
    userEmail: string
  ): Promise<SharepointParticipant[]> {
    return this.sharepointClient.getListItemsBy<SharepointParticipant>(
      TABLE_NAME,
      `Participante/EMail eq '${userEmail}'`,
      "Participante/Id,Participante/JobTitle,Participante/EMail,Entrada,Cargo/Title,Dedica_x00e7__x00e3_o,PNW,Teto,Empresa/Title,Empresa/Id",
      "Participante,Empresa,Cargo"
    );
  }
}
