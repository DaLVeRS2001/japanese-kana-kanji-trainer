import { gameNames } from 'shared/utils/data';

export const initialState = {
  activeGames: {
    [gameNames[0]]: false,
  },
  isAnyGameActive: false,
};
