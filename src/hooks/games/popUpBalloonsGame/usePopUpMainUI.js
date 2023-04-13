import { useEffect, useState } from 'react';
import { getRandomNumber } from 'shared/helpers';
import cancelAllAnimationFrames from 'shared/helpers/cancelAllAnimationFrames';

const usePopUpMainUI = ({ gameSettings, characters }) => {
  let createBalloonTimeoutID;

  const [isGameRunning, startGame] = useState(false);

  const [balloons, changeBalloonCount] = useState([]);

  const getRandomCharacterCountInBalloon = () => {
    const maxCount = gameSettings.balloonCharacterCount;
    return getRandomNumber(maxCount);
  };

  const setLeftIndentToBalloon = ({ target, balloon, blockIdx, refs }) => {
    const isBalloon = target && balloon;
    if (!isBalloon) return;
    const prevBalloon = refs.current[balloon.id - 2];
    if (prevBalloon) {
      const balloonIndent = prevBalloon.offsetWidth + prevBalloon.offsetLeft;
      target.style.left = `${blockIdx === 0 ? 0 : balloonIndent}px`;
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
      animationFrame: (func) => requestAnimationFrame(func),
    };
    changeBalloonCount([...balloons, newBalloon]);
  };

  const startGameCreationTimeout = () => {
    createBalloonTimeoutID = setTimeout(() => {
      handleChangeBalloonCount();
    }, gameSettings.balloonsSpeed.creationInterval);
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

  const findHighestBalloon = (elements) => {
    return elements.sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
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
      findHighestBalloon,
      setLeftIndentToBalloon,
    },
    isGameRunning,
  };
};

export default usePopUpMainUI;
