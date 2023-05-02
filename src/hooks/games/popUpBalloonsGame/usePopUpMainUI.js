import { useEffect, useState } from 'react';
import {
  getRandomNumber,
  getRandomLeftIndent,
  cancelAllAnimationFrames,
  moveElementsWithSameCoords,
} from 'shared/helpers';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/data';

const usePopUpMainUI = ({ gameSettings, characters }) => {
  let createBalloonTimeoutID;

  const { gapsBetweenBalloons } = popUpBalloonsGameDefaultSettings;

  const [isGameRunning, startGame] = useState(false);

  const [balloons, changeBalloonCount] = useState([]);

  const getRandomCharacterCountInBalloon = () => {
    const maxCount = gameSettings.characterRowCount;
    return getRandomNumber(maxCount);
  };

  const setLeftIndentToBalloon = ({ target, balloon, blockIdx, refs }) => {
    const isBalloon = target && balloon;
    if (!isBalloon) return;
    target.style.bottom = `-${target.offsetHeight}px`;
    const prevBalloon = refs.current[balloon.id - 2];
    if (prevBalloon) {
      const balloonIndent = prevBalloon.offsetWidth + prevBalloon.offsetLeft;
      const gapColumn = gameSettings.hasRandomOrder
        ? 0
        : gapsBetweenBalloons.column;
      const left = blockIdx === 0 ? 0 : balloonIndent + gapColumn;
      target.style.left = gameSettings.hasRandomOrder
        ? getRandomLeftIndent({
            indent: balloon.randomLeftAdditionalPosition,
            target,
            mainLeft: left,
          })
        : `${left}px`;
      moveElementsWithSameCoords({ prevEl: prevBalloon, currentEl: target });
    }
  };

  const getRandomCharacters = () => {
    const characterCountInBalloon = getRandomCharacterCountInBalloon();
    return new Array(characterCountInBalloon)
      .fill(null)
      .map(() => characters[getRandomNumber(characters.length) - 1]);
  };

  const handleChangeBalloonCount = () => {
    const newBalloon = {
      characters: getRandomCharacters(),
      id: balloons.length + 1,
      randomLeftAdditionalPosition: [getRandomNumber(10), getRandomNumber(9)],
      animationFrame: (func) => requestAnimationFrame(func),
    };
    changeBalloonCount([...balloons, newBalloon]);
  };

  const startGameCreationTimeout = () => {
    const interval =
      balloons.length > 0 ? gameSettings.balloonsSpeed.creationInterval : 1;
    createBalloonTimeoutID = setTimeout(() => {
      handleChangeBalloonCount();
    }, interval);
  };

  const stop = () => {
    cancelAllAnimationFrames();
    clearTimeout(createBalloonTimeoutID);
    startGame(false);
  };

  const start = () => {
    startGame(true);
    startGameCreationTimeout();
    const isGameWithTimeLimit =
      !gameSettings.gameTime.isInfinite && !balloons.length;
    if (isGameWithTimeLimit) {
      setTimeout(() => {
        stop();
      }, [gameSettings.gameTime.time]);
    }
  };

  useEffect(() => {
    if (isGameRunning) startGameCreationTimeout();
  }, [balloons]);

  return {
    balloons,
    UI: {
      stopGame: stop,
      startGame: start,
      changeBalloonCount,
      setLeftIndentToBalloon,
    },
    isGameRunning,
  };
};

export default usePopUpMainUI;
