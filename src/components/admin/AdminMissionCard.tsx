'use client';

import { ElementType } from 'react';
import Image, { StaticImageData } from 'next/image';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import styles from './AdminMissionCard.module.scss';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

interface IAdminMissionCardProps {
  image: ElementType | StaticImageData | string;
  title: string;
  level: number;
  xp: number;
  status: boolean;
  label: string;
  type?: 'current' | 'bonus';
  isDone?: boolean;
  actionLabel?: string;
  onClick?: () => void;
}

export const AdminMissionCard = ({
  image,
  title,
  level,
  xp,
  status,
  label = 'test',
  type = 'current',
  isDone = false,
  actionLabel,
  onClick,
}: IAdminMissionCardProps) => {
  const tc = useTranslations('common');
  const isComponent = typeof image === 'function';
  const Icon = isComponent ? (image as ElementType) : null;

  const isLocked = !status;
  const isBonus = !isLocked && type === 'bonus';
  const isCurrent = !isLocked && !isBonus && !isDone;

  return (
    <button
      type="button"
      className={cn(styles.card, {
        [styles.cardLocked]: isLocked,
        [styles.cardBonus]: isBonus,
        [styles.cardCurrent]: isCurrent,
      })}
      onClick={onClick}
      disabled={isLocked}
    >
      <div className={styles.top}>
        <div className={styles.iconWrap}>
          <div
            className={cn(styles.iconRing, {
              [styles.iconRingLocked]: isLocked,
              [styles.iconRingBonus]: isBonus,
              [styles.iconRingCurrent]: isCurrent,
            })}
          >
            {isLocked ? (
              <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
            ) : isComponent && Icon ? (
              <Icon className={styles.icon} />
            ) : (
              <Image src={image as StaticImageData | string} alt="Icon" className={styles.icon} />
            )}
          </div>
          {isBonus && <span className={styles.bonusBadge}>{tc('bonus')}</span>}
        </div>
        <div className={styles.info}>
          <span className={styles.label}>
            {label} {String(level).padStart(2, '0')}
          </span>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.xp}>
            {xp} {tc('xp')}
          </span>
        </div>
      </div>
      <div
        className={cn(styles.action, {
          [styles.actionLocked]: isLocked,
          [styles.actionDone]: !isLocked && isDone,
          [styles.actionBonus]: isBonus && !isDone,
          [styles.actionCurrent]: isCurrent,
        })}
      >
        {isLocked ? tc('locked') : (actionLabel ?? (isDone ? tc('done') : tc('start')))}
      </div>
    </button>
  );
};
