import block from 'bem-cn';
import React, { useState } from 'react';
import useCharacterList from 'hooks/useCharacterList';
import Input from 'components/Input';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ConfirmationWindow from 'components/ConfirmationWindow';

import './Editor.scss';

const b = block('editor');

const Editor = () => {
  const { characterListUI, characterTypes, handleCharacterList } =
    useCharacterList();
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

      <div className={b('top')}>
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
              handleCharacterList(characterTypes[3], state.removedCharacters)
            }
          />
        </div>
      </div>
      <div className={b('bottom')}>
        <div className={b('clear')}>
          <Button
            text="Clear the whole list"
            background="red"
            callBack={() =>
              handleCharacterList(characterTypes[4], null, () =>
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
