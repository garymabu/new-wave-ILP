import { CompanyAnalytics } from "../../interface/dto.interface";
// import { CompanyService } from "./company.service";
import { ParticipantService } from "./participant.service";

export class AnalyticsService {
  constructor(
    private readonly participantService: ParticipantService,
    // private readonly companyService: CompanyService
  ) {}

  public async getCompanyAnalytics(
    companyId: number
  ): Promise<CompanyAnalytics> {
    const data = await this.participantService.getParticipantDataByCompany(
      companyId
    );

    console.log('participant data', data);

    // this.companyService.getById(companyId);

    return {
      totalPoints: data.map((d) => parseInt(d.PNW)).reduce((a, b) => a + b, 0),
      totalParticipants: data.length,
      capSum: data.map((d) => parseInt(d.Cargo.Teto)).reduce((a, b) => a + b, 0),
    };
  }
}
