'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './MobileMissionDetail.module.scss';
import { IMissionData } from '@/src/components/utils/missionData';
import { MobileBottomNav } from './MobileBottomNav';

import FullCosmonautIcon from '@/public/images/svg/mobile/other/full-cosmonaut.svg';

interface Props {
  mission: IMissionData;
}

export const MobileMissionDetail = ({ mission }: Props) => {
  const router = useRouter();
  const Icon = mission.icon;
  const [activeOverlay, setActiveOverlay] = useState<'video' | 'game' | null>(null);
  const [openFactId, setOpenFactId] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      {activeOverlay ? (
        <div className={styles.overlay}>
          <button className={styles.overlayClose} onClick={() => setActiveOverlay(null)}>
            CLOSE
          </button>
          {activeOverlay === 'video' && mission.videoLink ? (
            <video
              src={mission.videoLink}
              className={styles.overlayMedia}
              controls
              autoPlay
            />
          ) : (
            <iframe
              src={mission.gameLink}
              className={styles.overlayMedia}
              allow="fullscreen; autoplay"
            />
          )}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={() => router.back()}>
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <path
                  d="M10 2L2 10L10 18"
                  stroke="var(--color-cyan)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.titlePill}>{mission.title}</div>

            <div className={styles.headerIcon}>
              <Icon className={styles.headerIconSvg} />
            </div>
          </div>

          {/* Scrollable content */}
          <div className={styles.content}>
            {/* Activities */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Activities</h3>
              <p className={styles.sectionSub}>Choose your mission type</p>

              <div className={styles.activityRow}>
                {/* Video card */}
                <button
                  className={`${styles.activityCard} ${styles.videoCard}`}
                  disabled={!mission.videoLink}
                  onClick={() => mission.videoLink && setActiveOverlay('video')}
                >
                  <div className={styles.activityIconWrap}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M12 8L28 18L12 28V8Z" fill="#fff" />
                    </svg>
                  </div>
                  <span className={styles.activityLabel}>VIDEO</span>
                  <span className={styles.activityHint}>match the video</span>
                </button>

                {/* Game card */}
                <button
                  className={`${styles.activityCard} ${styles.gameCard}`}
                  disabled={!mission.gameLink}
                  onClick={() => mission.gameLink && setActiveOverlay('game')}
                >
                  <div className={styles.activityIconWrap}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="4" y="10" width="28" height="16" rx="8" stroke="#fff" strokeWidth="2.5" />
                      <circle cx="12" cy="18" r="2.5" fill="#fff" />
                      <circle cx="24" cy="18" r="2.5" fill="#fff" />
                      <rect x="10" y="15" width="1.5" height="6" rx="0.75" fill="#fff" />
                      <rect x="8.5" y="16.5" width="6" height="1.5" rx="0.75" fill="#fff" />
                    </svg>
                  </div>
                  <span className={styles.activityLabel}>GAME</span>
                  <span className={styles.activityHint}>play the game</span>
                </button>
              </div>
            </section>

            {/* Facts */}
            {mission.facts.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Facts</h3>
                <p className={styles.sectionSub}>Discover space knowledge</p>

                <div className={styles.factGrid}>
                  {mission.facts.map((fact) => (
                    <div key={fact.id} className={styles.factCard}>
                      <div className={styles.factImageWrap}>
                        <Image
                          src={fact.image}
                          alt={fact.title}
                          fill
                          sizes="40vw"
                          className={styles.factImage}
                        />
                      </div>
                      <button
                        className={styles.factOpenBtn}
                        onClick={() =>
                          setOpenFactId(openFactId === fact.id ? null : fact.id)
                        }
                      >
                        {openFactId === fact.id ? 'CLOSE' : 'OPEN'}
                      </button>
                      {openFactId === fact.id && (
                        <p className={styles.factDescription}>{fact.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}

      {/* Bottom navigation */}
      <MobileBottomNav activeTab="mission" />
    </div>
  );
};
