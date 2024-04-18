function lowerCaseData(str) {
  if (typeof str === "string" && str.trim() !== "") {
    return str.toLowerCase();
  } else {
    return "";
  }
}

export default lowerCaseData;
