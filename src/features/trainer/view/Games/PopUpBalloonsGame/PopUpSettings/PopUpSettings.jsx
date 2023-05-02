import block from 'bem-cn';
import PT from 'prop-types';
import Input from 'components/Input';
import Switcher from 'components/Switcher';
import Select from 'components/Select';
import { settingTooltipFields } from './data';

import './PopUpSettings.scss';

const b = block('pop-up-settings');

const PopUpSettings = ({
  settingHandlers,
  stopGame,
  startGame,
  gameSettings,
  difficulties,
}) => {
  const {
    changeGameTime,
    changeGameDifficult,
    changeCharacterCountInRow,
    changeBalloonsOrder,
    resetSettings,
  } = settingHandlers;

  const { characterRowCount, gameTime, hasRandomOrder, gameDifficult } =
    gameSettings;

  return (
    <div className={b()}>
      <div className={b('input')}>
        <strong className={b('input-text')}>Character count in row:</strong>
        <Input
          name="character-count"
          type="number"
          onChange={(e) => changeCharacterCountInRow(+e.currentTarget.value)}
          value={characterRowCount}
          tooltip={settingTooltipFields[0]}
        />
      </div>
      <div className={b('input')}>
        <strong className={b('input-text')}>Game time:</strong>
        <Input
          name="game-time"
          type="number"
          onChange={(e) => changeGameTime({ time: +e.currentTarget.value })}
          value={gameTime.time}
          tooltip={settingTooltipFields[1]}
        />
      </div>

      <div className={b('input', { switcher: true })}>
        <strong className={b('input-text')}>
          No time limit (The endless game):
        </strong>
        <Switcher
          isActive={gameTime.isInfinite}
          onSwitch={(isInfinite) =>
            changeGameTime({ time: gameTime.time, isInfinite })
          }
        />
      </div>

      <div className={b('input', { switcher: true })}>
        <strong className={b('input-text')}>
          Random position of balloon creation:
        </strong>
        <Switcher
          isActive={hasRandomOrder}
          onSwitch={(has) => changeBalloonsOrder(has)}
        />
      </div>

      <div className={b('input')}>
        <strong className={b('input-text')}>The game difficulty:</strong>
        <Select
          activeItem={{ value: gameDifficult.value, name: gameDifficult.name }}
          items={difficulties}
          onChange={changeGameDifficult}
        />
      </div>
    </div>
  );
};

PopUpSettings.propTypes = {
  gameSettings: PT.object.isRequired,
  difficulties: PT.array.isRequired,
  settingHandlers: PT.objectOf(PT.func).isRequired,
  stopGame: PT.func.isRequired,
  startGame: PT.func.isRequired,
};

export default PopUpSettings;
