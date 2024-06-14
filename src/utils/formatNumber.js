import React from "react";

const FormatNumber = (phoneNumber) => {
  const str = phoneNumber.toString();

  if (str.length !== 11 || !/^\d{11}$/.test(str)) {
    return "Invalid phone number";
  }
  return `${str.substring(0, 3)} ${str.substring(3, 5)}** ****`;
};


export default FormatNumber;
