// import Earth from '@/public/images/svg/earth.svg';
// import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
// import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg';
// import Stars from '@/public/images/svg/mssion/stars.svg';
// import Moon from '@/public/images/svg/mssion/moon.svg';
// import Rocketry from '@/public/images/svg/mssion/rocketry.svg';
// import SolarSystem from '@/public/images/svg/mssion/solar_system.svg';
// import MoonRover from '@/public/images/svg/mssion/moon_rover.svg';
// import Saturn from '@/public/images/svg/mssion/saturn.svg';
// import Spacesuit from '@/public/images/svg/mssion/spacesuit.svg';
import { StaticImageData } from 'next/image';

import defaultImage from '@/public/images/profile/mission/test-stars.webp';

import earthImage from '@/public/images/profile/mission/earth-image.webp';
import atmosphereImage from '@/public/images/profile/mission/atmosphere-image.webp';
import canyonImage from '@/public/images/profile/mission/canyon-image.webp';
// import starsImage from '@/public/images/profile/mission/earth-image.webp';
// import moonImage from '@/public/images/profile/mission/earth-image.webp';
import rocketyImage from '@/public/images/profile/mission/mission-rocket.webp';
import solarImage from '@/public/images/profile/mission/solar-system-image.webp';
import moonRoverImage from '@/public/images/profile/mission/moon-rover-image.webp';
// import saturnImage from '@/public/images/profile/mission/earth-image.webp';
// import suitImage from '@/public/images/profile/mission/earth-image.webp';

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
    icon: defaultImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['A', 'C', 'B', 'B', 'B'],
  },
  {
    id: 5,
    icon: defaultImage,
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
    icon: defaultImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'B', 'C', 'C'],
  },
  {
    id: 10,
    icon: defaultImage,
    xp: 50,
    isAtive: true,
    questionCount: 5,
    answers: ['B', 'B', 'B', 'B', 'C'],
  },
];
