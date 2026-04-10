'use client';

import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import { testData } from '../../utils/testData';
import { Heading } from '@/src/uikit/heading/Heading';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Tests() {
  const { profile } = useAuth();
  const router = useRouter();
  const tn = useTranslations('nav');

  return (
    <div className={`${styles.contentWrapper} custom-scroll`}>
      <Heading title={tn('tests')} />
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
