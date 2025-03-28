export function cleanObject(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj; // Return non-object values as they are
    }

    // Handle Date objects
    if (obj instanceof Date) {
        return obj; // Return Date objects as they are
    }

    // Handle empty objects
    if (Object.keys(obj).length === 0) {
        return undefined; // Remove empty objects
    }

    // Handle arrays
    if (Array.isArray(obj)) {
        return obj
            .map(cleanObject)
            .filter(
                (item) =>
                    item !== undefined &&
                    (item !== null || item instanceof Date) && // Allow null only for Dates
                    (typeof item !== "string" || item !== "") &&
                    (!Array.isArray(item) || item.length > 0)
            );
    }

    // Handle regular objects
    const cleanedObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = cleanObject(obj[key]); // Recursively clean values

            if (
                value !== undefined &&
                (value !== null || value instanceof Date) && // Allow null only for Dates
                (typeof value !== "string" || value !== "") &&
                (!Array.isArray(value) || value.length > 0)
            ) {
                cleanedObj[key] = value;
            }
        }
    }
    return cleanedObj;
}