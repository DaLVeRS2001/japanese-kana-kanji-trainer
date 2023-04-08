import { useEffect, useState } from 'react';
import { getRandomNumber } from 'shared/helpers';

const usePopUpMainUI = (gameSettings, characters) => {
  let createBalloonTimeoutID;

  const [isGameRunning, startGame] = useState(false);

  const [balloons, changeBalloonCount] = useState([]);

  const getRandomCharacterCountInBalloon = () => {
    const maxCount = gameSettings.balloonCharacterCount;
    return getRandomNumber(maxCount);
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
    clearTimeout(createBalloonTimeoutID);
    startGame(false);
  };

  const start = () => {
    startGameCreationTimeout();
    const isGameWithTimeLimit =
      !gameSettings.gameTime.isInfinite && !balloons.length;
    if (isGameWithTimeLimit) {
      setTimeout(() => {
        stop();
      }, [gameSettings.gameTime.time]);
    }
  };

  const stopGame = () => {
    const isGameFinished = !isGameRunning && !!balloons.length;
    if (isGameRunning) start(balloons);
    // else if (isGameFinished) changeBalloonCount([]); //then we can delete this, cuz game finished when we fill the last balloons
    return;
  };

  const findHighestBalloon = (elements) => {
    return elements.sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
  };

  useEffect(() => {
    if (isGameRunning) start();
  }, [isGameRunning]);

  useEffect(() => {
    stopGame();
  }, [balloons]);

  return {
    balloons,
    UI: { stopGame, startGame, changeBalloonCount, findHighestBalloon },
    isGameRunning,
  };
};

export default usePopUpMainUI;
