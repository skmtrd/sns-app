export const formatTime = (now: Date, target: Date): string => {
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000); // cut off milliseconds

  if (diff <= 0) {
    return '今';
  } else if (diff < 60) {
    // 1 minute
    return `${diff}秒前`;
  } else if (diff < 60 * 60) {
    // 1 hour
    return `${Math.floor(diff / 60)}分前`;
  } else if (diff < 60 * 60 * 24) {
    // 1 day
    return `${Math.floor(diff / (60 * 60))}時間前`;
  } else if (now.getFullYear() > target.getFullYear()) {
    // Different year
    return `${target.getFullYear()}年${target.getMonth() + 1}月${target.getDate()}日`;
  } else {
    // Same year, different day
    return `${target.getMonth() + 1}月${target.getDate()}日`;
  }
};
