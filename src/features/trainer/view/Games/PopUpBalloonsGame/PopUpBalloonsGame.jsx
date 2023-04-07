import block from 'bem-cn';
import PT from 'prop-types';
import { useMemo } from 'react';
import { useRef } from 'react';
import { usePopUpBalloonsGame, useCharacterList } from 'hooks';

import './PopUpBalloonsGame.scss';
import { useEffect } from 'react';

const b = block('pop-up-balloons-game');

const PopUpBalloonsGame = () => {
  const { characterList } = useCharacterList();
  const characters = useMemo(
    () => [...characterList.list],
    [characterList.list]
  );

  const gameRef = useRef();
  const ballonRef = useRef();

  console.log(window);

  useEffect(() => {
    if (ballonRef.current && gameRef.current) console.log(ballonRef, gameRef);
  }, [ballonRef]);

  const kek = usePopUpBalloonsGame(characters);
  return (
    <div className={b()}>
      {/* <div>PopUpBalloonsGame</div> */}
      <div ref={gameRef} className={b('game')}>
        <div className={b('balloon')} ref={ballonRef}></div>
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
