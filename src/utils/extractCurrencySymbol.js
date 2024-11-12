export default function extractCurrencySymbol(text) {
    if (!text) {
        return;
    }
    const match = text?.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
}