'use client';

import { useEffect, useState } from 'react';
import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import { useRouter } from '@/src/i18n/navigation';
import { useLocale } from 'next-intl';
import { useAuth } from '@/src/context/AuthContext';
import { getTestCards, testProgressKey, type TestView } from '@/src/services/testService';
import { isMissionOpen } from '@/src/services/missionSchedule';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

export default function Tests() {
  const router = useRouter();
  const locale = useLocale();
  const { profile } = useAuth();

  const [tests, setTests] = useState<TestView[]>([]);

  useEffect(() => {
    let active = true;
    getTestCards(locale)
      .then((cards) => {
        if (active) setTests(cards);
      })
      .catch(() => {
        if (active) setTests([]);
      });
    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <div className={`${styles.contentWrapper} custom-scroll`}>
      <ul className={`${styles.tabletList} custom-scroll w-[60%]`}>
        {tests.map((test) => {
          // Scheduled for later: the card is shown closed, and the cover gives
          // way to the padlock rather than teasing the subject.
          const isUpcoming = !isMissionOpen(test.opensAt);

          return (
            <li key={test.id} className={styles.tabletItem}>
              <Card
                image={isUpcoming ? lockedImg : test.icon}
                title={test.title}
                level={test.level}
                xp={test.xp}
                status
                setActiveMission={() => router.push(`/test/${test.id}`)}
                label="test"
                opensAt={test.opensAt}
                isDone={profile?.tests?.[testProgressKey(test.id)]?.status === 'done'}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
