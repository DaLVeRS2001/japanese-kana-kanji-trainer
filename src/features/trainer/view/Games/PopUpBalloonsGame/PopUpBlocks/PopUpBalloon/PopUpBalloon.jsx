import block from 'bem-cn';
import PT from 'prop-types';
import { getRandomKey, createMultipleRef } from 'shared/helpers';
import { refsProp } from 'shared/utils/data';

import './PopUpBalloon.scss';

const b = block('balloon');

const PopUpBalloon = ({
  balloonRefs,
  balloon,
  setLeftIndentToBalloon,
  blockIdx,
}) => {
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
      className={b({ id: balloon.id })}
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
};

PopUpBalloon.propTypes = {
  balloonRefs: refsProp,
  balloon: PT.object.isRequired,
  setLeftIndentToBalloon: PT.func.isRequired,
  blockIdx: PT.number.isRequired,
};

export default PopUpBalloon;
