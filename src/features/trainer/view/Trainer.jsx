import block from 'bem-cn';
import { Link } from 'react-router-dom';

import './Trainer.scss';

const b = block('trainer');

const Trainer = () => {
  return (
    <div className={b()}>
      <div>Trainer</div>
      <Link to="/trainer/pop-up-balloons">PopUpBalloonsGame link</Link>
    </div>
  );
};

export default Trainer;
