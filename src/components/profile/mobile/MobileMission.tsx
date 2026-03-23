'use client';

import { useState } from 'react';
import { missionData } from '@/src/components/utils/missionData';
import styles from './MobileMission.module.scss';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useAuth } from '@/src/context/AuthContext';

const XP_PER_LEVEL = 500;

export const MobileMission = () => {
  const { profile } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {activeGame ? (
        <div className={styles.gameOverlay}>
          <button className={styles.closeBtn} onClick={() => setActiveGame(null)}>
            CLOSE
          </button>
          <iframe
            src={activeGame}
            className={styles.gameIframe}
            allow="fullscreen; autoplay"
          />
        </div>
      ) : (
        <>
          <h2 className={styles.title}>MISSION</h2>
          <p className={styles.subtitle}>Complete tasks to earn points</p>
          <GlassFrame>
            <div className={styles.cardList}>
              {missionData.map((mission) => {
                const Icon = mission.icon;
                const xp = mission.level * XP_PER_LEVEL;
                const isDone = profile?.missions?.[`mission_${mission.id}`]?.status === 'done';

                const isLocked = !mission.isAtive;

                return (
                  <div key={mission.id} className={`${styles.card} ${isLocked ? styles.cardLocked : ''}`}>
                    <div className={`${styles.iconRing} ${isLocked ? styles.iconRingLocked : ''}`}>
                      <Icon className={`${styles.iconSvg} ${isLocked ? styles.iconLocked : ''}`} />
                    </div>
                    <div className="flex w-full flex-col justify-between">
                      <div className={styles.cardBody}>
                        <div className={styles.cardInfo}>
                          <span className={styles.missionLabel}>
                            MISSION {String(mission.level).padStart(2, '0')}
                          </span>
                          <span className={styles.missionTitle}>{mission.title}</span>
                        </div>

                        <div className={styles.xpBadge}>
                          <span className={styles.xpValue}>{xp}</span>
                          <span className={styles.xpUnit}>xp</span>
                        </div>
                      </div>

                      <button
                        disabled={isLocked || !mission.gameLink}
                        onClick={() => mission.gameLink && setActiveGame(mission.gameLink)}
                        className={`${styles.actionBtn} ${isLocked ? styles.actionBtnLocked : isDone ? styles.actionBtnDone : styles.actionBtnPlay}`}
                      >
                        {isLocked ? 'LOCKED' : isDone ? 'DONE' : 'START'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassFrame>
        </>
      )}
    </div>
  );
};
