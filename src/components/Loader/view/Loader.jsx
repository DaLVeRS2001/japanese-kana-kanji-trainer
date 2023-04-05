import React from 'react';
import block from 'bem-cn';
import PT from 'prop-types';
import logoPng from 'shared/utils/images/logo.png';

import './Loader.scss';

const b = block('loader');

const Loader = () => {
  return (
    <div className={b()}>
      <img alt="logo" src={logoPng} />
      <h1>
        Japanese <br />
        kana & kanji <br />
        trainer
      </h1>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
