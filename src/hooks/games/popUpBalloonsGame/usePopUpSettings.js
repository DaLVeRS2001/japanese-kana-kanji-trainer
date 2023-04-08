import { useState } from 'react';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/trash';

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

  return { gameSettings };
};

export default usePopUpBalloonsSettings;
