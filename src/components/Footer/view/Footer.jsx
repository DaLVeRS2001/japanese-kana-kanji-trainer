import React from 'react';
import block from 'bem-cn';
import PT from 'prop-types';
import { footerLinks } from 'shared/utils/trash';
import { Link } from 'react-router-dom';

import './Footer.scss';

const b = block('footer');

const Footer = () => {
  return (
    <footer className={b()}>
      {footerLinks.map((link) => (
        <Link key={link.name} to={link.link} className={b('link')}>
          {link.name}
        </Link>
      ))}
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
