'use client';

import { testData } from '@/src/components/utils/testData';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from '@/src/i18n/navigation';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';
import styles from './MobileTests.module.scss';
import Image from 'next/image';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

export const MobileTests = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const t = useTranslations('tests');
  const tt = useTranslations('test');
  const tc = useTranslations('common');
  const tData = useTranslations('testData');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <GlassFrame>
        <div className={styles.cardList}>
          {testData.map((test) => {
            const testKey = `test_${test.id}`;
            const isDone = profile?.tests?.[testKey]?.status === 'done';
            const savedScore = profile?.tests?.[testKey]?.score ?? 0;
            const isLocked = !test.isAtive;
            const title = (tData.raw(`t${test.id}`) as { title: string }).title;

            return (
              <div
                key={test.id}
                className={`${styles.card} ${isLocked ? styles.cardLocked : !isDone ? styles.notDoneBorderGradient : ''}`}
                onClick={() => !isLocked && router.push(`/test/${test.id}`)}
              >
                <div className="from-bg-card-light to-bg-card shadow-inner-card flex h-full w-full gap-4 rounded-[16px] bg-gradient-to-r p-[20px_30px]">
                  <div
                    className={`${styles.iconRing} ${isLocked ? styles.iconRingLocked : ''} ${isDone ? styles.iconRingDone : ''}`}
                  >
                    {isLocked ? (
                      <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
                    ) : (
                      <Image src={test.icon} alt="Icon" className={styles.iconSvg} />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className={styles.cardBody}>
                      <div className={styles.cardInfo}>
                        <span className={styles.testLabel}>
                          {tt('testLabel')} {String(test.id).padStart(2, '0')}
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
                      {isLocked ? tc('locked') : isDone ? tc('retry') : tc('start')}
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
