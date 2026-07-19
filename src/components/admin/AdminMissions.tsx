'use client';

import { useTranslations } from 'next-intl';
import { missionData } from '../utils/missionData';
import { AdminMissionCard } from './AdminMissionCard';
import styles from './AdminMissions.module.scss';

export const AdminMissions = () => {
  const ta = useTranslations('admin');
  const sortedMissions = [...missionData].sort((a, b) => a.id - b.id);

  return (
    <ul className={styles.list}>
      {sortedMissions.map((item) => (
        <li key={item.id} className={styles.item}>
          <AdminMissionCard
            status={item.isAtive}
            image={item.icon}
            title={item.title}
            level={item.level}
            xp={item.xp}
            label="test"
            type={item.type}
            isDone
            actionLabel={ta('startLesson')}
          />
        </li>
      ))}
    </ul>
  );
};
