import moment from 'moment-timezone';

export function convertToNigeriaTime(utcDate) {
    const nigeriaTimeZone = 'Africa/Lagos';
    const zonedDate = moment.utc(utcDate).tz(nigeriaTimeZone); 
    return zonedDate.format('YYYY-MM-DD');
  }

 export  function addDurationToDate(startDate, duration) {
  // Assuming duration and startDate are available in the current scope
  if (!duration || !startDate) return;
  
  // Convert the start date string into a Date object
  const selectedDate = new Date(convertToNigeriaTime(startDate));

    // Extract the numeric value and time unit from the duration string (e.g., "2 years" or "18 months")
    let numericAmount = parseInt(duration, 10); // Convert the amount to a number

    // Initialize variables for years and months
    let yearsToAdd = 0;
    let monthsToAdd = 0;

    yearsToAdd = Math.floor(numericAmount / 12);
    monthsToAdd = numericAmount % 12;

    // Adjust the date by adding years
    if (yearsToAdd > 0) {
      selectedDate.setFullYear(selectedDate.getFullYear() + yearsToAdd);
    }

    // Adjust the date by adding months
    if (monthsToAdd > 0) {
      selectedDate.setMonth(selectedDate.getMonth() + monthsToAdd);
    }

    // Subtract one day from the selected date
    selectedDate.setDate(selectedDate.getDate() - 1);

    // Extract the year, month, and day in the correct format (YYYY-MM-DD)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(selectedDate.getDate()).padStart(2, '0');

    // Create the final date string in YYYY-MM-DD format
    const newDate = `${year}-${month}-${day}`;
    
    return newDate
  }
