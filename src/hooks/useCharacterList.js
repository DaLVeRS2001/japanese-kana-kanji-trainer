import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { getUniqueArr, checkMatch } from 'shared/helpers';
import { addNotify } from 'features/notify';

const useCharacterList = () => {
  const storage = useLocalStorage();
  const dispatch = useDispatch();

  const KEY = 'characters';
  const getCharacters = () => getUniqueArr(storage.get(KEY) ?? []);

  const getMatchedCharacters = (characters, type) => {
    const isRemove = type === 'remove';

    const filterCharacterByType = (character) => {
      const [removeCondition, addCondition] = [
        isRemove ? false : character,
        isRemove ? character : false,
      ];
      return checkMatch(getCharacters(), character)
        ? removeCondition
        : addCondition;
    };

    return characters.length
      ? characters
          .map((character) => filterCharacterByType(character))
          .filter((el) => el)
      : [];
  };

  const sendNotice = (text, type) => dispatch(addNotify(text, type));

  const sendNoticeForMultiple = (characters, type) =>
    sendNotice(
      characters.length === 1
        ? `There is ${type === 'add' ? 'already' : 'no'} such a character: "${
            characters[0]
          }"`
        : `There is ${
            type === 'add' ? 'already' : 'no'
          } such characters: "${characters.join(',')}"`,
      'error'
    );

  return {
    characterTypes: ['a-i', 'a-is', 'r-i', 'r-is'],
    characterListUI: {
      clearList: () => {
        storage.add(KEY, []);
      },
      removeItem: (character) => {
        const charactersCopy = [...getCharacters()];
        charactersCopy.splice(character, 1);
        storage.add(KEY, charactersCopy);
        sendNotice('Removed successfully', 'success');
      },
      removeMultipleItems: (c) => {
        const characters = getUniqueArr(c);
        const matchedCharacters = getMatchedCharacters(characters, 'remove');
        if (!!matchedCharacters.length)
          sendNoticeForMultiple(matchedCharacters);
        else {
          const filteredCharacters = getCharacters().filter(
            (character) => characters.indexOf(character) === -1
          );
          console.log(filteredCharacters, getCharacters(), characters);
          storage.add(KEY, filteredCharacters);
          sendNotice('Removed successfully', 'success');
        }
      },
      addItem: (character) => {
        const characters = getCharacters();
        const match = checkMatch(characters, character);
        if (match)
          sendNotice('There is already such a character in the list', 'error');
        else {
          storage.add(KEY, getUniqueArr([...getCharacters(), character]));
          sendNotice('Added successfully', 'success');
        }
      },
      addMultipleItems: (characters) => {
        const matchedCharacters = getMatchedCharacters(characters, 'add');
        if (!!matchedCharacters.length)
          sendNoticeForMultiple(matchedCharacters);
        else {
          storage.add(KEY, getUniqueArr([...getCharacters(), ...characters]));
          sendNotice('Added successfully', 'success');
        }
      },
      getList: () => getCharacters(),
    },
  };
};

export default useCharacterList;
