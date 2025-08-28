import PlayIcon from '@/public/images/profile/mission/svg/play.svg';
import JoystikIcon from '@/public/images/profile/mission/svg/joystick.svg';
import HandsIcon from '@/public/images/profile/mission/svg/hands.svg';
import AddIcon from '@/public/images/profile/mission/svg/plus_icon.svg';
import { useRef, useEffect } from 'react';
import { missionData } from '../../utils/missionData';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Mission.module.scss';
import Image from 'next/image';
import defaultImage from '@/public/images/default_image.png';

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
    if (mission?.fileLink) {
      window.open(mission.fileLink, '_blank');
    }
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
    <div className="custom-scroll relative flex h-full w-full flex-col gap-[20px] overflow-auto p-[20px_0]">
      <div className="flex gap-[10px]">
        <div className="relative h-[200px] w-[50%] overflow-hidden rounded-[20px] bg-[url('/images/profile/mission/video_bg.webp')] bg-cover bg-center">
          {mission?.videoLink && (
            <video
              ref={videoRef || ''}
              src={mission.videoLink}
              className="w-full max-w-3xl"
              preload="metadata"
              controls={false}
            />
          )}
          <button
            type="button"
            className="absolute top-1/2 left-1/2 w-[20%] -translate-x-1/2 -translate-y-1/2"
            onClick={mission?.videoLink ? handlePlay : handleGame}
          >
            {mission?.gameLink ? (
              <PlayIcon className="cursor-pointer" />
            ) : (
              <HandsIcon className="cursor-pointer" />
            )}
          </button>
        </div>
        <div
          className={`${mission?.gameLink ? "bg-[url('/images/profile/mission/game_bg.webp')]" : 'bg-black'} relative h-full w-[50%] rounded-[20px] bg-cover bg-center`}
        >
          <button
            type="button"
            className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[20px]"
            onClick={handleGame}
          >
            {mission?.gameLink ? (
              <JoystikIcon className="w-[30%] cursor-pointer" />
            ) : (
              <>
                <AddIcon className="w-[15%] cursor-pointer" />
                <span className={`${styles.subtitle} block w-[100%] uppercase`}>
                  add your file png/jpeg
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <h2
        className={`${styles.title} flex items-center justify-center text-[48px] font-bold lowercase`}
      >
        Facts
      </h2>
      <div className="h-full w-full">
        <ul className="grid h-full grid-cols-3 gap-[20px]">
          {mission?.facts.map((fact) => (
            <li
              key={fact.id}
              className={`${styles.factItem} rounded-[75px] border-[2px] border-[#2f8e86] bg-gradient-to-b from-[rgba(41,140,99,0.2)] to-[rgba(41,140,99,1)]`}
            >
              <div
                className={`${styles.imageWrapper} relative aspect-[1/1] w-full flex-1 overflow-hidden rounded-[75px] border-[2px] border-[#2f8e86]`}
              >
                <Image
                  src={fact?.image || defaultImage}
                  alt={fact.title}
                  width={500}
                  height={500}
                  quality={90}
                  className={styles.factImage}
                />
              </div>
              <div className={styles.descriptionWrapper}>
                <p
                  className={`${styles.description} p-[10px_10px_15px_10px] text-center text-[24px] leading-[1] text-white`}
                >
                  {fact.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => router.push('/profile?activeTab=mission')}
        className={styles.backButton}
      >
        {'\u2190'}
      </button>
    </div>
  );
};
