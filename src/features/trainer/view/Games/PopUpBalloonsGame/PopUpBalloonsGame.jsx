import block from 'bem-cn';
import { useMemo } from 'react';
import { usePopUpBalloonsGame, useCharacterList } from 'hooks';
import PopUpBlocks from './PopUpBlocks/PopUpBlocks';

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
    UI: { startGame, stopGame, setLeftIndentToBalloon },
  } = usePopUpBalloonsGame(characters);

  return (
    <div className={b()}>
      <div ref={gameFieldRef} className={b('game')}>
        <PopUpBlocks
          balloons={balloons}
          refs={{ balloonRefs, blockRefs }}
          gameBlocks={gameBlocks.blocks}
          setLeftIndentToBalloon={setLeftIndentToBalloon}
        />
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
