import { popUpBalloonsGameDefaultSettings } from 'shared/utils/data';
import { useEffect, useState } from 'react';

const usePopUpBlockBuilder = ({
  balloons,
  balloonElements,
  gameFieldRef,
  isGameRunning,
}) => {
  const { gapsBetweenBalloons } = popUpBalloonsGameDefaultSettings;

  const gameBlockTemplate = {
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
  };

  const [gameBlocks, setGameBlocks] = useState({ ...gameBlockTemplate });

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
      if (lastBalloon) {
        const gameFieldWidth = gameFieldRef.current.offsetWidth;
        const { offsetWidth: balloonWidth, offsetLeft: balloonLeft } =
          lastBalloon;
        const isBalloonOutsideGameField =
          balloonWidth + balloonLeft > gameFieldWidth;
        constructBlock(isBalloonOutsideGameField, lastBalloon);
      }
    }
  };

  useEffect(() => {
    const isGameFinished = !isGameRunning && gameBlocks.blocks.length > 0;
    if (isGameFinished) setGameBlocks({ ...gameBlockTemplate });
  }, [isGameRunning]);

  useEffect(() => {
    lowerBalloonsToNextLine();
  }, [balloons]);

  return { gameBlocks };
};

export default usePopUpBlockBuilder;
