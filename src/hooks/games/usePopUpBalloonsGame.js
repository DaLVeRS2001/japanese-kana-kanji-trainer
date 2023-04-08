import { useEffect } from 'react';
import { useState } from 'react';
import { getRandomNumber } from 'shared/helpers';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/trash';

const usePopUpBalloonsGame = (characters = []) => {
  let createBalloonTimeoutID;
  const [isGameRunning, runGame] = useState(false);

  const { balloonCharacterCount, gameTime, balloonsSpeed } =
    popUpBalloonsGameDefaultSettings;

  const [balloons, changeBalloonCount] = useState([]);

  const [gameSettings, setGameSettings] = useState({
    balloonCharacterCount: balloonCharacterCount.default,
    gameTime: { time: gameTime.default, isInfinite: gameTime.isInfinite },
    balloonsSpeed: {
      creationInterval: balloonsSpeed.creationInterval.min,
    },
  });

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
    };
    changeBalloonCount([...balloons, newBalloon]);
  };

  const stop = () => {
    clearTimeout(createBalloonTimeoutID);
    runGame(false);
  };

  const startGameCreationTimeout = () => {
    createBalloonTimeoutID = setTimeout(() => {
      handleChangeBalloonCount();
    }, gameSettings.balloonsSpeed.creationInterval);
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
    else if (isGameFinished) changeBalloonCount([]); //then we can delete this, cuz game finished when we fill the last balloons
    return;
  };

  useEffect(() => {
    runGame(true);
  }, []);

  useEffect(() => {
    if (isGameRunning) start();
  }, [isGameRunning]);

  useEffect(() => {
    stopGame();
    console.log(balloons, 'balloons');
  }, [balloons]);

  return { balloons, gameSettings, runGame, stopGame, isGameRunning };
};

export default usePopUpBalloonsGame;
