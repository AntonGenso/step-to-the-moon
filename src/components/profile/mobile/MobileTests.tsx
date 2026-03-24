'use client';

import { testData } from '@/src/components/utils/testData';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import styles from './MobileTests.module.scss';

export const MobileTests = () => {
  const { profile } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TESTS</h2>
      <p className={styles.subtitle}>Challenge your knowledge</p>
      <GlassFrame>
        <div className={styles.cardList}>
          {testData.map((test) => {
            const Icon = test.icon;
            const testKey = `test_${test.id}`;
            const isDone = profile?.tests?.[testKey]?.status === 'done';
            const savedScore = profile?.tests?.[testKey]?.score ?? 0;

            return (
              <div key={test.id} className={`${styles.card} ${isDone ? styles.isDone : ''}`}>
                <div className="from-bg-card-light to-bg-card shadow-inner-card flex h-full w-full gap-4 rounded-[16px] bg-gradient-to-r p-[20px_30px]">
                  <div className={styles.iconRing}>
                    <Icon className={styles.iconSvg} />
                  </div>
                  <div className="flex w-full flex-col justify-between">
                    <div className={styles.cardBody}>
                      <div className={styles.cardInfo}>
                        <span className={styles.testLabel}>
                          TEST {String(test.id).padStart(2, '0')}
                        </span>
                        <span className={styles.testTitle}>{test.title}</span>
                      </div>
                      {isDone && (
                        <div className={styles.scoreBadge}>
                          <span className={styles.scoreValue}>{savedScore}</span>
                          <span className={styles.scoreUnit}>pts</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => router.push(`/test/${test.id}`)}
                      className={`${styles.actionBtn} ${isDone ? styles.actionBtnDone : styles.actionBtnStart}`}
                    >
                      {isDone ? 'RETRY' : 'START'}
                    </button>
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
