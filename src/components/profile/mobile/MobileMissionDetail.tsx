'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/src/i18n/navigation';
import Image from 'next/image';
import styles from './MobileMissionDetail.module.scss';
import { IMissionData } from '@/src/components/utils/missionData';
import { MobileBottomNav } from './MobileBottomNav';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/src/context/AuthContext';
import GameIcon from '@/public/images/svg/mobile/other/game.svg';
import BackIcon from '@/public/images/svg/mobile/other/arrow.svg';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

interface Props {
  mission: IMissionData;
}

export const MobileMissionDetail = ({ mission }: Props) => {
  const router = useRouter();
  const t = useTranslations('mission');
  const tc = useTranslations('common');
  const tf = useTranslations('facts');
  const { nickname, refreshProfile } = useAuth();
  const icon = mission.icon;
  const resolvedGameLink = mission.gameLink
    .replace('USER_ID', nickname ?? '')
    .replace('https://your-platform.com', window.location.origin);
  const [activeOverlay, setActiveOverlay] = useState<'video' | 'game' | null>(null);
  const [openFactId, setOpenFactId] = useState<number | null>(null);

  // Listen for score submissions from game iframe via postMessage
  useEffect(() => {
    if (activeOverlay !== 'game') return;

    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type !== 'SUBMIT_SCORE') return;

      const { score } = event.data as { score: unknown };
      if (typeof score !== 'number' || score < 0) return;

      await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission: `mission_${mission.id}`, score }),
      });

      await refreshProfile();
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeOverlay, mission.id, refreshProfile]);

  return (
    <div className={styles.page}>
      {activeOverlay ? (
        <div className={styles.overlay}>
          <button className={styles.overlayClose} onClick={() => setActiveOverlay(null)}>
            {tc('close')}
          </button>
          {activeOverlay === 'video' && mission.videoLink ? (
            <video src={mission.videoLink} className={styles.overlayMedia} controls autoPlay />
          ) : (
            <iframe
              src={resolvedGameLink}
              className={styles.overlayMedia}
              allow="fullscreen; autoplay"
            />
          )}
        </div>
      ) : (
        <>
          {/* Language switcher */}
          <div className={styles.topBar}>
            <LanguageSwitcher />
          </div>

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
              <h3 className={styles.sectionTitle}>{t('activities')}</h3>
              <p className={styles.sectionSub}>{t('chooseType')}</p>

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
                  <span className={styles.activityLabel}>{t('video').toUpperCase()}</span>
                  <span className={styles.activityHint}>{t('watchVideo')}</span>
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
                  <span className={styles.activityLabel}>{t('game').toUpperCase()}</span>
                  <span className={styles.activityHint}>{t('playGame')}</span>
                </button>
              </div>
            </section>

            {/* Facts */}
            {mission.facts.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('facts')}</h3>
                <p className={styles.sectionSub}>{t('discoverKnowledge')}</p>

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
                          {t('open')}
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
                      alt={fact.key ? tf(`${fact.key}.title`) : fact.title}
                      fill
                      sizes="80vw"
                      className={styles.factImage}
                    />
                  </div>
                  {fact.key && <p className={styles.factModalTitle}>{tf(`${fact.key}.title`)}</p>}
                  <p className={styles.factModalText}>
                    {fact.key ? tf(`${fact.key}.description`) : fact.description}
                  </p>
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
