import { popUpBalloonsGameDefaultSettings } from 'features/trainer/data';
import { useEffect, useState } from 'react';

const usePopUpBlockBuilder = ({ balloons, balloonElements, gameFieldRef }) => {
  const { gapsBetweenBalloons } = popUpBalloonsGameDefaultSettings;

  const [gameBlocks, setGameBlocks] = useState({
    type: 0,
    blocks: [
      {
        id: 1,
        top: 0,
        from: 0,
        to: undefined,
        blockCount: 1,
      },
    ],
  });

  const constructBlock = (isBalloonOutsideGameField, balloon) => {
    const { blocks } = gameBlocks;
    const isSuccess = isBalloonOutsideGameField && gameBlocks.type === 0;
    if (isSuccess) {
      const idx = blocks.length - 1;
      const id = blocks[idx].id + 1;
      setGameBlocks({
        type: 1,
        blocks: [
          ...blocks.slice(0, idx),
          { ...blocks[idx], to: +balloon.id - 1 },
          {
            id,
            top: gapsBetweenBalloons.row,
            from: +balloon.id - 1,
            to: undefined,
            blockCount: blocks[idx].blockCount + 1,
          },
        ],
      });
    } else if (gameBlocks.type !== 0) setGameBlocks({ ...gameBlocks, type: 0 });
  };

  const lowerBalloonsToNextLine = () => {
    if (!!balloons.length) {
      const lastBalloon = balloonElements[balloons.length - 1];
      const gameFieldWidth = gameFieldRef.current.offsetWidth;
      const { offsetWidth: balloonWidth, offsetLeft: balloonLeft } =
        lastBalloon;
      const isBalloonOutsideGameField =
        balloonWidth + balloonLeft > gameFieldWidth;
      constructBlock(isBalloonOutsideGameField, lastBalloon);
    }
  };

  useEffect(() => {
    lowerBalloonsToNextLine();
  }, [balloons]);

  return { gameBlocks };
};

export default usePopUpBlockBuilder;
