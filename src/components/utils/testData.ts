import Earth from '@/public/images/svg/earth.svg';
import Sun from '@/public/images/svg/sun.svg';
import Rocketry from '@/public/images/svg/mssion/rocketry.svg';
import Atmosphere from '@/public/images/svg/mssion/atmosphere.svg';
import SolarSystem from '@/public/images/svg/mssion/solar_system.svg';
import CanyonFlight from '@/public/images/svg/mssion/canyon_flight.svg';
import MoonRover from '@/public/images/svg/mssion/moon_rover.svg';
import { ElementType } from 'react';

export interface ITest {
  id: number;
  title: string;
  icon: ElementType;
  questions: {
    question: string;
    options: Record<string, string>;
    answer: string;
  }[];
}

export const testData: ITest[] = [
  {
    id: 8,
    title: 'Solar System Quiz',
    icon: SolarSystem, 
    questions: [
      {
        question: 'На Меркурии год короче... чего?',
        options: { A: 'Ночи', B: 'Солнца', C: 'Дня', D: 'Месяца' },
        answer: 'C',
      },
      {
        question: 'Почему Венера является самой горячей планетой в Солнечной системе?',
        options: { A: 'Плотная атмосфера', B: 'Содержание железа', C: 'Близость к Солнцу', D: 'Много вулканов' },
        answer: 'A',
      },
      {
        question: 'Что уникального в расположении Земли относительно других планет?',
        options: { A: 'Самая большая', B: 'Есть жидкая вода', C: 'Есть кольца', D: 'Много спутников' },
        answer: 'B',
      },
      {
        question: 'Почему Марс называют «Красной планетой»?',
        options: { A: 'Ржавчина на поверхности', B: 'Красная атмосфера', C: 'Близость к Солнцу', D: 'Вулканическая активность' },
        answer: 'A',
      },
      {
        question: 'Что является одной из самых заметных особенностей Юпитера?',
        options: { A: 'Много колец', B: 'Большое Красное Пятно', C: 'Самая маленькая', D: 'Вращается на боку' },
        answer: 'B',
      },
      {
        question: 'Что делает Сатурн уникальным среди других планет?',
        options: { A: 'Самая лёгкая', B: 'Быстрые ветры', C: 'Много спутников', D: 'Высокая гора' },
        answer: 'A',
      },
      {
        question: 'Что необычного в вращении Урана?',
        options: { A: 'Вращается быстро', B: 'Вращается на боку', C: 'Вращается наоборот', D: 'Не вращается' },
        answer: 'B',
      },
      {
        question: 'Какая особенность отличает Нептун?',
        options: { A: 'Самые быстрые ветры', B: 'Самая высокая гора', C: 'Самая далёкая планета', D: 'Открыт в телескоп' },
        answer: 'C',
      },
    ],
  },
];
