import { useState } from 'react';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/data';

const usePopUpBalloonsSettings = () => {
  const { balloonCharacterCount, gameTime, balloonsSpeed, hasRandomOrder } =
    popUpBalloonsGameDefaultSettings;

  const [gameSettings, setGameSettings] = useState({
    balloonCharacterCount: balloonCharacterCount.default,
    gameTime: { time: gameTime.default, isInfinite: gameTime.isInfinite },
    balloonsSpeed: {
      creationInterval: balloonsSpeed.creationInterval.min,
    },
    hasRandomOrder,
  });

  return { gameSettings, setGameSettings };
};

export default usePopUpBalloonsSettings;
