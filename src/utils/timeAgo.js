export default function timeAgo(timestamp) {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const timeDifference = currentDate - createdAtDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }
