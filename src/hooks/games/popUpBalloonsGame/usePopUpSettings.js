import { useState } from 'react';
import {
  popUpBalloonsGameDefaultSettings,
  popUpBalloonsGameDifficulties,
} from 'shared/utils/data';

const usePopUpBalloonsSettings = () => {
  const {
    characterRowCount,
    gameTime,
    balloonsSpeed,
    hasRandomOrder,
    gameDifficult,
  } = popUpBalloonsGameDefaultSettings;

  const defaultSettings = {
    characterRowCount: +characterRowCount.default,
    gameTime: { time: gameTime.default, isInfinite: gameTime.isInfinite },
    balloonsSpeed: {
      creationInterval: balloonsSpeed.creationInterval,
      speedUp: balloonsSpeed.speedUp,
    },
    hasRandomOrder,
    gameDifficult,
  };

  const [gameSettings, setGameSettings] = useState({ ...defaultSettings });

  const changeGameDifficult = (type = gameDifficult.value) => {
    const difficult = popUpBalloonsGameDifficulties[type] ?? gameDifficult;
    setGameSettings({
      ...gameSettings,
      gameDifficult: difficult,
      balloonsSpeed: {
        creationInterval: difficult.creationInterval,
        speedUp: difficult.speedUp,
      },
    });
  };

  const changeGameTime = ({
    time = gameTime.default,
    isInfinite = gameTime.isInfinite,
  }) => {
    setGameSettings({ ...gameSettings, gameTime: { time, isInfinite } });
  };

  const changeCharacterCountInRow = (count = characterRowCount.default) => {
    setGameSettings({ ...gameSettings, characterRowCount: +count });
  };

  const resetSettings = () => setGameSettings({ ...defaultSettings });

  return {
    gameSettings,
    settingHandlers: {
      setGameSettings,
      changeGameTime,
      changeGameDifficult,
      changeCharacterCountInRow,
      resetSettings,
    },
  };
};

export default usePopUpBalloonsSettings;
