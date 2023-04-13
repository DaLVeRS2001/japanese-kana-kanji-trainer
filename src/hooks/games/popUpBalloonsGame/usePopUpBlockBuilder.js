import { useEffect, useState } from 'react';

const usePopUpBlockBuilder = ({
  findHighestBalloon,
  balloons,
  balloonElements,
  gameFieldRef,
}) => {
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
      const highestBalloon = findHighestBalloon(balloonElements);
      setGameBlocks({
        type: 1,
        blocks: [
          ...blocks.slice(0, blocks.length - 1),
          { ...blocks[blocks.length - 1], to: +balloon.id - 1 },
          {
            id: blocks[blocks.length - 1].id + 1,
            top: highestBalloon.offsetHeight + highestBalloon.offsetTop,
            from: +balloon.id - 1,
            to: undefined,
            blockCount: blocks[blocks.length - 1].blockCount + 1,
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
