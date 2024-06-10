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

export default ({
  webSiteName,
  spHttpClient
}: IncentiveAnalyticsHeaderProps) : React.ReactElement => {
  const [companyOptions, setCompanyOptions] = React.useState<SharepointCompany[]>();
  const [selectedCompany, setSelectedCompany] = React.useState<SharepointCompany>();
  const [selectedCompanyAnalytics, setSelectedCompanyAnalytics] = React.useState<CompanyAnalytics>();
  const [isSettlementModalOpen, setIsSettlementModalOpen] = React.useState<boolean>(false);

  const sharepointClient = React.useMemo(() => new SharepointClient(spHttpClient, webSiteName), [spHttpClient, webSiteName]);
  const companyService = React.useMemo(() => new CompanyService(sharepointClient), [sharepointClient])
  const participantService = React.useMemo(() => new ParticipantService(sharepointClient), [sharepointClient]);

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
  )

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
            <img className={styles.headerLogo} src={selectedCompany.Logo}/>
            <div className={styles.detailWithValue}>
              <div>Pontuação do Negócio</div>
              <span>
                {selectedCompanyAnalytics.totalPoints}
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Participantes</div>
              <span>
                {selectedCompanyAnalytics.totalParticipants}
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Valor do Negócio Atual</div>
              <span>
                {
                  formatCurrency(
                    selectedCompany.ValorporPonto * selectedCompanyAnalytics.totalPoints
                  )
                }
              </span>
            </div>
            <div className={styles.detailWithValue}>
              <div>Valor Alvo</div>
              <span>
                {
                  formatCurrency(
                    selectedCompanyAnalytics.capSum * selectedCompany.ValorporPonto
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
              onSubmit={() => {console.log('submiting')}}
              participantAmount={selectedCompanyAnalytics?.totalParticipants}
              settlementValue={formatCurrency(
                selectedCompany?.ValorporPonto * selectedCompanyAnalytics?.totalPoints
              )}
            />
          }
        </>
      }
    </section>
  )
}
