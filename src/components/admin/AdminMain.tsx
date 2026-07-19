'use client';

import { useAuth } from '@/src/context/AuthContext';
import { missionData } from '../utils/missionData';
import { AdminNextMission } from './AdminNextMission';
import { AdminLeaderboard } from './AdminLeaderboard';
import styles from './AdminMain.module.scss';

export const AdminMain = () => {
  const { profile } = useAuth();

  const sortedMissions = [...missionData].sort((a, b) => a.id - b.id);
  const isDone = (id: number) => profile?.missions?.[`mission_${id}`]?.status === 'done';

  /* Next mission = first unfinished one; previous = the last finished one before it. */
  const nextIndex = sortedMissions.findIndex((m) => !isDone(m.id));
  const nextMission = nextIndex === -1 ? undefined : sortedMissions[nextIndex];
  const previousMission =
    nextIndex > 0 ? sortedMissions[nextIndex - 1] : sortedMissions[sortedMissions.length - 1];

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <AdminNextMission
          mission={nextMission}
          previousMission={nextIndex === 0 ? undefined : previousMission}
        />
      </div>
      <AdminLeaderboard />
    </div>
  );
};
