import block from 'bem-cn';
import React, { useState } from 'react';

import { useCharacterList } from 'hooks';
import { characterTypes } from 'features/editor/data';

import Input from 'components/Input';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ConfirmationWindow from 'components/ConfirmationWindow';
import CharacterListWindow from './CharacterListWindow';

import './Editor.scss';

const b = block('editor');

const Editor = () => {
  const {
    characterListUI,
    handleCharacterList,
    characterList,
    closeCharacterList,
  } = useCharacterList();
  const [isConfirmWindowOpen, changeConfirmWindow] = useState(false);

  const [state, setState] = useState({
    character: '',
    multipleCharacters: '',
    removedCharacters: '',
  });

  const handleInputChange = (e) => {
    const [name, value] = [e.currentTarget.name, e.currentTarget.value];
    setState({ ...state, [name]: value });
  };

  const handleOnConfirmWindow = (type) => {
    const isConfirmed = type === 1;
    if (isConfirmed) characterListUI.clearList();
    changeConfirmWindow(false);
  };

  return (
    <div className={b()}>
      {isConfirmWindowOpen && (
        <Modal onClose={handleOnConfirmWindow}>
          <ConfirmationWindow callBack={handleOnConfirmWindow} />
        </Modal>
      )}
      {characterList.isOpen && (
        <Modal onClose={closeCharacterList}>
          <CharacterListWindow
            list={characterList.list}
            remove={(character) =>
              handleCharacterList(characterTypes[2], character)
            }
          />
        </Modal>
      )}

      <div className={b('top')}>
        <div className={b('input')}>
          <Input
            onChange={handleInputChange}
            value={state.character}
            name="character"
            tooltip="The whole text in this field will be defined as a single row"
            placeholder="Row"
          />
          <Button
            text="Add character row"
            callBack={() =>
              handleCharacterList(characterTypes[0], state.character)
            }
          />
        </div>
        <div className={b('input')}>
          <Input
            onChange={handleInputChange}
            value={state.multipleCharacters}
            tooltip="Enter the list of character rows (that you want to add) separated by commas: 1, 2, 3..."
            placeholder="Row, Row..."
            name="multipleCharacters"
          />
          <Button
            text="Add a few character rows"
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
            tooltip="Enter the list of character rows (that you want to remove) separated by commas: 1, 2, 3..."
            placeholder="Row, Row..."
          />
          <Button
            text="Remove a few character rows"
            callBack={() =>
              handleCharacterList(characterTypes[3], state.removedCharacters)
            }
          />
        </div>
      </div>
      <div className={b('bottom')}>
        <div className={b('button')}>
          <Button
            text="Show the whole list"
            background="green"
            callBack={() => handleCharacterList(characterTypes[4])}
          />
        </div>
        <div className={b('button')}>
          <Button
            text="Clear the whole list"
            background="red"
            callBack={() =>
              handleCharacterList(characterTypes[5], null, () =>
                changeConfirmWindow(!isConfirmWindowOpen)
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
