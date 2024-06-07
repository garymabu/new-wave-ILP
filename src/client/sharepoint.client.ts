import { SPHttpClient } from "@microsoft/sp-http";

export class SharepointClient {
  private basePath = "/_api/web";
  constructor(private readonly spHttpClient: SPHttpClient, siteUrl: string) {
    if (siteUrl) {
      this.basePath = siteUrl + this.basePath;
    }
  }

  public async getAllListItems<T = unknown>(listName: string): Promise<T[]> {
    const response = await this.spHttpClient.get(
      `${this.basePath}/lists/getbytitle('${listName}')/items?$select=Title,Id`,
      SPHttpClient.configurations.v1
    );
    const data = await response.json();
    return data.value;
  }

  public async getListItemsBy<T = unknown>(
    listName: string,
    query?: string,
    selection: string = "",
    expand: string = ""
  ): Promise<T[]> {
    const response = await this.spHttpClient.get(
      `${this.basePath}/lists/getbytitle('${listName}')/items?${
        query?.length ? `$filter=${query}` : ""
      }${selection.length ? `&$select=${selection}` : ""}${
        expand.length ? `&$expand=${expand}` : ""
      }`,
      SPHttpClient.configurations.v1
    );
    const data = await response.json();
    return data.value;
  }

  getBasePath() {
    return this.basePath;
  }
}
