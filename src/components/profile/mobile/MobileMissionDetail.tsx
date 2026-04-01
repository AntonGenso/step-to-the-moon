'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './MobileMissionDetail.module.scss';
import { IMissionData } from '@/src/components/utils/missionData';
import { MobileBottomNav } from './MobileBottomNav';
import GameIcon from '@/public/images/svg/mobile/other/game.svg';

import BackIcon from '@/public/images/svg/mobile/other/arrow.svg';

interface Props {
  mission: IMissionData;
}

export const MobileMissionDetail = ({ mission }: Props) => {
  const router = useRouter();
  const icon = mission.icon;
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
            <video src={mission.videoLink} className={styles.overlayMedia} controls autoPlay />
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
            <button type="button" className={styles.backBtn} onClick={() => router.back()}>
              <BackIcon className={styles.backIcon} />
            </button>

            <div className={styles.titlePill}>
              <span>{mission.title}</span>
            </div>

            <div className={styles.headerIcon}>
              {/* <Icon className={styles.headerIconSvg} /> */}
              <Image src={icon} alt="Icon" className={styles.headerIconSvg} />
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
                  <div className={styles.activityCircle}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M8 4L24 14L8 24V4Z" fill="#fff" />
                    </svg>
                  </div>
                  <span className={styles.activityLabel}>VIDEO</span>
                  <span className={styles.activityHint}>watch the video</span>
                </button>

                {/* Game card */}
                <button
                  className={`${styles.activityCard} ${styles.gameCard}`}
                  disabled={!mission.gameLink}
                  onClick={() => mission.gameLink && setActiveOverlay('game')}
                >
                  <div className={styles.activityCircle}>
                    <GameIcon className="w-[40%]" />
                  </div>
                  <span className={styles.activityLabel}>GAME</span>
                  <span className={styles.activityHint}>Play the game</span>
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
                      <div className="shadow-inner-card flex h-full w-full flex-col gap-5 rounded-[50px] bg-gradient-to-r from-[#0F2D37] to-[#030505] p-[15px]">
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
                          onClick={() => setOpenFactId(fact.id)}
                        >
                          OPEN
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}

      {/* Fact modal */}
      {openFactId !== null &&
        (() => {
          const fact = mission.facts.find((f) => f.id === openFactId);
          if (!fact) return null;
          return (
            <div className={styles.factModal} onClick={() => setOpenFactId(null)}>
              <div className={styles.factModalCard} onClick={(e) => e.stopPropagation()}>
                <div className="shadow-inner-card flex h-full w-full flex-col gap-5 rounded-[50px] bg-gradient-to-r from-[#0F2D37] to-[#030505] p-[20px]">
                  <div className={styles.factModalImageWrap}>
                    <Image
                      src={fact.image}
                      alt={fact.title}
                      fill
                      sizes="80vw"
                      className={styles.factImage}
                    />
                  </div>
                  <p className={`${styles.factModalText} `}>{fact.description}</p>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Bottom navigation */}
      <MobileBottomNav activeTab="mission" />
    </div>
  );
};
