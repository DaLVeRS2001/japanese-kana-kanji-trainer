import block from 'bem-cn';
import { footerLinks } from 'shared/utils/trash';
import Button from 'components/Button';

import './Footer.scss';

const b = block('footer');

const Footer = () => {
  return (
    <footer className={b()}>
      {footerLinks.map((link) => (
        <Button key={link.name} link={link.link} text={link.name} />
      ))}
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
