export default function sortDataByStatusAndDate (data) {
    return data?.slice().sort((a, b) => {
      // Sort by status first (unseen first)
      if (a.status === 'unread' && b.status !== 'unread') {
        return -1;
      }
      if (a.status !== 'unread' && b.status === 'unread') {
        return 1;
      }
  
      // If both have the same status, sort by createdAt in descending order
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };