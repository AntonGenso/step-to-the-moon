import PlayIcon from '@/public/images/profile/mission/svg/play.svg';
import JoystikIcon from '@/public/images/profile/mission/svg/joystick.svg';
import LockIcon from '@/public/images/profile/mission/svg/lock.svg';

import styles from './MissionType.module.scss';

interface IMissionData {
  videoLink: string;
  gameLink: string;
}

export const CurrentMissionView = ({
  mission,
  videoRef,
  handlePlay,
  handleGame,
}: {
  mission: IMissionData | null | undefined;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  handlePlay: () => void;
  handleGame: () => void;
}) => {
  return (
    <>
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
        <div className="absolute top-1/2 left-1/2 flex w-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <button
            type="button"
            className={`flex w-full flex-col items-center justify-center gap-[5px] ${styles.videoButton}`}
            onClick={mission?.videoLink ? handlePlay : undefined}
          >
            {mission?.videoLink ? (
              <PlayIcon className="cursor-pointer" />
            ) : (
              <LockIcon className="cursor-pointer" />
            )}
          </button>
        </div>
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${styles.videoButton}`}
        >
          Video
        </span>
      </div>
      <div
        className={`${mission?.gameLink ? "bg-[url('/images/profile/mission/game_bg.webp')]" : 'bg-black'} relative h-full w-[50%] rounded-[20px] bg-cover bg-center`}
      >
        <button
          type="button"
          className="absolute top-1/2 left-1/2 flex w-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[5px]"
          onClick={mission?.gameLink ? handleGame : undefined}
        >
          {mission?.gameLink ? (
            <JoystikIcon className="cursor-pointer" />
          ) : (
            <LockIcon className="cursor-pointer" />
          )}
        </button>
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${styles.videoButton}`}
        >
          Game
        </span>
      </div>
    </>
  );
};
