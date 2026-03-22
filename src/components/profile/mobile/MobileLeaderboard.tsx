'use client';

import { useEffect, useState } from 'react';
import styles from './MobileLeaderboard.module.scss';
import { getTopUsers, type LeaderboardEntry } from '@/src/services/userService';
import { useAuth } from '@/src/context/AuthContext';

export const MobileLeaderboard = () => {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getTopUsers(10).then(setPlayers);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>LEADERBOARD</h2>
      <p className={styles.subtitle}>Top explorers ranking</p>

      <div className={styles.tableFrame}>
        {/* Column headers */}
        <div className={styles.headerRow}>
          <span className={styles.colHash}>#</span>
          <span className={styles.colName}>Name</span>
          <span className={styles.colTotal}>Score</span>
        </div>

        {/* Player rows */}
        <div className={styles.rowsList}>
          {players.map((p, i) => (
            <div
              key={p.uid}
              className={`${styles.playerRow} ${p.uid === user?.uid ? styles.highlight : ''}`}
            >
              <span className={styles.colHash}>{i + 1}</span>
              <div className={styles.colName}>
                <div className={styles.avatar} />
                <span>{p.nickname}</span>
              </div>
              <span className={styles.colTotalValue}>{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
