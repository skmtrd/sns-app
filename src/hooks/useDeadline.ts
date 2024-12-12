import { useEffect, useState } from 'react';

export const formatTimeUntil = (target: Date): string => {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return 'over';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}日${hours}時間`;
  } else if (hours > 0) {
    return `${hours}時間${minutes}分`;
  } else if (minutes > 0) {
    return `${minutes}分${seconds}秒`;
  } else {
    return `${seconds}秒`;
  }
};

export const useDeadline = (timestamp: string): string => {
  const [timeUntil, setTimeUntil] = useState<string>('');

  useEffect(() => {
    const updateTimeUntil = () => {
      const [datePart, timePart] = timestamp.split('/');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      const target = new Date(year, month - 1, day, hour, minute);

      setTimeUntil(formatTimeUntil(target));
    };

    updateTimeUntil();
    const intervalId = setInterval(updateTimeUntil, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return timeUntil;
};
