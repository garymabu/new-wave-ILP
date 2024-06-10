import { CompanyAnalytics } from "../../interface/dto.interface";
import { ParticipantService } from "./participant.service";

export class AnalyticsService {
  constructor(private readonly participantService: ParticipantService) {}

  public async getCompanyAnalytics(
    companyId: number
  ): Promise<CompanyAnalytics> {
    const data = await this.participantService.getParticipantDataByCompany(
      companyId
    );
    return {
      totalPoints: data.map((d) => parseInt(d.PNW)).reduce((a, b) => a + b, 0),
      totalParticipants: data.length,
      capSum: data.map((d) => parseInt(d.Teto)).reduce((a, b) => a + b, 0),
    };
  }
}
