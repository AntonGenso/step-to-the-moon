'use client';

import { ElementType } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import { IMissionData } from '../utils/missionData';
import styles from './AdminNextMission.module.scss';

const LESSON_MINUTES = 30;

interface IAdminNextMissionProps {
  mission?: IMissionData;
  previousMission?: IMissionData;
  onStart?: () => void;
}

export const AdminNextMission = ({ mission, previousMission, onStart }: IAdminNextMissionProps) => {
  const t = useTranslations('admin');

  const isComponent = typeof mission?.icon === 'function';
  const Icon = isComponent ? (mission?.icon as ElementType) : null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t('whatsNext')}</h2>
      <p className={styles.subtitle}>{t('whatsNextSubtitle')}</p>

      {mission ? (
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconRing}>
              {isComponent && Icon ? (
                <Icon className={styles.icon} />
              ) : (
                <Image
                  src={mission.icon as StaticImageData | string}
                  alt={mission.title}
                  className={styles.icon}
                />
              )}
            </div>
            <div className={styles.info}>
              <span className={styles.label}>{t('todaysMission')}</span>
              <h3 className={styles.missionTitle}>{mission.title}</h3>
              <p className={styles.meta}>
                {t('duration', { minutes: LESSON_MINUTES })}
                <br />
                {t('individual')}
              </p>
            </div>
          </div>

          <button type="button" className={styles.startButton} onClick={onStart}>
            {t('startLesson')}
          </button>
        </div>
      ) : (
        <p className={styles.subtitle}>{t('allMissionsDone')}</p>
      )}

      <div className={styles.previous}>
        <span className={styles.previousLabel}>{t('previousMission')}</span>
        <span className={styles.previousTitle}>
          {previousMission?.title ?? t('noPreviousMission')}
        </span>
      </div>
    </div>
  );
};
