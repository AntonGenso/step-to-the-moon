'use client';

import { useState } from 'react';
import Header from '@/src/components/header/header';
import { AdminNav, AdminTab } from './AdminNav';
import { AdminMissions } from './AdminMissions';
import { AdminMain } from './AdminMain';
import styles from './AdminView.module.scss';

export const AdminView = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('main');

  return (
    <div className={styles.page}>
      <Header />
      <div className={`${styles.content} custom-scroll`}>
        <AdminNav activeTab={activeTab} onChange={setActiveTab} />
        {activeTab === 'main' && <AdminMain />}
        {activeTab === 'missions' && <AdminMissions />}
      </div>
    </div>
  );
};
