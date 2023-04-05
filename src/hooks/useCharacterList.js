import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { getUniqueArr } from '../shared/helpers';

const useCharacterList = () => {
  const storage = useLocalStorage();

  const KEY = 'characters';
  const getCharacters = () => getUniqueArr(storage.get(KEY) ?? []);

  console.log(getCharacters());

  return {
    clearList: () => storage.add(KEY, []),
    removeItem: (character) => {
      const charactersCopy = [...getCharacters()];
      const match = charactersCopy.indexOf(character);
      if (match !== -1) {
        charactersCopy.splice(match, 1);
        storage.add(KEY, charactersCopy);
      }
      //addNotify
    },
    removeMultipleItems: (characters) => {
      const filteredCharacters = getCharacters().filter(
        (character) => characters.indexOf(character) === -1
      );
      storage.add(KEY, filteredCharacters);
    },
    addItem: (character) => storage.add(KEY, [...getCharacters(), character]),
    addMultipleItems: (characters) =>
      storage.add(KEY, getUniqueArr([...characters, ...characters])),
    getList: () => getCharacters(),
  };
};

export default useCharacterList;
