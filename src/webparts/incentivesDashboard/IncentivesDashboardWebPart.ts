import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import IncentivesDashboard from "./components/incentives-dashboard";
import { IncentivesDashboardProps } from "./components/incentives-dashboard.interface";

export default class IncentivesDashboardWebPart extends BaseClientSideWebPart<unknown> {
  public render(): void {
    const element: React.ReactElement<IncentivesDashboardProps> =
      React.createElement(IncentivesDashboard, {
        spHttpClient: this.context.spHttpClient,
        spUser: this.context.pageContext.user,
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
        // {
        //   header: {
        //     description: strings.PropertyPaneDescription,
        //   },
        //   groups: [
        //     {
        //       groupName: strings.BasicGroupName,
        //       groupFields: [
        //         PropertyPaneTextField("description", {
        //           label: strings.DescriptionFieldLabel,
        //         }),
        //       ],
        //     },
        //   ],
        // },
      ],
    };
  }
}
