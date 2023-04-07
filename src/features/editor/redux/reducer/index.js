import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CHARACTER_LIST:
      return {
        ...state,
        characters: [...action.payload],
      };

    default:
      return { ...state };
  }
}
