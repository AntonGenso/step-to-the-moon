import LandIcon from '@/public/images/svg/mssion/atmosphere.svg';
import MoonIcon from '@/public/images/svg/mssion/moon.svg';
import BoyIcon from '@/public/images/profile/skin/svg/boy_light.svg';
import styles from './MoonProgressBar.module.scss';

// import ProgressbarMoon from '@/public/images/svg/progressbar_moon.svg';
// import ProgressbarEarth from '@/public/images/svg/progressbar_earth.svg';

interface IMoonProgressBarProps {
  progress: number;
  distance: number;
}

export const MoonProgressBar = ({ progress, distance }: IMoonProgressBarProps) => {
  const safeProgress = Math.min(Math.max((progress / distance) * 100, 0), 100);
  const iconLeft = `max(0px, calc(${safeProgress}% - 15px))`;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.progressWrapper}>
        <LandIcon className={styles.landIcon} />
        <div className={styles.progressBar}>
          <div className={styles.progressBarFill} style={{ width: `${safeProgress}%` }} />
          <BoyIcon className={styles.boyIcon} style={{ left: iconLeft }} />
        </div>
        <MoonIcon className={styles.moonIcon} />
      </div>
    </div>
  );
};
