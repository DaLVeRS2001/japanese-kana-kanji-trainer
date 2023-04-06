/* eslint-disable react/react-in-jsx-scope */
import SVGInline from 'react-svg-inline';
import block from 'bem-cn';
import PT from 'prop-types';

import './SVG.scss';

const b = block('SVG-component');

const SVG = ({ svgProps, ...restProps }) => (
  <span className={b()} {...restProps}>
    <SVGInline {...svgProps} className={b('content').toString()} />
  </span>
);

SVG.propType = {
  svgProps: PT.exact({
    svg: PT.string,
  }).isRequired,
};

export default SVG;
