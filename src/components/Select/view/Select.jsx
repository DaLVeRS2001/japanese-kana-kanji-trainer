import React, { useState, useMemo } from 'react';
import block from 'bem-cn';
import PT from 'prop-types';

import SVG from 'components/SVG';

import arrowSVG from './img/arrow.svg';

import './Select.scss';

const b = block('select');

const itemProp = PT.exact({
  name: PT.string,
  value: PT.oneOfType([PT.string, PT.number]),
}).isRequired;

const Select = ({
  items,
  activeItem,
  onChange,
  disabled = false,
  placeholder = '',
}) => {
  const [isOpen, changeOpen] = useState(false);

  const itemsList = useMemo(
    () =>
      items.map((item) => (
        <li
          key={item.name}
          className={b('item')}
          onClick={() => !disabled && onChange(item.value)}
        >
          <span className={b('item-value')}>{item.name}</span>
        </li>
      )),
    [items, disabled, onChange]
  );

  return (
    <div className={b({ open: isOpen })} onClick={() => changeOpen(!isOpen)}>
      <div className={b('item', { current: true })}>
        <span className={b('item-value', { current: true })}>
          {activeItem.name || placeholder}
        </span>
        <SVG
          className={b('item-arrow').toString()}
          svgProps={{ svg: arrowSVG }}
        />
      </div>
      {isOpen && (
        <ul className={b('items')} onMouseLeave={() => changeOpen(false)}>
          {itemsList}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  items: PT.arrayOf(itemProp).isRequired,
  activeItem: itemProp,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  disabled: PT.bool,
};

export default Select;
