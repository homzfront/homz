function capitalizeFirstLetter(str) {
  if (str && typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    // Return an empty string or handle the error as needed
    return "";
  }
}

export default capitalizeFirstLetter;
