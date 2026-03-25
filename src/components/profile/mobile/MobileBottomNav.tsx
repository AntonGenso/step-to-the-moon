'use client';

import { useRouter } from 'next/navigation';
import styles from './MobileBottomNav.module.scss';

import CosmonautIcon from '@/public/images/svg/mobile/navBar/cosmonaut.svg';
import MoonFlagIcon from '@/public/images/svg/mobile/navBar/moon-flag.svg';
import RocketIcon from '@/public/images/svg/mobile/navBar/rocket.svg';
import StarMoveIcon from '@/public/images/svg/mobile/navBar/star-move.svg';

const tabs = [
  { id: 'profile', label: 'Profile', icon: CosmonautIcon },
  { id: 'mission', label: 'Mission', icon: MoonFlagIcon },
  { id: 'tests', label: 'Tests', icon: RocketIcon },
  { id: 'leader', label: 'Leader', icon: StarMoveIcon },
];

interface MobileBottomNavProps {
  activeTab?: string;
  onTabClick?: (index: number) => void;
}

export const MobileBottomNav = ({ activeTab, onTabClick }: MobileBottomNavProps) => {
  const router = useRouter();

  const handleClick = (index: number) => {
    if (onTabClick) {
      onTabClick(index);
    } else {
      router.push(`/?activeSlide=${tabs[index].id}`);
    }
  };

  return (
    <nav className={styles.bottomNav}>
      <div className="flex w-full justify-evenly rounded-[99999px] bg-gradient-to-tr from-[#030505] to-[#0F2D37]">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => handleClick(index)}
            >
              <Icon className={styles.navIcon} />
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export { tabs };
