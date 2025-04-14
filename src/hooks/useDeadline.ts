import { formatTimeUntil } from '@/lib/functions/formatTimeUntil';
import { useEffect, useState } from 'react';

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
