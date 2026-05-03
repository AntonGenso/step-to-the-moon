import EarthIcon from '@/public/images/profile/mission/earth-image.webp';
import SunhIcon from '@/public/images/profile/mission/solar-image.webp';
import Rockety from '@/public/images/profile/mission/mission-rocket.webp';
import AtmosphereIcon from '@/public/images/profile/mission/atmosphere-image.webp';
import CanyonFlightIcon from '@/public/images/profile/mission/canyon-image.webp';
import SolarSystemIcon from '@/public/images/profile/mission/solar-system-image.webp';
import MoonRoverIcon from '@/public/images/profile/mission/moon-rover-image.webp';
import GalaxyIcon from '@/public/images/profile/mission/galaxy-image.webp';
import BlackHoleIcon from '@/public/images/profile/mission/black-hole-image.webp';
import SatelliteIcon from '@/public/images/profile/mission/satellita-image.webp';

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
  /* ── 1. Earth ── */
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

  /* ── 2. Earth (bonus) ── */
  {
    id: 1,
    icon: EarthIcon,
    title: 'Earth (Bonus)',
    level: 2,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 2. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/earth_model.pdf',
    facts: [],
    type: 'bonus',
  },

  /* ── 3. Atmosphere ── */
  {
    id: 2,
    icon: AtmosphereIcon,
    title: 'Atmosphere',
    level: 3,
    isAtive: false,
    gameLink: 'https://allelf.github.io/Cosmo2D/',
    description:
      'This is a description for mission sun at level 3. It provides additional context and details about the mission.',
    videoLink: '',
    facts: atmosphereFacts.facts,
    type: 'current',
  },

  /* ── 4. Atmosphere (bonus) ── */
  {
    id: 3,
    icon: AtmosphereIcon,
    title: 'Atmosphere (Bonus)',
    level: 4,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 4. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 5. Canyon Flight ── */
  {
    id: 4,
    icon: CanyonFlightIcon,
    title: 'Canyon Flight',
    level: 5,
    isAtive: false,
    gameLink: 'https://allelf.github.io/FlyPlane/',
    description:
      'This is a description for mission sun at level 5. It provides additional context and details about the mission.',
    videoLink: '',
    facts: canyonFlightFacts.facts,
    type: 'current',
  },

  /* ── 6. Telescope ── */
  {
    id: 5,
    icon: defaultImage,
    title: 'Telescope',
    level: 6,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 6. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'current',
  },

  /* ── 7. Telescope (bonus) ── */
  {
    id: 6,
    icon: defaultImage,
    title: 'Telescope (Bonus)',
    level: 7,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 7. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 8. Satellite ── */
  {
    id: 7,
    icon: SatelliteIcon,
    title: 'Satellite',
    level: 8,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 8. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'current',
  },

  /* ── 9. Satellite (bonus) ── */
  {
    id: 8,
    icon: SatelliteIcon,
    title: 'Satellite (Bonus)',
    level: 9,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 9. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 10. Rocket ── */
  {
    id: 9,
    icon: Rockety,
    title: 'Rocket',
    level: 10,
    isAtive: true,
    gameLink: 'https://allelf.github.io/PuzzleWebGL/',
    description:
      'This is a description for mission sun at level 10. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '',
    facts: rocketryFacts.facts,
    type: 'current',
  },

  /* ── 11. Rocket (bonus) ── */
  {
    id: 10,
    icon: Rockety,
    title: 'Rocket (Bonus)',
    level: 11,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 11. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/rocket_instruction.pdf',
    facts: rocketyBonusFacts.facts,
    type: 'bonus',
  },

  /* ── 12. Solar System ── */
  {
    id: 11,
    icon: SolarSystemIcon,
    title: 'Solar System',
    level: 12,
    isAtive: false,
    gameLink: 'https://allelf.github.io/CosmoTourist2DGame/',
    description:
      'This is a description for mission sun at level 12. It provides additional context and details about the mission.',
    videoLink: '/video/mission/earth/earth.mp4',
    facts: solarSystemFacts.facts,
    type: 'current',
  },

  /* ── 13. Solar System (bonus) ── */
  {
    id: 12,
    icon: SolarSystemIcon,
    title: 'Solar System (Bonus)',
    level: 13,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 13. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 14. Moon Rover ── */
  {
    id: 13,
    icon: MoonRoverIcon,
    title: 'Moon Rover',
    level: 14,
    isAtive: true,
    gameLink: 'https://antongenso.github.io/moon-rover/?uid=USER_ID&api=https://your-platform.com',
    description:
      'This is a description for mission sun at level 14. It provides additional context and details about the mission.',
    videoLink: '',
    facts: moonRoverFacts.facts,
    type: 'current',
  },

  /* ── 15. Moon Rover (bonus) ── */
  {
    id: 14,
    icon: MoonRoverIcon,
    title: 'Moon Rover (Bonus)',
    level: 15,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 15. It provides additional context and details about the mission.',
    videoLink: '',
    fileLink: '/files/mission/Instrukciya_lunohoda.pdf',
    facts: moonRoverBonusFacts.facts,
    type: 'bonus',
  },

  /* ── 16. Comets & Asteroids ── */
  {
    id: 15,
    icon: SunhIcon,
    title: 'Comets & Asteroids',
    level: 16,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 16. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'current',
  },

  /* ── 17. Comets & Asteroids (bonus) ── */
  {
    id: 16,
    icon: SunhIcon,
    title: 'Comets & Asteroids (Bonus)',
    level: 17,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 17. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 18. Black Hole ── */
  {
    id: 17,
    icon: BlackHoleIcon,
    title: 'Black Hole',
    level: 18,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 18. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'current',
  },

  /* ── 19. Black Hole (bonus) ── */
  {
    id: 18,
    icon: BlackHoleIcon,
    title: 'Black Hole (Bonus)',
    level: 19,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 19. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 20. Galaxy (bonus) ── */
  {
    id: 19,
    icon: GalaxyIcon,
    title: 'Galaxy (Bonus)',
    level: 20,
    isAtive: false,
    gameLink: '',
    description:
      'This is a description for mission sun at level 20. It provides additional context and details about the mission.',
    videoLink: '',
    facts: [],
    type: 'bonus',
  },

  /* ── 21. The Sun (bonus) ── */
  {
    id: 20,
    icon: SunhIcon,
    title: 'The Sun (Bonus)',
    level: 21,
    isAtive: false,
    gameLink: 'https://ziyoda-1995.github.io/Game_jame/Rus%20ideal%20game/index.html',
    description:
      'This is a description for mission sun at level 21. It provides additional context and details about the mission.',
    videoLink: '',
    facts: sunFacts.facts,
    type: 'bonus',
  },
];
