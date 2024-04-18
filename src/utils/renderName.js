const renderName = (data) => {
    // Check if data exists and has a name property
    if (data === "" || data === null || data === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      return data; // Render a placeholder if data or name is missing
    }
  };

  export default renderName;