'use client';

import { Tablet } from './tablet/Tablet';
import styles from './Profile.module.scss';
import { Suspense } from 'react';
import { MobileProfile } from './mobile/MobileProfile';

export const Profile = () => {
  return (
    <div className={styles.mainContainer}>
      <div className="hidden max-tablet:block">
        <MobileProfile />
      </div>
      <div className="block max-tablet:hidden">
        <Suspense>
          <Tablet />
        </Suspense>
      </div>
    </div>
  );
};
