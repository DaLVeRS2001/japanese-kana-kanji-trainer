import { getElementRectInfo } from '.';

const moveElementsWithSameCoords = (prevEl, currentEl) => {
  const targetRect = getElementRectInfo(currentEl);
  const prevElRect = getElementRectInfo(prevEl);

  const [xMatch, yMatch] = [
    targetRect.right > prevElRect.left && targetRect.left < prevElRect.right,
    targetRect.top > prevElRect.bottom && targetRect.bottom < prevElRect.top,
  ];

  if (xMatch) {
    console.log();
    const leftIndent =
      currentEl.offsetLeft - (targetRect.right - prevElRect.left + 10);
    currentEl.style.left = `${leftIndent}px`;
  }
  if (yMatch) {
    const topIndent = currentEl.offsetTop + prevElRect.height + 10;
    currentEl.style.top = `${topIndent}px`;
  }

  return 0;
};

export default moveElementsWithSameCoords;
