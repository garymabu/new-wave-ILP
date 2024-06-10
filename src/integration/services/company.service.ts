import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointCompany } from "../../model/company.model";

const TABLE_NAME = "Empresas";

export class CompanyService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public async getAll() {
    return (
      await this.sharepointClient.getListItemsBy<SharepointCompany>(TABLE_NAME)
    ).map((company) => ({
      ...company,
      Logo: this.getCompanyLogoUrl(company.Id.toString(), company.Logo),
    }));
  }
  public async getById(id: number) {
    return (
      await this.sharepointClient.getListItemsBy<SharepointCompany>(
        TABLE_NAME,
        `Id eq ${id}`
      )
    ).map((company) => ({
      ...company,
      Logo: this.getCompanyLogoUrl(company.Id.toString(), company.Logo),
    }));
  }
  public getCompanyLogoUrl(rowId: string, rawImageData: string) {
    // private fetchImageUrl(rawImageData: string, id: string): string {
    const imageData = JSON.parse(rawImageData);
    const fileName = encodeURIComponent(imageData.fileName);
    return `${this.sharepointClient.getBasePath()}/lists/getbytitle('${TABLE_NAME}')/items(${rowId})/AttachmentFiles/getByFileName('${fileName}')/$value`;
  }
}
