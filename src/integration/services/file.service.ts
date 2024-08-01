import { SharepointClient } from "../../client/sharepoint.client";
import { SharepointFile } from "../../model/file.model";

const TABLE_NAME = "Arquivos";

export class FileService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public getFileRecord(rowId: string) {
    return this.sharepointClient.getListItemsBy<SharepointFile>(
      TABLE_NAME,
      `Id eq ${rowId}`
    );
  }

  public getFileUrl(rowId: string, rawImageData: string) {
    const imageData = JSON.parse(rawImageData);
    const fileName = encodeURIComponent(imageData.fileName);
    return `${this.sharepointClient.getBasePath()}/lists/getbytitle('${TABLE_NAME}')/items(${rowId})/AttachmentFiles/getByFileName('${fileName}')/$value`;
  }
}
