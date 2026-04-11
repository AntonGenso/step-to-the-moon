// import EarthIcon from '@/public/images/svg/earth.svg';
// import SunhIcon from '@/public/images/svg/sun.svg';
import Rockety from '@/public/images/profile/mission/mission-rocket.webp';
// import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
// import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg';
// import SolarSystem from '@/public/images/svg/mssion/solar_system.svg';
// import MoonRover from '@/public/images/svg/mssion/moon_rover.svg';

import defaultImage from '@/public/images/profile/mission/test-stars.webp';

import core from '@/public/images/facts/earth/earth-1.webp';
import mantle from '@/public/images/facts/earth/earth-2.webp';
import outerCore from '@/public/images/facts/earth/earth-3.webp';
import land from '@/public/images/facts/earth/earth-4.webp';
import { StaticImageData } from 'next/image';
import {
  atmosphereFacts,
  canyonFlightFacts,
  moonRoverBonusFacts,
  moonRoverFacts,
  rocketryFacts,
  rocketyBonusFacts,
  solarSystemFacts,
  sunFacts,
} from './factsData';

export interface IMissionData {
  id: number;
  icon: StaticImageData | string;
  title: string;
  level: number;
  description: string;
  isAtive: boolean;
  gameLink: string;
  videoLink: string;
  fileLink?: string;
  facts: {
    id: number;
    title: string;
    key?: string;
    description: string;
    image: string | StaticImageData;
  }[];
  type: 'current' | 'bonus';
}

export const missionData: IMissionData[] = [
  /* ── Active missions (demo) ── */
  {
    id: 0,
    icon: defaultImage,
    title: 'Earth',
    level: 1,
    isAtive: true,
    gameLink: 'https://allelf.github.io/MMOArcade/',
    description:
      'This is a description for mission sun at level 1. It provides additional context and details about the mission.',
    videoLink: '/video/mission/earth/earth.mp4',
    facts: [
      {
        id: 1,
        title: 'Земная кора',
        key: 'earth.crust',
        description:
          'Земная кора — самый тонкий слой Земли, как кожура яблока. Состоит из огромных кусков, которые двигаются и вызывают землетрясения.',
        image: core.src,
      },
      {
        id: 2,
        title: 'Мантия',
        key: 'earth.mantle',
        description:
          'Мантия — горячий густой слой. Его движение двигает континенты и вызывает извержения вулканов.',
        image: mantle.src,
      },
      {
        id: 3,
        title: 'Внешнее ядро',
        key: 'earth.outerCore',
        description:
          'Внешнее ядро — жидкий металл вокруг внутреннего ядра. Именно он создаёт магнитный щит Земли.',
        image: outerCore.src,
      },
      {
        id: 4,
        title: 'Внутреннее ядро',
        key: 'earth.innerCore',
        description:
          'Внутреннее ядро — твёрдый металлический шар в центре Земли, раскалённый до 6000°С.',
        image: land.src,
      },
    ],
    type: 'current',
  },
  {
    id: 1,
    icon: Rockety,
    title: 'Rocketry',
    level: 2,
    isAtive: true,
    gameLink: 'https://allelf.github.io/PuzzleWebGL/',
    description:
      'This is a description for mission sun at level 5. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '',
    facts: rocketryFacts.facts,
    type: 'current',
  },
  {
    id: 2,
    icon: defaultImage,
    title: 'Moon Rover',
    level: 3,
    isAtive: true,
    gameLink: 'https://antongenso.github.io/moon-rover/?uid=USER_ID&api=https://your-platform.com',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    facts: moonRoverFacts.facts,
    type: 'current',
  },

  /* ── Inactive missions ── */
  {
    id: 3,
    icon: defaultImage,
    title: 'Solar System',
    level: 4,
    isAtive: false,
    gameLink: 'https://allelf.github.io/CosmoTourist2DGame/',
    description:
      'This is a description for mission sun at level 2. It provides additional context and details about the mission.',
    videoLink: '/video/mission/earth/earth.mp4',
    facts: solarSystemFacts.facts,
    type: 'current',
  },
  {
    id: 4,
    icon: defaultImage,
    title: 'Earth (Bonus)',
    level: 5,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 3. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/earth_model.pdf',
    facts: [],
    type: 'bonus',
  },
  {
    id: 5,
    icon: defaultImage,
    title: 'Canyon Flight',
    level: 6,
    isAtive: false,
    gameLink: 'https://allelf.github.io/FlyPlane/',
    description:
      'This is a description for mission sun at level 4. It provides additional context and details about the mission.',
    videoLink: '',
    facts: canyonFlightFacts.facts,
    type: 'current',
  },
  {
    id: 6,
    icon: defaultImage,
    title: 'Rocketry (Bonus)',
    level: 7,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/rocket_instruction.pdf',
    facts: rocketyBonusFacts.facts,
    type: 'bonus',
  },
  {
    id: 7,
    icon: defaultImage,
    title: 'Sun',
    level: 8,
    isAtive: false,
    gameLink: 'https://ziyoda-1995.github.io/Game_jame/Rus%20ideal%20game/index.html',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    facts: sunFacts.facts,
    type: 'current',
  },
  {
    id: 8,
    icon: defaultImage,
    title: 'Moon Rover (Bonus)',
    level: 9,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/Instrukciya_lunohoda.pdf',
    facts: moonRoverBonusFacts.facts,
    type: 'bonus',
  },
  {
    id: 9,
    icon: defaultImage,
    title: 'Atmosphere Game',
    level: 10,
    isAtive: false,
    gameLink: 'https://allelf.github.io/Cosmo2D/',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    facts: atmosphereFacts.facts,
    type: 'current',
  },
];
