'use client';

import styles from './MobileLeaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
import StarIcon from '@/public/images/svg/mobile/other/star.svg';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';

export const MobileLeaderboard = () => {
  const players = useLeaderboard(10);
  const { nickname } = useAuth();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>LEADERBOARD</h2>
      <p className={styles.subtitle}>Top explorers ranking</p>

      <GlassFrame>
        {/* Column headers */}
        <div className={styles.headerRow}>
          <span className={styles.colHash}>#</span>
          <span className={styles.colName}>Name</span>
          <span className={styles.colStars}>Stars</span>
          <span className={styles.colScore}>Score</span>
          <span className={styles.colTotal}>Total</span>
        </div>

        {/* Player rows */}
        <div className={`mt-6 flex flex-col gap-5`}>
          {players.map((p, i) => {
            const isMe = p.nickname === nickname;
            return (
              <div
                key={p.nickname}
                className={`flex items-center rounded-[23px] bg-gradient-to-r ${isMe ? 'from-[#FF7B1D] to-[#FFCB78] shadow-[0px_0px_50px_0px_#FF7B1D80,0px_0px_5px_0px_#FF7B1D]' : 'from-[#006D86] to-[#2FE4D3]'} p-[2px]`}
              >
                <div className="flex h-full w-full items-center rounded-[23px] bg-[#0a1f26] p-[13px_18px]">
                  <span className={styles.colHash}>{i + 1}</span>
                  <div className={styles.colName}>
                    <div className={styles.avatar}>
                      <StarIcon className={styles.starIcon} />
                    </div>
                    <span>{isMe ? 'YOU' : p.nickname}</span>
                  </div>
                  <span className={styles.colStarsValue}>{p.stars}</span>
                  <span className={styles.colScoreValue}>{p.score}</span>
                  <div className={styles.colTotalValue}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalNumber}>{p.total}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassFrame>
    </div>
  );
};
