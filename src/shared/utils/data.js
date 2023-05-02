import { getMinutes, getSeconds } from 'shared/helpers';
import PT from 'prop-types';
import rootStyle from 'shared/style/index.module.scss';

const width = window.outerWidth / 10;

const Root_em = +rootStyle.Root_em;

const refsProp = PT.shape({
  current: PT.arrayOf(PT.instanceOf(Element)),
}).isRequired;

const footerLinks = [
  { name: 'Trainer', link: '/trainer' },
  { name: 'List Editor', link: '/list-editor' },
];

const popUpBalloonsGameDifficulties = {
  1: {
    name: 'Low',
    value: 1,
    speedUp: 4,
    creationInterval: 7,
  },
  2: {
    name: 'Medium',
    value: 2,
    speedUp: 7,
    creationInterval: 5,
  },
  3: {
    name: 'Hard',
    value: 3,
    speedUp: 9,
    creationInterval: 4,
  },
  4: {
    name: 'Extreme',
    value: 4,
    speedUp: 12,
    creationInterval: 2.5,
  },
};

const popUpBalloonsGameDefaultSettings = {
  maxCharacterCountInRow: 10,
  gapsBetweenBalloons: {
    row: 50, //block row
    column: 10 + width,
  },
  characterRowCount: {
    default: 5,
    max: 10,
  },
  gameTime: {
    default: getMinutes(5),
    max: getMinutes(60),
    isInfinite: false,
  },
  get balloonsSpeed() {
    return {
      speedUp: this.gameDifficult.speedUp,
      creationInterval: getSeconds(this.gameDifficult.creationInterval),
    };
  },
  hasRandomOrder: true,
  gameDifficult: popUpBalloonsGameDifficulties[1],
};

export {
  footerLinks,
  popUpBalloonsGameDefaultSettings,
  popUpBalloonsGameDifficulties,
  refsProp,
  Root_em,
};
