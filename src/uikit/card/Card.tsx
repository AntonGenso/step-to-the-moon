'use client';

import { ElementType } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './Card.module.scss';
import cn from 'classnames';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';
import { useTranslations, useLocale } from 'next-intl';
import { formatOpensAt, isMissionOpen } from '@/src/services/missionSchedule';

interface ICardProps {
  image: ElementType | StaticImageData | string;
  title: string;
  level: number;
  /** Omitted when the card carries no reward, e.g. the bonus card. */
  xp?: number;
  status: boolean;
  setActiveMission: (level: number) => void;
  label: string;
  type?: 'current' | 'bonus';
  isDone?: boolean;
  /**
   * Opening date of the mission, UTC ISO 8601. Until it passes the card is
   * shown closed — cover and reward stay readable, the card just does not open.
   */
  opensAt?: string | null;
}

export const Card = ({
  image,
  title,
  level,
  xp,
  status,
  setActiveMission,
  label = 'level',
  type = 'current',
  isDone = false,
  opensAt = null,
}: ICardProps) => {
  const tc = useTranslations('common');
  const locale = useLocale();
  const isComponent = typeof image === 'function';
  const Icon = isComponent ? (image as ElementType) : null;

  const isLocked = !status;
  // Scheduled for later: unlike `locked`, the mission is fully set up and the
  // student can see what is coming — it simply cannot be entered yet.
  const isUpcoming = !isLocked && !isMissionOpen(opensAt);
  // The badge follows the card's kind; the colours follow its state, which a
  // pending opening date overrides.
  const isBonusCard = type === 'bonus';
  const isBonus = !isLocked && !isUpcoming && isBonusCard;
  const isCurrent = !isLocked && !isUpcoming && !isBonus && !isDone;

  return (
    <button
      type="button"
      className={cn(styles.card, {
        [styles.cardLocked]: isLocked,
        [styles.cardUpcoming]: isUpcoming,
        [styles.cardBonus]: isBonus,
        [styles.cardCurrent]: isCurrent,
      })}
      onClick={() => setActiveMission(level)}
      disabled={isLocked || isUpcoming}
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
            ) : image ? (
              // Covers arrive from MinIO as a plain path, and next/image needs
              // the intrinsic size for those — a bare string src throws and
              // takes the whole list down with it. CSS still drives the size.
              <Image
                src={image as StaticImageData | string}
                alt={title}
                width={160}
                height={160}
                unoptimized={typeof image === 'string'}
                className={styles.icon}
              />
            ) : null}
          </div>
          {!isLocked && isBonusCard && <span className={styles.bonusBadge}>{tc('bonus')}</span>}
        </div>
        <div className={styles.info}>
          <span className={styles.label}>
            {label} {String(level).padStart(2, '0')}
          </span>
          <h3 className={styles.title}>{title}</h3>
          {/*
            A card without a reward keeps the XP slot, empty and hidden: the
            info column is centred against the icon, so dropping the row
            outright would push the level and the title lower than on the
            cards next to it.
          */}
          <span
            className={cn(styles.xp, { [styles.xpEmpty]: xp === undefined })}
            aria-hidden={xp === undefined}
          >
            {xp !== undefined ? `${xp} ${tc('xp')}` : '\u00A0'}
          </span>
        </div>
      </div>
      <div
        className={cn(styles.action, {
          [styles.actionLocked]: isLocked || isUpcoming,
          [styles.actionDone]: !isLocked && !isUpcoming && isDone,
          [styles.actionBonus]: isBonus && !isDone,
          [styles.actionCurrent]: isCurrent,
        })}
      >
        {isLocked
          ? tc('locked')
          : isUpcoming
            ? tc('opensAt', { date: formatOpensAt(opensAt as string, locale) })
            : isDone
              ? tc('done')
              : tc('start')}
      </div>
    </button>
  );
};
