import block from 'bem-cn';
import PT from 'prop-types';
import { useMemo } from 'react';
import { getRandomKey } from 'shared/helpers';
import { createMultipleRef } from 'shared/helpers';

import './PopUpBlocks.scss';

const b = block('pop-up-blocks');

const refsProp = PT.shape({ current: PT.arrayOf(PT.instanceOf(Element)) });

const PopUpBlocks = ({
  refs,
  balloons,
  gameBlocks,
  setLeftIndentToBalloon,
}) => {
  const { blockRefs, balloonRefs } = refs;

  const BalloonComponent = ({ balloon, blockIdx }) =>
    useMemo(() => {
      return (
        <div
          id={balloon.id}
          ref={(el) =>
            createMultipleRef({
              target: el,
              refs: balloonRefs,
              targetId: balloon.id,
              callback: () =>
                setLeftIndentToBalloon({
                  target: el,
                  refs: balloonRefs,
                  balloon,
                  blockIdx,
                }),
            })
          }
          className={b('balloon', { id: balloon.id })}
        >
          {balloon.characters.map((character, idx) => {
            return (
              <span key={getRandomKey(idx)} className={b('balloon__character')}>
                {character}
              </span>
            );
          })}
        </div>
      );
    }, [balloons]);

  const Blocks = gameBlocks.map((block) => (
    <div
      ref={(el) =>
        createMultipleRef({
          target: el,
          refs: blockRefs,
          targetId: block.id,
        })
      }
      style={{ top: `calc(100% + ${block.top}px)` }}
      className={b('block')}
    >
      {balloons.slice(block.from, block.to).map((balloon, idx) => (
        <BalloonComponent
          key={getRandomKey(idx)}
          balloon={balloon}
          blockIdx={idx}
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
