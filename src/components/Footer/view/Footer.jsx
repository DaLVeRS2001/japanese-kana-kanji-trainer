import block from 'bem-cn';
import { useLocation } from 'react-router-dom';
import { footerLinks } from 'shared/utils/trash';
import Button from 'components/Button';

import './Footer.scss';

const b = block('footer');

const Footer = () => {
  const location = useLocation();
  return (
    <footer className={b()}>
      {footerLinks.map((link) => (
        <div key={link.name} className={b('link')}>
          <Button
            link={link.link}
            text={link.name}
            active={location.pathname === link.link}
          />
        </div>
      ))}
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
