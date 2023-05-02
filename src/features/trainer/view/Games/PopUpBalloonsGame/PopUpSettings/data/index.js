import { popUpBalloonsGameDefaultSettings } from 'shared/utils/data';
const { characterRowCount, gameTime } = popUpBalloonsGameDefaultSettings;

const settingTooltipFields = [
  `Enter number (from 1, to ${characterRowCount.max}) that defines how many characters there will be in the rows`,
  `Enter how many minutes the game will be run (from 1, to ${gameTime.max})`,
];

export { settingTooltipFields };
