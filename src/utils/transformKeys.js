// change the headers
export function transformKeys(data) {
    if (!data) return;
    return data?.map(item => {
        const transformedItem = {};

        Object.keys(item).forEach(key => {
            const camelCasedKey = key
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()); // Converts "Apartment No" to "apartmentNo"

            transformedItem[camelCasedKey] = item[key];
        });

        return transformedItem;
    });
}