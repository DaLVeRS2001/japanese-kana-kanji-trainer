import { useEffect, useRef, useState } from 'react';
import usePopUpBalloonsSettings from './usePopUpSettings';
import usePopUpMainUI from './usePopUpMainUI';
import usePopUpAnimations from './usePopUpAnimations';

const usePopUpBalloonsGame = (characters = []) => {
  const { gameSettings } = usePopUpBalloonsSettings();
  const {
    UI: { startGame, stopGame, changeBalloonCount, findHighestBalloon },
    balloons,
    isGameRunning,
  } = usePopUpMainUI(gameSettings, characters);

  const balloonRefs = useRef([]);
  const gameFieldRef = useRef();
  const balloonElements = balloonRefs.current ?? [];

  usePopUpAnimations(isGameRunning, balloons, balloonElements);

  const [animations, changeAnimations] = useState([]);

  const balloonRef = (refElement, balloon) => {
    const isNextBalloon = refElement;
    if (isNextBalloon) {
      // const prevBalloon = balloonRefs.current[balloon.id - 2];
      // if (prevBalloon) {
      //   const balloonIndent = prevBalloon.offsetWidth + prevBalloon.offsetLeft;
      // refElement.style.transform = `translateX(${balloonIndent}px)`;
      //`${balloon.left ?? balloonIndent}px`;
      // if (balloon.top) refElement.style.top = `${balloon.top}px`;
    }
    balloonRefs.current[balloon.id - 1] = refElement;
  };

  useEffect(() => {
    startGame(true);
    return () => stopGame();
  }, []);

  return {
    balloons,
    gameSettings,
    startGame,
    stopGame,
    isGameRunning,
    balloonRef,
    gameFieldRef,
  };
};

export default usePopUpBalloonsGame;

// //const usePopUpBalloonsGame = (characters = []) => {
//   const { gameSettings } = usePopUpBalloonsSettings();
//   // const [outBalloon, setOutBalloon] = useState(null);

//   const {
//     UI: { startGame, stopGame, changeBalloonCount, findHighestBalloon },
//     balloons,
//     isGameRunning,
//   } = usePopUpMainUI(gameSettings, characters);

//   const balloonRefs = useRef([]);

// const gameFieldRef = useRef();

// const balloonElements = balloonRefs.current ?? [];

// const balloonRef = (refElement, balloon) => {
//   const isNextBalloon = refElement && refElement.id > 1;
//   if (isNextBalloon) {
//     const prevBalloon = balloonRefs.current[balloon.id - 2];
//     if (prevBalloon) {
//       const balloonIndent = prevBalloon.offsetWidth + prevBalloon.offsetLeft;
//       // refElement.style.transform = `translateX(${balloonIndent}px)`;
//       //`${balloon.left ?? balloonIndent}px`;
//       // if (balloon.top) refElement.style.top = `${balloon.top}px`;
//     }
//   }
//   balloonRefs.current[balloon.id - 1] = refElement;
// };

// const lowerToNextLine = () => {
//   if (!!balloons.length) {
//     const lastBalloon = balloonElements[balloons.length - 1];
//     const gameFieldWidth = gameFieldRef.current.offsetWidth;
//     const { offsetWidth: balloonWidth, offsetLeft: balloonLeft } =
//       lastBalloon;
//     const isBalloonOutsideGameField =
//       balloonWidth + balloonLeft > gameFieldWidth;
//     if (isBalloonOutsideGameField) {
//       const highestBalloon = findHighestBalloon(balloonElements);
//       if (highestBalloon && !outBalloon) {
//         setOutBalloon({
//           id: lastBalloon.id,
//           height: highestBalloon.offsetHeight,
//           top: lastBalloon.offsetTop,
//         });
//       }
//     }
//     return;
//   }
//   return;
// };

// const handleSetOutBalloon = () => {
//   const index = outBalloon.id - 1;
//   const newBalloon = {
//     ...balloons[index],
//     left: 0,
//     top: outBalloon.height,
//   };
//   const balloonsCopy = [...balloons];
//   balloonsCopy.splice(index, 1, newBalloon);
//   changeBalloonCount(balloonsCopy);
// };

// useEffect(() => {
//   startGame(true);
// }, []);

// useEffect(() => {
//   // lowerToNextLine();
//   // console.log(balloons);
// }, [balloons]);

// useEffect(() => {
//   if (outBalloon) {
//     console.log(outBalloon);
//     handleSetOutBalloon();
//   }
// }, [outBalloon]);

//   return {
//     balloons,
//     gameSettings,
//     startGame,
//     stopGame,
//     isGameRunning,
//     balloonRef,
//     gameFieldRef,
//     // outBalloon,
//   };
// };

// export default usePopUpBalloonsGame;
