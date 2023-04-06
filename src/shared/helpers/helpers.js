const getUniqueArr = (arr) => {
  return [...new Set(arr)].map((el) => el.trim()).filter((el) => el);
};
const checkMatch = (list, target) => list.indexOf(target.trim()) !== -1;

export { getUniqueArr, checkMatch };
