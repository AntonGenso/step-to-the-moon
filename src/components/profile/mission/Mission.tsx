import { useRef, useEffect, useState } from 'react';
import { missionData } from '../../utils/missionData';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/src/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Mission.module.scss';
import Image from 'next/image';
import defaultImage from '@/public/images/default_image.png';
import BackIcon from '@/public/images/svg/back.svg';
import { CurrentMissionView } from './missionType/CurrentMissioView';
import { BonuseMissionView } from './missionType/BonuseMissionView';

declare global {
  interface HTMLVideoElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

interface IMissionProps {
  setIsGameOpen: (value: boolean) => void;
  setGameLink: (link: string) => void;
}

export const Mission = ({ setGameLink, setIsGameOpen }: IMissionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('mission');
  const tf = useTranslations('facts');
  const locale = useLocale();
  const [openFactIndex, setOpenFactIndex] = useState<number | null>(null);

  const mission = missionData.find((item) => item.id === Number(searchParams.get('missionId')));

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();

        if (videoRef.current.requestFullscreen) {
          await videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          await videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          await videoRef.current.msRequestFullscreen();
        }
      } catch (error) {
        console.error('Ошибка при воспроизведении видео:', error);
      }
    }
  };

  const handleFullscreenChange = () => {
    if (videoRef.current) {
      const isFullscreen =
        document.fullscreenElement ||
        (document as unknown as { webkitFullscreenElement: Element | null })
          .webkitFullscreenElement ||
        (document as unknown as { msFullscreenElement: Element | null }).msFullscreenElement;
      if (!isFullscreen) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleFullscreenChange();
    }
  };

  const checkFullscreen = () => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  };

  useEffect(() => {
    checkFullscreen();
  }, []);

  const handleDownload = () => {
    const url = mission?.fileLinks?.[locale] ?? mission?.fileLinks?.ru;
    if (url) window.open(url, '_blank');
  };

  const handleUpload = () => {
    console.log('Файл загружен!');
  };

  const handleGame = () => {
    if (mission?.gameLink) {
      setIsGameOpen(true);
      setGameLink(mission.gameLink || '');
    } else {
      handleDownload();
    }
  };

  const facts = mission?.facts ?? [];
  const openFact = openFactIndex !== null ? facts[openFactIndex] : null;

  const stepFact = (delta: number) => {
    setOpenFactIndex((current) => {
      if (current === null) return current;
      return (current + delta + facts.length) % facts.length;
    });
  };

  return (
    <div className="custom-scroll relative flex h-full w-full flex-col items-center gap-[20px] overflow-auto">
      {/* Mission header: back / title / icon */}
      <div className={styles.missionHeader}>
        <button
          type="button"
          className={styles.headerBackBtn}
          onClick={() => router.push('/?activeTab=mission')}
        >
          <BackIcon className={styles.headerBackIcon} />
        </button>

        <div className={styles.titlePill}>
          <span>{mission?.title}</span>
        </div>

        <div className={styles.headerIcon}>
          {mission?.icon && (
            <Image src={mission.icon} alt={mission.title} className={styles.headerIconImg} />
          )}
        </div>
      </div>

      {mission?.type === 'current' ? (
        <CurrentMissionView
          mission={mission}
          videoRef={videoRef}
          handlePlay={handlePlay}
          handleGame={handleGame}
        />
      ) : (
        <div className="flex h-full w-[80%]">
          <BonuseMissionView handleDownload={handleDownload} handleUpload={handleUpload} />
        </div>
      )}
      {!!facts.length && (
        <section className={styles.factsSection}>
          <h3 className={styles.factsTitle}>{t('facts')}</h3>
          <p className={styles.factsSub}>{t('discoverKnowledge')}</p>

          <ul className={styles.factGrid}>
            {facts.map((fact, index) => (
              <li key={fact.id}>
                <button
                  type="button"
                  className={styles.factCard}
                  onClick={() => setOpenFactIndex(index)}
                >
                  <div className={styles.factImageWrap}>
                    <Image
                      src={fact?.image || defaultImage}
                      alt={fact.key ? tf(`${fact.key}.title`) : fact.title}
                      fill
                      sizes="33vw"
                      quality={90}
                      className={styles.factImage}
                    />
                  </div>
                  <span className={styles.factOpenBtn}>{t('open')}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Fact modal */}
      {openFact && (
        <div className={styles.factModal} onClick={() => setOpenFactIndex(null)}>
          <button className={styles.factCloseBtn} onClick={() => setOpenFactIndex(null)}>
            ✕
          </button>

          {facts.length > 1 && (
            <button
              className={`${styles.factNavBtn} ${styles.factNavPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                stepFact(-1);
              }}
            >
              ‹
            </button>
          )}

          <div className={styles.factModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.factModalImageWrap}>
              <Image
                src={openFact.image || defaultImage}
                alt={openFact.key ? tf(`${openFact.key}.title`) : openFact.title}
                fill
                sizes="40vw"
                quality={90}
                className={styles.factImage}
              />
            </div>
            {openFact.key && <p className={styles.factModalTitle}>{tf(`${openFact.key}.title`)}</p>}
            <p className={styles.factModalText}>
              {openFact.key ? tf(`${openFact.key}.description`) : openFact.description}
            </p>
          </div>

          {facts.length > 1 && (
            <button
              className={`${styles.factNavBtn} ${styles.factNavNext}`}
              onClick={(e) => {
                e.stopPropagation();
                stepFact(1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
};
