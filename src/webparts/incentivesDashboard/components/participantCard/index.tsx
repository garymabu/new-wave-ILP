import * as React from 'react';
import styles from './participant-card.module.scss';
import { getDateDiffUntilTodayInLargestUnit } from '../../../../util/date.utils';

export interface ParticipantCardProps {
  displayName: string;
  userPicUrl: string;
  currentPosition: string;
  currentCompany: string;
  startTimeInCompany: Date;
}

export default ({
  displayName,
  currentCompany,
  currentPosition,
  startTimeInCompany,
  userPicUrl
}:ParticipantCardProps) => {
  return (
    <div className={styles.cardSmall}>
      <div className={styles.userHeaderRow}>
        <img src={userPicUrl} className={styles.userImage}/>
        <div className={styles.userName}>{displayName}</div>
      </div>
      <div className={styles.userInfoRow}>
        <div className={styles.mediumValueWithLabel}>
          <div className={styles.label}>Cargo Atual</div>
          <div className={styles.value}>{currentPosition}</div>
        </div>
        <div className={styles.largeValueWithLabel}>
          <div className={styles.label}>Grupo New Wave Atual</div>
          <div className={styles.value}>{currentCompany}</div>
        </div>
        <div className={styles.mediumValueWithLabel}>
          <div className={styles.label}>Contribuição Total</div>
          <div className={styles.value}>{getDateDiffUntilTodayInLargestUnit(startTimeInCompany)}</div>
        </div>
      </div>
    </div>
  );
}