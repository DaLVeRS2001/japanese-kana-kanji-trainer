import { getMinutes, getSeconds } from 'shared/helpers';

const width = window.outerWidth / 10;

const popUpBalloonsGameDefaultSettings = {
  gapsBetweenBalloons: {
    row: 50,
    column: 20 + width,
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
    speedUp: 4,
    creationInterval: {
      min: getSeconds(5),
      max: getSeconds(20),
    },
  },
  hasRandomOrder: true,
};

export { popUpBalloonsGameDefaultSettings };
