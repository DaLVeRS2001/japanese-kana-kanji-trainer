import block from 'bem-cn';
import PT from 'prop-types';
import { useMemo } from 'react';
import { useRef } from 'react';
import { getRandomKey } from 'shared/helpers';
import { usePopUpBalloonsGame, useCharacterList } from 'hooks';

import './PopUpBalloonsGame.scss';

const b = block('pop-up-balloons-game');

const PopUpBalloonsGame = () => {
  const { characterList } = useCharacterList();

  const characters = useMemo(
    () => [...characterList.list],
    [characterList.list]
  );

  const { balloons, gameSettings, runGame, stopGame, isGameRunning } =
    usePopUpBalloonsGame(characters);

  const gameRef = useRef();
  const ballonRef = useRef();

  const BalloonComponent = ({ balloon }) => (
    <div className={b('balloon', { id: balloon.id })}>
      {balloon.characters.map((character, idx) => {
        return (
          <span key={getRandomKey(idx)} className={b('balloon__character')}>
            {character}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className={b()}>
      {/* <div>PopUpBalloonsGame</div> */}
      <div ref={gameRef} className={b('game')}>
        {!!balloons.length &&
          balloons.map((balloon, idx) => (
            <BalloonComponent key={getRandomKey(idx)} balloon={balloon} />
          ))}
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
