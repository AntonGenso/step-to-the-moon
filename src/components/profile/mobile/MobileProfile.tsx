'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import styles from './MobileProfile.module.scss';
import { MobileSkin } from './MobileSkin';
import { MobileMission } from './MobileMission';
import { MobileTests } from './MobileTests';
import { MobileLeaderboard } from './MobileLeaderboard';
import { useAuth } from '@/src/context/AuthContext';

import FullCosmonautIcon from '@/public/images/svg/mobile/other/full-cosmonaut.svg';
import CosmonautIcon from '@/public/images/svg/mobile/navBar/cosmonaut.svg';
import MoonFlagIcon from '@/public/images/svg/mobile/navBar/moon-flag.svg';
import RocketIcon from '@/public/images/svg/mobile/navBar/rocket.svg';
import StarMoveIcon from '@/public/images/svg/mobile/navBar/star-move.svg';

const TOTAL_POINTS = 500;

const tabs = [
  { id: 'profile', label: 'Profile', icon: CosmonautIcon },
  { id: 'mission', label: 'Mission', icon: MoonFlagIcon },
  { id: 'tests', label: 'Tests', icon: RocketIcon },
  { id: 'leader', label: 'Leader', icon: StarMoveIcon },
];

export const MobileProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const { profile } = useAuth();

  const points = profile?.score ?? 0;
  const nickname = profile?.nickname ?? '';

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  const progress = Math.min((points / TOTAL_POINTS) * 100, 100);

  return (
    <div className={styles.mobileProfile}>
      {/* Username */}
      <div className={styles.username}>{nickname}</div>

      {/* Progress Header */}
      <div className={styles.progressHeader}>
        <div className={styles.progressPill}>
          <div className={styles.avatarCircle}>
            <FullCosmonautIcon className={styles.avatarIcon} />
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.scoreText}>
            {points}/{TOTAL_POINTS}
          </span>
        </div>
      </div>

      {/* Swipeable Content */}
      <div className={styles.contentArea}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          spaceBetween={0}
          slidesPerView={1}
          className={styles.swiper}
        >
          <SwiperSlide className={styles.slide}>
            <MobileSkin
              data={{
                name: nickname,
                skin: {
                  hair: '/images/profile/hair.png',
                  costum: '/images/profile/costum.png',
                },
              }}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <MobileMission />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <MobileTests />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <MobileLeaderboard />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <Icon className={styles.navIcon} />
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
