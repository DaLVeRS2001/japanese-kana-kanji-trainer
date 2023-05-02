import block from 'bem-cn';
import PT from 'prop-types';
import { popUpBalloonsGameDefaultSettings } from 'shared/utils/data';
import Input from 'components/Input';

import './PopUpSettings.scss';
import { settingTooltipFields } from './data/index';

const b = block('pop-up-settings');

const PopUpSettings = ({
  settingHandlers,
  stopGame,
  startGame,
  gameSettings,
}) => {
  const {
    changeGameTime,
    changeGameDifficult,
    changeCharacterCountInRow,
    resetSettings,
  } = settingHandlers;
  const { characterRowCount, gameTime, hasRandomOrder, gameDifficult } =
    gameSettings;
  const localSettings = popUpBalloonsGameDefaultSettings;
  return (
    <div className={b()}>
      <div className={b('input')}>
        <strong className={b('input-text')}>Character count in row:</strong>
        <Input
          name="character-count"
          type="number"
          onChange={(e) => changeCharacterCountInRow(e.currentTarget.value)}
          value={characterRowCount}
          placeholder="Count"
          tooltip={settingTooltipFields[0]}
        />
      </div>
    </div>
  );
};

PopUpSettings.propTypes = {
  gameSettings: PT.object.isRequired,
  settingHandlers: PT.objectOf(PT.func).isRequired,
  stopGame: PT.func.isRequired,
  startGame: PT.func.isRequired,
};

export default PopUpSettings;
