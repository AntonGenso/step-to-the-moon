import ProfileIcon from '@/public/images/profile/svg/profile.svg'
import ProfileActiveIcon from '@/public/images/profile/svg/profile-active.svg'
import DiaryIcon from '@/public/images/profile/svg/diary.svg'
import DiaryActiveIcon from '@/public/images/profile/svg/diary-activesvg.svg'
import MissionIcon from '@/public/images/profile/svg/mission.svg'
import MissionActiveIcon from '@/public/images/profile/svg/mission-active.svg'
import TestIcon from '@/public/images/profile/svg/test.svg'
import TestActiveIcon from '@/public/images/profile/svg/test-active.svg'
import LeaderIcon from '@/public/images/profile/svg/leader.svg'
import LeaderActiveIcon from '@/public/images/profile/svg/leader-active.svg'
import { ElementType } from 'react'

interface ITabletButton {
  id: number
  icon: ElementType
  activeIcon: ElementType
  title: string
  labelKey: string
}

export const tabletButtons: ITabletButton[] = [
  {
    id: 1,
    icon: MissionIcon,
    activeIcon: MissionActiveIcon,
    title: 'mission',
    labelKey: 'missions',
  },
  {
    id: 0,
    icon: ProfileIcon,
    activeIcon: ProfileActiveIcon,
    title: 'profile',
    labelKey: 'profile',
  },
  {
    id: 2,
    icon: DiaryIcon,
    activeIcon: DiaryActiveIcon,
    title: 'diary',
    labelKey: 'diary',
  },
  {
    id: 3,
    icon: TestIcon,
    activeIcon: TestActiveIcon,
    title: 'test',
    labelKey: 'tests',
  },
  {
    id: 4,
    icon: LeaderIcon,
    activeIcon: LeaderActiveIcon,
    title: 'leader',
    labelKey: 'leaderboard',
  },
]
