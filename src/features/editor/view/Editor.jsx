import block from 'bem-cn';
import React, { useState } from 'react';
import useCharacterList from 'hooks/useCharacterList';
import Input from 'components/Input';
import Button from 'components/Button';

import './Editor.scss';
import { useEffect } from 'react';

const b = block('editor');

const Editor = () => {
  const { characterListUI, characterTypes } = useCharacterList();
  useEffect(() => {}, []);

  const [state, setState] = useState({
    character: '',
    multipleCharacters: '',
    removedCharacters: '',
  });

  const handleCharacterList = (type, value) => {
    switch (type) {
      case characterTypes[0]:
        characterListUI.addItem(value);
        break;
      case characterTypes[1]:
        characterListUI.addMultipleItems(value.split(','));
        break;
      case characterTypes[2]:
        characterListUI.removeMultipleItems(value.split(','));
        break;
    }
  };

  const handleInputChange = (e) => {
    const [name, value] = [e.currentTarget.name, e.currentTarget.value];
    setState({ ...state, [name]: value });
  };

  return (
    <div className={b()}>
      <div className={b('left')}>
        <div className={b('input')}>
          <Input
            onChange={handleInputChange}
            value={state.character}
            name="character"
            tooltip="The whole text in this field will be defined as a single character"
            placeholder="Character"
          />
          <Button
            text="Add character"
            callBack={() =>
              handleCharacterList(characterTypes[0], state.character)
            }
          />
        </div>
        <div className={b('input')}>
          <Input
            onChange={handleInputChange}
            value={state.multipleCharacters}
            tooltip="Enter the list of characters (that you want to add) separated by commas: 1, 2, 3..."
            placeholder="Character, Character..."
            name="multipleCharacters"
          />
          <Button
            text="Add typed characters"
            callBack={() =>
              handleCharacterList(characterTypes[1], state.multipleCharacters)
            }
          />
        </div>
        <div className={b('input')}>
          <Input
            onChange={handleInputChange}
            value={state.removedCharacters}
            name="removedCharacters"
            tooltip="Enter the list of characters (that you want to remove) separated by commas: 1, 2, 3..."
            placeholder="Character, Character..."
          />
          <Button
            text="Remove typed characters"
            callBack={() =>
              handleCharacterList(characterTypes[2], state.removedCharacters)
            }
          />
        </div>
      </div>
      <div className={b('right')}></div>
    </div>
  );
};

export default Editor;
