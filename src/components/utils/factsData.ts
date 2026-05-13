import earth1 from '@/public/images/facts/earth/earth-1.webp';
import earth2 from '@/public/images/facts/earth/earth-2.webp';
import earth3 from '@/public/images/facts/earth/earth-3.webp';
import earth4 from '@/public/images/facts/earth/earth-4.webp';

import solarSystem1 from '@/public/images/facts/solar-system/1.webp';
import solarSystem2 from '@/public/images/facts/solar-system/2.webp';
import solarSystem3 from '@/public/images/facts/solar-system/3.webp';
import solarSystem4 from '@/public/images/facts/solar-system/4.webp';
import solarSystem5 from '@/public/images/facts/solar-system/5.webp';

import canyone1 from '@/public/images/facts/canyone/1.webp';
import canyone2 from '@/public/images/facts/canyone/2.webp';
import canyone3 from '@/public/images/facts/canyone/3.webp';
import canyone4 from '@/public/images/facts/canyone/4.webp';
import canyone5 from '@/public/images/facts/canyone/5.webp';

import telescope1 from '@/public/images/facts/telescope/1.webp';
import telescope2 from '@/public/images/facts/telescope/2.webp';
import telescope3 from '@/public/images/facts/telescope/3.webp';
import telescope4 from '@/public/images/facts/telescope/4.webp';
import telescope5 from '@/public/images/facts/telescope/5.webp';

import rocketIcon1 from '@/public/images/facts/rocket/rocket-1.webp';
import rocketIcon2 from '@/public/images/facts/rocket/rocket-2.webp';
import rocketIcon3 from '@/public/images/facts/rocket/rocket-3.webp';
import rocketIcon4 from '@/public/images/facts/rocket/rocket-4.webp';
import rocketIcon5 from '@/public/images/facts/rocket/rocket-5.webp';

import sunSystemIcon from '@/public/images/facts/sun/sun-system.webp';
import sunSpeedIcon from '@/public/images/facts/sun/sun-speed.webp';
import sunIcon from '@/public/images/facts/sun/sun.webp';
import sunViewIcon from '@/public/images/facts/sun/sun-view.webp';

import moonRover1 from '@/public/images/facts/moon-rover/moon-rover-1.webp';
import moonRover2 from '@/public/images/facts/moon-rover/moon-rover-2.webp';
import moonRover3 from '@/public/images/facts/moon-rover/moon-rover-3.webp';
import moonRover4 from '@/public/images/facts/moon-rover/moon-rover-4.webp';
import moonRover5 from '@/public/images/facts/moon-rover/moon-rover-5.webp';

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

import satellite1 from '@/public/images/facts/satelites/1.webp';
import satellite2 from '@/public/images/facts/satelites/2.webp';
import satellite3 from '@/public/images/facts/satelites/3.webp';
import satellite4 from '@/public/images/facts/satelites/4.webp';
import satellite5 from '@/public/images/facts/satelites/5.webp';

import blackHole1 from '@/public/images/facts/black-hole/1.webp';
import blackHole2 from '@/public/images/facts/black-hole/2.webp';
import blackHole3 from '@/public/images/facts/black-hole/3.webp';
import blackHole4 from '@/public/images/facts/black-hole/4.webp';
import blackHole5 from '@/public/images/facts/black-hole/5.webp';

import commets1 from '@/public/images/facts/commets/1.webp';
import commets2 from '@/public/images/facts/commets/2.webp';
import commets3 from '@/public/images/facts/commets/3.webp';
import commets4 from '@/public/images/facts/commets/4.webp';
import commets5 from '@/public/images/facts/commets/5.webp';

export const earthFacts = {
  name: 'earth',
  facts: [
    {
      id: 1,
      key: 'earth.crust',
      title: 'Земная кора',
      description:
        'Земная кора — тонкий слой Земли, как кожура яблока. Состоит из огромных кусков — они двигаются и вызывают землетрясения.',
      image: earth1,
    },
    {
      id: 2,
      key: 'earth.mantle',
      title: 'Мантия',
      description:
        'Мантия — горячий густой слой. Его движение двигает континенты и вызывает извержения вулканов.',
      image: earth2,
    },
    {
      id: 3,
      key: 'earth.outerCore',
      title: 'Внешнее ядро',
      description:
        'Внешнее ядро — жидкий металл вокруг внутреннего ядра. Именно он создаёт магнитный щит Земли.',
      image: earth3,
    },
    {
      id: 4,
      key: 'earth.innerCore',
      title: 'Внутреннее ядро',
      description:
        'Внутреннее ядро — твёрдый металлический шар в центре Земли, раскалённый до 6000°С.',
      image: earth4,
    },
  ],
};

export const atmosphereFacts = {
  name: 'atmosphere',
  facts: [
    {
      id: 1,
      key: 'atmosphere.breathe',
      title: 'Fact 1',
      description: 'Атмосфера — воздушная оболочка Земли. Без неё мы не смогли бы дышать.',
      image: atmosphereIcon,
    },
    {
      id: 2,
      key: 'atmosphere.shield',
      title: 'Fact 2',
      description:
        'Космические камни сгорают в атмосфере, не долетая до поверхности. Она работает как щит',
      image: atmosphereMetheoritIcon,
    },
    {
      id: 3,
      key: 'atmosphere.troposphere',
      title: 'Fact 3',
      description:
        'Мы живём в тропосфере — самом нижнем слое атмосферы. Здесь есть воздух и тепло.',
      image: atmosphereWeatherIcon,
    },
    {
      id: 4,
      key: 'atmosphere.weather',
      title: 'Fact 4',
      description: 'Облака, дождь и ветер — всё это рождается в атмосфере.',
      image: atmospherePressureIcon,
    },
    {
      id: 5,
      key: 'atmosphere.layers',
      title: 'Fact 5',
      description:
        'У атмосферы Земли пять основных слоёв. Каждый — на своей высоте и со своими свойствами.',
      image: atmosphereLevelIcon,
    },
  ],
};

export const canyonFlightFacts = {
  name: 'canyon flight',
  facts: [
    {
      id: 1,
      key: 'canyonFlight.laika',
      title: 'Fact 1',
      description:
        'Собака Лайка — первое живое существо, облетевшее Землю в космосе. Полёт состоялся в 1957 году.',
      image: canyone5,
    },
    {
      id: 2,
      key: 'canyonFlight.gagarin',
      title: 'Fact 2',
      description:
        'Юрий Гагарин — первый человек в космосе. 12 апреля 1961 года он совершил полёт вокруг Земли.',
      image: canyone2,
    },
    {
      id: 3,
      key: 'canyonFlight.tereshkova',
      title: 'Fact 3',
      description: 'Валентина Терешкова — первая женщина в космосе. Она полетела в 1963 году.',
      image: canyone4,
    },
    {
      id: 4,
      key: 'canyonFlight.armstrong',
      title: 'Fact 4',
      description: 'Нил Армстронг — первый человек, ступивший на Луну. Это произошло в 1969 году.',
      image: canyone1,
    },
    {
      id: 5,
      key: 'canyonFlight.uzcosmos',
      title: 'Fact 5',
      description: 'UzCosmos — организация, которая готовит первого космонавта Узбекистана.',
      image: canyone3,
    },
  ],
};

export const telescopeFacts = {
  name: 'telescope facts',
  facts: [
    {
      id: 1,
      key: 'telescope.device',
      title: 'Fact 1',
      description: 'Телескоп — прибор, который помогает видеть далёкие объекты в космосе.',
      image: telescope2,
    },
    {
      id: 2,
      key: 'telescope.ulugbek',
      title: 'Fact 2',
      description:
        'Мирзо Улугбек построил знаменитую обсерваторию в Самарканде для изучения звёзд.',
      image: telescope4,
    },
    {
      id: 3,
      key: 'telescope.hubble',
      title: 'Fact 3',
      description: 'Телескоп «Хаббл» находится на орбите Земли и делает снимки далёких галактик.',
      image: telescope3,
    },
    {
      id: 4,
      key: 'telescope.space',
      title: 'Fact 4',
      description: 'Телескопы в космосе видят лучше, потому что им не мешает атмосфера.',
      image: telescope5,
    },
    {
      id: 5,
      key: 'telescope.webb',
      title: 'Fact 5',
      description: '«Джеймс Уэбб» — новейший космический телескоп, запущенный в 2021 году.',
      image: telescope1,
    },
  ],
};

export const solarSystemFacts = {
  id: 0,
  name: 'solar system',
  facts: [
    {
      id: 1,
      key: 'solarSystem.count',
      title: 'Fact 1',
      description: 'В Солнечной системе 8 планет. Все они вращаются вокруг Солнца',
      image: solarSystem1,
    },
    {
      id: 2,
      key: 'solarSystem.mercury',
      title: 'Fact 2',
      description:
        'Меркурий — ближайшая к Солнцу планета. Она же самая маленькая в Солнечной системе.',
      image: solarSystem5,
    },
    {
      id: 3,
      key: 'solarSystem.mars',
      title: 'Fact 3',
      description: 'Марс называют «Красной планетой» — его поверхность покрыта ржавчиной.',
      image: solarSystem2,
    },
    {
      id: 4,
      key: 'solarSystem.jupiter',
      title: 'Fact 4',
      description:
        'Юпитер — самая большая планета. Внутри него поместились бы все остальные планеты.',
      image: solarSystem3,
    },
    {
      id: 5,
      key: 'solarSystem.saturn',
      title: 'Fact 5',
      description: 'Сатурн знаменит своими кольцами. Они состоят из льда и камней.',
      image: solarSystem4,
    },
  ],
};

export const stellitesFacts = {
  name: 'satellites',
  facts: [
    {
      id: 1,
      key: 'satellite.what',
      title: 'Fact 1',
      description:
        'Спутник — объект, который вращается вокруг планеты. Бывают естественные и искусственные.',
      image: satellite1,
    },
    {
      id: 2,
      key: 'satellite.sputnik1',
      title: 'Fact 2',
      description:
        'Спутник-1 — первый искусственный спутник Земли. Он был размером с баскетбольный мяч.',
      image: satellite4,
    },
    {
      id: 3,
      key: 'satellite.ussr',
      title: 'Fact 3',
      description:
        'СССР первым в мире запустил спутник в космос. Это стало началом космической эры.',
      image: satellite3,
    },
    {
      id: 4,
      key: 'satellite.moon',
      title: 'Fact 4',
      description: 'Луна — естественный спутник Земли. Она вращается вокруг нашей планеты.',
      image: satellite2,
    },
    {
      id: 5,
      key: 'satellite.since1957',
      title: 'Fact 5',
      description:
        'Первый спутник был запущен в 1957 году. С тех пор в космосе побывали тысячи спутников.',
      image: satellite5,
    },
  ],
};

export const rocketryFacts = {
  name: 'rocketry',
  facts: [
    {
      id: 1,
      title: 'Нос ракеты',
      key: 'rocketry.nose',
      description: 'Заострённый нос помогает ракете легче проходить сквозь воздух при взлёте.',
      image: rocketIcon1,
    },
    {
      id: 2,
      title: 'Стабилизаторы',
      key: 'rocketry.stabilizers',
      description: 'Плавники-стабилизаторы внизу ракеты помогают ей лететь ровно и не отклоняться.',
      image: rocketIcon3,
    },
    {
      id: 3,
      title: 'Иллюминатор',
      key: 'rocketry.porthole',
      description:
        'Иллюминатор — прочное круглое окно, через которое космонавты наблюдают за полётом.',
      image: rocketIcon2,
    },
    {
      id: 4,
      title: 'Корпус',
      key: 'rocketry.body',
      description:
        'Корпус покрыт жаропрочным покрытием, которое защищает ракету от перегрева при взлёте.',
      image: rocketIcon4,
    },
    {
      id: 5,
      title: 'Двигатель',
      key: 'rocketry.engine',
      description:
        'Двигатель выбрасывает горячий газ вниз — и ракета летит вверх. Это реактивная тяга.',
      image: rocketIcon5,
    },
  ],
};

export const moonRoverFacts = {
  name: 'moon rover',
  facts: [
    {
      id: 1,
      title: 'Робот на колёсах',
      key: 'moonRover.wheeled',
      description:
        'Луноход — первый робот на колёсах на другом небесном теле. Колёса-сетки не давали ему тонуть в лунной пыли.',
      image: moonRover1,
    },
    {
      id: 2,
      title: 'Управление с Земли',
      key: 'moonRover.remoteControl',
      description:
        'Луноходом управляли операторы с Земли. Сигнал шёл больше секунды, поэтому каждое движение рассчитывали заранее.',
      image: moonRover2,
    },
    {
      id: 3,
      title: 'Солнечные панели',
      key: 'moonRover.solar',
      description:
        'Луноход получал энергию от солнечных панелей. В лунную ночь останавливался и экономил энергию.',
      image: moonRover5,
    },
    {
      id: 4,
      title: 'Связь с Землёй',
      key: 'moonRover.communication',
      description: 'Через антенну Луноход отправлял на Землю данные о лунном грунте и рельефе.',
      image: moonRover3,
    },
    {
      id: 5,
      title: 'Срок службы',
      key: 'moonRover.lifespan',
      description: 'Луноход-1 должен был работать 3 месяца, но продержался почти 11.',
      image: moonRover4,
    },
  ],
};

export const cometsAndAsterouds = {
  name: 'comets and asteroids',
  facts: [
    {
      id: 1,
      title: 'Fact 1',
      description:
        'Кометы состоят из льда и пыли. Они летают по Солнечной системе с огромной скоростью.',
      image: commets4,
    },
    {
      id: 2,
      title: 'Fact 2',
      description: 'Когда комета приближается к Солнцу, лёд тает и образуется яркий хвост.',
      image: commets1,
    },
    {
      id: 3,
      title: 'Fact 3',
      description: 'Астероид состоит из камня и металла. В отличие от кометы, у него нет хвоста.',
      image: commets3,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Большинство астероидов находятся между Марсом и Юпитером — в поясе астероидов.',
      image: commets5,
    },
    {
      id: 5,
      title: 'Fact 5',
      description:
        'Комета Галлея — самая известная комета. Она появляется рядом с Землёй раз в 75 лет.',
      image: commets2,
    },
  ],
};

export const blackHole = {
  name: 'black hole',
  facts: [
    {
      id: 1,
      key: 'blackHole.what',
      title: 'Fact 1',
      description: 'Чёрная дыра — область в космосе, откуда не может выйти даже свет.',
      image: blackHole1,
    },
    {
      id: 2,
      key: 'blackHole.star',
      title: 'Fact 2',
      description: 'Когда крупная звезда взрывается, она может сжаться и стать чёрной дырой.',
      image: blackHole2,
    },
    {
      id: 3,
      key: 'blackHole.horizon',
      title: 'Fact 3',
      description:
        'Граница чёрной дыры называется горизонт событий. После неё ничто не выходит обратно.',
      image: blackHole3,
    },
    {
      id: 4,
      key: 'blackHole.milkyWay',
      title: 'Fact 4',
      description: 'В центре нашей галактики Млечный Путь находится сверхмассивная чёрная дыра.',
      image: blackHole4,
    },
    {
      id: 5,
      key: 'blackHole.indirect',
      title: 'Fact 5',
      description:
        'Чёрную дыру нельзя увидеть напрямую, но учёные наблюдают её влияние на окружающие объекты.',
      image: blackHole5,
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
      image: rocketIcon1,
    },
    {
      id: 2,
      title: 'Fact 2',
      description:
        'Топливо - это как бензин для машины, только для ракеты. Даёт ей энергию для движения.',
      image: rocketIcon2,
    },
    {
      id: 3,
      title: 'Fact 3',
      description:
        'Ракеты, которые можно использовать несколько раз, возвращаются, чтобы полететь снова.',
      image: rocketIcon3,
    },
    {
      id: 4,
      title: 'Fact 4',
      description: 'Обтекатель на носу — это как шлем для спутника, он его защищает.',
      image: rocketIcon4,
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
