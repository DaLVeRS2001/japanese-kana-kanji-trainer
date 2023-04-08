import block from 'bem-cn';
import PT from 'prop-types';
import { useMemo } from 'react';
import { useRef } from 'react';
import { getRandomKey } from 'shared/helpers';
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

  const {
    balloons,
    gameSettings,
    startGame,
    stopGame,
    isGameRunning,
    balloonRef,
    gameFieldRef,
    // outBalloon,
  } = usePopUpBalloonsGame(characters);

  useEffect(() => {
    return () => {
      stopGame();
      balloons.map((el) => cancelAnimationFrame(el.animationFrame));
    };
  }, []);

  const BalloonComponent = ({ balloon }) =>
    useMemo(() => {
      return (
        <div
          id={balloon.id}
          ref={(el) => balloonRef(el, balloon)}
          className={b('balloon', { id: balloon.id })}
        >
          {balloon.characters.map((character, idx) => {
            return (
              <span key={getRandomKey(idx)} className={b('balloon__character')}>
                {character}
              </span>
            );
          })}
        </div>
      );
    }, [balloons]);

  return (
    <div className={b()}>
      <div ref={gameFieldRef} className={b('game')}>
        {!!balloons.length &&
          balloons.map((balloon, idx) => (
            <BalloonComponent key={getRandomKey(idx)} balloon={balloon} />
          ))}
      </div>
    </div>
  );
};
export default PopUpBalloonsGame;
