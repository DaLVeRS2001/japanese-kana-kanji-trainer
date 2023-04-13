import { useEffect, useRef, useState } from 'react';
import usePopUpBalloonsSettings from './usePopUpSettings';
import usePopUpMainUI from './usePopUpMainUI';
import usePopUpAnimations from './usePopUpAnimations';
import usePopUpBlockBuilder from './usePopUpBlockBuilder';

const usePopUpBalloonsGame = (characters = []) => {
  const { gameSettings } = usePopUpBalloonsSettings();

  const {
    UI: { startGame, stopGame, setLeftIndentToBalloon, findHighestBalloon },
    balloons,
    isGameRunning,
  } = usePopUpMainUI({ gameSettings, characters });

  const [balloonRefs, blockRefs, gameFieldRef] = [
    useRef([]),
    useRef([]),
    useRef(),
  ];
  const balloonElements = balloonRefs.current ?? [];

  usePopUpAnimations({ isGameRunning, balloons, balloonElements });

  const { gameBlocks } = usePopUpBlockBuilder({
    balloons,
    findHighestBalloon,
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
