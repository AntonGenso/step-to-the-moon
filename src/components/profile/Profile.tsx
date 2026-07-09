'use client';

import { Tablet } from './tablet/Tablet';
import styles from './Profile.module.scss';
import { Suspense } from 'react';
import { MobileProfile } from './mobile/MobileProfile';

export const Profile = () => {
  return (
    <div className={styles.mainContainer}>
      <div className="max-tablet:block hidden">
        <MobileProfile />
      </div>
      <div className="max-tablet:hidden block h-full">
        <Suspense>
          <Tablet />
        </Suspense>
      </div>
    </div>
  );
};
