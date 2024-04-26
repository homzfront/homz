function extractFirstName(data) {
    // Check if data array exists and is not empty
    if (data && data?.length > 0) {
        // Extract the fullName property from the first object
        const fullName = data;
        // Split the fullName string by space and return the first part
        const firstName = fullName?.split(' ')[0];
        return firstName;
    } else {
        // Return null if data array is empty or undefined
        return "-----";
    }
}

export default extractFirstName;