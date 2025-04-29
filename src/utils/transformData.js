export const transformData = (mappedData) => {
    if (!mappedData) return;

    const monthMap = {
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December",
    };

    // Helper function to capitalize the first letter of a word
    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    return mappedData.map((item) => {
        // Parse rent amount (strip currency and commas)
        const rentAmount = parseFloat(item["Rent Amount"]?.replace(/[^\d.]/g, "")) || null;

        // Convert rent duration to months (if it's specified in years)
        const rentDuration = parseInt(item["Rent Duration"]) || null;

        // Parse start date
        let startDate = "";
        let dueDate = "";
        if (item["Start Date"]) {
            try {
                const dateParts = item["Start Date"].trim().split(" ");
                const day = parseInt(dateParts[0].replace(/\D/g, "")); // Remove suffix (e.g., "5th" -> "5")
                const month = capitalize(dateParts[1]); // Convert month to title case
                const year = parseInt(dateParts[2]);

                if (day && month && year && month) {
                    const formattedDate = `${month} ${day}, ${year}`;
                    startDate = new Date(formattedDate).toISOString().split("T")[0];
                    // Calculate due date
                    if (rentDuration) {
                        const newDueDate = new Date(formattedDate);
                        newDueDate.setMonth(newDueDate.getMonth() + rentDuration);
                        newDueDate.setDate(newDueDate.getDate() - 1);
                        dueDate = newDueDate.toISOString().split("T")[0];
                    }
                }
            } catch (error) {
                console.error("Invalid date format:", item["Start Date"], error);
                startDate = "";
                dueDate = "";
            }
        }

        // Create the base object
        const transformedItem = {
            tenantName: item["Tenant Name"] || "N/A",
            email: item["Email"] || "N/A",
            phoneNumber: item["Phone No"] || "N/A",
            houseAddress: item["Address"] || "N/A",
            sendTenantEmail: item["Send Invitation"] === "Yes" ? true : false,
        };

        // Create the rentInfo object
        const rentInfo = {
            rentAmount: rentAmount,
            rentDuration: rentDuration,
            startDate: startDate || "",
            dueDate: dueDate || "",
            propertyType: item["Property Type"] || "N/A",
            apartmentNo: parseInt(item["Apartment No"]?.match(/\d+/)?.[0]) || null,
        };

        // Remove null or empty fields from rentInfo
        const cleanedRentInfo = Object.fromEntries(
            Object.entries(rentInfo).filter(([_, value]) => value !== null && value !== "" && value !== "N/A")
        );

        // Only add rentInfo if it has any valid fields
        if (Object.keys(cleanedRentInfo).length > 0) {
            transformedItem.rentInfo = cleanedRentInfo;
        }

        // Remove null or empty fields from the main object
        const cleanedTransformedItem = Object.fromEntries(
            Object.entries(transformedItem).filter(([_, value]) => value !== null && value !== "" && value !== "N/A")
        );

        return cleanedTransformedItem;
    });
};