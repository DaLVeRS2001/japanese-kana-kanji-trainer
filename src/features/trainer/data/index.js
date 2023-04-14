import { getMinutes, getSeconds } from 'shared/helpers';

const width = window.outerWidth / 10;
const kek = 9 - window.outerWidth / 60;
const kek2 = kek < 3 ? 3 : kek;
const spp = window.outerWidth / 50 / 4;
const spp2 = spp > 1.5 ? 1.5 : spp;
console.log(spp2, kek2);

const popUpBalloonsGameDefaultSettings = {
  gapsBetweenBalloons: {
    row: 100,
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
    speedUp: 3,
    creationInterval: {
      min: getSeconds(2),
      max: getSeconds(20),
    },
  },
};

export { popUpBalloonsGameDefaultSettings };
