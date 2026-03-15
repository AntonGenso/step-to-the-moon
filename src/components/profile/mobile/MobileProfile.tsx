'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import styles from './MobileProfile.module.scss';
import { MobileSkin } from './MobileSkin';
import { MobileLeaderboard } from './MobileLeaderboard';

import ProfileIcon from '@/public/images/profile/svg/profile.svg';
import ProfileActiveIcon from '@/public/images/profile/svg/profile-active.svg';
import LeaderIcon from '@/public/images/profile/svg/leader.svg';
import LeaderActiveIcon from '@/public/images/profile/svg/leader-active.svg';

const personData = {
  name: 'laborlis',
  points: 221,
  totalPoints: 500,
  place: 221,
  skin: {
    hair: '/images/profile/hair.png',
    costum: '/images/profile/costum.png',
  },
};

const tabs = [
  { id: 'profile', label: 'Profile', icon: ProfileIcon, activeIcon: ProfileActiveIcon },
  { id: 'leader', label: 'Board', icon: LeaderIcon, activeIcon: LeaderActiveIcon },
];

export const MobileProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
  };

  const progress = Math.min((personData.points / personData.totalPoints) * 100, 100);

  return (
    <div className={styles.mobileProfile}>
      {/* Progress Header */}
      <div className={styles.progressHeader}>
        <div className={styles.avatarCircle} />
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className={styles.progressBadge}>
          {personData.points}/{personData.totalPoints}
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
            <MobileSkin data={personData} />
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
          const Icon = isActive ? tab.activeIcon : tab.icon;
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
