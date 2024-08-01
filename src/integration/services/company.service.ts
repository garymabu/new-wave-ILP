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
    return Promise.all(
      await (
        await this.sharepointClient.getListItemsBy<SharepointCompany>(
          TABLE_NAME
        )
      ).map(async (company) => {
        const [fileRecord] = await this.fileService.getFileRecord(
          company.Logo_x0020_da_x0020_EmpresaId.toString()
        );
        return {
          ...company,
          LogoUrl: this.fileService.getFileUrl(
            company.Logo_x0020_da_x0020_EmpresaId.toString(),
            fileRecord.Imagem
          ),
        };
      })
    );
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
          LogoUrl: this.fileService.getFileUrl(
            company.Logo_x0020_da_x0020_EmpresaId.toString(),
            fileRecord.Imagem
          ),
        };
      })
    );
  }
}
