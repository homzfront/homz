function addCommasToNumber(number) {
    if (number === "" || number === null || number === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      // Convert the number to a string
      const numberString = number?.toString();
      // Use regular expression to add commas
      const formattedNumber = numberString?.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      return `N ${formattedNumber}`;
    }
  }
  export default addCommasToNumber;