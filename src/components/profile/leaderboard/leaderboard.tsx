'use client';

import React, { useEffect, useState } from 'react';
import styles from './leaderboard.module.scss';
import { getTopUsers, type LeaderboardEntry } from '@/src/services/userService';
import { useAuth } from '@/src/context/AuthContext';

export default function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getTopUsers(10).then(setPlayers);
  }, []);

  return (
    <div className={styles.leaderboard}>
      <ul className={styles.playerList}>
        {players.map((p, i) => (
          <li
            key={p.uid}
            className={`${styles.playerRow} ${p.uid === user?.uid ? styles.highlight : ''}`}
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
                <div>{p.score}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
