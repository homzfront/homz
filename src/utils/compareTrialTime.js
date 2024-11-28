export function isTrialExpired(trialEndDate) {
    if (!trialEndDate) {
        return false;
    }
    // Convert trialEndDate to a Date object
    const trialEnd = new Date(trialEndDate);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the current date with the trial end date
    return currentDate > trialEnd;
}
