'use client';

import styles from './MobileLeaderboard.module.scss';

interface Player {
  rank: number;
  name: string;
  stars: number;
  score: number;
  total: number;
}

const players: Player[] = [
  { rank: 1, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 2, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 3, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 4, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 5, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 6, name: 'YOU', stars: 444, score: 321, total: 765 },
  { rank: 7, name: 'YOU', stars: 444, score: 321, total: 765 },
];

export const MobileLeaderboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>LEADERBOARD</h2>
      <p className={styles.subtitle}>Top explorers ranking</p>

      <div className={styles.tableFrame}>
        {/* Column headers */}
        <div className={styles.headerRow}>
          <span className={styles.colHash}>#</span>
          <span className={styles.colName}>Name</span>
          <span className={styles.colStars}>Stars</span>
          <span className={styles.colScore}>Score</span>
          <span className={styles.colTotal}>Total</span>
        </div>

        {/* Player rows */}
        <div className={styles.rowsList}>
          {players.map((p) => (
            <div key={p.rank} className={styles.playerRow}>
              <span className={styles.colHash}>{p.rank}</span>
              <div className={styles.colName}>
                <div className={styles.avatar} />
                <span>{p.name}</span>
              </div>
              <span className={styles.colStars}>{p.stars}</span>
              <span className={styles.colScore}>{p.score}</span>
              <span className={styles.colTotalValue}>{p.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
