/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import block from 'bem-cn';
import PT from 'prop-types';
import SVG from 'components/SVG';
import { validateEmail } from 'shared/helpers';
import passwordSVG from './img/password.svg';
import passwordOffSVG from './img/passwordOff.svg';
import tooltipIconSvg from './img/tooltip.svg';

import './Input.scss';

const b = block('input');

const Input = ({
  color = 'default',
  fontSize = '16',
  value,
  name,
  placeholder = '',
  type = 'text',
  measurement = '',
  onChange,
  tooltip = null,
  ...restProps
}) => {
  useEffect(() => {
    if (value) {
      if (name === 'email') restProps.setIsValid?.(validateEmail(value));
      else restProps.setIsValid?.(value.toString().length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isTooltipActive, changeTooltipStatus] = useState(false);
  const isPassword = useMemo(
    () => Boolean(name && name.toLowerCase().indexOf('password') > -1),
    [name]
  );
  const passwordClick = useCallback(
    () => setPasswordVisible(!passwordVisible && isPassword),
    [passwordVisible, isPassword]
  );

  useEffect(() => {
    console.log(isTooltipActive);
  }, [isTooltipActive]);
  let tooltipTimeoutID;

  const handleTooltip = (e) => {
    switch (e.type) {
      case 'mouseenter':
        tooltipTimeoutID = setTimeout(() => changeTooltipStatus(true), 500);
        break;
      case 'mouseleave':
        clearTimeout(tooltipTimeoutID);
        if (isTooltipActive) changeTooltipStatus(false);
    }
  };

  return (
    <div className={b({ color, fontSize })}>
      {isPassword && (
        <>
          <SVG
            svgProps={{ svg: passwordSVG }}
            className={b('password', { active: !passwordVisible })}
            onClick={passwordClick}
          />
          <SVG
            svgProps={{ svg: passwordOffSVG }}
            className={b('password-off', { active: passwordVisible })}
            onClick={passwordClick}
          />
        </>
      )}
      {measurement && <span className={b('measurement')}>{measurement}</span>}
      <input
        className={b('native', {
          type: isPassword ? 'password' : type,
          activePassword: isPassword && !passwordVisible,
          valid: restProps.isValid,
          hasMeasurement: Boolean(measurement),
        })}
        type={/* isPassword */ passwordVisible ? 'text' : type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (name === 'email')
            restProps.setIsValid?.(validateEmail(e.target.value));
          else restProps.setIsValid?.(e.target.value.toString().length > 0);
        }}
        {...restProps}
      />
      {tooltip && (
        <div
          className={b('tooltip-icon')}
          onMouseEnter={handleTooltip}
          onMouseLeave={handleTooltip}
        >
          <SVG svgProps={{ svg: tooltipIconSvg }} />
        </div>
      )}
      {isTooltipActive && <div className={b('tooltip-block')}>{tooltip}</div>}
    </div>
  );
};

Input.propTypes = {
  color: PT.string,
  fontSize: PT.string,
  value: PT.string.isRequired,
  name: PT.string.isRequired,
  placeholder: PT.string,
  type: PT.string,
  measurement: PT.string,
  onChange: PT.func.isRequired,
};

export default Input;
