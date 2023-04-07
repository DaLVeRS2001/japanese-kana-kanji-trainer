const getUniqueArr = (arr) => {
  const trimmed = arr.map((el) => el.trim());
  return [...new Set(trimmed)].filter((el) => el);
};

const checkMatch = (list, target) => list.indexOf(target.trim()) !== -1;

const getRandomNumber = (limit, withZero = false) =>
  Math.floor(Math.random() * limit + (withZero ? 0 : 1));

export { getUniqueArr, checkMatch, getRandomNumber };
