function changeBackendDateFormat(inputDate) {
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

    return formattedDate;
  }
}

export default changeBackendDateFormat;
