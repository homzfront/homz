export function formatDateRange(fromDate, toDate) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const start = new Date(toDate);
    const end = new Date(fromDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "";
    }
    const formattedStart = start.toLocaleDateString('en-US', options);
    const formattedEnd = end.toLocaleDateString('en-US', options);

    return `${formattedStart} - ${formattedEnd}`;
}