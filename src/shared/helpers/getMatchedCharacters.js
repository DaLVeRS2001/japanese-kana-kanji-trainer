import { checkMatch } from './helpers';

const getMatchedCharacters = ({ localCharacters, type, storageCharacters }) => {
  const isRemove = type === 'remove';
  const filterCharacterByType = (character) => {
    const [removeCondition, addCondition] = [
      isRemove ? false : character,
      isRemove ? character : false,
    ];
    return checkMatch(storageCharacters, character)
      ? removeCondition
      : addCondition;
  };
  return localCharacters.length
    ? localCharacters
        .map((character) => filterCharacterByType(character))
        .filter((el) => el)
    : [];
};

export default getMatchedCharacters;
