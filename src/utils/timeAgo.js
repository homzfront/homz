export default function timeAgo(timestamp) {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp);
  const timeDifference = currentDate - createdAtDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  const reminderDays = days % 30;
  const reminderMonths = months % 12;

  let result = "";

  switch (true) {
    case years >= 1:
      result = years === 1 ? `${years} year` : `${years} years`;
      if (reminderMonths > 0) {
        result += `, ${reminderMonths} month${reminderMonths > 1 ? 's' : ''}`;
      }
      if (reminderDays > 0) {
        result += `, ${reminderDays} day${reminderDays > 1 ? 's' : ''}`;
      }
      result += " ago";
      break;
    case months >= 1:
      result = months === 1 ? `${months} month` : `${months} months`;
      if (reminderDays > 0) {
        result += `, ${reminderDays} day${reminderDays > 1 ? 's' : ''}`;
      }
      result += " ago";
      break;
    case days >= 1:
      result = `${days} day${days > 1 ? 's' : ''} ago`;
      break;
    case hours >= 1:
      result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      break;
    case minutes >= 1:
      result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      break;
    default:
      result = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }

  return result;
}
