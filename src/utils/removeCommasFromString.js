export default function extractNumber(text) {
   // If the input is already a number, return it directly
   if (typeof text === "number") {
    return text;
  }
  // Ensure text is a string before attempting operations
  if (typeof text !== "string") {
    return Number.NaN; // Handle invalid input type
  }

  if (!text) {
    // Handle empty string
    return Number.NaN;
  }

  // Remove both commas and other non-numeric characters
  const numberString = text.replace(/[^0-9\.\+\-]/g, "");

  // Try parsing as a number
  const parsedNumber = parseFloat(numberString);

  // Validate the parsed number
  return !Number.isNaN(parsedNumber) ? parsedNumber : Number.NaN;
}
