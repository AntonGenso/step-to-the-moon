'use client';

import Image from 'next/image';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
import StarIcon from '@/public/images/svg/mobile/other/star.svg';
import styles from './AdminLeaderboard.module.scss';

/* Rows past this position are dimmed, as in the design. */
const FADE_FROM = 8;
const VISIBLE_PLAYERS = 10;

export const AdminLeaderboard = () => {
  const players = useLeaderboard();
  const { nickname } = useAuth();
  const t = useTranslations('leaderboard');
  const tc = useTranslations('common');
  const ta = useTranslations('admin');

  const topPlayers = players.slice(0, VISIBLE_PLAYERS);

  if (!topPlayers.length) {
    return <p className={styles.empty}>{ta('emptyLeaderboard')}</p>;
  }

  return (
    <div className={`${styles.list} custom-scroll`}>
      {topPlayers.map((p, i) => {
        const isMe = p.nickname === nickname;
        const rankClass = [styles.rank1, styles.rank2, styles.rank3][i] ?? '';

        return (
          <div
            key={p.nickname}
            className={cn(styles.row, rankClass, {
              [styles.rowMe]: isMe,
              [styles.rowFaded]: i >= FADE_FROM,
            })}
          >
            <span className={styles.rank}>{i + 1}</span>

            <div className={styles.avatar}>
              <Image
                src="/images/profile/skin/svg/boy_dark.svg"
                alt={p.nickname}
                className={styles.avatarImg}
                width={26}
                height={26}
              />
            </div>

            <span className={styles.name}>{isMe ? t('you') : p.nickname}</span>

            <div className={styles.badge}>
              {p.stars}
              <StarIcon className={styles.starIcon} />
            </div>

            <div className={styles.badge}>
              {p.score}
              <span className={styles.badgeUnit}>{tc('xp').toLowerCase()}</span>
            </div>

            <div className={styles.total}>{p.total}</div>
          </div>
        );
      })}
    </div>
  );
};
