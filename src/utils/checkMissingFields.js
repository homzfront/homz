export const checkMissingFields = (data) => {
    if (!data) return;
    const requiredFields = [
        "fullName",
        "houseAddress",
        "phoneNumber",
        "personalDetails.gender",
        "personalDetails.maritalStatus",
        "addressDetails.officeAddress",
        "addressDetails.permanentContactAddress",
        "personalDetails.nationality",
        "personalDetails.stateOfOrigin",
        "accommodation.rentPurpose",
        "personalDetails.religion",
        "accommodation.accommodationType",
        "moveInDetails.moveInDate",
        "spouseDetails.spouseOccupation",
        "spouseDetails.spouseOfficeAddress",
        "occupantDetails[0].occupantName",
        "occupantDetails[0].occupantAge",
        "occupantDetails[0].occupantOccupation",
        "numberOfCars",
        "guarantors.firstGuarantor.form.url",
        "guarantors.firstGuarantor.idCard.url",
        "guarantors.secondGuarantor.form.url",
        "guarantors.secondGuarantor.idCard.url",
        "ninId.nin_data.nin",
        "verification.status"
    ];

    // Function to access nested properties safely
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => {
            if (acc === undefined || acc === null) return undefined;
            // Handle array index
            if (key.includes("[") && key.includes("]")) {
                const [base, index] = key.replace("]", "").split("[");
                return acc[base] && acc[base][Number(index)];
            }
            return acc[key];
        }, obj);
    };

    // Find missing fields
    const missingFields = requiredFields.filter(field => !getNestedValue(data, field));

    // Calculate missing percentage
    const totalFields = requiredFields.length;
    const missingPercentage = (missingFields.length / totalFields) * 100;

    return {
        missingFields,
        missingPercentage: missingPercentage.toFixed(2) + "%",
        donePercentage: (100 - missingPercentage.toFixed(2))
    };
};
