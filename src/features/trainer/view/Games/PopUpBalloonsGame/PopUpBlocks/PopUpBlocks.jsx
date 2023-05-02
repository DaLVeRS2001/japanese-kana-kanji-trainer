import block from 'bem-cn';
import PT from 'prop-types';
import { getRandomKey, createMultipleRef } from 'shared/helpers';
import { refsProp } from 'shared/utils/data';
import PopUpBalloon from './PopUpBalloon/PopUpBalloon';

import './PopUpBlocks.scss';

const b = block('pop-up-blocks');

const PopUpBlocks = ({
  refs,
  balloons,
  gameBlocks,
  setLeftIndentToBalloon,
}) => {
  const { blockRefs, balloonRefs } = refs;

  const Blocks = gameBlocks.map((block) => (
    <div
      key={block.id}
      ref={(el) =>
        createMultipleRef({
          target: el,
          refs: blockRefs,
          targetId: block.id,
        })
      }
      style={{ transform: `translateY(${block.top}px)` }}
      className={b('block')}
    >
      {balloons.slice(block.from, block.to).map((balloon, idx) => (
        <PopUpBalloon
          key={getRandomKey(idx)}
          balloon={balloon}
          blockIdx={idx}
          balloonRefs={balloonRefs}
          setLeftIndentToBalloon={setLeftIndentToBalloon}
        />
      ))}
    </div>
  ));

  if (!Blocks.length) return;

  return <div className={b()}>{Blocks}</div>;
};

PopUpBlocks.propTypes = {
  refs: PT.exact({
    blockRefs: refsProp,
    balloonRefs: refsProp,
  }).isRequired,
  balloons: PT.array.isRequired,
  gameBlocks: PT.array.isRequired,
  setLeftIndentToBalloon: PT.func.isRequired,
};

export default PopUpBlocks;
