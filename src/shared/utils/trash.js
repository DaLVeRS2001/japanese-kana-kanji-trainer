import { getMinutes, getSeconds } from 'shared/helpers';

const footerLinks = [
  { name: 'Trainer', link: '/trainer' },
  { name: 'List Editor', link: '/list-editor' },
];

const characterTypes = [
  'a-item',
  'a-items',
  'r-item',
  'r-items',
  'g-items',
  'c-items',
];

const popUpBalloonsGameDefaultSettings = {
  balloonCharacterCount: {
    default: 10,
    max: 20,
  },
  gameTime: {
    default: getMinutes(0.1),
    max: getMinutes(60),
    isInfinite: false,
  },
  balloonsSpeed: {
    speedUp: {
      pxCountToUp: 2,
      timeoutTo: 100,
    },
    creationInterval: {
      min: getSeconds(0.2),
      max: getSeconds(20),
    },
  },
};

export { footerLinks, characterTypes, popUpBalloonsGameDefaultSettings };
