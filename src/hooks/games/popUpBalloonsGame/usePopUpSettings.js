import { useState } from 'react';
import { popUpBalloonsGameDefaultSettings } from 'features/trainer/data';

const usePopUpBalloonsSettings = () => {
  const { balloonCharacterCount, gameTime, balloonsSpeed } =
    popUpBalloonsGameDefaultSettings;

  const [gameSettings, setGameSettings] = useState({
    balloonCharacterCount: balloonCharacterCount.default,
    gameTime: { time: gameTime.default, isInfinite: gameTime.isInfinite },
    balloonsSpeed: {
      creationInterval: balloonsSpeed.creationInterval.min,
    },
  });

  return { gameSettings, setGameSettings };
};

export default usePopUpBalloonsSettings;
