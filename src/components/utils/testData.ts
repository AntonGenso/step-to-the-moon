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
    id: 1,
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
  {
    id: 2,
    title: 'Earth Structure Quiz',
    icon: Earth,
    questions: [
      {
        question: 'Что защищает Землю от вредных космических лучей?',
        options: { A: 'Звук', B: 'Щит', C: 'Воздух', D: 'Свет' },
        answer: 'B',
      },
      {
        question: 'Из чего состоит жидкое ядро, создающее магнитный щит Земли?',
        options: { A: 'Вода', B: 'Камни', C: 'Металл', D: 'Дерево' },
        answer: 'C',
      },
      {
        question: 'Что двигает континенты и вулканы на Земле?',
        options: { A: 'Ветер', B: 'Движение мантии', C: 'Луна', D: 'Солнце' },
        answer: 'B',
      },
      {
        question: 'На что похожа земная кора?',
        options: { A: 'Мёд', B: 'Яблочная кожура', C: 'Лёд', D: 'Облако' },
        answer: 'B',
      },
      {
        question: 'Что происходит из-за движения горячих слоёв Земли?',
        options: { A: 'Дождь', B: 'Землетрясения', C: 'Снег', D: 'Радуга' },
        answer: 'B',
      },
    ],
  },
  {
  id: 3,
  title: 'Space Pioneers Quiz',
  icon: CanyonFlight,
  questions: [
    {
      question: 'Кто первым облетел Землю в космосе?',
      options: { A: 'Слон', B: 'Кошка', C: 'Собака', D: 'Птица' },
      answer: 'C',
    },
    {
      question: 'Кто был первым человеком в космосе?',
      options: { A: 'Учёный', B: 'Пилот', C: 'Астронавт', D: 'Космонавт' },
      answer: 'D',
    },
    {
      question: 'Кто была первой женщиной в космосе?',
      options: { A: 'Девочка', B: 'Женщина', C: 'Актриса', D: 'Врач' },
      answer: 'B',
    },
    {
      question: 'Кто первым ступил на поверхность Луны?',
      options: { A: 'Юрий Гагарин', B: 'Белка', C: 'Нил Армстронг', D: 'Лайка' },
      answer: 'C',
    },
    {
      question: 'Откуда родом первый космонавт, дважды побывавший в космосе?',
      options: { A: 'Казахстан', B: 'Россия', C: 'Узбекистан', D: 'Америка' },
      answer: 'C',
    },
  ],
  },

  {
    id: 4,
    title: 'Rocketry Quiz',
    icon: Rocketry,
    questions: [
      {
        question: 'Что помогает ракете лететь быстрее?',
        options: { A: 'Пропеллер', B: 'Аэродинамика', C: 'Крылья', D: 'Струя' },
        answer: 'B',
      },
      {
        question: 'Что защищает иллюминатор от космического давления?',
        options: { A: 'Щит', B: 'Воздух', C: 'Стекло', D: 'Броня' },
        answer: 'C',
      },
      {
        question: 'Что помогает ракете лететь прямо?',
        options: { A: 'Физика', B: 'Магия', C: 'Ветер', D: 'Топливо' },
        answer: 'A',
      },
      {
        question: 'Что защищает ракету от перегрева?',
        options: { A: 'Термостойкость', B: 'Лед', C: 'Пластик', D: 'Воздух' },
        answer: 'A',
      },
      {
        question: 'Что создаёт тягу для ракеты?',
        options: { A: 'Мотор', B: 'Струя', C: 'Пар', D: 'Воздух' },
        answer: 'B',
      },
    ],
  },
  {
  id: 5,
  title: 'Sun Quiz',
  icon: Sun,
  questions: [
    {
      question: 'Что такое Солнце на самом деле?',
      options: { A: 'Огонь', B: 'Звезда', C: 'Камень', D: 'Планета' },
      answer: 'B',
    },
    {
      question: 'Откуда Солнце берёт тепло?',
      options: { A: 'Огонь', B: 'Ядерная реакция', C: 'Взрыв', D: 'Газ' },
      answer: 'B',
    },
    {
      question: 'Из чего состоит Солнце?',
      options: { A: 'Вода', B: 'Огонь', C: 'Газ', D: 'Камень' },
      answer: 'C',
    },
    {
      question: 'Сколько времени летит свет до Земли?',
      options: { A: 'Минута', B: '8 минут', C: 'Час', D: 'День' },
      answer: 'B',
    },
    {
      question: 'Сколько лет нашему Солнцу?',
      options: { A: 'Миллион', B: 'Тысяча', C: '4,5 млрд', D: '100 лет' },
      answer: 'C',
    },
  ],
  },
  {
    id: 6,
    title: 'Lunokhod Quiz',
    icon: MoonRover,
    questions: [
      {
        question: 'Что такое «Луноход»?',
        options: { A: 'Автобус', B: 'Машина', C: 'Корабль', D: 'Катер' },
        answer: 'B',
      },
      {
        question: 'Откуда Луноходом управляли люди?',
        options: { A: 'Земля', B: 'Луна', C: 'Марс', D: 'Космос' },
        answer: 'A',
      },
      {
        question: 'На чём работал Луноход?',
        options: { A: 'Вода', B: 'Электричество', C: 'Солнечная энергия', D: 'Ветер' },
        answer: 'C',
      },
      {
        question: 'Что Луноход сделал дольше, чем думали?',
        options: { A: 'Поспал', B: 'Починил', C: 'Пробыл', D: 'Упал' },
        answer: 'C',
      },
      {
        question: 'Что Луноход изучал на Луне?',
        options: { A: 'Воздух', B: 'Грунт', C: 'Воду', D: 'Растения' },
        answer: 'B',
      },
    ],
  },
  {
    id:7,
    title: 'Atmosphere Quiz',
    icon: Atmosphere,
    questions: [
      {
        question: 'Что такое «атмосфера»?',
        options: { A: 'Воздух', B: 'Одеяло', C: 'Вода', D: 'Щит' },
        answer: 'A',
      },
      {
        question: 'От чего атмосфера защищает Землю?',
        options: { A: 'Солнце', B: 'Ветер', C: 'Метеориты', D: 'Дождь' },
        answer: 'C',
      },
      {
        question: 'Что создаёт атмосфера?',
        options: { A: 'Погода', B: 'Вулканы', C: 'Землетрясения', D: 'Океаны' },
        answer: 'A',
      },
      {
        question: 'Что создаёт вес воздуха?',
        options: { A: 'Давление', B: 'Вода', C: 'Ветер', D: 'Температура' },
        answer: 'A',
      },
      {
        question: 'Сколько слоёв в атмосфере?',
        options: { A: 'Три', B: 'Четыре', C: 'Пять', D: 'Шесть' },
        answer: 'C',
      },
    ],
  },
];
