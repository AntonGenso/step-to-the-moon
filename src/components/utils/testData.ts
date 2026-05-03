import Earth from '@/public/images/svg/earth.svg';
import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg';
import Stars from '@/public/images/svg/mssion/stars.svg';
import Moon from '@/public/images/svg/mssion/moon.svg';
import Rocketry from '@/public/images/svg/mssion/rocketry.svg';
import SolarSystem from '@/public/images/svg/mssion/solar_system.svg';
import MoonRover from '@/public/images/svg/mssion/moon_rover.svg';
import Saturn from '@/public/images/svg/mssion/saturn.svg';
import Spacesuit from '@/public/images/svg/mssion/spacesuit.svg';
import { ElementType } from 'react';

export interface ITestBase {
  id: number;
  icon: ElementType;
  questionCount: number;
  answers: string[];
}

export const testData: ITestBase[] = [
  { id: 1,  icon: Earth,        questionCount: 5, answers: ['C', 'B', 'B', 'B', 'B'] },
  { id: 2,  icon: Atmosphere,   questionCount: 5, answers: ['B', 'B', 'B', 'B', 'C'] },
  { id: 3,  icon: CanyonFlight, questionCount: 5, answers: ['B', 'B', 'A', 'C', 'C'] },
  { id: 4,  icon: Stars,        questionCount: 5, answers: ['A', 'C', 'B', 'B', 'B'] },
  { id: 5,  icon: Moon,         questionCount: 5, answers: ['B', 'C', 'C', 'C', 'B'] },
  { id: 6,  icon: Rocketry,     questionCount: 5, answers: ['A', 'B', 'C', 'B', 'B'] },
  { id: 7,  icon: SolarSystem,  questionCount: 5, answers: ['C', 'C', 'B', 'C', 'D'] },
  { id: 8,  icon: MoonRover,    questionCount: 5, answers: ['A', 'C', 'B', 'B', 'B'] },
  { id: 9,  icon: Saturn,       questionCount: 5, answers: ['B', 'B', 'B', 'C', 'C'] },
  { id: 10, icon: Spacesuit,    questionCount: 5, answers: ['B', 'B', 'B', 'B', 'C'] },
];
