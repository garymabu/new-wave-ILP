import * as React from 'react';
import styles from './incentive-analytics-card.module.scss';
import { DedicationType } from '../../interface/ilp-business.interface';
import { getDateDiffUntilTodayInLargestUnit } from '../../util/date.utils';

export interface IncentiveAnalyticsCardProps {
  companyLogoUrl: string;
  positionInCompany: string;
  points: number;
  cap: number;
  dedicationType: DedicationType;
  exibitionIndex: number;
  startInCompanyDate: Date;
  totalCompanyPoints: number;
}

export default (
  {
    companyLogoUrl,
    positionInCompany,
    exibitionIndex,
    cap,
    points,
    dedicationType,
    startInCompanyDate,
    totalCompanyPoints,
  } :IncentiveAnalyticsCardProps
) => {
  return (
    <div style={{marginLeft: exibitionIndex > 0 ? '4px': '0'}} className={styles.incentiveCard}>
      <div className={styles.companyHeaderRow}>
        <img className={styles.image} src={companyLogoUrl}/>
        <div className={styles.roleWithLabel}>
          <div>Cargo</div>
          <span>{positionInCompany}</span>
        </div>
      </div>
      <div className={styles.pointsRow}>
        <div className={styles.pointsCol}>
          <div className={styles.label}>Pontuação</div>
          <div>
            <span className={styles.value}>{points}</span>
            <span className={styles.cap}>/{cap}</span></div>
        </div>
        <div className={styles.dedicationCol}>
          <div>Dedicação</div>
          <div className={styles.dedicationVal}>{dedicationType}</div>
        </div>
      </div>
      <div className={styles.detailsHeaderRow}>
        <p>Detalhes</p>
      </div>
      <div className={styles.detailsRow}>
        <div className={styles.detailWithValue}>
          <div>Pont. do Negócio</div>
          <span>{totalCompanyPoints}</span>
        </div>
        <div className={styles.detailWithValue}>
          <div>Contribuição</div>
          <span>{getDateDiffUntilTodayInLargestUnit(startInCompanyDate)}</span>
        </div>
        <div className={styles.detailWithValue}>
          <div>Porcent. total</div>
          <span>{((points/totalCompanyPoints)*100).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};