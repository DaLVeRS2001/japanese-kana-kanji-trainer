import { Root_em } from 'shared/utils/data';

const getUniqueArr = (arr) => {
  const trimmed = arr.map((el) => el.trim());
  return [...new Set(trimmed)].filter((el) => el);
};

const checkMatch = (list, target) => list.indexOf(target.trim()) !== -1;

const getRandomNumber = (limit, withZero = false) =>
  Math.floor(Math.random() * limit + (withZero ? 0 : 1));

const getMinutes = (time) => time * 60000;

const getSeconds = (time) => time * 1000;

const getRandomKey = (stuff = null) => {
  const key = ((Math.random() * 1000) / 0.2) * 3;
  if (stuff) return stuff + key;
  return key;
};

const getElementRectInfo = (element) => {
  const targetRect = element.getBoundingClientRect();
  return {
    id: element.id,
    width: element.offsetWidth,
    height: element.offsetHeight,
    left: targetRect.left,
    top: targetRect.top,
    bottom: targetRect.bottom,
    right: targetRect.right,
  };
};

const convertPxToRem = (px) => px / Root_em;

const findHighestElement = (elements) => {
  return elements.sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
};

const formatDateToTime = ({ date, withMS = false }) => {
  const time = date
    .toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace('24', '00');

  if (withMS) return `${time}.${date.getMilliseconds()}`;
  return time;
};

const returnImmutableDate = ({ date, action }) => {
  if (action) return new Date(new Date(date)[action.type](action.info));
  return new Date(date);
};

export {
  checkMatch,
  getMinutes,
  getSeconds,
  getUniqueArr,
  getRandomKey,
  convertPxToRem,
  getRandomNumber,
  formatDateToTime,
  findHighestElement,
  getElementRectInfo,
  returnImmutableDate,
};
