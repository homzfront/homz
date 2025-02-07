export const formatDateIII = (date) => {
    if (!date) return null;

    const newDate = new Date(date);
    // Ensure it's a valid date
    if (isNaN(newDate.getTime())) return null;

    // Format the date to `yyyy-mm-dd`
    return newDate.toISOString().split("T")[0];
};