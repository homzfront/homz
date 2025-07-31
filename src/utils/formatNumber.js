const FormatNumber = (phoneNumber) => {
  if (phoneNumber == null) {
    // Handle the case where phoneNumber is undefined or null
    return "";
  }
  const str = phoneNumber.toString();

  // if (str.length >= 11 || !/^\d{11}$/.test(str)) {
  //   return "Invalid phone number";
  // }
  return `${str.substring(0, 3)} ${str.substring(3, 5)}** ****`;
};

export default FormatNumber;
