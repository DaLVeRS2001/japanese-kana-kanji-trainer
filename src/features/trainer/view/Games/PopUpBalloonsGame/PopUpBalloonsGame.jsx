import block from 'bem-cn';
import { useMemo } from 'react';

import { usePopUpBalloonsGame, useCharacterList } from 'hooks';

import Button from 'components/Button';
import PopUpBlocks from './PopUpBlocks/PopUpBlocks';
import PopUpSettings from './PopUpSettings/PopUpSettings';

import './PopUpBalloonsGame.scss';

const b = block('pop-up-balloons-game');

const PopUpBalloonsGame = () => {
  const { characterList } = useCharacterList();

  const characters = useMemo(
    () => [...characterList.list],
    [characterList.list]
  );

  const {
    balloons,
    gameSettings,
    isGameRunning,
    gameBlocks,
    difficulties,
    refs: { gameFieldRef, balloonRefs, blockRefs },
    UI: { startGame, stopGame, settingHandlers, setLeftIndentToBalloon },
  } = usePopUpBalloonsGame(characters);

  return (
    <div className={b({ isGameRunning })}>
      <div ref={gameFieldRef} className={b('game')}>
        {isGameRunning ? (
          <>
            <PopUpBlocks
              balloons={balloons}
              refs={{ balloonRefs, blockRefs }}
              gameBlocks={gameBlocks.blocks}
              setLeftIndentToBalloon={setLeftIndentToBalloon}
            />
            <div className={b('buttons')}>
              <Button
                text="Pause Game"
                callBack={startGame}
                background="green"
              />
              <Button text="Finish Game" callBack={stopGame} background="red" />
            </div>
          </>
        ) : (
          <PopUpSettings
            settingHandlers={settingHandlers}
            difficulties={difficulties}
            startGame={startGame}
            gameSettings={gameSettings}
          />
        )}
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
