import BoyDark from '@/public/images/profile/skin/svg/boy_dark.svg';
import BoyLight from '@/public/images/profile/skin/svg/boy_light.svg';
import GirlDark from '@/public/images/profile/skin/svg/girl_dark.svg';
import GirlLight from '@/public/images/profile/skin/svg/girl_light.svg';

// import Dog from '@/public/images/profile/skin/svg/dog.svg';
// import Dog2 from '@/public/images/profile/skin/svg/dog2.svg';
// import AltGirl from '@/public/images/profile/skin/svg/alt-girl.svg';

// Suits are rendered as <img> (they are raster PNGs wrapped in SVG). Inlining
// them via SVGR duplicates their internal pattern/image ids when the same suit
// renders on both the mobile and desktop trees, which breaks the paint server
// and leaves the suit invisible. A plain image src keeps each one isolated.
export const suit = [
  { id: 0, name: 'blue', src: '/images/profile/skin/svg/suit_blue.svg' },
  { id: 1, name: 'red', src: '/images/profile/skin/svg/suit_red.svg' },
  { id: 2, name: 'khaki', src: '/images/profile/skin/svg/suit_khaki.svg' },
];

export const headSkin = [
  { id: 0, name: 'boy_dark', icon: BoyDark },
  { id: 1, name: 'boy_light', icon: BoyLight },
  { id: 2, name: 'girl_dark', icon: GirlDark },
  { id: 3, name: 'girl_light', icon: GirlLight },
  // { id: 4, name: 'dog', icon: Dog },
  // { id: 5, name: 'dog2', icon: Dog2 },
  // { id: 6, name: 'alt-girl', icon: AltGirl },
];

export const girlHead = [];
