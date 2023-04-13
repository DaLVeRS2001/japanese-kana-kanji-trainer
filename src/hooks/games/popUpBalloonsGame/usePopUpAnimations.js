import { useEffect } from 'react';

const usePopUpAnimations = ({ isGameRunning, balloons, balloonElements }) => {
  const setAnimationFrameToBalloon = (time, id, animationFrame) => {
    const filtered = balloonElements.filter((el) => el);
    const isGameNotFinished = isGameRunning && id && filtered.length;
    if (isGameNotFinished) {
      animationFrame((time) =>
        setAnimationFrameToBalloon(time, id, animationFrame)
      );
      const match = balloonElements.find((el) => +el.id === id);
      match.style.transform = `translateY(-${time / 100}px)`;
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
          balloons[balloons.length - 1].animationFrame
        )
      );
    }
  };

  useEffect(() => {
    animateBalloons();
  }, [balloons]);
};

export default usePopUpAnimations;
