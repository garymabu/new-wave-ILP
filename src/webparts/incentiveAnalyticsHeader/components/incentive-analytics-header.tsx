import * as React from 'react';
import styles from './incentive-analytics-header.module.scss';
import { CompanyService } from '../../../integration/services/company.service';
import { IncentiveAnalyticsHeaderProps } from './incentive-analytics-header.interface';
import { SharepointClient } from '../../../client/sharepoint.client';
import { SharepointCompany } from '../../../model/company.model';
import { CompanyAnalytics } from '../../../interface/dto.interface';
import { ParticipantService } from '../../../integration/services/participant.service';
import { AnalyticsService } from '../../../integration/services/analytics.service';
import { formatCurrency } from '../../incentivesDashboard/util/string.utils';
import SettlementModal from './settlementModal/settlement-modal';
import { LiquidationService } from '../../../integration/services/liquidation.service';
import { FileService } from '../../../integration/services/file.service';

export default ({
  webSiteName,
  spHttpClient
}: IncentiveAnalyticsHeaderProps) : React.ReactElement => {
  const [companyOptions, setCompanyOptions] = React.useState<SharepointCompany[]>();
  const [selectedCompany, setSelectedCompany] = React.useState<SharepointCompany>();
  const [selectedCompanyAnalytics, setSelectedCompanyAnalytics] = React.useState<CompanyAnalytics>();
  const [isSettlementModalOpen, setIsSettlementModalOpen] = React.useState<boolean>(false);

  const sharepointClient = React.useMemo(() => new SharepointClient(spHttpClient, webSiteName), [spHttpClient, webSiteName]);
  const fileService = React.useMemo(() => new FileService(sharepointClient), []);
  const companyService = React.useMemo(() => new CompanyService(sharepointClient, fileService), [sharepointClient])
  const participantService = React.useMemo(() => new ParticipantService(sharepointClient), [sharepointClient]);
  const liquidationService = React.useMemo(() => new LiquidationService(), []);

  React.useEffect(
    () : void => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      companyService.getAll().then(
        (data) => {
          setCompanyOptions(data);
          if(data.length)
            setSelectedCompany(data[0]);
        }
      );
    }, [companyService]
  );

  React.useEffect(
    () : void => {
      if(selectedCompany) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        new AnalyticsService(participantService).getCompanyAnalytics(selectedCompany.Id).then(
          (data) => {
            setSelectedCompanyAnalytics(data);
          }
        );
      }
    }, [selectedCompany]
  );

  const valueByPoint = (
    selectedCompanyAnalytics?.totalPoints
    ? (Number(selectedCompany?.Valor_x0020_Distribuido) ?? 0)/selectedCompanyAnalytics?.totalPoints : 0
  )
  
  console.log('valor distribuido', Number(selectedCompany?.Valor_x0020_Distribuido) ?? 0, selectedCompanyAnalytics?.totalPoints)

  return (
    <section className={styles.incentiveAnalyticsHeader}>
      <div>
        <select onChange={
          (e) => {
            const selectedId = parseInt(e.target.value);
            const [newlySelectedCompany] = companyOptions?.filter((company) => company.Id === selectedId) ?? [];
            if(newlySelectedCompany)
              setSelectedCompany(
                newlySelectedCompany
              );
          }
        }>
          {companyOptions?.map((company) => (
            <option key={company.Id} value={company.Id}>{company.Title}</option>
          ))}
        </select>
      </div>
      {
        selectedCompany &&
        selectedCompanyAnalytics &&
        <>
          <div className={styles.header}>
            {/* <img className={styles.headerLogo} src={}/> */}
            <div className={styles.detailWithValue}>
              <div>Total de pontos distribuidos</div>
              <span>
                {selectedCompanyAnalytics.totalPoints}
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Total de Participantes</div>
              <span>
                {selectedCompanyAnalytics.totalParticipants}
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Valor unitário do ponto</div>
              <span>
                {
                  Number(valueByPoint) < 0.01 ? 'menor que R$0.01' :
                  formatCurrency(
                    valueByPoint
                  )
                }
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Valor Inicial do Negócio</div>
              <span>
                {
                  formatCurrency(
                    selectedCompany.ValorporPonto
                  )
                }
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Valor Final do Negócio</div>
              <span>
                {
                  formatCurrency(
                    selectedCompany.ValorAlvo
                  )
                }
              </span>
            </div>
            <div className={styles.settlementSpace}>
              <button onClick={() => {setIsSettlementModalOpen(true)}}>Liquidar</button>
            </div>
          </div>
          {
            isSettlementModalOpen &&
            <SettlementModal
              onClose={() => {setIsSettlementModalOpen(false)}}
              onSubmit={async () => {setIsSettlementModalOpen(false);
                await liquidationService.liquidateCompany(
                  selectedCompany.Id,
                  Number(selectedCompany.Valor_x0020_Distribuido),
                  Number(selectedCompany.ValorporPonto),
                  Number(selectedCompany.ValorAlvo)
              ) }}
              participantAmount={selectedCompanyAnalytics?.totalParticipants}
              companyName={selectedCompany.Title}
              settlementValue={formatCurrency(
                Number(selectedCompany.Valor_x0020_Distribuido)
              )}
            />
          }
        </>
      }
    </section>
  )
}
