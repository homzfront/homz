/**
 * Extracts and processes the numeric value from a formatted string, plain numeric string, or a number.
 * Handles formats like "N700,000", "#700,000", "700,000", "10000", or 10000.
 * If the input is invalid or empty, does nothing.
 *
 * @param {string|number} value - The formatted string, plain numeric string, or number containing the numeric value.
 * @returns {number|undefined} - The numeric value, or undefined if the input is invalid.
 */
function processNumber(value) {
    // If the input is a number, return it as is
    if (typeof value === 'number') {
        return value;
    }

    // If the input is not a string, or it's an empty string, do nothing
    if (typeof value !== 'string' || !value.trim()) {
        return;
    }

    // Check if the value is already a valid numeric string
    if (/^\d+$/.test(value)) {
        return parseFloat(value);
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
