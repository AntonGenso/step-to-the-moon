import { Tablet } from './tablet/Tablet';
import { Container } from '../shared/container/container';
import styles from './Profile.module.scss';
import { Suspense } from 'react';
import banner from '@/public/images/main-bg.webp';

export const Profile = () => {
  return (
    <div
      className={styles.mainContainer}
      style={{ backgroundImage: `url(${banner.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}
    >
      <Container className={styles.container}>
        <Suspense>
          <Tablet />
        </Suspense>
      </Container>
    </div>
  );
};
