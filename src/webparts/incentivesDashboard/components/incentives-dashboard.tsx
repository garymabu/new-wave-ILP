import * as React from 'react';
import { TabOptions, type IncentivesDashboardProps } from './incentives-dashboard.interface';
import { IncentivesDashboardConstants } from './incentives-dashboard.constants';
import styles from './incentives-dashboard.module.scss';
import ParticipantCard, { ParticipantCardProps } from './participantCard';
import { UserService } from '../integration/services/user.service';
import CalendarIcon from './icons/calendar.icon';
import IncentiveAnalyticsCard, { IncentiveAnalyticsCardProps } from './incentive-analytics-card';
import { DedicationType } from '../interface/ilp-business.interface';

const {
  pageTitle,
} = IncentivesDashboardConstants;


export default ({
  // spHttpClient,
  spHttpClient,
  spUser,
  }: IncentivesDashboardProps) => {
  const [selectedTab, setSelectedTab] = React.useState(TabOptions.Cards);

  const userService = new UserService();
  const userPicUrl = userService.getUserPicUrl(spUser.email);

  const participantCompanyData : IncentiveAnalyticsCardProps[] = [
    {
      companyLogoUrl: 'https://www.newwave.com.br/wp-content/uploads/2020/06/logo-new-wave-1.png',
      position: 'Frontend Developer',
      dedicationType: DedicationType.Exclusiva,
      points: 100,
      positionInCompany: 'Frontend Developer',
      cap: 150
    }
  ];

  const participantCardProps : ParticipantCardProps = {
    currentCompany: 'New Wave',
    currentPosition: 'Frontend Developer',
    displayName: spUser.displayName,
    totalTimeOnboard: '1 ano',
    userPicUrl,
  };

  const getTabStyle = (tabOption: TabOptions) => {
    return selectedTab === tabOption ? styles.tabControlSelected : styles.tabControl;
  }
  const getIcoStyle = (tabOption: TabOptions) => {
    return selectedTab === tabOption ? styles.iconSelected : styles.icon;
  }

  const Cards = () => {
    return (
      <div>
        {
          participantCompanyData.map((participantData) => (
            <IncentiveAnalyticsCard key={participantData.companyLogoUrl} {...participantData} />
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
        {selectedTab === TabOptions.Organograma && <div>Organograma</div>}
      </div>
    </section>
  );
}

// export default class IncentivesDashboard
//   extends React.Component<IIncentivesDashboardProps, {}> {
//   public render(): React.ReactElement<IIncentivesDashboardProps> {

//     return (
//       <section>
//         <div className={styles.pageTitle}>{pageTitle}</div>
//         <div className={styles.cardSmall}>
//           <div className={styles.userHeaderRow}>
//             <div className={styles.userImage}/>
//             <div></div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
