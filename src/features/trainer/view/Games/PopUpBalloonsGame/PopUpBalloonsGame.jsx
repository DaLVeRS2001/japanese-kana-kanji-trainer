import block from 'bem-cn';
import { useMemo } from 'react';
import { usePopUpBalloonsGame, useCharacterList } from 'hooks';
import PopUpBlocks from './PopUpBlocks/PopUpBlocks';
import PopUpSettings from './PopUpSettings/PopUpSettings';
import test from './img/background.png';

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
    refs: { gameFieldRef, balloonRefs, blockRefs },
    UI: { startGame, stopGame, settingHandlers, setLeftIndentToBalloon },
  } = usePopUpBalloonsGame(characters);

  return (
    <div className={b({ isGameRunning })}>
      <div ref={gameFieldRef} className={b('game')}>
        {isGameRunning ? (
          <PopUpBlocks
            balloons={balloons}
            refs={{ balloonRefs, blockRefs }}
            gameBlocks={gameBlocks.blocks}
            setLeftIndentToBalloon={setLeftIndentToBalloon}
          />
        ) : (
          <PopUpSettings
            settingHandlers={settingHandlers}
            stopGame={stopGame}
            startGame={startGame}
            gameSettings={gameSettings}
          />
        )}
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
