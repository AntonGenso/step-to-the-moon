'use client';

import React from 'react';
import styles from './leaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
// import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';
import StarIcon from '@/public/images/svg/mobile/other/star.svg';
import Image from 'next/image';

export default function Leaderboard() {
  const players = useLeaderboard();
  const { nickname } = useAuth();
  const t = useTranslations('leaderboard');
  const tc = useTranslations('common');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <div className="w-[80%] rounded-lg bg-gradient-to-b from-transparent via-transparent to-[#000000] p-4">
        {/* <div className={styles.headerRow}>
          <span className={styles.colHash}>{t('hash')}</span>
          <span className={styles.colName}>{t('name')}</span>
          <span className={styles.colStars}>{t('stars')}</span>
          <span className={styles.colScore}>{t('score')}</span>
          <span className={styles.colTotal}>{t('total')}</span>
        </div> */}

        <div className={styles.playerList}>
          {players.map((p, i) => {
            const isMe = p.nickname === nickname;
            return (
              <div
                key={p.nickname}
                className={`${styles.playerRow} ${isMe ? styles.playerRowMe : ''}`}
              >
                <span className={styles.colHash}>{i + 1}</span>
                <div className={styles.colName}>
                  <div className={styles.avatar}>
                    <Image
                      src="/images/profile/skin/svg/boy_dark.svg"
                      alt={p.nickname}
                      className={styles.avatarImg}
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className={styles.playerName}>{isMe ? t('you') : p.nickname}</span>
                </div>

                <div className={styles.colStars}>
                  <div className={styles.badge}>
                    <span className={styles.badgeValue}>{p.stars}</span>
                    <StarIcon className={styles.starIcon} />
                  </div>
                </div>

                <div className={styles.colScore}>
                  <div className={styles.badge}>
                    <span className={styles.badgeValue}>{p.score}</span>
                    <span className={styles.badgeUnit}>{tc('xp').toLowerCase()}</span>
                  </div>
                </div>

                <div className={styles.colTotal}>
                  <div className={styles.totalBox}>{p.total}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
