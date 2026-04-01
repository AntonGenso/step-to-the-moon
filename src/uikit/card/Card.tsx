'use client';

import { ElementType } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import cn from 'classnames';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

interface ICardProps {
  image: ElementType | StaticImageData;
  title: string;
  level: number;
  status: boolean;
  setActiveMission: (level: number) => void;
  label: string;
}

export const Card = ({
  image,
  title,
  level,
  status,
  setActiveMission,
  label = 'level',
}: ICardProps) => {
  const Icon = image as string;

  return (
    <button
      type="button"
      className={cn(styles.card, { [styles.cardActive]: status, [styles.cardLocked]: !status })}
      onClick={() => setActiveMission(level)}
      disabled={!status}
    >
      <div className={cn(styles.iconRing, { [styles.iconRingActive]: status })}>
        {status ? (
          // <Icon className={styles.icon} />
          <Image src={Icon} alt="Icon" className={styles.icon} />
        ) : (
          <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>
          {label} {String(level).padStart(2, '0')}
        </span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={cn(styles.action, { [styles.actionLocked]: !status })}>
        {status ? 'START' : 'LOCKED'}
      </div>
    </button>
  );
};
