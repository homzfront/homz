function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} ${plural}`;
    }
  }

export default addYearsToValues