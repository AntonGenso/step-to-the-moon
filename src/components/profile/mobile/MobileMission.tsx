'use client';

import { useState } from 'react';
import { missionData } from '@/src/components/utils/missionData';
import styles from './MobileMission.module.scss';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';

const XP_PER_LEVEL = 500;

export const MobileMission = () => {
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
                const isDone = false; // TODO: track completion state

                return (
                  <div key={mission.id} className={styles.card}>
                    <div className={styles.iconRing}>
                      <Icon className={styles.iconSvg} />
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
                        disabled={!mission.gameLink}
                        onClick={() => mission.gameLink && setActiveGame(mission.gameLink)}
                        className={`${styles.actionBtn} ${isDone ? styles.actionBtnDone : styles.actionBtnPlay}`}
                      >
                        {isDone ? 'DONE' : 'PLAY'}
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
