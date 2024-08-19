function addCommasToNumber(number) {
  if (number === "" || number === null || number === undefined) {
    return "_______"; // Render the placeholder if the number is invalid
  } else {
    // Convert the number to a string
    const numberString = number.toString();
    // Use a regular expression to add commas.
    const formattedNumber = numberString.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    return `₦ ${formattedNumber}`;
  }
}

export default addCommasToNumber;
