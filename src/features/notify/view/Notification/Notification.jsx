import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { NotifyModel } from 'shared/models/NotifyModel';
import errorSVG from '../../img/error.svg';
import successSVG from '../../img/success.svg';
import warnSVG from '../../img/warn.svg';
import crossSVG from '../../img/cross.svg';

import './Notification.scss';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.notifyRef = React.createRef();
    this.state = {
      isDeleting: false,
      isDeleted: false,
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    needClose: PropTypes.bool.isRequired,
    deleteNotify: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { needClose } = this.props;
    const touchListener = new NotifyModel(
      () => this._hideNotify(),
      this.notifyRef.current
    );
    touchListener.init();
    if (needClose) {
      setTimeout(this._hideNotify, 7000);
    }
  }

  render() {
    const b = block('notification');
    const { text, type } = this.props;

    const SVG = () => {
      switch (type) {
        case 'error':
          return errorSVG;
        case 'success':
          return successSVG;
        default:
          return warnSVG;
      }
    };

    return (
      <div
        className={b({ deleting: this.state.isDeleting }, { type })}
        ref={this.notifyRef}
      >
        <div className={b('wrapper')}>
          <div className={b('left')}>
            <SVGInline className={b('svg').toString()} svg={SVG()} />
          </div>
          <span className={b('text')}>{text}</span>
          <div className={b('right')}>
            <SVGInline
              className={b('svg', { cross: true }).toString()}
              svg={crossSVG}
              onClick={() => this._hideNotify()}
            />
          </div>
        </div>
      </div>
    );
  }

  _hideNotify = () => {
    const { deleteNotify, id } = this.props;
    if (!this.state.isDeleted) {
      this.setState({ isDeleting: true }, () =>
        setTimeout(() => {
          this.setState({ isDeleted: true });
          deleteNotify(id);
        }, 100)
      );
    }
  };
}

export default Notification;
