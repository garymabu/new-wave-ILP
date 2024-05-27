import * as React from 'react';
import styles from './incentive-analytics-card.module.scss';
import { DedicationType } from '../../interface/ilp-business.interface';

export interface IncentiveAnalyticsCardProps {
  companyLogoUrl: string;
  position: string;
  positionInCompany: string;
  points: number;
  cap: number;
  dedicationType: DedicationType
}

export default ({ companyLogoUrl, positionInCompany, cap, points, dedicationType }:IncentiveAnalyticsCardProps) => {
  return (
    <div className={styles.incentiveCard}>
      <div className={styles.companyHeaderRow}>
        <img src={companyLogoUrl}/>
        <div className={styles.roleWithLabel}>
          <div>Cargo</div>
          <span>{positionInCompany}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.pointsCol}>
          <div className={styles.label}>Pontuação</div>
          <div>
            <span className={styles.value}>{points}</span>
            /<span className={styles.cap}>{cap}</span></div>
        </div>
        <div>
          <div>Dedicação</div>
          <div>{dedicationType}</div>
        </div>
      </div>
    </div>
  );
};