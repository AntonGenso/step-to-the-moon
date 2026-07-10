import ProfileIcon from '@/public/images/svg/sidebar/home-icon.svg';
// import ProfileActiveIcon from '@/public/images/profile/svg/profile-active.svg';
import MissionIcon from '@/public/images/svg/sidebar/joystick-icon.svg';
// import MissionActiveIcon from '@/public/images/profile/svg/mission-active.svg';
import TestIcon from '@/public/images/svg/sidebar/book-icon.svg';
// import TestActiveIcon from '@/public/images/profile/svg/test-active.svg';
import LeaderIcon from '@/public/images/svg/sidebar/burger-menu-icon.svg';
// import LeaderActiveIcon from '@/public/images/profile/svg/leader-active.svg';
import { ElementType } from 'react';

interface ITabletButton {
  id: number;
  icon: ElementType;
  activeIcon: ElementType;
  title: string;
  labelKey: string;
}

export const tabletButtons: ITabletButton[] = [
  {
    id: 0,
    icon: ProfileIcon,
    activeIcon: ProfileIcon,
    title: 'profile',
    labelKey: 'profile',
  },
  {
    id: 1,
    icon: MissionIcon,
    activeIcon: MissionIcon,
    title: 'mission',
    labelKey: 'missions',
  },
  {
    id: 3,
    icon: TestIcon,
    activeIcon: TestIcon,
    title: 'test',
    labelKey: 'tests',
  },
  {
    id: 4,
    icon: LeaderIcon,
    activeIcon: LeaderIcon,
    title: 'leader',
    labelKey: 'leaderboard',
  },
];
