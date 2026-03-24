'use client';

import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import { testData } from '../../utils/testData';
import { Heading } from '@/src/uikit/heading/Heading';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Tests() {
  const { profile } = useAuth();
  const router = useRouter();

  return (
    <div className={`${styles.contentWrapper} custom-scroll`}>
      <Heading title="Tests" />
      <ul className={`${styles.tabletList} custom-scroll`}>
        {testData.map((test, i) => {
          const testKey = `test_${test.id}`;
          return (
            <li key={test.id} className={styles.tabletItem}>
              <Card
                image={test.icon}
                title={test.title}
                level={i + 1}
                status={true}
                setActiveMission={() => router.push(`/test/${test.id}`)}
                label="test"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
