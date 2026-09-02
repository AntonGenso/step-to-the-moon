'use client';

import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from '@/src/i18n/navigation';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';
import styles from './MobileTests.module.scss';
import Image from 'next/image';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getTestCards, testProgressKey, type TestView } from '@/src/services/testService';
import { formatOpensAt, isMissionOpen } from '@/src/services/missionSchedule';

export const MobileTests = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const t = useTranslations('tests');
  const tt = useTranslations('test');
  const tc = useTranslations('common');
  const locale = useLocale();

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
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <GlassFrame>
        <div className={styles.cardList}>
          {tests.map((test) => {
            const testKey = testProgressKey(test.id);
            const isDone = profile?.tests?.[testKey]?.status === 'done';
            const savedScore = profile?.tests?.[testKey]?.score ?? 0;

            // Scheduled for later: the card stays on the list, closed, with the
            // padlock in place of the cover.
            const isUpcoming = !isMissionOpen(test.opensAt);
            const isLocked = isUpcoming;
            const title = test.title;

            return (
              <div
                key={test.id}
                className={`${styles.card} ${isUpcoming ? styles.cardUpcoming : ''} ${!isDone && !isUpcoming ? styles.notDoneBorderGradient : ''}`}
                onClick={() => !isLocked && router.push(`/test/${test.id}`)}
              >
                <div className="from-bg-card-light to-bg-card shadow-inner-card flex h-full w-full gap-4 rounded-[16px] bg-gradient-to-r p-[20px_30px]">
                  <div
                    className={`${styles.iconRing} ${isLocked ? styles.iconRingLocked : ''} ${isDone ? styles.iconRingDone : ''}`}
                  >
                    {isLocked || !test.icon ? (
                      <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
                    ) : (
                      <Image
                        src={test.icon}
                        alt={test.title}
                        width={120}
                        height={120}
                        unoptimized
                        className={styles.iconSvg}
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className={styles.cardBody}>
                      <div className={styles.cardInfo}>
                        <span className={styles.testLabel}>
                          {tt('testLabel')} {String(test.level).padStart(2, '0')}
                        </span>
                        <span className={styles.testTitle}>{title}</span>
                      </div>
                      {isDone ? (
                        <div className={styles.scoreBadge}>
                          <span className={styles.scoreValue}>{savedScore}</span>
                          <span className={styles.scoreUnit}>{tc('pts')}</span>
                        </div>
                      ) : (
                        <div className={styles.xpBadge}>
                          <span className={styles.xpValue}>{test.xp}</span>
                          <span className={styles.xpUnit}>{tc('xp').toLowerCase()}</span>
                        </div>
                      )}
                    </div>
                    <div
                      className={`${styles.actionBtn} ${isLocked ? styles.actionBtnLocked : isDone ? styles.actionBtnDone : styles.actionBtnPlay}`}
                    >
                      {isUpcoming
                        ? tc('opensAt', { date: formatOpensAt(test.opensAt as string, locale) })
                        : isDone
                          ? tc('retry')
                          : tc('start')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassFrame>
    </div>
  );
};
