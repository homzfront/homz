/**
 * Extracts and processes the numeric value from a formatted string.
 * Handles formats like "N700,000", "#700,000", "700,000", etc.
 * If the input is invalid or empty, does nothing.
 *
 * @param {string} value - The formatted string containing the number.
 */
function processNumber(value) {
    if (typeof value !== 'string' || !value.trim()) {
        // No action for invalid or empty input
        return;
    }

    // Remove any non-numeric characters except commas
    const cleanedValue = value.replace(/[^0-9,]/g, '');

    // Remove commas and convert to a number
    const number = parseFloat(cleanedValue.replace(/,/g, ''));

    // Check if the conversion was successful
    if (!isNaN(number)) {
        return number;
    }
}

export default processNumber;
