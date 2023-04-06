import React, { useCallback } from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import ReactDOM from 'react-dom';

import './Modal.scss';

const b = block('modal');

const Modal = ({ onClose, children, ...restProps }) => {
  const stop = useCallback((e) => e.stopPropagation(), []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const content = (
    <div className={b()} onMouseDown={handleClose}>
      <div
        {...restProps}
        className={b('content-container')}
        onMouseDown={stop}
        onMouseUp={stop}
        onClick={stop}
      >
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-root'));
};

Modal.propTypes = {
  onClose: PT.func.isRequired,
  children: PT.node.isRequired,
};

export default Modal;
