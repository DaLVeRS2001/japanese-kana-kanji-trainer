import { getElementRectInfo } from '.';
import { getRandomNumber } from './helpers';

const moveElementsWithSameCoords = ({ prevEl, currentEl }) => {
  const targetRect = getElementRectInfo(currentEl);
  const prevElRect = getElementRectInfo(prevEl);

  const [xMatch, yMatch] = [
    targetRect.right > prevElRect.left && targetRect.left < prevElRect.right,
    false,
  ];

  if (xMatch) {
    const leftIndent =
      currentEl.offsetLeft - (targetRect.right - prevElRect.left + 10);
    currentEl.style.left = `${leftIndent}px`;
    if (currentEl.offsetLeft < 0)
      currentEl.style.left = `${prevElRect.width}px`;
  }
  if (yMatch) {
    const topIndent = prevElRect.height + 10;
    currentEl.style.transform = `translateY(${topIndent}px)`;
  }

  return 0;
};

export default moveElementsWithSameCoords;
