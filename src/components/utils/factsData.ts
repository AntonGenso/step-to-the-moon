import mercuryIcon from '@/public/images/facts/solar-system/mercury.webp';
import mercuryAtmosphere from '@/public/images/facts/solar-system/mercury-atmosphere.webp';
import mercuryMoonIcon from '@/public/images/facts/solar-system/mercury-moon.webp';
import venusIcon from '@/public/images/facts/solar-system/venus.webp';
import venusAtmosphereIcon from '@/public/images/facts/solar-system/venus-atmosphere.webp';
import venusVulcanioIcon from '@/public/images/facts/solar-system/venus-vulcanio.webp';
import moonIcon from '@/public/images/facts/solar-system/moon.webp';
import moonIceIcon from '@/public/images/facts/solar-system/ice-moon.webp';
import moonWeightIcon from '@/public/images/facts/solar-system/moon-weight.webp';

import laykaIcon from '@/public/images/facts/astronauts/layka.webp';
import gagarinIcon from '@/public/images/facts/astronauts/gagarin.webp';
import valentinaIcon from '@/public/images/facts/astronauts/valentina.webp';
import nillIcon from '@/public/images/facts/astronauts/nill.webp';
import salijanIcon from '@/public/images/facts/astronauts/salijan.webp';

import rocketIcon from '@/public/images/facts/rocket/rocket.webp';
import rocket2Icon from '@/public/images/facts/rocket/rocket-2.webp';
import rocketBodyIcon from '@/public/images/facts/rocket/rocket-body.webp';
import rocketEngineIcon from '@/public/images/facts/rocket/engine.webp';
import rocketFlyIcon from '@/public/images/facts/rocket/rocket-fly.webp';
import rocketFuelIcon from '@/public/images/facts/rocket/rocket-fuel.webp';
import rocketReusedIcon from '@/public/images/facts/rocket/rocket-reused.webp';
import rocketCowlIcon from '@/public/images/facts/rocket/rocket-cowl.webp';

import sunSystemIcon from '@/public/images/facts/sun/sun-system.webp';
import sunSpeedIcon from '@/public/images/facts/sun/sun-speed.webp';
import sunIcon from '@/public/images/facts/sun/sun.webp';
import sunViewIcon from '@/public/images/facts/sun/sun-view.webp';

import moonRoverSignalIcon from '@/public/images/facts/moon-rover/radio-signal.webp';
import moonRoverEnergyIcon from '@/public/images/facts/moon-rover/moon-rover-energy.webp';
import moonRoverLiveIcon from '@/public/images/facts/moon-rover/moon-rover-live.webp';
import moonRoverTypeIcon from '@/public/images/facts/moon-rover/moon-rover-type.webp';

import moonRoverWeelsIcon from '@/public/images/facts/moon-rover/moon-rover-weels.webp';
import moonRoverWeightIcon from '@/public/images/facts/moon-rover/moon-rover-weight.webp';
import moonRoverNameIcon from '@/public/images/facts/moon-rover/moon-rover-name.webp';
import moonRoverRadioIcon from '@/public/images/facts/moon-rover/moon-rover-radio.webp';
import moonRoverSpeedIcon from '@/public/images/facts/moon-rover/moon-rover-move.webp';

import atmosphereIcon from '@/public/images/facts/atmosphere/atmosphere.webp';
import atmosphereMetheoritIcon from '@/public/images/facts/atmosphere/atmosphere-metheorit.webp';
import atmosphereWeatherIcon from '@/public/images/facts/atmosphere/atmosphere-weather.webp';
import atmospherePressureIcon from '@/public/images/facts/atmosphere/atmosphere-pressure.webp';
import atmosphereLevelIcon from '@/public/images/facts/atmosphere/atmosphere-level.webp';

import traposphereImg from '@/public/images/facts/atmosphere/termosphere.webp';
import stratosphereImg from '@/public/images/facts/atmosphere/stroposphere.webp';
import mesosphereImg from '@/public/images/facts/atmosphere/mezosphere.webp';
import termosphereImg from '@/public/images/facts/atmosphere/termosphere.webp';
import exosphereImg from '@/public/images/facts/atmosphere/exosphere.webp';

export const solarSystemFacts = {
  id: 0,
  name: 'solar system',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description:
        'На Меркурии сутки тянутся целых 176 земных дней – это вдвое дольше, чем год, который длится всего 88 земных дней.',
      image: mercuryIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description:
        'Там почти нет атмосферы, поэтому днём жара невыносимая — до +430°C, а ночью дубак — до -180°C.',
      image: mercuryAtmosphere,
    },
    {
      id: 3,
      title: 'Fact 3',
      description:
        'Кстати, Меркурий – одна из двух планет в нашей системе (вторая – Венера), у которой вообще нет лун.',
      image: mercuryMoonIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description:
        'Венера крутится в другую сторону, не как все планеты, да ещё и очень медленно – день там дольше года выходит',
      image: venusIcon,
    },
    {
      id: 5,
      title: 'Fact 5',
      description:
        'Там такая плотная атмосфера, что жара стоит неимоверная, поэтому Венера – самое жаркое место в нашей системе.',
      image: venusAtmosphereIcon,
    },
    {
      id: 6,
      title: 'Fact 6',
      description: 'И вулканов на Венере больше, чем где-либо ещё, аж больше тысячи.',
      image: venusVulcanioIcon,
    },
    {
      id: 7,
      title: 'Fact 7',
      description: 'Луна - единственный спутник Земли.',
      image: moonIcon,
    },
    {
      id: 8,
      title: 'Fact 8',
      description: 'Луна - единственный спутник Земли.',
      image: moonIceIcon,
    },
    {
      id: 9,
      title: 'Fact 9',
      description: 'На Луне ты будешь весить в шесть раз меньше!',
      image: moonWeightIcon,
    },
  ],
};

export const earthFacts = {
  name: 'earth',
  facts: [],
};

export const canyonFlightFacts = {
  name: 'canyon flight',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description:
        'Лайка - отважная собака, она первой совершила полет вокруг Земли на космическом корабле.',
      image: laykaIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: 'Юрий Гагарин - первый человек, который побывал в космосе.',
      image: gagarinIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Валентина Терешкова - первая женщина в мире, слетавшая в космос.',
      image: valentinaIcon,
    },
    {
      id: 4,
      title: 'Fact 5',
      description: 'Нил Армстронг - первым ступил на Луну.',
      image: nillIcon,
    },
    {
      id: 5,
      title: 'Fact 5',
      description:
        'Салижан Шарипов - первый космонавт из Узбекистана, который дважды побывал в космосе.',
      image: salijanIcon,
    },
  ],
};

export const rocketryFacts = {
  name: 'rocketry',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description:
        'Ракета летит быстрее благодаря аэродинамическому носу-конусу, который разрезает воздух.',
      image: rocketIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description:
        'Крылья-стабилизаторы помогают ракете держаться прямо в полёте, это всё благодаря физике.',
      image: rocket2Icon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Прочный корпус из термостойкого сплава защищает от перегрева.',
      image: rocketBodyIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description:
        'Двигатель – это мощный мотор, он создает тягу, чтобы запустить ракету в космос.',
      image: rocketEngineIcon,
    },
  ],
};

export const rocketyBonusFacts = {
  name: 'rocketry bonus',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description: 'Ракета разгоняется, чтобы преодолеть притяжение Земли',
      image: rocketFlyIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description:
        'Топливо - это как бензин для машины, только для ракеты. Даёт ей энергию для движения.',
      image: rocketFuelIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description:
        'Ракеты, которые можно использовать несколько раз, возвращаются, чтобы полететь снова.',
      image: rocketReusedIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Обтекатель на носу — это как шлем для спутника, он его защищает.',
      image: rocketCowlIcon,
    },
  ],
};

export const sunFacts = {
  name: 'sun',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description:
        'Солнце – это массивная звезда, а не планета, и вообще, это центр нашей системы.',
      image: sunSystemIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: 'Свет от Солнца до нас добирается аж за восемь минут.',
      image: sunSpeedIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Представляете, нашему Солнцу уже 4,5 миллиарда лет!',
      image: sunIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Солнце – это просто огромный газовый шар, он не горит.',
      image: sunViewIcon,
    },
  ],
};

export const moonRoverFacts = {
  name: 'moon rover',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description: 'Ею управляют люди с Земли, посылая команды по радио',
      image: moonRoverSignalIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: 'Он работает на солнечной энергии, благодаря солнечным панелям на корпусе.',
      image: moonRoverEnergyIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Луноход пробыл на Луне дольше, чем все думали.',
      image: moonRoverLiveIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Он исследует лунный грунт и передаёт информацию на Землю.',
      image: moonRoverTypeIcon,
    },
  ],
};

export const moonRoverBonusFacts = {
  name: 'moon rover bonus',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description: ' У Лунохода колёса-сетки, чтобы он не тонул в лунной пыли.',
      image: moonRoverWeelsIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description:
        'На Земле он весил примерно как небольшая машина, а вот на Луне - как обычное ведро.',
      image: moonRoverWeightIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description:
        'Первые Луноходы называли в честь собак, как и многие другие аппараты, которые отправляли в космос.',
      image: moonRoverNameIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: ' Луноход отправляет данные через антенну, как будто по невидимому проводу.',
      image: moonRoverRadioIcon,
    },
    {
      id: 5,
      title: 'Fact 5',
      description: 'Он передвигался по Луне, используя солнечные датчики для навигации.',
      image: moonRoverSpeedIcon,
    },
  ],
};

export const atmosphereFacts = {
  name: 'atmosphere',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description: 'Атмосфера – это как воздушное одеяло вокруг Земли, которое мы не видим.',
      image: atmosphereIcon,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: ' Она нас защищает, как щит, потому что метеориты в ней сгорают.',
      image: atmosphereMetheoritIcon,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Благодаря атмосфере у нас есть погода и климат.',
      image: atmosphereWeatherIcon,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Интересно, что воздух в атмосфере весит, и поэтому есть давление!',
      image: atmospherePressureIcon,
    },
    {
      id: 5,
      title: 'Fact 5',
      description: 'И последнее: в атмосфере пять слоев, как в торте.',
      image: atmosphereLevelIcon,
    },
  ],
};

export const atmosphereBonusFacts = {
  name: 'atmosphere bonus',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description: 'Тропосфера – самый нижний слой, там вся погода и творится.',
      image: traposphereImg,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: 'Стратосфера – спокойное место, там самолёты летают, ничто не мешает.',
      image: stratosphereImg,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Мезосфера – холодрыга страшная, зато метеориты сгорают, как развлечение.',
      image: mesosphereImg,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Термосфера – жарища, зато там МКС болтается.',
      image: termosphereImg,
    },
    {
      id: 5,
      title: 'Fact 5',
      description: 'Экзосфера – самый край, там воздух уже в космос утекает.',
      image: exosphereImg,
    },
  ],
};
