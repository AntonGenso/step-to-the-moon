'use client';

import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import { testData } from '../../utils/testData';
import { Heading } from '@/src/uikit/heading/Heading';
import { useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Tests() {
  const router = useRouter();
  const tn = useTranslations('nav');
  const tData = useTranslations('testData');

  return (
    <div className={`${styles.contentWrapper} custom-scroll`}>
      {/* <Heading title={tn('tests')} /> */}
      <ul className={`${styles.tabletList} custom-scroll w-[60%]`}>
        {testData.map((test) => {
          const title = (tData.raw(`t${test.id}`) as { title: string }).title;
          return (
            <li key={test.id} className={styles.tabletItem}>
              <Card
                image={test.icon}
                title={title}
                level={test.id}
                xp={test.xp}
                status={test.isAtive}
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
