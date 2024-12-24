import React, { useEffect, useState } from "react";
import Close from "@/components/icons/Close";
import { format } from "date-fns";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "@/utils/api";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import useExportEnterpriseSingleTenant from "@/store/enterpriseStore/exportEnterpriseSingleTenant";
import DateIcon from "@/components/icons/date";
import PaymentRefetchTenant from "@/store/enterpriseStore/paymentRefetchTenant";
import ArrowLeft from "@/components/icons/arrowLeft";

const SingleInvite = ({ setOpenSingleInvite, setOpenTenantInvite }) => {
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [arrowColor, setArrowColor] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        tenantName: null,
        email: null,
        apartmentNumber: null,
        address: null,
        PhoneNUmber: null,
        rentAmount: null,
        rentDuration: null,
        startDate: null,
    });
    const [errors, setErrors] = useState({});

    console.log(formData)

    // const { setRefetch } = PaymentRefetchTenant();
    // const { fetchData: exportFetch } = useExportEnterpriseSingleTenant();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.tenantName)
            newErrors.tenantName = "Tenant Name is required.";
        if (!formData.email)
            newErrors.email = "Email is required.";
        if (!formData.rentAmount)
            newErrors.rentAmount = "Rent amount is required.";
        if (!formData.rentDuration)
            newErrors.rentDuration = "Rent duration is required.";
        if (!formData.startDate)
            newErrors.startDate = "Start date is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
        }
    };

    const onSubmit = async (e) => {
        // e.preventDefault();
        // setRefetch(false)
        if (!validateForm()) return;
        // setIsLoadingForm(true);
        successfullModal();
        try {
            // const response = await api.post(
            //     `/offlinePayment/enterprise/rent/tenant/${tenantId}`,
            //     {
            //         description: formData.description?.label.toLowerCase(),
            //         rent: formData.rent.replace(/,/g, ""),
            //         amountPaid: formData.amountPaid.replace(/,/g, ""),
            //         modeOfTransaction: formData.modeOfTransaction?.label.toLowerCase(),
            //         dateOfTransaction: formData.dateOfTransaction.toISOString(),
            //         duration: formData.duration,
            //         startDate: formData.startDate.toISOString(),
            //         dueDate: formData.dueDate.toISOString(),
            //     }
            // );

            // if (response?.data?.success) {
            //     setOpenSingleInvite(false);
            //     reFetchSummaryData();
            //     exportFetch(tenantId);
            //     setRefetch(true);
            // }
            // Clear all errors
            setErrors((prevErrors) => {
                const clearedErrors = Object.keys(prevErrors).reduce((acc, key) => {
                    acc[key] = null; // Set each field's error to null
                    return acc;
                }, {});
                return clearedErrors;
            });
        } catch (error) {
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

    // useEffect(() => {
    //     if (rentInfo?.upDateddata) {
    //         setFormData({
    //             ...formData,
    //             rent: new Intl.NumberFormat().format(rentInfo?.upDateddata.rent) || "",
    //             startDate: new Date(rentInfo?.upDateddata.startDate),
    //             dueDate: new Date(rentInfo?.upDateddata.dueDate),
    //             duration: rentInfo?.upDateddata.duration || "",
    //         });
    //     }
    // }, [rentInfo?.upDateddata]);

    // useEffect(() => {
    //     if (formData.duration && formData.startDate) {
    //         const newDueDate = new Date(formData.startDate);
    //         newDueDate.setMonth(
    //             newDueDate.getMonth() + parseInt(formData.duration, 10)
    //         );
    //         newDueDate.setDate(newDueDate.getDate() - 1);
    //         handleInputChange("dueDate", newDueDate);
    //     }
    // }, [formData.duration, formData.startDate]);

    // const isValid = Object.values(formData).every((value) => {
    //     // Check for null, undefined, or empty strings
    //     if (value === null || value === undefined || value === "") {
    //         return false;
    //     }

    //     // Additional check for arrays (if any field is an array)
    //     if (Array.isArray(value) && value.length === 0) {
    //         return false;
    //     }

    //     return true;
    // });


    const validateSpecificFields = () => {
        // Check specific fields are filled
        const requiredFields = ["tenantName", "email", "rentAmount", "rentDuration", "startDate"];
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
        const allFieldsValid = validateSpecificFields()
        setIsValid(allFieldsValid);
    }, [formData]);


    return (
        <div className="max-h-[600px]">
            <div className="w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6 overflow-y-auto">
                <div className="w-full flex justify-between items-center">
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
                        className="cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                    >
                        <Close />
                    </div>
                </div>
                <form
                    onSubmit={onSubmit}
                    className={`space-y-4 mt-3 ${isLoadingForm ? "pointer-events-none" : ""
                        }`}
                >
                    <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col items-center justify-between">
                        {/* Tenant Name */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Tenant’s Name <span className="text-red-600">*</span>
                            </label>
                            <div className="w-[52%]">
                                <input
                                    type="text"
                                    value={formData.tenantName}
                                    onChange={(e) => handleInputChange("tenantName", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                    placeholder="e.g Femi Jegede"
                                />
                                {errors.tenantName && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.tenantName}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Email */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[42%]">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <div className="w-[52%]">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                    placeholder="e.g FemiJegede@gmail.com"
                                />
                                {errors.email && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col items-center justify-between">
                        {/* Apartment Number */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Apartment No
                            </label>
                            <div className="w-[52%]">
                                <input
                                    type="text"
                                    value={formData.apartmentNumber}
                                    onChange={(e) => handleInputChange("apartmentNumber", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                    placeholder="e.g Apartment 46"
                                />
                                {errors.apartmentNumber && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.apartmentNumber}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Address */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Address
                            </label>
                            <div className="w-[52%]">
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
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
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Phone No
                            </label>
                            <div className="w-[52%]">
                                <input
                                    type="text"
                                    value={formData.PhoneNUmber}
                                    onChange={(e) => handleInputChange("PhoneNUmber", e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
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
                    <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col items-center justify-between">
                        {/*Rent Amount */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Rent Amount <span className="text-red-600">*</span>
                            </label>
                            <div className="w-[52%]">
                                <div className="relative">
                                    <span className={` absolute left-3 top-[1px] bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] ${formData?.rentAmount === null ? "text-GrayHomz2" : ""} `}>
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
                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
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
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Rent Duration <span className="text-red-600">*</span>
                            </label>
                            <div className="w-[52%]">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.rentDuration}
                                        onChange={(e) => handleInputChange("rentDuration", e.target.value)}
                                        className="w-full h-[45px] py-3 pl-6 pr-[40px] rounded-md bg-white placeholder:text-GrayHomz2"
                                        placeholder="e.g 36"
                                    />
                                    <p className={`absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none ${formData?.rentDuration === null ? "text-GrayHomz2" : ""}`}>Months</p>
                                </div>
                                {errors.rentDuration && (
                                    <span className="text-error text-[11px] italic">
                                        {errors.rentDuration}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Start Date */}
                        <div className="w-full py-4 px-2 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Start Date <span className="text-red-600">*</span>
                            </label>
                            <div className="w-[52%] relative">
                                <div className="w-full">
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={(date) => handleInputChange("startDate", date)} // Update with Date object
                                        dateFormat="d MMMM, yyyy" // Format displayed in UI
                                        placeholderText="Select Start Date"
                                        className="w-full h-[45px] px-4 py-2 rounded-md border"
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
                    </div>
                    {errors.backend && (
                        <span className="text-red-500 text-xs mt-1">
                            {errors.backend?.[0]}
                        </span>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
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