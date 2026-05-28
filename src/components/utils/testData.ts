import { StaticImageData } from 'next/image';

import earthImage from '@/public/images/profile/mission/earth-image.webp';
import atmosphereImage from '@/public/images/profile/mission/atmosphere-image.webp';
import canyonImage from '@/public/images/profile/mission/canyon-image.webp';
import telescopeImage from '@/public/images/profile/mission/telescope-image.webp';
import sateliteImage from '@/public/images/profile/mission/satellita-image.webp';
import commetsImage from '@/public/images/profile/mission/comets-image.webp';
import blackHoleImage from '@/public/images/profile/mission/black-hole-image.webp';
import rocketyImage from '@/public/images/profile/mission/mission-rocket.webp';
import solarImage from '@/public/images/profile/mission/solar-system-image.webp';
import moonRoverImage from '@/public/images/profile/mission/moon-rover-image.webp';

export interface ITestBase {
  id: number;
  icon: StaticImageData;
  xp: number;
  isAtive: boolean;
  questionCount: number;
  answers: string[];
}

export const testData: ITestBase[] = [
  {
    id: 1,
    icon: earthImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['C', 'B', 'B', 'B', 'B'],
  },
  {
    id: 2,
    icon: atmosphereImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'B', 'B', 'C'],
  },
  {
    id: 3,
    icon: canyonImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'A', 'C', 'C'],
  },
  {
    id: 4,
    icon: telescopeImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['A', 'C', 'B', 'B', 'B'],
  },
  {
    id: 5,
    icon: sateliteImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'C', 'C', 'C', 'B'],
  },
  {
    id: 6,
    icon: rocketyImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['A', 'B', 'C', 'B', 'B'],
  },
  {
    id: 7,
    icon: solarImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['C', 'C', 'B', 'C', 'D'],
  },
  {
    id: 8,
    icon: moonRoverImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['A', 'C', 'B', 'B', 'B'],
  },
  {
    id: 9,
    icon: commetsImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'B', 'C', 'C'],
  },
  {
    id: 10,
    icon: blackHoleImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'B', 'B', 'C'],
  },
];
