export const formatTime = (timestamp: string, now: Date): string => {
  const target = new Date(timestamp);
  const delta = now.getTime() - target.getTime();

  const diff = {
    year: now.getFullYear() - target.getFullYear(),
    month: now.getMonth() - target.getMonth(),
    day: now.getDate() - target.getDate(),
    hour: Math.floor(delta / (1000 * 60 * 60)),
    minute: Math.floor((delta / (1000 * 60)) % 60),
    second: Math.floor((delta / 1000) % 60),
  };

  if (diff.year > 0) {
    return `${target.getFullYear()}年${
      target.getMonth() + 1
    }月${target.getDate()}日`;
  } else if (diff.month > 0) {
    return `${target.getMonth() + 1}月${target.getDate()}日`;
  } else if (diff.day > 0) {
    if (diff.day === 1) {
      return "昨日";
    }
    return `${target.getDate()}日`;
  } else if (diff.hour > 0) {
    return `${diff.hour}時間前`;
  } else if (diff.minute > 0) {
    return `${diff.minute}分前`;
  } else if (diff.second > 0) {
    return `${diff.second}秒前`;
  } else {
    return "たった今";
  }
};
