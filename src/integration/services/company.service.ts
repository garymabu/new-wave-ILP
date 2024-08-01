import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointCompany } from "../../model/company.model";
import { FileService } from "./file.service";

const TABLE_NAME = "Empresas";

export class CompanyService {
  constructor(
    private readonly sharepointClient: SharepointClient,
    private readonly fileService: FileService
  ) {}

  public async getAll() {
    return await this.sharepointClient.getListItemsBy<SharepointCompany>(
      TABLE_NAME
    );
    // .map((company) => ({
    //   ...company,
    //   Logo: this.getCompanyLogoUrl(company.Id.toString(), company.Logo),
    // }));
  }
  public async getById(id: number) {
    return Promise.all(
      (
        await this.sharepointClient.getListItemsBy<SharepointCompany>(
          TABLE_NAME,
          `Id eq ${id}`
        )
      ).map(async (company) => {
        const [fileRecord] = await this.fileService.getFileRecord(
          company.Logo_x0020_da_x0020_EmpresaId.toString()
        );
        return {
          ...company,
          Logo: this.fileService.getFileUrl(
            company.Logo_x0020_da_x0020_EmpresaId.toString(),
            fileRecord.Imagem
          ),
        };
      })
    );
  }
  // public getCompanyLogoUrl(rowId: string, rawImageData: string) {
  //   // private fetchImageUrl(rawImageData: string, id: string): string {
  //   const imageData = JSON.parse(rawImageData);
  //   const fileName = encodeURIComponent(imageData.fileName);
  //   return `${this.sharepointClient.getBasePath()}/lists/getbytitle('${TABLE_NAME}')/items(${rowId})/AttachmentFiles/getByFileName('${fileName}')/$value`;
  // }
}
