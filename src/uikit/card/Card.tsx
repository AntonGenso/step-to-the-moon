'use client';

import { ElementType } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import cn from 'classnames';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';
import { useTranslations } from 'next-intl';

interface ICardProps {
  image: ElementType | StaticImageData | string;
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
  const tc = useTranslations('common');
  const isComponent = typeof image === 'function';
  const Icon = isComponent ? (image as ElementType) : null;

  return (
    <button
      type="button"
      className={cn(styles.card, { [styles.cardActive]: status, [styles.cardLocked]: !status })}
      onClick={() => setActiveMission(level)}
      disabled={!status}
    >
      <div className={cn(styles.iconRing, { [styles.iconRingActive]: status })}>
        {status ? (
          isComponent && Icon ? (
            <Icon className={styles.icon} />
          ) : (
            <Image src={image as StaticImageData | string} alt="Icon" className={styles.icon} />
          )
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
        {status ? tc('start') : tc('locked')}
      </div>
    </button>
  );
};
