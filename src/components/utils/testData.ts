// src/utils/testData.ts
import Earth from '@/public/images/svg/earth.svg';
import Sun from '@/public/images/svg/sun.svg';
// import Star from '@/public/images/svg/mssion/stars.svg';
import Rocketry from '@/public/images/svg/mssion/rocketry.svg';
// import Spacesuit from '@/public/images/svg/mssion/spacesuit.svg';
import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
// import Moon from '@/public/images/svg/mssion/moon.svg';
// import Saturt from '@/public/images/svg/mssion/saturn.svg';
import SolarSystem from '@/public/images/svg/mssion/solar_system.svg'
import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg'
import MoonRover from '@/public/images/svg/mssion/moon_rover.svg'



export interface ITest {
  id: number;
  title: string;
  icon: any;
  questions: {
    question: string;
    options: Record<string, string>;
    answer: string;
  }[];
}

export const testData: ITest[] = [
    {
    id: 1,
    title: 'The Solar System',
    icon: SolarSystem,
    questions: [
      {
        question: 'Как называется самый центр Земли?',
        options: { A: 'Мантия', B: 'Ядро', C: 'Кора', D: 'Океан' },
        answer: 'B',
      },
      {
        question: 'Which layer protects Earth?',
        options: { A: 'Ozone layer', B: 'Iron shield', C: 'Plastic dome', D: 'Water layer' },
        answer: 'A',
      },
    ],
  },
  {
    id: 2,
    title: 'The Earth',
    icon: Earth,
    questions: [
      {
        question: 'Как называется самый центр Земли?',
        options: { A: 'Мантия', B: 'Ядро', C: 'Кора', D: 'Океан' },
        answer: 'B',
      },
      {
        question: 'Which layer protects Earth?',
        options: { A: 'Ozone layer', B: 'Iron shield', C: 'Plastic dome', D: 'Water layer' },
        answer: 'A',
      },
    ],
  },
    {
    id: 3,
    title: 'Canyon Flight',
    icon: CanyonFlight,
    questions: [],
  },
  {
    id: 4,
    title: 'The Rocketry',
    icon: Rocketry,
    questions: [],
  },
  {
    id: 5,
    title: 'Sun',
    icon: Sun,
    questions: [
      {
        question: 'What is the main gas in the atmosphere?',
        options: { A: 'Oxygen', B: 'Carbon Dioxide', C: 'Nitrogen', D: 'Hydrogen' },
        answer: 'C',
      },
    ],
  },
  {
    id: 6,
    title: 'Moon Rover',
    icon: MoonRover,
    questions: [],
  },
  {
    id: 7,
    title: 'The Atmosphere',
    icon: Atmosphere,
    questions: [],
  },

];
