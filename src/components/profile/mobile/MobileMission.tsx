'use client';

import { useRouter } from '@/src/i18n/navigation';
import Image from 'next/image';
import { missionData } from '@/src/components/utils/missionData';
import styles from './MobileMission.module.scss';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useAuth } from '@/src/context/AuthContext';
import { useTranslations } from 'next-intl';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

const XP_PER_LEVEL = 500;

export const MobileMission = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const t = useTranslations('mission');
  const tc = useTranslations('common');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <GlassFrame>
        <div className={styles.cardList}>
          {missionData.map((mission) => {
            const Icon = mission.icon as string;
            const xp = mission.level * XP_PER_LEVEL;
            const isDone = profile?.missions?.[`mission_${mission.id}`]?.status === 'done';

            const isLocked = !mission.isAtive;

            return (
              <div
                key={mission.id}
                className={`${styles.card} ${isLocked ? styles.cardLocked : ''}`}
                onClick={() => !isLocked && router.push(`/mission/${mission.id}`)}
              >
                <div
                  className={`from-bg-card-light to-bg-card shadow-inner-card flex h-full w-full gap-4 rounded-[16px] bg-gradient-to-r p-[20px_30px]`}
                >
                  <div
                    className={`${styles.iconRing} ${isLocked ? styles.iconRingLocked : ''} ${isDone && styles.iconRingDone}`}
                  >
                    {isLocked ? (
                      <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
                    ) : (
                      <Image src={Icon} alt="Icon" className={styles.iconSvg} />
                    )}
                  </div>
                  <div className="flex w-full flex-col justify-between">
                    <div className={styles.cardBody}>
                      <div className={styles.cardInfo}>
                        <span className={styles.missionLabel}>
                          {t('missionLabel')} {String(mission.level).padStart(2, '0')}
                        </span>
                        <span className={styles.missionTitle}>{mission.title}</span>
                      </div>

                      <div className={styles.xpBadge}>
                        <span className={styles.xpValue}>{xp}</span>
                        <span className={styles.xpUnit}>{tc('xp').toLowerCase()}</span>
                      </div>
                    </div>

                    <div
                      className={`${styles.actionBtn} ${isLocked ? styles.actionBtnLocked : isDone ? styles.actionBtnDone : styles.actionBtnPlay}`}
                    >
                      {isLocked ? tc('locked') : isDone ? tc('done') : tc('start')}
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
