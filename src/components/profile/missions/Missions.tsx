'use client';

import styles from './Mission.module.scss';
import { IMissionData, missionData } from '../../utils/missionData';
import { Card } from '@/src/uikit/card/Card';
import { useCallback, useEffect, useState } from 'react';
import { Mission } from '../mission/Mission';
import { useRouter, useSearchParams } from 'next/navigation';
import { Heading } from '@/src/uikit/heading/Heading';
import BackIcon from '@/public/images/svg/back.svg';

interface IMissionProps {
  setIsGameOpen: (value: boolean) => void;
  setGameLink: (link: string) => void;
}

const Missions = ({ setIsGameOpen, setGameLink }: IMissionProps) => {
  const [activeMission, setActiveMission] = useState<IMissionData | null>(null);

  const serchParams = useSearchParams();
  const router = useRouter();
  const mission = serchParams.get('missionId');

  const sortedMissions = [...missionData].sort((a, b) => a.id - b.id);

  const handleActiveMision = useCallback(
    (value: number) => {
      const mission = sortedMissions.find((item) => item.id === value);
      if (mission) {
        setActiveMission(mission);
        router.push(`/profile?activeTab=mission&missionId=${value}`);
      }
      return;
    },
    [router]
  );

  useEffect(() => {
    if (mission) {
      handleActiveMision(Number(mission));
    } else {
      setActiveMission(null);
    }
  }, [mission, handleActiveMision]);

  return (
    <div className={`${styles.contentWrapper} custom-scroll`}>
      {activeMission === null && !mission ? (
        <>
          <Heading title="Missions" />
          <ul className={`${styles.tabletList} custom-scroll`}>
            {sortedMissions.map((item) => (
              <li key={item.id} className={styles.tabletItem}>
                <Card
                  status={item.isAtive}
                  image={item.icon}
                  title={item.title}
                  level={item.level}
                  setActiveMission={() => handleActiveMision(item.id)}
                  label="level"
                />
              </li>
            ))}
          </ul>
        </>
      ) : activeMission ? (
        <div className="relative h-full w-full">
          <button
            type="button"
            onClick={() => router.push('/profile?activeTab=mission')}
            className={`${styles.backButton} absolute top-0 left-0 z-10 w-[5%] cursor-pointer`}
          >
            <BackIcon className="z-10" />
          </button>
          <Mission setIsGameOpen={setIsGameOpen} setGameLink={setGameLink} />
        </div>
      ) : null}
    </div>
  );
};

export default Missions;
