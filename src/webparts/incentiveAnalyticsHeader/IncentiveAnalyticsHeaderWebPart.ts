import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import IncentiveAnalyticsHeader from "./components/incentive-analytics-header";
import { IncentiveAnalyticsHeaderProps } from "./components/incentive-analytics-header.interface";

export default class IncentiveAnalyticsHeaderWebPart extends BaseClientSideWebPart<{
  webSiteName: string;
}> {
  public render(): void {
    const element: React.ReactElement<IncentiveAnalyticsHeaderProps> =
      React.createElement(IncentiveAnalyticsHeader, {
        webSiteName: this.properties.webSiteName,
      });

    ReactDom.render(element, this.domElement);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected async onInit(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configurações",
          },
          groups: [
            {
              groupName: "App level",
              groupFields: [
                PropertyPaneTextField("webSiteName", {
                  label: "Url base do site",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
