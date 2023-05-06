import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_GAME:
      const { gameName, isActive } = action.payload;
      return {
        ...state,
        activeGames: { ...state.activeGames, [gameName]: isActive },
      };

    case actionTypes.CHANGE_IS_ANY_GAME_ACTIVE:
      return {
        ...state,
        isAnyGameActive:
          [...Object.values(state.activeGames)].filter((el) => el).length > 0,
      };

    default:
      return { ...state };
  }
}
