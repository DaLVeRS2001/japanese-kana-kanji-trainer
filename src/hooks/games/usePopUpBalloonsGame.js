import { useEffect } from 'react';
import { useState } from 'react';
import { getRandomNumber } from 'shared/helpers';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/trash';

const usePopUpBalloonsGame = (characters = []) => {
  const { balloonCharacterCount } = popUpBalloonsGameDefaultSettings;
  const [gameSettings, setGameSettings] = useState({
    balloonCharacterCount: balloonCharacterCount.default,
    time: null,
  });

  const getRandomCharacterCountInBalloon = () => {
    const maxCount = gameSettings.balloonCharacterCount;
    return getRandomNumber(maxCount);
  };

  const getRandomCharacters = () => {
    const characterCountInBalloon = getRandomCharacterCountInBalloon();
    return new Array(characterCountInBalloon)
      .fill(null)
      .map(() => characters[getRandomNumber(characters.length) - 1]);
  };

  useEffect(() => {
    console.log(getRandomCharacters());
    console.log(characters);
  }, []);
};

export default usePopUpBalloonsGame;
