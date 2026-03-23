'use client';

import { ElementType } from 'react';
import styles from './Card.module.scss';
import cn from 'classnames';
import LockIcon from '@/public/images/profile/mission/svg/lock.svg';

interface ICardProps {
  image: ElementType;
  title: string;
  level: number;
  status: boolean;
  setActiveMission: (level: number) => void;
  label: string;
}

export const Card = ({ image, title, level, status, setActiveMission, label = "level" }: ICardProps) => {
  const Icon = image;

  return (
    <button
      type="button"
      className={cn(styles.card, { [styles.cardActive]: status, [styles.cardLocked]: !status })}
      onClick={() => setActiveMission(level)}
      disabled={!status}
    >
      <div className={cn(styles.iconRing, { [styles.iconRingActive]: status })}>
        <Icon className={cn(styles.icon, { [styles.iconLocked]: !status })} />
        {!status && <LockIcon className={styles.lockOverlay} />}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>{label} {String(level).padStart(2, '0')}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={cn(styles.action, { [styles.actionLocked]: !status })}>
        {status ? 'START' : 'LOCKED'}
      </div>
    </button>
  );
};
