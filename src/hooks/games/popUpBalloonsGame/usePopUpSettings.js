import { useEffect } from 'react';
import { useState, useMemo } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
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

  const storage = useLocalStorage();

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

  const localSettings = useMemo(
    () => storage.get('settings') ?? defaultSettings,
    []
  );

  const [gameSettings, setGameSettings] = useState({ ...localSettings });

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

  useEffect(() => {
    storage.add('settings', gameSettings);
  }, [gameSettings]);

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
