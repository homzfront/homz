function formatStringWithHyphens(value) {
    if (value === null || value === undefined || value === 'NaN') {
      return "_______";
    }
    // Convert the value to a string
    const stringValue = value.toString();
    // Insert hyphens after the first 4 digits
    const formattedValue = stringValue.replace(/(\d{4})/g, '$1-');
    // Remove the last hyphen
    return formattedValue.slice(0, -1);
  }

  export default formatStringWithHyphens