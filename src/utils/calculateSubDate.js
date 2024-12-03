export function calculateSubDate(nextPaymentDate) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Convert nextPaymentDate to a JavaScript Date object
    const nextPayment = new Date(nextPaymentDate);
  
    // Calculate end date: 1 day before the next payment date
    const endDate = new Date(nextPayment);
    endDate.setDate(nextPayment.getDate() - 1);
  
    // Calculate start date: exactly 1 month before the end date
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - 1);
  
    // Format the dates as "20 Sep, 2024"
    const formatDate = (date) => {
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };
  
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }