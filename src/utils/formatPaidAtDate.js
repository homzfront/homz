function formatPaidAtDate(inputDate) {
    if (inputDate === "" || inputDate === null || inputDate === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const date = new Date(inputDate);
      const day = date.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
  
      // Function to add ordinal suffix to day
      function getOrdinalSuffix(day) {
        if (day > 10 && day < 20) {
          return "th";
        } else {
          const lastDigit = day % 10;
          switch (lastDigit) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        }
      }
      const ordinalSuffix = getOrdinalSuffix(day);
      const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;
  
      // Format time
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      // Convert hours to 12-hour format and determine AM/PM
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  
      // Add leading zeros to minutes if needed
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
      const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
  
      // return `${formattedDate} ${formattedTime}`;
      return `${formattedDate}`;
    }
  }
  
  export default formatPaidAtDate;
  