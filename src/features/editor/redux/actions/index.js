const actionTypes = {
  CHANGE_CHARACTER_LIST: 'editor/CHANGE_CHARACTER_LIST',
};

function changeCharacterList(characters) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_CHARACTER_LIST, payload: characters });
  };
}

export { actionTypes, changeCharacterList };
