'use client';

import { useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/src/i18n/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import styles from './MobileProfile.module.scss';
import { MobileSkin } from './MobileSkin';
import { MobileMission } from './MobileMission';
import { MobileTests } from './MobileTests';
import { MobileLeaderboard } from './MobileLeaderboard';
import { MobileBottomNav, tabs } from './MobileBottomNav';
import { useAuth } from '@/src/context/AuthContext';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

import FullCosmonautIcon from '@/public/images/svg/mobile/other/full-cosmonaut.svg';

import { MAX_XP } from '@/src/config/gameConfig';
import { useTranslations } from 'next-intl';

const SLIDE_IDS = tabs.map((t) => t.id);

export const MobileProfile = () => {
  const tc = useTranslations('common');
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
      {/* Username + Language Switcher */}
      <div className={styles.topBar}>
        <div className={styles.topBarSpacer} />
        <div className={styles.username}>{nickname}</div>
        <div className={styles.topBarRight}>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Progress Header */}
      <div className={styles.progressHeader}>
        <div className={styles.progressPill}>
          <div className={styles.pillInner}>
            <div className={styles.avatarCircle}>
              <FullCosmonautIcon className={styles.avatarIcon} />
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.scoreText}>
              {total}/{MAX_XP} {tc('xp')}
            </span>
          </div>
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
      <MobileBottomNav activeTab={SLIDE_IDS[activeIndex]} onTabClick={handleTabClick} />
    </div>
  );
};
