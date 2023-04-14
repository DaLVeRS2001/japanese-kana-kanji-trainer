import { useEffect } from 'react';
import { popUpBalloonsGameDefaultSettings } from 'features/trainer/data/index';

const usePopUpAnimations = ({ isGameRunning, balloons, balloonElements }) => {
  const { balloonsSpeed } = popUpBalloonsGameDefaultSettings;

  let start = 0;
  const setAnimationFrameToBalloon = (
    time,
    id,
    animationFrame,
    resetTime = false
  ) => {
    if (resetTime) start = time;
    const filtered = balloonElements.filter((el) => el);
    const isGameNotFinished = isGameRunning && id && filtered.length;
    if (isGameNotFinished) {
      animationFrame((time) =>
        setAnimationFrameToBalloon(time, id, animationFrame)
      );
      const progress = time - start;
      const match = balloonElements.find((el) => +el.id === id);
      const speed = (progress / 10000) * balloonsSpeed.speedUp * 100;
      match.style.transform = `translateY(-${speed}px)`;
    }
    return;
  };

  const animateBalloons = () => {
    const isGameStarted = !!balloons.length && isGameRunning;
    if (isGameStarted) {
      balloons[balloons.length - 1].animationFrame((time) =>
        setAnimationFrameToBalloon(
          time,
          balloons[balloons.length - 1].id,
          balloons[balloons.length - 1].animationFrame,
          true
        )
      );
    }
  };

  useEffect(() => {
    animateBalloons();
  }, [balloons]);
};

export default usePopUpAnimations;
