export const formatTime = (timestamp: string): string => {
  const now = new Date();
  const target = new Date(timestamp);
  const diff = {
    year: now.getFullYear() - target.getFullYear(),
    month: now.getMonth() - target.getMonth(),
    day: now.getDate() - target.getDate(),
    hour: now.getHours() - target.getHours(),
    minute: now.getMinutes() - target.getMinutes(),
  };
  const { year, month, day, hour, minute } = {
    year: target.getFullYear(),
    month: target.getMonth() + 1,
    day: target.getDate(),
    hour: target.getHours(),
    minute: target.getMinutes(),
  };

  if (diff.year > 0) {
    return `${year}年${month}月${day}日`;
  } else if (diff.month > 0) {
    return `${month}月${day}日`;
  } else if (diff.day > 0) {
    if (diff.day === 1) {
      return "昨日";
    }
    return `${day}日`;
  } else if (diff.hour > 0) {
    return `${diff.hour}時間前`;
  } else if (diff.minute > 0) {
    return `${diff.minute}分前`;
  } else {
    return "たった今";
  }
};
