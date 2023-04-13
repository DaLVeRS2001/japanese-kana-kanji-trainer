import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { getUniqueArr, checkMatch } from 'shared/helpers';
import { addNotify } from 'features/notify';
import { useState } from 'react';
import { characterTypes } from 'features/editor/data';
import { useEffect } from 'react';

const useCharacterList = () => {
  const storage = useLocalStorage();
  const dispatch = useDispatch();

  const KEY = 'characters';

  const getCharacters = () => getUniqueArr(storage.get(KEY) ?? []);

  const [characterList, changeCharacterList] = useState({
    isOpen: false,
    list: getCharacters(),
  });

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

  const characterListUI = {
    clearList: () => {
      const characters = getCharacters();
      if (!characters.length) sendNotice('The list is already empty', 'error');
      else {
        storage.add(KEY, []);
        sendNotice('Cleared successfully', 'success');
      }
    },
    removeItem: (character) => {
      const charactersCopy = [...getCharacters()];
      const idx = charactersCopy.indexOf(character);
      charactersCopy.splice(idx, 1);
      storage.add(KEY, charactersCopy);
      sendNotice('Removed successfully', 'success');
    },
    removeMultipleItems: (c) => {
      const characters = getUniqueArr(c);
      const matchedCharacters = getMatchedCharacters(characters, 'remove');
      if (!!matchedCharacters.length) sendNoticeForMultiple(matchedCharacters);
      else {
        const filteredCharacters = getCharacters().filter(
          (character) => characters.indexOf(character) === -1
        );
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
      if (!!matchedCharacters.length) sendNoticeForMultiple(matchedCharacters);
      else {
        storage.add(KEY, getUniqueArr([...getCharacters(), ...characters]));
        sendNotice('Added successfully', 'success');
      }
    },
    getList: () => getCharacters(),
  };

  const onChangeCharacterList = (onlyList = false) => {
    const list = characterListUI.getList();
    const isOpen = onlyList ? characterList.isOpen : !characterList.isOpen;
    changeCharacterList({ list: [...list], isOpen });
  };

  const handleCharacterList = (type, value = null, callBack) => {
    const typeExceptions = [characterTypes[5], characterTypes[4]];
    if (typeExceptions.indexOf(type) === -1 && !value) {
      sendNotice('The field is empty', 'error');
      return;
    }
    switch (type) {
      case characterTypes[0]:
        characterListUI.addItem(value);
        break;
      case characterTypes[1]:
        characterListUI.addMultipleItems(value.split(','));
        break;
      case characterTypes[2]:
        characterListUI.removeItem(value);
        onChangeCharacterList(true);
        break;
      case characterTypes[3]:
        characterListUI.removeMultipleItems(value.split(','));
        break;
      case characterTypes[4]:
        onChangeCharacterList();
        break;
      default:
        callBack();
    }
  };

  useEffect(() => {
    characterListUI.getList();
  }, []);

  return {
    characterListUI,
    handleCharacterList,
    characterList,
    closeCharacterList: () =>
      changeCharacterList({ ...characterList, isOpen: false }),
  };
};

export default useCharacterList;
