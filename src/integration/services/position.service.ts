import { SharepointClient } from "../../client/sharepoint.client";
import { CompletePosition } from "../../model/position.model";

const TABLE_NAME = "Cargos";

export class PositionService {
  constructor(private readonly sharepointClient: SharepointClient) {}

  public getAllPositions(): Promise<CompletePosition[]> {
    return this.sharepointClient.getListItemsBy<CompletePosition>(
      TABLE_NAME
    );
  }
}
