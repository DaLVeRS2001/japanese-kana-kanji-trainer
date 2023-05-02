import React from 'react';
import block from 'bem-cn';
import PT from 'prop-types';

import './Switcher.scss';

const b = block('switcher');

const Switcher = ({ isActive, onSwitch }) => {
  return (
    <div
      className={b({ active: isActive })}
      onClick={() => onSwitch(!isActive)}
    >
      <div className={b('indicator')} />
    </div>
  );
};

Switcher.propTypes = {
  isActive: PT.bool.isRequired,
  onSwitch: PT.func.isRequired,
};

export default Switcher;
