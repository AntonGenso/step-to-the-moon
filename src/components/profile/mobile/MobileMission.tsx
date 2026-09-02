'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/src/i18n/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import {
  getMissionCards,
  missionProgressKey,
  type MissionView,
} from '@/src/services/missionService';
import styles from './MobileMission.module.scss';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useAuth } from '@/src/context/AuthContext';
import { useTranslations } from 'next-intl';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';
import { formatOpensAt, isMissionOpen } from '@/src/services/missionSchedule';

export const MobileMission = () => {
  const { profile } = useAuth();
  const router = useRouter();
  const t = useTranslations('mission');
  const tc = useTranslations('common');
  const locale = useLocale();

  const [missions, setMissions] = useState<MissionView[]>([]);

  useEffect(() => {
    let active = true;
    getMissionCards(locale)
      .then((cards) => {
        if (active) setMissions(cards);
      })
      .catch(() => {
        if (active) setMissions([]);
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
          {missions.map((mission) => {
            const cover = mission.icon;
            // The bonus card shares the mission row and is not graded, so it
            // never inherits the mission's "done" state.
            const isDone =
              mission.type === 'current' &&
              profile?.missions?.[missionProgressKey(mission.id)]?.status === 'done';

            // A mission with no game yet still opens: the video and the
            // handout are worth reaching.
            const isLocked = false;

            // Scheduled for later: the card stays on the list, greyed out, and
            // shows the date instead of the call to action.
            const isUpcoming = !isMissionOpen(mission.opensAt);

            return (
              <div
                key={mission.cardId}
                className={`${styles.card} ${isLocked ? styles.cardLocked : ''} ${isUpcoming ? styles.cardUpcoming : ''} ${mission?.type === 'bonus' ? styles.bonuseBorderGradient : ''} ${!isDone ? styles.notDoneBorderGradient : ''}`}
                onClick={() =>
                  !isLocked && !isUpcoming && router.push(`/mission/${mission.cardId}`)
                }
              >
                <div
                  className={`from-bg-card-light to-bg-card shadow-inner-card relative flex h-full w-full gap-4 rounded-[16px] bg-gradient-to-r p-[20px_30px]`}
                >
                  <div
                    className={`${styles.iconRing} ${isLocked ? styles.iconRingLocked : ''} ${isDone && styles.iconRingDone} ${mission?.type === 'bonus' ? styles.iconRingBonus : ''}`}
                  >
                    {isLocked || isUpcoming || !cover ? (
                      <Image src={lockedImg} alt="Locked" className={styles.lockedImage} fill />
                    ) : (
                      <Image
                        src={cover}
                        alt={mission.title}
                        width={120}
                        height={120}
                        unoptimized
                        className={styles.iconSvg}
                      />
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

                      {mission.xp !== undefined && (
                        <div className={styles.xpBadge}>
                          <span className={styles.xpValue}>{mission.xp}</span>
                          <span className={styles.xpUnit}>{tc('xp').toLowerCase()}</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${styles.actionBtn} ${isLocked || isUpcoming ? styles.actionBtnLocked : isDone ? styles.actionBtnDone : styles.actionBtnPlay} ${mission.type === 'bonus' && !isUpcoming ? 'bg-black' : ''}`}
                    >
                      {isLocked
                        ? tc('locked')
                        : isUpcoming
                          ? tc('opensAt', {
                              date: formatOpensAt(mission.opensAt as string, locale),
                            })
                          : isDone
                            ? tc('done')
                            : tc('start')}
                    </div>
                  </div>
                  {mission?.type === 'bonus' && (
                    <span
                      className={`text font-alumni absolute bottom-[16px] left-[16px] rounded-[8px] bg-gradient-to-r from-[#5FFF9F] to-[#10A56F] p-[8px_16px] text-sm font-semibold text-white uppercase`}
                    >
                      Bonus
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </GlassFrame>
    </div>
  );
};
