'use client';

import Image from 'next/image';
import styles from './Tablet.module.scss';
import tabletBg from '@/public/images/profile/tablet_view.webp';
import React, { useState } from 'react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { tabletButtons } from './tabletButtons/tabletButtons';
import { Book } from './book/Book';
import { useRouter, useSearchParams } from 'next/navigation';
import Test from '../tests/Tests';
import Leaderboard from '../leaderboard/leaderboard';
import Missions from '../missions/Missions';
import CloseBtn from '@/public/images/svg/closeBtn.svg';
import { Skin } from '../../skin/Skin';
import { useAuth } from '@/src/context/AuthContext';
import { headSkin, suit } from '@/src/utils/skinData';

export const Tablet = () => {
  const { nickname, profile } = useAuth();

  const skinHeadId = profile?.skin?.headId ?? 0;
  const skinSuitId = profile?.skin?.suitId ?? 0;
  const personData = {
    name: nickname ?? '',
    points: profile?.leaderboard?.total ?? 0,
    place: 0,
    avatar: '',
    skin: {
      hair: headSkin.find((h) => h.id === skinHeadId)?.name ?? headSkin[0].name,
      costum: suit.find((s) => s.id === skinSuitId)?.name ?? suit[0].name,
    },
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get('activeTab');
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameLink, setGameLink] = useState('');

  const [activeTab, setActiveTab] = useState(activeTabParam || 'mission');

  const handleSetActiveParam = (value: string) => {
    const params = new URLSearchParams();
    params.set('activeTab', value);
    router.replace(`/profile?${params.toString()}`, { scroll: false });
    setActiveTab(value);
  };

  return (
    <>
      {isGameOpen ? (
        <div className="m-auto h-[700px] w-[1100px] p-[20px]">
          <button
            type="button"
            className="absolute top-[20px] right-[60px]"
            onClick={() => setIsGameOpen(false)}
          >
            <CloseBtn className="h-auto w-[50px]" />
          </button>
          <iframe src={gameLink} className="h-full w-full border-none" allowFullScreen />
        </div>
      ) : (
        <div className={styles.tablet}>
          <Root
            value={activeTab}
            onValueChange={(value) => handleSetActiveParam(value)}
            className="h-full"
          >
            <Content value="mission" className="h-full">
              <Missions setIsGameOpen={setIsGameOpen} setGameLink={setGameLink} />
            </Content>
            <Content tabIndex={undefined} value="profile" className="h-full w-full">
              <Skin data={personData} />
            </Content>
            <Content value="diary" className={`h-full w-full ${styles.diary}`}>
              <Book />
            </Content>
            <Content value="test" className="relative h-full w-full">
              <Test />
            </Content>
            <Content value="leader">
              <Leaderboard />
            </Content>

            <div>
              <List className={styles.tabletBtnWrapper}>
                {tabletButtons.map((item) => {
                  const Icon = item.icon;
                  const ActiveIcon = item.activeIcon;

                  return (
                    <Trigger
                      key={item.id}
                      className={styles.tabletBtn}
                      value={item.title.toLowerCase()}
                    >
                      {activeTab === item.title ? (
                        <ActiveIcon className={styles.icon} />
                      ) : (
                        <Icon className={styles.icon} />
                      )}
                    </Trigger>
                  );
                })}
              </List>
            </div>

            <Image src={tabletBg} alt="" fill className={styles.bgImage} quality={100} />
          </Root>
        </div>
      )}
    </>
  );
};
