'use client';

import React from 'react';
import styles from './leaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';

export default function Leaderboard() {
  const players = useLeaderboard(10);
  const { nickname } = useAuth();

  return (
    <div className={styles.leaderboard}>
      <ul className={styles.playerList}>
        {players.map((p, i) => (
          <li
            key={p.nickname}
            className={`${styles.playerRow} ${p.nickname === nickname ? styles.highlight : ''}`}
          >
            <div className={styles.rank}>{i + 1}</div>
            <img
              src="/images/profile/skin/svg/boy_dark.svg"
              alt={p.nickname}
              className={styles.avatar}
            />
            <div className={styles.name}>{p.nickname}</div>

            <div className={styles.points}>
              <div className={`${styles.pointItem} ${styles.total}`}>
                <div>SCORE</div>
                <div>{p.total}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
