import { useMemo } from 'react';
import { useState } from 'react';
import { formatDateToTime } from 'shared/helpers/helpers';

const useTimer = ({ timerEnding, withMS = false }) => {
  const resetDate = new Date(new Date().setHours(0, 0, 0, 0));

  const [currentDate, changeCurrentDate] = useState(resetDate);
  const timerInterval = withMS ? 10 : 1000;

  const startTimer = (initialTime = 0) => {
    changeCurrentDate(resetDate);
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setMilliseconds(initialTime);
    const timer = setInterval(() => {
      const changedDate = withMS
        ? currentDate.setMilliseconds(currentDate.getMilliseconds() + 10)
        : currentDate.setSeconds(currentDate.getSeconds() + 1);
      changeCurrentDate(new Date(changedDate));
    }, timerInterval);

    if (timerEnding > 0)
      setTimeout(() => {
        clearInterval(timer);
      }, timerEnding);
  };

  return useMemo(
    () => ({
      startTimer,
      currentTime: formatDateToTime({ date: currentDate, withMS }),
    }),
    [startTimer, currentDate, withMS]
  );
};

export default useTimer;
