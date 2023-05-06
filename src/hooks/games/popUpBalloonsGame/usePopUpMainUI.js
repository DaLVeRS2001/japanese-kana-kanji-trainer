import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addNotify } from 'features/notify';
import { actions as trainerActions } from 'features/trainer';
import {
  getSeconds,
  getMinutes,
  getRandomNumber,
  cancelAllTimeouts,
  getRandomLeftIndent,
  cancelAllAnimationFrames,
  moveElementsWithSameCoords,
} from 'shared/helpers';
import { gameNames, popUpBalloonsGameDefaultSettings } from 'shared/utils/data';

const usePopUpMainUI = ({ gameSettings, characters }) => {
  const dispatch = useDispatch();

  const isGameRunning = useSelector(
    (state) => state.trainer.activeGames[gameNames[0]],
    shallowEqual
  );

  const sendNotice = (text, type) => dispatch(addNotify(text, type));

  const { gapsBetweenBalloons } = popUpBalloonsGameDefaultSettings;

  const startGame = (isActive) => {
    dispatch(
      trainerActions.changeActiveGame({ gameName: gameNames[0], isActive })
    );
  };

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
      balloons.length > 0
        ? getSeconds(gameSettings.balloonsSpeed.creationInterval)
        : 1;
    setTimeout(() => {
      handleChangeBalloonCount();
    }, interval);
  };

  const stop = () => {
    startGame(false);
    cancelAllTimeouts();
    cancelAllAnimationFrames();
    changeBalloonCount([]);
  };
  const start = () => {
    const [isTimeZero, isCharacterCountZero, isNoCharacters] = [
      gameSettings.gameTime.time === 0,
      gameSettings.characterRowCount === 0,
      !characters.length,
    ];
    switch (true) {
      case isTimeZero:
        return sendNotice('Game time is 0', 'error');
      case isCharacterCountZero:
        return sendNotice('Character row count is 0', 'error');
      case isNoCharacters:
        return sendNotice(
          'You have added no character yet to start the game',
          'error'
        );
      default:
        startGame(true);
        startGameCreationTimeout();
        const isGameWithTimeLimit =
          !gameSettings.gameTime.isInfinite && !balloons.length;
        if (isGameWithTimeLimit) {
          const timeoutTime = getMinutes(gameSettings.gameTime.time);
          setTimeout(() => {
            stop();
          }, [timeoutTime]);
        }
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
