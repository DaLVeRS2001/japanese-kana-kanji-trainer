import { useState, useMemo } from 'react';
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

  const difficulties = useMemo(
    () =>
      [...Object.values(popUpBalloonsGameDifficulties)].map(
        ({ value, name }) => ({ value, name })
      ),
    []
  );

  const defaultSettings = {
    characterRowCount: characterRowCount.default,
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
    if (time >= 0 && time <= gameTime.max)
      setGameSettings({ ...gameSettings, gameTime: { time, isInfinite } });
  };

  const changeCharacterCountInRow = (count = characterRowCount.default) => {
    if (count >= 0 && count <= characterRowCount.max)
      setGameSettings({ ...gameSettings, characterRowCount: count });
  };

  const changeBalloonsOrder = (has = hasRandomOrder) => {
    setGameSettings({ ...gameSettings, hasRandomOrder: has });
  };

  const resetSettings = () => setGameSettings({ ...defaultSettings });

  return {
    gameSettings,
    difficulties,
    settingHandlers: {
      changeGameTime,
      changeGameDifficult,
      changeCharacterCountInRow,
      changeBalloonsOrder,
      resetSettings,
    },
  };
};

export default usePopUpBalloonsSettings;
