const actionTypes = {
  CHANGE_ACTIVE_GAME: 'trainer/CHANGE_ACTIVE_GAME',
  CHANGE_IS_ANY_GAME_ACTIVE: 'trainer/CHANGE_IS_ANY_GAME_ACTIVE',
};

const changeActiveGame = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME, payload });
    dispatch({ type: actionTypes.CHANGE_IS_ANY_GAME_ACTIVE });
  };
};

export { actionTypes, changeActiveGame };
