import * as React from 'react';
import { TabOptions, type IncentivesDashboardProps } from './incentives-dashboard.interface';
import { IncentivesDashboardConstants } from './incentives-dashboard.constants';
import styles from './incentives-dashboard.module.scss';
import ParticipantCard, { ParticipantCardProps } from './participantCard';
import { UserService } from '../../../integration/services/user.service';
import CalendarIcon from './icons/calendar.icon';
import IncentiveAnalyticsCard, { IncentiveAnalyticsCardProps } from './incentive-analytics-card';
import { DedicationType } from '../interface/ilp-business.interface';
import { SharepointClient } from '../../../client/sharepoint.client';
import {ParticipantService} from '../../../integration/services/participant.service';
import { fromSharepointDateToDate } from '../util/date.utils';
import { CompanyService } from '../../../integration/services/company.service';
import { ParticipantWithCompany } from '../interface/dto.interface';

const {
  pageTitle,
} = IncentivesDashboardConstants;


export default ({
  // spHttpClient,
  spHttpClient,
  spUser,
  webSiteName,
  }: IncentivesDashboardProps) : React.ReactElement => {
  const [selectedTab, setSelectedTab] = React.useState(TabOptions.Cards);
  const [
    participantEntries
    , setParticipantEntries] = React.useState<ParticipantWithCompany[]>([]);

  const userService = React.useMemo(()=>new UserService(),[]);
  const sharepointClient = React.useMemo(() => new SharepointClient(spHttpClient, webSiteName), [spHttpClient, webSiteName]);

  React.useEffect(
    () : void => {
      // (async () => {
        const service = new ParticipantService(sharepointClient);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        service.getAllParticipantDataRelatedBy(spUser.email).then(
          async (data) => {
            setParticipantEntries(
              await Promise.all(data.map(
                async (d) => ({
                  ...d,
                  company: (await new CompanyService(sharepointClient).getById(d.Empresa.Id))[0]
                } as ParticipantWithCompany)
              ))
            );
          }
        )
    },
    [sharepointClient]
  )

  const userPicUrl = userService.getUserPicUrl(spUser.email);

  const [lastUser] = (participantEntries ?? []).sort(
    (a, b) => fromSharepointDateToDate(a.Entrada).getTime() - fromSharepointDateToDate(b.Entrada).getTime()
  )

  const participantCompanyData : Omit<IncentiveAnalyticsCardProps, 'exibitionIndex'>[] =
  participantEntries.map(
    (participantEntry) => ({
      companyLogoUrl: participantEntry.company.Logo,
      positionInCompany: participantEntry.Cargo?.Title ?? 'N/A',
      dedicationType: participantEntry.Dedica_x00e7__x00e3_o as DedicationType,
      points: parseInt(participantEntry.PNW),
      cap: parseInt(participantEntry.Teto),
      startInCompanyDate: fromSharepointDateToDate(participantEntry.Entrada),
      totalCompanyPoints: parseInt(participantEntry.PNW),
    })
  )

  console.log('participantEntries', participantEntries)
  console.log('lastUser', lastUser)

  const participantCardProps : ParticipantCardProps = {
    currentCompany: lastUser?.company?.Title ?? 'N/A',
    currentPosition: lastUser?.Cargo?.Title ?? 'N/A',
    displayName: spUser.displayName,
    startTimeInCompany: lastUser ? fromSharepointDateToDate(lastUser?.Entrada) : new Date(),
    userPicUrl,
  };

  const getTabStyle = (tabOption: TabOptions) : string => {
    return selectedTab === tabOption ? styles.tabControlSelected : styles.tabControl;
  }
  const getIcoStyle = (tabOption: TabOptions) : string => {
    return selectedTab === tabOption ? styles.iconSelected : styles.icon;
  }


  const Cards = () : React.ReactElement => {
    return (
      <div className={styles.cardViewRow}>
        {
          participantCompanyData.map((participantData, i) => (
            <IncentiveAnalyticsCard key={participantData.companyLogoUrl} {...participantData} exibitionIndex={i} />
          ))
        }
      </div>
    )
  }

  return (
    <section>
      <div className={styles.pageTitle}>{pageTitle}</div>
      <ParticipantCard {...participantCardProps} />
      <div className={styles.row}>
        <div className={getTabStyle(TabOptions.Organograma)} onClick={() => setSelectedTab(TabOptions.Organograma)}>
          <div className={getIcoStyle(TabOptions.Organograma)}><CalendarIcon/></div>
          <p>Organograma</p>
        </div>
        <div className={getTabStyle(TabOptions.Cards)} style={{marginLeft: '13px'}} onClick={() => setSelectedTab(TabOptions.Cards)}>
          <div className={getIcoStyle(TabOptions.Cards)}><CalendarIcon/></div>
          <p>Cards</p>
        </div>
      </div>
      <div>
        {selectedTab === TabOptions.Cards && <Cards/>}
        {selectedTab === TabOptions.Organograma && <Cards/>}
      </div>
    </section>
  );
};