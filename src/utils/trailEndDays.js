export default function calculateDaysLeft(trialEndDate) {
    // Parse the trialEndDate string to a Date object
    const endDate = new Date(trialEndDate);
    
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = endDate - currentDate;
    
    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    
    return daysLeft;
}