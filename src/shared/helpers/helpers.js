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

export {
  getUniqueArr,
  checkMatch,
  getRandomNumber,
  getMinutes,
  getSeconds,
  getRandomKey,
};
