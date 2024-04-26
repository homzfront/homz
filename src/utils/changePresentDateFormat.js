function changePresentDateFormat(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
  const day = new Date(date).getDate();
  const suffix = getOrdinalSuffix(day);
  return formattedDate.replace(/\b\d{1,2}\b/, `${day}${suffix}`);
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
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

export default changePresentDateFormat;
