import { SharepointCompany } from "../../../model/company.model";
import { SharepointParticipant } from "../../../model/participant.model";

export interface ParticipantWithCompany
  extends Omit<SharepointParticipant, "Empresa"> {
  company: SharepointCompany;
}
