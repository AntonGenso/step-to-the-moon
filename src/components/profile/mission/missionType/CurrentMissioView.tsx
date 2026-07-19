import JoystikIcon from '@/public/images/profile/mission/svg/joystick.svg';
import LockIcon from '@/public/images/profile/mission/svg/lock.svg';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('mission');

  const hasVideo = !!mission?.videoLink;
  const hasGame = !!mission?.gameLink;

  return (
    <section className={styles.activitySection}>
      {/* <h3 className={styles.sectionTitle}>{t('activities')}</h3>
      <p className={styles.sectionSub}>{t('chooseType')}</p> */}

      <div className={styles.activityRow}>
        {hasVideo && (
          <button
            type="button"
            className={`${styles.activityCard} ${styles.videoCard}`}
            onClick={handlePlay}
          >
            <video
              ref={videoRef}
              src={mission!.videoLink}
              className={styles.hiddenVideo}
              preload="metadata"
              controls={false}
            />
            <div className={styles.activityCircle}>
              <svg width="27" height="27" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M8 4L24 14L8 24V4Z" fill="#fff" />
              </svg>
            </div>
            <span className={styles.activityLabel}>{t('video')}</span>
            <span className={styles.activityHint}>{t('watchVideo')}</span>
          </button>
        )}

        <button
          type="button"
          disabled={!hasGame}
          onClick={hasGame ? handleGame : undefined}
          className={`${styles.activityCard} ${styles.gameCard} ${!hasVideo ? styles.gameCardFull : ''} ${!hasGame ? styles.gameCardLocked : ''}`}
        >
          <div className={styles.activityCircle}>
            {hasGame ? (
              <JoystikIcon className={styles.gameIcon} />
            ) : (
              <LockIcon className={styles.gameIcon} />
            )}
          </div>
          <span className={styles.activityLabel}>{t('game')}</span>
          <span className={styles.activityHint}>{t('playGame')}</span>
        </button>
      </div>
    </section>
  );
};
