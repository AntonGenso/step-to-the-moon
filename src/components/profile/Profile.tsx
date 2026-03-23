'use client';

import { Tablet } from './tablet/Tablet';
import styles from './Profile.module.scss';
import { Suspense } from 'react';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';
import { MobileProfile } from './mobile/MobileProfile';

export const Profile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className={styles.mainContainer}>
        <MobileProfile />
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Suspense>
        <Tablet />
      </Suspense>
    </div>
  );
};
