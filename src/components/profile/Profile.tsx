'use client';

import { Tablet } from './tablet/Tablet';
import { Container } from '../shared/container/container';
import styles from './Profile.module.scss';
import { Suspense } from 'react';
import banner from '@/public/images/main-bg.webp';
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
    <div
      className={styles.mainContainer}
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }}
    >
      <Container className={styles.container}>
        <Suspense>
          <Tablet />
        </Suspense>
      </Container>
    </div>
  );
};
