import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointParticipant } from "../../model/participant.model";

const TABLE_NAME = "Elegíveis";

export class ParticipantService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public getAllParticipantDataRelatedBy(userEmail: string) {
    return this.sharepointClient.getListItemsBy<SharepointParticipant>(
      TABLE_NAME,
      `Participante/EMail eq '${userEmail}'`,
      "Participante/Id,Participante/JobTitle,Participante/EMail,Entrada,Cargo,Dedica_x00e7__x00e3_o,PNW,Teto,Empresa/Title,Empresa/Id",
      "Participante,Empresa"
    );
  }
}

// @odata.editLink
// :
// "Web/Lists(guid'd7c240e4-96b9-414f-8a2c-d9e2fcb7351a')/Items(1)"
// @odata.etag
// :
// "\"5\""
// @odata.id
// :
// "d40ae9bb-68d6-4f63-9b21-9fd8dae49648"
// @odata.type
// :
// "#SP.Data.ElegveisListItem"
// AcimaTeto
// :
// "1"
// Ativo
// :
// true
// Attachments
// :
// false
// AuthorId
// :
// 6
// Cargo
// :
// null
// ComplianceAssetId
// :
// null
// ContentTypeId
// :
// "0x0100538064B915671F4FAEB2B381EE7C3FB50006F59F22E41D224396C7533946E7D271"
// Created
// :
// "2024-05-26T19:22:46Z"
// Dedica_x00e7__x00e3_o
// :
// "Compartilhada"
// EditorId
// :
// 6
// EmpresaId
// :
// 1
// Entrada
// :
// "2024-05-26T07:00:00Z"
// FileSystemObjectType
// :
// 0
// GUID
// :
// "594db98d-35ee-43a5-8a4f-2a3149c4ef6d"
// ID
// :
// 1
// Id
// :
// 1
// Modified
// :
// "2024-05-27T04:47:15Z"
// OData__ColorTag
// :
// null
// OData__UIVersionString
// :
// "5.0"
// PNW
// :
// 100
// ParticipanteId
// :
// 6
// ParticipanteStringId
// :
// "6"
// ServerRedirectedEmbedUri
// :
// null
// ServerRedirectedEmbedUrl
// :
// ""
// StopButton
// :
// null
// Teto
// :
// 100
// Title
// :
// "CTO"
