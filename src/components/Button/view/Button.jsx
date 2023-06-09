import block from 'bem-cn';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.scss';

const b = block('button');

const Button = ({
  text,
  active = false,
  callBack,
  background = null,
  id = null,
  disabled = false,
  link,
  bemModule = null,
  type = null,
}) => {
  return link ? (
    <Link
      className={b({ isLink: true, bemModule, type, background, active })}
      to={link}
      id={id}
    >
      {text}
    </Link>
  ) : (
    <button
      id={id}
      className={b({ type, bemModule, background, active })}
      onClick={disabled ? (f) => f : callBack}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PT.string.isRequired,
  disabled: PT.bool,
  type: PT.string,
  link: PT.string,
  bemModule: PT.string,
  callBack: PT.func,
};

export default Button;
