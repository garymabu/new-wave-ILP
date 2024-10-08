import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import IncentiveSimulator from './components/incentive-simulator';
import { IncentiveSimulatorProps } from './components/incentive-simulator.interface';

export interface IIncentiveSimulatorWebPartProps {
  webSiteName: string;
}

export default class IncentiveSimulatorWebPart extends BaseClientSideWebPart<IIncentiveSimulatorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IncentiveSimulatorProps> = React.createElement(
      IncentiveSimulator,
      {
        webSiteName: this.properties.webSiteName,
        spHttpClient: this.context.spHttpClient,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
