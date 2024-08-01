import * as React from 'react';
import { TabOptions, type IncentivesDashboardProps } from './incentives-dashboard.interface';
import { IncentivesDashboardConstants } from './incentives-dashboard.constants';
import styles from './incentives-dashboard.module.scss';
import ParticipantCard, { ParticipantCardProps } from './participantCard';
import { UserService } from '../../../integration/services/user.service';
import CalendarIcon from './icons/calendar.icon';
import IncentiveAnalyticsCard, { IncentiveAnalyticsCardProps } from './incentive-analytics-card';
import { DedicationType } from '../../../interface/ilp-business.interface';
import { SharepointClient } from '../../../client/sharepoint.client';
import {ParticipantService} from '../../../integration/services/participant.service';
import { fromSharepointDateToDate } from '../util/date.utils';
import { CompanyService } from '../../../integration/services/company.service';
import { ParticipantWithCompany, ParticipantWithCompanyAndCompanyAnalytics } from '../../../interface/dto.interface';
import { AnalyticsService } from '../../../integration/services/analytics.service';
import { FileService } from '../../../integration/services/file.service';

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
    , setParticipantEntries] = React.useState<ParticipantWithCompanyAndCompanyAnalytics[]>([]);

  const userService = React.useMemo(()=>new UserService(),[]);
  const sharepointClient = React.useMemo(() => new SharepointClient(spHttpClient, webSiteName), [spHttpClient, webSiteName]);
  const fileService = React.useMemo(() => new FileService(sharepointClient), [sharepointClient]);
  const companyService = React.useMemo(() => new CompanyService(sharepointClient, fileService),[sharepointClient]);

  React.useEffect(
    () : void => {
      // (async () => {
        const service = new ParticipantService(sharepointClient);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        service.getAllParticipantDataRelatedBy(spUser.email).then(
          async (data) => {
            setParticipantEntries(
              await Promise.all(data.map(
                async (d) => {
                  const companyAnalytics = await new AnalyticsService(service).getCompanyAnalytics(d.Empresa.Id);
                  return({
                    companyAnalytics,
                    participant: {
                      ...d,
                      company: (await companyService.getById(d.Empresa.Id))[0],
                    } as ParticipantWithCompany,
                  })
                }
              ))
            );
          }
        );
    },
    [sharepointClient]
  )

  const userPicUrl = userService.getUserPicUrl(spUser.email);

  const [lastUser] = (participantEntries ?? []).sort(
    (a, b) => fromSharepointDateToDate(a.participant.Entrada).getTime() - fromSharepointDateToDate(b.participant.Entrada).getTime()
  )

  const participantCompanyData : Omit<IncentiveAnalyticsCardProps, 'exibitionIndex'>[] =
  participantEntries.map(
    (participantEntry) => ({
      companyLogoUrl: participantEntry.participant.company.LogoUrl ?? '',
      positionInCompany: participantEntry.participant.Cargo?.Title ?? 'N/A',
      dedicationType: participantEntry.participant.Dedica_x00e7__x00e3_o as DedicationType,
      points: parseInt(participantEntry.participant.PNW),
      cap: parseInt(participantEntry.participant.Teto),
      startInCompanyDate: fromSharepointDateToDate(participantEntry.participant.Entrada),
      totalCompanyPoints: participantEntry.companyAnalytics.totalPoints,
      companyColor: participantEntry.participant.company.Cor,
    })
  )

  console.log('participantEntries', participantEntries)
  console.log('lastUser', lastUser)

  const participantCardProps : ParticipantCardProps = {
    currentCompany: lastUser?.participant?.company?.Title ?? 'N/A',
    currentPosition: lastUser?.participant?.Cargo?.Title ?? 'N/A',
    displayName: spUser.displayName,
    startTimeInCompany: lastUser ? fromSharepointDateToDate(lastUser?.participant?.Entrada) : new Date(),
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