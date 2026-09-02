'use client';

import styles from './Mission.module.scss';
import { Card } from '@/src/uikit/card/Card';
import { useEffect, useState } from 'react';
import { Mission } from '../mission/Mission';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/src/i18n/navigation';
import { useLocale } from 'next-intl';
// import { Heading } from '@/src/uikit/heading/Heading';
// import { useTranslations } from 'next-intl';
import { useAuth } from '@/src/context/AuthContext';
import {
  getMissionCards,
  missionProgressKey,
  type MissionView,
} from '@/src/services/missionService';
import { isMissionOpen } from '@/src/services/missionSchedule';
import lockedImg from '@/public/images/profile/mission/lockd-mission.webp';

interface IMissionProps {
  setIsGameOpen: (value: boolean) => void;
  setGameLink: (link: string) => void;
}

const Missions = ({ setIsGameOpen, setGameLink }: IMissionProps) => {
  // const tn = useTranslations('nav');
  const { profile } = useAuth();
  const locale = useLocale();

  const serchParams = useSearchParams();
  const router = useRouter();
  const activeCardId = serchParams.get('missionId');

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
    <div className={`${styles.contentWrapper} custom-scroll`}>
      {activeCardId ? (
        <div className="relative h-full w-[80%]">
          <Mission setIsGameOpen={setIsGameOpen} setGameLink={setGameLink} />
        </div>
      ) : (
        <>
          {/* <Heading title={tn('missions')} /> */}
          <ul className={`${styles.tabletList} custom-scroll`}>
            {missions.map((item) => {
              // Scheduled for later: the card is shown closed, and the cover
              // gives way to the padlock rather than teasing the subject.
              const isUpcoming = !isMissionOpen(item.opensAt);

              return (
                <li key={item.cardId} className={`${styles.tabletItem}`}>
                  <Card
                    status
                    image={isUpcoming ? lockedImg : (item.icon ?? '')}
                    title={item.title}
                    level={item.level}
                    xp={item.xp}
                    setActiveMission={() =>
                      router.push(`/?activeTab=mission&missionId=${item.cardId}`)
                    }
                    label="level"
                    type={item.type}
                    opensAt={item.opensAt}
                    // The bonus card has no score of its own: it shares the
                    // mission row, and the handout is not graded in the game.
                    isDone={
                      item.type === 'current' &&
                      profile?.missions?.[missionProgressKey(item.id)]?.status === 'done'
                    }
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Missions;
