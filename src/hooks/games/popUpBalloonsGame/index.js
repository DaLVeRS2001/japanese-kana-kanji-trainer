import { useEffect, useRef } from 'react';
import usePopUpBalloonsSettings from './usePopUpSettings';
import usePopUpMainUI from './usePopUpMainUI';
import usePopUpAnimations from './usePopUpAnimations';
import usePopUpBlockBuilder from './usePopUpBlockBuilder';

const usePopUpBalloonsGame = (characters = []) => {
  const { gameSettings } = usePopUpBalloonsSettings();

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
  } = usePopUpMainUI({ gameSettings, characters });

  usePopUpAnimations({
    isGameRunning,
    balloons,
    balloonElements,
  });

  const { gameBlocks } = usePopUpBlockBuilder({
    balloons,
    balloonElements,
    gameFieldRef,
  });

  useEffect(() => {
    startGame(true);
    return () => stopGame();
  }, []);

  return {
    balloons,
    gameSettings,
    gameBlocks,
    isGameRunning,
    refs: {
      balloonRefs,
      gameFieldRef,
      blockRefs,
    },
    UI: {
      startGame,
      stopGame,
      setLeftIndentToBalloon,
    },
  };
};

export default usePopUpBalloonsGame;
