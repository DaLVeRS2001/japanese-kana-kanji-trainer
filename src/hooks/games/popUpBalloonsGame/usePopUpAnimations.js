import { useEffect } from 'react';

const usePopUpAnimations = ({
  isGameRunning,
  balloons,
  balloonElements,
  gameSettings,
}) => {
  let start = 0;
  let balloonSpeed = gameSettings.balloonsSpeed.speedUp;

  const setAnimationFrameToBalloon = (
    time,
    id,
    animationFrame,
    resetTime = false
  ) => {
    const filtered = balloonElements.filter((el) => el);
    const isGameNotFinished = isGameRunning && id && filtered.length;
    if (isGameNotFinished) {
      if (resetTime) start = time;
      animationFrame((time) =>
        setAnimationFrameToBalloon(time, id, animationFrame)
      );
      const progress = time - start;
      const match = balloonElements.find((el) => +el.id === id);
      const speed = (progress / 10000) * balloonSpeed * 100;
      match.style.bottom = `${speed - match.offsetHeight * 1.2}px`;
    }
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
