function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : "";
      return `${integers} month${plural}`;
    }
  }

export default addYearsToValues