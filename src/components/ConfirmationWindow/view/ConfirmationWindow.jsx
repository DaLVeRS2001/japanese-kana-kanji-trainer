import React, { useCallback } from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import Button from 'components/Button';

import './ConfirmationWindow.scss';

const b = block('confirmation-window');

const ConfirmationWindow = ({ callBack }) => {
  return (
    <div className={b()}>
      <h1>Are you sure?</h1>
      <div className={b('buttons')}>
        <Button callBack={() => callBack(1)} text="Yes" background="red" />
        <Button callBack={() => callBack(0)} text="No" />
      </div>
    </div>
  );
};

ConfirmationWindow.propTypes = {
  callBack: PT.func.isRequired,
};

export default ConfirmationWindow;
