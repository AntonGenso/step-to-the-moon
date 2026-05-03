'use client';

import styles from './Tablet.module.scss';
import React, { useState, useEffect } from 'react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { tabletButtons } from './tabletButtons/tabletButtons';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/src/i18n/navigation';
import Test from '../tests/Tests';
import Leaderboard from '../leaderboard/leaderboard';
import Missions from '../missions/Missions';
import { Skin } from '../../skin/Skin';
import { useAuth } from '@/src/context/AuthContext';
import { MAX_XP } from '@/src/config/gameConfig';
import FullCosmonautIcon from '@/public/images/svg/mobile/other/full-cosmonaut.svg';
import ExitIcon from '@/public/images/header/exit-icon.svg';
import { useTranslations } from 'next-intl';

export const Tablet = () => {
  const { nickname, profile, logout, refreshProfile } = useAuth();
  const router = useRouter();
  const t = useTranslations('common');
  const tn = useTranslations('nav');
  const searchParams = useSearchParams();

  const activeTabParam = searchParams.get('activeTab');
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameLink, setGameLink] = useState('');
  const [activeTab, setActiveTab] = useState(activeTabParam || 'mission');

  const total = profile?.leaderboard?.total ?? 0;
  const progress = MAX_XP > 0 ? Math.min((total / MAX_XP) * 100, 100) : 0;

  const handleSetActiveParam = (value: string) => {
    const params = new URLSearchParams();
    params.set('activeTab', value);
    router.replace(`/?${params.toString()}`, { scroll: false });
    setActiveTab(value);
  };

  // Listen for score submissions from game iframes via postMessage
  useEffect(() => {
    if (!isGameOpen) return;

    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type !== 'SUBMIT_SCORE') return;

      const { score } = event.data as { score: unknown };
      if (typeof score !== 'number' || score < 0) return;

      const missionId = searchParams.get('missionId');
      if (!missionId) return;

      await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission: `mission_${missionId}`, score }),
      });

      await refreshProfile();
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isGameOpen, searchParams, refreshProfile]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (isGameOpen) {
    return (
      <div className={styles.gameOverlay}>
        <button className={styles.gameCloseBtn} onClick={() => setIsGameOpen(false)}>
          {t('close')}
        </button>
        <iframe src={gameLink} className={styles.gameIframe} allowFullScreen />
      </div>
    );
  }

  return (
    <div className={styles.desktopLayout}>
      <Root
        value={activeTab}
        onValueChange={(value) => handleSetActiveParam(value)}
        className={styles.tabRoot}
      >
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <div className={styles.avatarCircle}>
              <FullCosmonautIcon className={styles.avatarIcon} />
            </div>
            <span className={styles.nickname}>{nickname ?? ''}</span>
            <div className={styles.progressWrapper}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <span className={styles.progressText}>{total}/{MAX_XP} {t('xp')}</span>
            </div>
          </div>

          <List className={styles.navList}>
            {tabletButtons.map((item) => {
              const isActive = activeTab === item.title;
              const Icon = isActive ? item.activeIcon : item.icon;
              return (
                <Trigger
                  key={item.id}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  value={item.title.toLowerCase()}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{tn(item.labelKey)}</span>
                </Trigger>
              );
            })}
          </List>

          <button className={styles.logoutBtn} onClick={handleLogout}>
            <ExitIcon className={styles.logoutIcon} />
            <span>{t('logout')}</span>
          </button>
        </aside>

        {/* Content */}
        <main className={styles.contentArea}>
          <Content value="mission" className={styles.tabContent}>
            <Missions setIsGameOpen={setIsGameOpen} setGameLink={setGameLink} />
          </Content>
          <Content tabIndex={undefined} value="profile" className={styles.tabContent}>
            <Skin />
          </Content>
<Content value="test" className={styles.tabContent}>
            <Test />
          </Content>
          <Content value="leader" className={styles.tabContent}>
            <Leaderboard />
          </Content>
        </main>
      </Root>
    </div>
  );
};
