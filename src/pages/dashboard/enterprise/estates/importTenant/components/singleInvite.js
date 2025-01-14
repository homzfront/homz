import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "@/utils/api";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import DateIcon from "@/components/icons/date";
import ArrowLeft from "@/components/icons/arrowLeft";
import ArrowUp from "@/components/icons/arrowUp";
import ArrowDown from "@/components/icons/arrowDown";
import CloseSmall from "@/components/icons/closeSmall";
import useTenantForInvite from "@/store/enterpriseStore/useTenantForInvite";

const SingleInvite = ({ setSuccessfulModal, setOpenSingleInvite, estateId, setOpenTenantInvite, estateName }) => {
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [arrowColor, setArrowColor] = useState(false);
    const { setTenantData } = useTenantForInvite()
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: null,
        email: null,
        apartmentNumber: null,
        address: null,
        PhoneNUmber: null,
        rentAmount: null,
        rentDuration: null,
        startDate: null,
        lastName: null,
        propertyType: null,
        dueDate: null,
    });
    const [errors, setErrors] = useState({});


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    console.log(formData)

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Hi")
        const newErrors = {};
        if (!formData.firstName)
            newErrors.firstName = "First Name is required.";
        if (!formData.lastName)
            newErrors.lastName = "Last Name is required.";
        if (!formData.email)
            newErrors.email = "Email is required.";
        if (!formData.rentAmount && isDropdownOpen)
            newErrors.rentAmount = "Rent amount is required.";
        if (!formData.rentDuration && isDropdownOpen)
            newErrors.rentDuration = "Rent duration is required.";
        if (!formData.startDate && isDropdownOpen)
            newErrors.startDate = "Start date is required.";
        if (!formData.dueDate && isDropdownOpen)
            newErrors.dueDate = "Due date is required.";
        if (!formData.propertyType && isDropdownOpen)
            newErrors.propertyType = "Property type is required.";
        if (!formData.apartmentNumber && isDropdownOpen)
            newErrors.startDate = "Apartment number is required.";
        if (newErrors?.length > 0) {

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
        setIsLoadingForm(true);

        const formDataSubmit = isDropdownOpen ? {
            tenantName: `${formData.firstName} ${formData?.lastName}`,
            email: formData.email,
            houseAddress: formData?.address,
            phoneNumber: formData?.PhoneNUmber,
            rentInfo: {
                rentAmount: formData.rentAmount.replace(/,/g, ""),
                apartmentNo: formData.apartmentNumber,
                propertyType: formData.propertyType,
                rentDuration: formData?.rentDuration,
                startDate: formData.startDate.toISOString(),
                dueDate: formData.dueDate.toISOString(),
            }
        } : {
            tenantName: `${formData.firstName} ${formData?.lastName}`,
            email: formData.email,
            houseAddress: formData?.address,
            phoneNumber: formData?.PhoneNUmber,
        }

        const cleanFormData = Object.fromEntries(
            Object.entries(formDataSubmit).filter(([_, value]) => value !== null)
        );
        try {
            const response = await api.post(
                `/tenants/invitation/estate/${estateId}/single-tenant-upload`,
                {
                    ...cleanFormData
                }
            );
            if (response?.data?.success) {
                setSuccessfulModal(true)
                setTenantData({
                    name: `${formData.firstName} ${formData?.lastName}`,
                    email: formData.email,
                });
            }
            // Clear all errors
            setErrors((prevErrors) => {
                const clearedErrors = Object.keys(prevErrors).reduce((acc, key) => {
                    acc[key] = null; // Set each field's error to null
                    return acc;
                }, {});
                return clearedErrors;
            });
        } catch (error) {
            console.log(error?.response?.data?.message)
            if (error && error?.response?.data?.error?.errors) {
                // Assign backend errors to state
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    backend: error?.response?.data?.error?.errors,
                }));
            } else if (error && error?.response?.data?.message) {
                // If there's a general message
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    backend: error?.response?.data?.message,
                }));
            } else {
                // If the error is not in the expected format, rethrow it
                throw error;
            }
        } finally {
            setIsLoadingForm(false);
        }
    };

    console.log(errors)

    const validateSecondFields = () => {
        // Check specific fields are filled
        const requiredFields = ["rentAmount", "rentDuration", "startDate", "dueDate", "propertyType", "apartmentNumber"];
        const newErrors = {};

        requiredFields.forEach((field) => {
            const value = formData[field];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                newErrors[field] = `${field} is required.`;
            }
        });

        // If there are no errors, return true; otherwise, return false
        return Object.keys(newErrors).length === 0;
    };

    const validateFIrstFields = () => {
        // Check specific fields are filled
        const requiredFields = ["firstName", "lastName", "email"];
        const newErrors = {};

        requiredFields.forEach((field) => {
            const value = formData[field];
            if (!value || (typeof value === "string" && value.trim() === "")) {
                newErrors[field] = `${field} is required.`;
            }
        });

        // If there are no errors, return true; otherwise, return false
        return Object.keys(newErrors).length === 0;
    };

    // Update `isValid` whenever `formData` changes
    useEffect(() => {
        const allFirstFieldsValid = validateFIrstFields()
        const allSecondFieldsValid = validateSecondFields()
        if (isDropdownOpen) {
            setIsValid(allSecondFieldsValid && allFirstFieldsValid);
        } else {
            setIsValid(allFirstFieldsValid)
        }
    }, [formData, isDropdownOpen]);

    function addDurationToDate() {
        // Assuming duration and startDate are available in the current scope
        if (!formData.rentDuration || !formData.startDate) return;

        // Convert the start date string into a Date object
        const selectedDate = new Date(formData.startDate);

        // Extract the numeric value and time unit from the duration string (e.g., "2 years" or "18 months")
        // const [amountStr, unit] = duration.split(' ');
        let numericAmount = parseInt(formData.rentDuration, 10); // Convert the amount to a number

        if (isNaN(numericAmount)) {
            console.error('Invalid duration amount:', amountStr);
            return;
        }

        // Initialize variables for years and months
        let yearsToAdd = 0;
        let monthsToAdd = 0;

        yearsToAdd = Math.floor(numericAmount / 12);
        monthsToAdd = numericAmount % 12;

        // Adjust the date by adding years
        if (yearsToAdd > 0) {
            selectedDate.setFullYear(selectedDate.getFullYear() + yearsToAdd);
        }

        // Adjust the date by adding months
        if (monthsToAdd > 0) {
            selectedDate.setMonth(selectedDate.getMonth() + monthsToAdd);
        }

        // Subtract one day from the selected date
        selectedDate.setDate(selectedDate.getDate() - 1);

        // Extract the year, month, and day in the correct format (YYYY-MM-DD)
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(selectedDate.getDate()).padStart(2, '0');

        // Create the final date string in YYYY-MM-DD format
        const newDate = `${year}-${month}-${day}`;

        // Set the due date (assuming setDueDate is a state setter function available in the scope)
        handleInputChange("dueDate", newDate);
    }


    useEffect(() => {
        if (formData.rentDuration && formData.startDate) {
            addDurationToDate()
        }
    }, [formData.rentDuration, formData.startDate])

    return (
        <div className="max-h-[600px]">
            <div className="w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6 overflow-y-auto">
                <div className="w-full flex justify-between items-start">
                    <div className="flex flex-col w-[85%]">
                        <p className="text-BlackHomz font-[500] text-[14px] md:text-[18px]">
                            Add a Single Tenant
                        </p>
                        <p className="text-GrayHomz font-[400] text-[12px] md:text-[13px]">
                            Fill in the details below to add a new tenant to your property.
                        </p>
                    </div>
                    <div
                        onClick={() => setOpenSingleInvite(false)}
                        className="cursor-pointer"
                    >
                        <CloseSmall />
                    </div>
                </div>
                <form

                    className={`space-y-4 mt-3 ${isLoadingForm ? "pointer-events-none" : ""
                        }`}
                >
                    <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col items-center gap-3 md:gap-2">
                        {/* Tenant Name */}
                        <div className="w-full flex flex-col md:flex-row items-start justify-between">
                            <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px] md:mt-1">
                                Tenant’s Name <span className="text-red-600">*</span>
                            </label>
                            <div className="w-full md:w-[52%] mt-2 flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                    placeholder="Last Name"
                                />
                                {(errors.firstName || errors.lastName) && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.fristName || errors.lastName}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Email */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <div className="w-full md:w-[52%] mt-2">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                    placeholder="e.g FemiJegede@gmail.com"
                                />
                                {errors.email && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Address */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                Address
                            </label>
                            <div className="w-full md:w-[52%] mt-2">
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                    placeholder="e.g Plot 22, Alapere Street, Alagomeji Area, Yaba, Lagos"
                                />
                                {errors.address && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.address}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Phone Number */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                Phone No
                            </label>
                            <div className="w-full md:w-[52%] mt-2">
                                <input
                                    type="text"
                                    value={formData.PhoneNUmber}
                                    onChange={(e) => handleInputChange("PhoneNUmber", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                    placeholder="e.g 0701 234 5678"
                                />
                                {errors.PhoneNUmber && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.PhoneNUmber}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex flex-col gap-1 w-full min-h-12 p-3 border rounded-md bg-[#4E4E4E] text-white text-[12px] md:text-[14px] font-[400]"
                    >
                        <span className="flex justify-between items-center w-full">
                            Rent Information
                            <span>
                                {
                                    !isDropdownOpen ?
                                        <ArrowDown className="#FFFFFF" /> :
                                        <ArrowUp />
                                }
                            </span>
                        </span>
                        {isDropdownOpen && (
                            <span className="font-[300] text-[#E6E6E6] text-[11px] md:text-[13px] text-justify">
                                This section is optional. You can skip this section if you do not wish to provide rent details at this time. However,
                                if you choose to fill out one or more fields in this section, all fields must be completed
                                before proceeding to add the tenant.
                            </span>
                        )}
                    </button>
                    {
                        isDropdownOpen &&
                        <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col items-center gap-3 md:gap-2">
                            {/* Property Type */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Property Type
                                </label>
                                <div className="w-full md:w-[52%] mt-2">
                                    <input
                                        type="text"
                                        value={formData.propertyType}
                                        onChange={(e) => handleInputChange("propertyType", e.target.value)}
                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                        placeholder="e.g 2-Bedroom Bungallow"
                                    />
                                    {errors.propertyType && (
                                        <span className="text-error text-[11px] italic">
                                            {errors.propertyType}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Apartment Number */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Apartment No
                                </label>
                                <div className="w-full md:w-[52%] mt-2">
                                    <input
                                        type="text"
                                        value={formData.apartmentNumber}
                                        onChange={(e) => handleInputChange("apartmentNumber", e.target.value)}
                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                        placeholder="e.g Apartment 46"
                                    />
                                    {errors.apartmentNumber && (
                                        <span className="text-error text-[11px] italic">
                                            {errors.apartmentNumber}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/*Rent Amount */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Rent Amount
                                </label>
                                <div className="w-full md:w-[52%] mt-2">
                                    <div className="relative">
                                        <span className={` absolute left-3 top-[4px] md:top-[1px] bottom-0 flex items-center text-[12px] md:text-[14px] font-[500] ${formData?.rentAmount === null ? "text-GrayHomz2 hidden" : ""} `}>
                                            ₦
                                        </span>
                                        <input
                                            type="text"
                                            value={formData.rentAmount || ""}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/,/g, "");
                                                if (/^\d*\.?\d*$/.test(rawValue)) {
                                                    handleInputChange("rentAmount", rawValue);
                                                }
                                            }}
                                            onBlur={(e) => {
                                                const rawValue = e.target.value.replace(/,/g, "");
                                                handleInputChange(
                                                    "rentAmount",
                                                    rawValue ? new Intl.NumberFormat().format(rawValue) : ""
                                                );
                                            }}
                                            className="w-full h-[45px] py-3 px-6 rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                            placeholder="e.g ₦1,600,000"
                                        />
                                        {errors.rentAmount && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.rentAmount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Rent Duration */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Rent Duration
                                </label>
                                <div className="w-full md:w-[52%] mt-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.rentDuration}
                                            onChange={(e) => handleInputChange("rentDuration", e.target.value)}
                                            className="w-full h-[45px] py-3 pl-6 pr-[40px] rounded-md bg-white text-[12px] md:text-[14px] placeholder:text-GrayHomz2 placeholder:text-[12px] md:placeholder:text-[14px] font-[400]"
                                            placeholder="e.g 36"
                                        />
                                        <p className={`absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-[12px] md:text-[14px] ${formData?.rentDuration === null ? "text-GrayHomz2" : ""}`}>Months</p>
                                    </div>
                                    {errors.rentDuration && (
                                        <span className="text-error text-[11px] italic">
                                            {errors.rentDuration}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Start Date */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Start Date
                                </label>
                                <div className="w-[100%] md:w-[52%] mt-2 relative">
                                    <div className="w-full">
                                        <DatePicker
                                            selected={formData.startDate}
                                            onChange={(date) => handleInputChange("startDate", date)} // Update with Date object
                                            dateFormat="d MMMM, yyyy" // Format displayed in UI
                                            placeholderText="Select Start Date"
                                            className=" w-[255px] md:w-full h-[45px] px-4 py-2 rounded-md border placeholder:text-[12px] md:placeholder:text-[14px]"
                                        />
                                    </div>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <DateIcon />
                                    </div>
                                </div>
                                {errors.startDate && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.startDate}
                                    </span>
                                )}
                            </div>
                            {/* Due Date */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-full md:w-[40%] text-[12px] md:text-[14px]">
                                    Due Date
                                </label>
                                <div className="w-[100%] md:w-[52%] mt-2 relative pointer-events-none">
                                    <div className="w-full">
                                        <DatePicker
                                            selected={formData.dueDate}
                                            onChange={(date) => handleInputChange("dueDate", date)} // Update with Date object
                                            dateFormat="d MMMM, yyyy" // Format displayed in UI
                                            // placeholderText="Select Start Date"
                                            className=" w-[255px] md:w-full h-[45px] px-4 py-2 rounded-md border placeholder:text-[12px] md:placeholder:text-[14px]"
                                        />
                                    </div>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <DateIcon />
                                    </div>
                                </div>
                                {errors.dueDate && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.dueDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    }
                    {errors.backend && (
                        <span className="text-red-500 text-xs mt-1">
                            {errors.backend}
                        </span>
                    )}

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={onSubmit}
                        className={`h-[48px] w-full 
                                 ${isValid
                                ? "bg-BlueHomz"
                                : "pointer-events-none bg-GrayHomz6"
                            }
                                 rounded-[4px] text-white ${isLoadingForm
                                ? "flex justify-center items-center"
                                : ""
                            }`}
                    >
                        {isLoadingForm ? <LoadingFormII /> : "Add Tenant"}
                    </button>
                </form>
                <div className="mt-4 text-[12px] md:text-[14px]">
                    <button
                        onClick={() => setOpenSingleInvite(false)}
                        onMouseEnter={() => setArrowColor(true)}
                        onMouseLeave={() => setArrowColor(false)}
                        className="h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz"
                    >
                        <span className="flex justify-center items-center gap-2">
                            {arrowColor ? <ArrowLeft className="#006AFF" /> : <ArrowLeft />}
                            Go back </span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SingleInvite;