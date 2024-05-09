function extractNumbers(str) {
    const match = str.match(/\d+/); // Match one or more digits
    return match ? parseInt(match[0]) : null; // Convert the matched digits to an integer
};

export default extractNumbers;