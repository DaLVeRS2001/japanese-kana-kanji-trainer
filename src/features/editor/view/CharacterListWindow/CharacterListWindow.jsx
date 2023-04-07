import block from 'bem-cn';
import PT from 'prop-types';
import { useMemo } from 'react';
import Button from 'components/Button';
import SVG from 'components/SVG';
import crossSvg from '../../img/cross.svg';

import './CharacterListWindow.scss';

const b = block('character-list-window');

const CharacterListWindow = ({ list, remove }) => {
  const characters = useMemo(
    () =>
      list.map((character) => {
        return (
          <div key={character} className={b('character')}>
            <span className={b('character-text')}>{character}</span>
            <SVG
              className={b('svg', { remove: true }).toString()}
              svgProps={{ svg: crossSvg }}
              onClick={() => remove(character)}
            />
          </div>
        );
      }),
    [list]
  );

  return (
    <div className={b()}>
      <div className={b('list')}>
        {!characters.length && <h1>No added characters</h1>}
        {characters}
      </div>
    </div>
  );
};

//        <Button callBack={() => callBack(0)} text="No" />

CharacterListWindow.propTypes = {
  remove: PT.func.isRequired,
  list: PT.arrayOf(PT.string).isRequired,
};

export default CharacterListWindow;
