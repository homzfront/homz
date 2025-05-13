export function formatDateRange(fromDate, toDate) {
    // Return empty string if either date is missing or invalid
    if (!fromDate || !toDate) return "";
    
    const start = new Date(fromDate);
    const end = new Date(toDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "";
    }
    
    // Additional check for "Thu, Jan 1, 1970" (Unix epoch default)
    const unixEpoch = new Date(0);
    if (start.getTime() === unixEpoch.getTime() || end.getTime() === unixEpoch.getTime()) {
        return "";
    }
    
    // Only proceed if both dates are valid and not Unix epoch
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedStart = start.toLocaleDateString('en-US', options);
    const formattedEnd = end.toLocaleDateString('en-US', options);

    return `${formattedStart} - ${formattedEnd}`;
}