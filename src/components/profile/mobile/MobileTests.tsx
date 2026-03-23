'use client';

import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import styles from './MobileTests.module.scss';

export const MobileTests = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TESTS</h2>
      <p className={styles.subtitle}>Challenge your knowledge</p>
      <GlassFrame>
        <div className={styles.placeholder}>
          <span className={styles.placeholderText}>Coming soon...</span>
        </div>
      </GlassFrame>
    </div>
  );
};
