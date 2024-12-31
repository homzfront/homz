function formatTime(dateString) {
  if (!dateString) return;

  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  return formattedDate;
}

export default formatTime;
