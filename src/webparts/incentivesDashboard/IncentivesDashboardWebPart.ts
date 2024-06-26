import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import IncentivesDashboard from "./components/incentives-dashboard";
import { IncentivesDashboardProps } from "./components/incentives-dashboard.interface";

export default class IncentivesDashboardWebPart extends BaseClientSideWebPart<{
  webSiteName: string;
}> {
  public render(): void {
    const element: React.ReactElement<IncentivesDashboardProps> =
      React.createElement(IncentivesDashboard, {
        spHttpClient: this.context.spHttpClient,
        spUser: this.context.pageContext.user,
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
