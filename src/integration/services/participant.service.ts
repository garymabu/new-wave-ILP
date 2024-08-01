import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointParticipant } from "../../model/participant.model";

const TABLE_NAME = "Elegíveis";
const DEFAULT_FIELD_SELECTION =
  "Participante/Id,Participante/JobTitle,Participante/EMail,Entrada,Cargo/Title,Dedica_x00e7__x00e3_o,PNW,Teto,Empresa/Title,Empresa/Id,Empresa/Cor";
const DEFAULT_EXPAND = "Participante,Empresa,Cargo";

export class ParticipantService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public getAllParticipantDataRelatedBy(
    userEmail: string
  ): Promise<SharepointParticipant[]> {
    return this.sharepointClient.getListItemsBy<SharepointParticipant>(
      TABLE_NAME,
      `Participante/EMail eq '${userEmail}'`,
      DEFAULT_FIELD_SELECTION,
      DEFAULT_EXPAND
    );
  }
  public getParticipantDataByCompany(
    companyId: number
  ): Promise<SharepointParticipant[]> {
    return this.sharepointClient.getListItemsBy<SharepointParticipant>(
      TABLE_NAME,
      `Empresa/Id eq ${companyId} and Ativo eq 1`,
      DEFAULT_FIELD_SELECTION,
      DEFAULT_EXPAND
    );
  }
}
