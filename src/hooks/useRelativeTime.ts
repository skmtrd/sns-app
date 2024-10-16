import { formatTime } from '@/lib/formatTime';
import { useEffect, useState } from 'react';

export const useRelativeTime = (timestamp: Date): string => {
  const [relativeTime, setRelativeTime] = useState<string>('');

  useEffect(() => {
    const updateRelativeTime = () => {
      const now = new Date();
      const target = new Date(timestamp);
      setRelativeTime(formatTime(now, target));
    };
    updateRelativeTime();

    const intervalId = setInterval(updateRelativeTime, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return relativeTime;
};
