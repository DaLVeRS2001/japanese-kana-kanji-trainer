import { getMinutes, getSeconds } from 'shared/helpers';

const width = window.outerWidth / 10;

const footerLinks = [
  { name: 'Trainer', link: '/trainer' },
  { name: 'List Editor', link: '/list-editor' },
];

const popUpBalloonsGameDifficulties = {
  1: {
    name: 'Low',
    speedUp: 4,
    creationInterval: 7,
  },
  2: {
    name: 'Medium',
    speedUp: 7,
    creationInterval: 5,
  },
  3: {
    name: 'Hard',
    speedUp: 9,
    creationInterval: 4,
  },
  4: {
    name: 'Extreme',
    speedUp: 12,
    creationInterval: 2.5,
  },
};

const popUpBalloonsGameDefaultSettings = {
  gapsBetweenBalloons: {
    row: 50, //block row
    column: 10 + width,
  },
  balloonCharacterCount: {
    default: 10,
    max: 20,
  },
  gameTime: {
    default: getMinutes(5),
    max: getMinutes(60),
    isInfinite: false,
  },
  balloonsSpeed: {
    speedUp: popUpBalloonsGameDifficulties[4].speedUp,
    creationInterval: {
      min: getSeconds(popUpBalloonsGameDifficulties[4].creationInterval),
    },
  },
  hasRandomOrder: true,
};

export {
  footerLinks,
  popUpBalloonsGameDefaultSettings,
  popUpBalloonsGameDifficulties,
};
