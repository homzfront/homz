export default function formatDate (isoDate) {
    // Use current date if isoDate is not provided or is undefined
    const date = isoDate ? new Date(isoDate) : new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};