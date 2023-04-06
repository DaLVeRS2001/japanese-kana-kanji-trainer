import block from 'bem-cn';
import logoPng from 'shared/utils/images/logo.png';

import './Header.scss';

const b = block('header');

const Header = () => {
  return (
    <header className={b()}>
      <img alt="logo" src={logoPng} />
      <h1>
        Japanese <br />
        kana & kanji <br />
        trainer
      </h1>
    </header>
  );
};

Header.propTypes = {};

export default Header;
