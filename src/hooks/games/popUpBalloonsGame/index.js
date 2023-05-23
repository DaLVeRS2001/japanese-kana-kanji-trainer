import { useEffect, useRef } from 'react';
import usePopUpBalloonsSettings from './usePopUpSettings';
import usePopUpMainUI from './usePopUpMainUI';
import usePopUpAnimations from './usePopUpAnimations';
import usePopUpBlockBuilder from './usePopUpBlockBuilder';

const usePopUpBalloonsGame = (characters = []) => {
  const { gameSettings, settingHandlers, difficulties } =
    usePopUpBalloonsSettings();

  const [balloonRefs, blockRefs, gameFieldRef] = [
    useRef([]),
    useRef([]),
    useRef(),
  ];
  const balloonElements = balloonRefs.current ?? [];

  const {
    UI: { startGame, stopGame, setLeftIndentToBalloon },
    balloons,
    isGameRunning,
    gameTimerString,
  } = usePopUpMainUI({ gameSettings, characters });

  usePopUpAnimations({
    isGameRunning,
    balloons,
    balloonElements,
    gameSettings,
  });

  const { gameBlocks } = usePopUpBlockBuilder({
    balloons,
    balloonElements,
    gameFieldRef,
    isGameRunning,
  });

  useEffect(() => {
    return () => stopGame();
  }, []);

  return {
    balloons,
    gameSettings,
    gameBlocks,
    isGameRunning,
    gameTimerString,
    difficulties,
    refs: {
      balloonRefs,
      gameFieldRef,
      blockRefs,
    },
    UI: {
      startGame,
      stopGame,
      settingHandlers,
      setLeftIndentToBalloon,
    },
  };
};

export default usePopUpBalloonsGame;
