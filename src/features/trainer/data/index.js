import { getMinutes, getSeconds } from 'shared/helpers';

const popUpBalloonsGameDefaultSettings = {
  balloonCharacterCount: {
    default: 10,
    max: 20,
  },
  gameTime: {
    default: getMinutes(0.5),
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

export { popUpBalloonsGameDefaultSettings };
