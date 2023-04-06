import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { getUniqueArr } from '../shared/helpers';
import { addNotify } from '../features/notify';

const useCharacterList = () => {
  const storage = useLocalStorage();
  const dispatch = useDispatch();

  const KEY = 'characters';
  const getCharacters = () => getUniqueArr(storage.get(KEY) ?? []);

  return {
    clearList: () => storage.add(KEY, []),
    removeItem: (character) => {
      const charactersCopy = [...getCharacters()];
      const match = charactersCopy.indexOf(character);
      if (match !== -1) {
        charactersCopy.splice(match, 1);
        storage.add(KEY, charactersCopy);
      } else {
        dispatch(addNotify("The list doesn't have such a character", 'error'));
      }
    },
    removeMultipleItems: (characters) => {
      const filteredCharacters = getCharacters().filter(
        (character) => characters.indexOf(character) === -1
      );
      storage.add(KEY, filteredCharacters);
    },
    addItem: (character) =>
      storage.add(KEY, getUniqueArr([...getCharacters(), character])),
    addMultipleItems: (characters) =>
      storage.add(KEY, getUniqueArr([...characters, ...characters])),
    getList: () => getCharacters(),
  };
};

export default useCharacterList;
