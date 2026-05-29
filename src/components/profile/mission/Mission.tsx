import { useRef, useEffect } from 'react';
import { missionData } from '../../utils/missionData';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Mission.module.scss';
import Image from 'next/image';
import defaultImage from '@/public/images/default_image.png';
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
  const t = useTranslations('mission');
  const tf = useTranslations('facts');
  const locale = useLocale();

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

  return (
    <div className="custom-scroll relative flex h-full w-full flex-col gap-[20px] overflow-auto">
      <div className="flex h-full">
        {mission?.type === 'current' ? (
          <CurrentMissionView
            mission={mission}
            videoRef={videoRef}
            handlePlay={handlePlay}
            handleGame={handleGame}
          />
        ) : (
          <BonuseMissionView handleDownload={handleDownload} handleUpload={handleUpload} />
        )}
      </div>
      {!!mission?.facts.length && (
        <h2
          className={`${styles.title} flex items-center justify-center text-[48px] font-bold lowercase`}
        >
          {t('facts')}
        </h2>
      )}
      {!!mission?.facts.length && (
        <div className="h-full w-full">
          <ul className="grid h-full grid-cols-3 gap-[20px]">
            {mission?.facts.map((fact) => (
              <li
                key={fact.id}
                className={`${styles.factItem} rounded-[75px] border-[2px] border-[#2f8e86] bg-gradient-to-b from-[rgba(41,140,99,0.2)] to-[rgba(41,140,99,1)]`}
              >
                <div
                  className={`${styles.imageWrapper} relative aspect-[1/1] w-full flex-1 overflow-hidden rounded-[100px] border-[2px] border-[#2f8e86]`}
                >
                  <Image
                    src={fact?.image || defaultImage}
                    alt={fact.key ? tf(`${fact.key}.title`) : fact.title}
                    width={500}
                    height={500}
                    quality={90}
                    className={styles.factImage}
                  />
                </div>
                <div className={styles.descriptionWrapper}>
                  {fact.key && (
                    <p className="p-[10px_10px_4px_10px] text-center text-[22px] leading-[1] font-[var(--font-alumni)] font-bold text-white">
                      {tf(`${fact.key}.title`)}
                    </p>
                  )}
                  <p
                    className={`${styles.description} p-[4px_10px_15px_10px] text-center text-[20px] leading-[1.3] text-white`}
                  >
                    {fact.key ? tf(`${fact.key}.description`) : fact.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
