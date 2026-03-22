'use client';

import styles from './MobileMission.module.scss';

export const MobileMission = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MISSION</h2>
      <p className={styles.subtitle}>Complete tasks to earn points</p>

      <div className={styles.placeholder}>
        <span className={styles.placeholderText}>Coming soon...</span>
      </div>
    </div>
  );
};
