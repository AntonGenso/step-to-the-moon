'use client';

import React from 'react';
import styles from './leaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';

export default function Leaderboard() {
  const players = useLeaderboard(10);
  const { nickname } = useAuth();
  const t = useTranslations('leaderboard');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <GlassFrame>
        <div className={styles.headerRow}>
          <span className={styles.colHash}>{t('hash')}</span>
          <span className={styles.colName}>{t('name')}</span>
          <span className={styles.colStars}>{t('stars')}</span>
          <span className={styles.colScore}>{t('score')}</span>
          <span className={styles.colTotal}>{t('total')}</span>
        </div>

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
                    <img
                      src="/images/profile/skin/svg/boy_dark.svg"
                      alt={p.nickname}
                      className={styles.avatarImg}
                    />
                  </div>
                  <span>{isMe ? t('you') : p.nickname}</span>
                </div>
                <span className={styles.colValue}>{p.stars}</span>
                <span className={styles.colValue}>{p.score}</span>
                <div className={styles.colTotalValue}>
                  <span>{p.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassFrame>
    </div>
  );
}
