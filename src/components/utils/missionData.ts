import EarthIcon from '@/public/images/svg/earth.svg';
import SunhIcon from '@/public/images/svg/sun.svg';
import Rockety from '@/public/images/svg/mssion/rocketry.svg';
import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg';
import SolarSystem from '@/public/images/svg/mssion/solar_system.svg';
import MoonRover from '@/public/images/svg/mssion/moon_rover.svg';

import core from '@/public/images/profile/mission/land.webp';
import land from '@/public/images/profile/mission/crust.webp';
import outerCore from '@/public/images/profile/mission/outercore.webp';
import mantle from '@/public/images/profile/mission/mantel.webp';
import { ElementType } from 'react';
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
  icon: ElementType;
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
    description: string;
    image: string | StaticImageData;
  }[];
  type: 'current' | 'bonus';
}

export const missionData: IMissionData[] = [
  /* ── Active missions (demo) ── */
  {
    id: 0,
    icon: EarthIcon,
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
        title: 'Fact 1',
        description:
          'Земная кора — тонкая оболочка всего от 5 до 70 км, на которой живут люди, растения, животные и т.д.',
        image: core.src,
      },
      {
        id: 2,
        title: 'Fact 2',
        description:
          ' Мантия — горячий слой густой породы, который движет горы и вызывает извержения вулканов.',
        image: mantle.src,
      },
      {
        id: 3,
        title: 'Fact 3',
        description:
          'Внешнее ядро — жидкий слой железа, который течёт и усиливает магнитное поле Земли, как гигантский генератор.',
        image: outerCore.src,
      },
      {
        id: 4,
        title: 'Fact 4',
        description:
          'Ядро — твёрдый металлический шар в центре Земли, горячий (до 6000°C) и создающий магнитное поле, защищающее планету от космических лучей.',
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
    icon: MoonRover,
    title: 'Moon Rover',
    level: 3,
    isAtive: true,
    gameLink: '/games/void-breakers/Void%20Breakers.html',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    facts: moonRoverFacts.facts,
    type: 'current',
  },

  /* ── Inactive missions ── */
  {
    id: 3,
    icon: SolarSystem,
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
    icon: EarthIcon,
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
    icon: CanyonFlight,
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
    icon: Rockety,
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
    icon: SunhIcon,
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
    icon: MoonRover,
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
    icon: Atmosphere,
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
