'use client';

import { useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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

import { MAX_XP } from '@/src/config/gameConfig';

const tabs = [
  { id: 'profile', label: 'Profile', icon: CosmonautIcon },
  { id: 'mission', label: 'Mission', icon: MoonFlagIcon },
  { id: 'tests', label: 'Tests', icon: RocketIcon },
  { id: 'leader', label: 'Leader', icon: StarMoveIcon },
];

const SLIDE_IDS = tabs.map((t) => t.id);

export const MobileProfile = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSlide = Math.max(0, SLIDE_IDS.indexOf(searchParams.get('activeSlide') ?? ''));
  const [activeIndex, setActiveIndex] = useState(initialSlide);
  const swiperRef = useRef<SwiperType | null>(null);
  const { profile, nickname: authNickname } = useAuth();

  const total = profile?.leaderboard?.total ?? 0;
  const nickname = authNickname ?? '';

  const updateURL = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('activeSlide', SLIDE_IDS[index]);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    updateURL(swiper.activeIndex);
  };

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    swiperRef.current?.slideTo(index);
    updateURL(index);
  };

  const progress = MAX_XP > 0 ? Math.min((total / MAX_XP) * 100, 100) : 0;

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
            {total}/{MAX_XP} XP
          </span>
        </div>
      </div>

      {/* Swipeable Content */}
      <div className={styles.contentArea}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          initialSlide={initialSlide}
          spaceBetween={0}
          slidesPerView={1}
          className={styles.swiper}
        >
          <SwiperSlide className={styles.slide}>
            <MobileSkin />
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
