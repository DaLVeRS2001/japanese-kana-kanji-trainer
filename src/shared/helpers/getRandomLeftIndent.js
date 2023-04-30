const getRandomLeftIndent = ({
  indent,
  target,
  mainLeft,
  additionalIndent = 0,
}) => {
  const splittedIndent = `${indent[0]}${indent[1]}`;
  switch (true) {
    case [10].includes(indent[0]):
      return `${mainLeft + additionalIndent}px`;
    case [1, 2, 3].includes(indent[0]):
      return `calc(${splittedIndent}% + ${additionalIndent}px)`;
    default:
      return `calc(${splittedIndent}% - ${
        target.offsetWidth - additionalIndent
      }px)`;
  }
};

export default getRandomLeftIndent;
