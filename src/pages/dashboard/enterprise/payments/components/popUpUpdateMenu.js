import Close from '@/components/icons/Close'
import React, { useEffect, useState } from 'react'
import Dropdown from './updateDropDown.js'
import api from '@/utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateIcon from '@/components/icons/date';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import useExportEnterpriseSingleTenant from '@/store/enterpriseStore/exportEnterpriseSingleTenant.js';
import PaymentRefetchTenant from '@/store/enterpriseStore/paymentRefetchTenant.js';

const PopUpUpdateMenu = ({
    setUpdateForm,
    data,
    setSuccessfulModal,
    reFetchSummaryData
}) => {
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [formData, setFormData] = useState({
        dateOfTransaction: null,
        modeOfTransaction: null,
        amountPaid: '',
        rent: '',
        description: null,
        startDate: null,
        dueDate: null,
        duration: '',
    });
    const [errors, setErrors] = useState(null);

    const { setRefetch } = PaymentRefetchTenant();
    const { fetchData: exportFetch } = useExportEnterpriseSingleTenant();

    useEffect(() => {
        if (data) {
            setFormData({
                ...formData,
                rent: new Intl.NumberFormat().format(data.rent) || '',
                startDate: new Date(data.startDate),
                dueDate: new Date(data.dueDate),
                duration: data.duration || '',
                dateOfTransaction: new Date(data.paidAt),
                modeOfTransaction: data.modeOfTransaction,
                amountPaid: new Intl.NumberFormat().format(data.amountPaid),
                description: data.description,
                reference: data.reference
            });
        }
    }, [data]);

    const optionOne = [
        { id: 1, label: 'Cash' },
        { id: 2, label: 'Cheque' },
        { id: 3, label: 'Transfer' },
    ];

    const optionTwo = [
        { id: 1, label: 'Part Payment' },
        { id: 2, label: 'Full Payment' },
    ];

    const validateForm = () => {
        let newErrors = "";
        if (!formData.dateOfTransaction) newErrors = 'Date of Transaction is required.';
        if (!formData.modeOfTransaction) newErrors = 'Mode of Transaction is required.';
        if (!formData.amountPaid) newErrors = 'Amount Paid is required.';
        if (!formData.rent) newErrors = 'Rent Amount is required.';
        if (!formData.description) newErrors = 'Description is required.';
        if (!formData.startDate) newErrors = 'Start Date is required.';
        if (!formData.dueDate) newErrors = 'End Date is required.';
        if (!formData.duration || formData.duration <= 0) newErrors = 'Rent Duration must be greater than 0.';
        setErrors(newErrors);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors) {
            setErrors(null);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // if (!validateForm()) return;
        setRefetch(false);
        setIsLoadingForm(true)
        const paymentId = data?._id
        const tenantId = data?.tenantId?._id
        try {
            const response = await api.patch(`/offlinePayment/enterprise/rent/tenant/${tenantId}/update/${paymentId}`, {
                description: formData.description?.toLowerCase(),
                rent: formData.rent.replace(/,/g, ''),
                amountPaid: formData.amountPaid.replace(/,/g, ''),
                modeOfTransaction: formData.modeOfTransaction?.toLowerCase(),
                dateOfTransaction: formData.dateOfTransaction?.toISOString(),
                duration: formData.duration,
                startDate: formData.startDate.toISOString(),
                dueDate: formData.dueDate.toISOString(),
                reference: formData.reference
            })
            if (response?.data?.success === true) {
                setSuccessfulModal(true);
                setErrors(null)
                setUpdateForm(false);
                exportFetch(data?.tenantId?._id)
                if (reFetchSummaryData) {
                    reFetchSummaryData(1)
                }
                setRefetch(true);
            } else {
                setErrors(response?.data?.message);
            }
        } catch (error) {
            if (error && error?.response?.data?.error?.errors) {
                setErrors(error?.response?.data?.error?.errors)
            }
            else if (error && error?.response?.data?.message) {
                setErrors(error?.response?.data?.message)
            } else {
                throw error
            }
        }
        finally {
            setIsLoadingForm(false)
        }
    };
    const isValid =
        Object.values(formData).every((value) => {
            // Check for null, undefined, or empty strings
            if (value === null || value === undefined || value === '') {
                return false;
            }

            // Additional check for arrays (if any field is an array)
            if (Array.isArray(value) && value.length === 0) {
                return false;
            }

            return true;
        });

    return (
        <div className='max-h-[600px]'>
            <div className='w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6 overflow-y-auto'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col w-[85%]'>
                        <p className='text-BlackHomz font-[500] text-[14px] md:text-[16px]'>
                            Update Offline Payment Record
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[13px]'>
                            {`Update the details for ${data?.tenantId?.fullName} offline payment`}
                        </p>
                    </div>
                    <div onClick={() => setUpdateForm(false)} className='cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center'>
                        <Close />
                    </div>
                </div>
                <form onSubmit={onSubmit} className={`space-y-4 mt-3 ${isLoadingForm ? "pointer-events-none" : ""}`}>
                    {/* Date of Transaction */}
                    <div className="bg-inputBg py-4 px-6 rounded-[8px] flex items-center justify-between">
                        <label className="text-BlackHomz font-[400] w-[40%]">
                            Date of Transaction <span className='text-red-600'>*</span>
                        </label>
                        <div className="relative">
                            <div className='w-full'>
                                <DatePicker
                                    selected={formData.dateOfTransaction} // Bind to formData
                                    onChange={(date) => handleInputChange('dateOfTransaction', date)} // Update using handleInputChange
                                    dateFormat="d MMMM, yyyy" // Display format
                                    placeholderText="Select Date"
                                    className={`w-full h-[45px] px-4 py-2 rounded-md border`}
                                />
                            </div>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <DateIcon />
                            </div>
                        </div>
                    </div>
                    <div className="bg-inputBg rounded-[8px]">
                        {/* Mode of Transaction */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[42%]">
                                Mode of Transaction <span className='text-red-600'>*</span>
                            </label>
                            <div className="w-[52%]">
                                <Dropdown
                                    options={optionOne}
                                    onSelect={(option) => handleInputChange('modeOfTransaction', option?.label)}
                                    selectOption={formData.modeOfTransaction}
                                    className={"w-full"}
                                />
                            </div>
                        </div>

                        {/* Rent Amount */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Rent Amount <span className='text-red-600'>*</span>
                            </label>
                            <div className="w-[52%]">
                                <div className='relative'>
                                    <span className="absolute left-3 top-[1px] bottom-0 flex items-center text-[13px] md:text-[14px] font-[500]">
                                        ₦
                                    </span>
                                    <input
                                        type="text"
                                        value={formData.rent || ''}
                                        onChange={(e) => {

                                            const rawValue = e.target.value.replace(/,/g, '');
                                            if (/^\d*\.?\d*$/.test(rawValue)) {
                                                handleInputChange('rent', rawValue)
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const rawValue = e.target.value.replace(/,/g, '');
                                            handleInputChange('rent', rawValue ? new Intl.NumberFormat().format(rawValue) : '');
                                        }}
                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Amount Paid */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Amount Paid <span className='text-red-600'>*</span>
                            </label>
                            <div className="w-[52%]">
                                <div className='relative'>
                                    <span className="absolute left-3 top-[1px] bottom-0 flex items-center text-[13px] md:text-[14px] font-[500]">
                                        ₦
                                    </span>
                                    <input
                                        type="text"
                                        value={formData.amountPaid || ''}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/,/g, '');
                                            if (/^\d*\.?\d*$/.test(rawValue)) {
                                                handleInputChange('amountPaid', rawValue);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const rawValue = e.target.value.replace(/,/g, '');
                                            handleInputChange('amountPaid', rawValue ? new Intl.NumberFormat().format(rawValue) : '');
                                        }}
                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Description <span className='text-red-600'>*</span>
                            </label>
                            <div className="w-[52%]">
                                <Dropdown
                                    options={optionTwo}
                                    onSelect={(option) => handleInputChange('description', option?.label)}
                                    selectOption={formData.description}
                                    className={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-inputBg rounded-[8px]">
                        <div className='text-GrayHomz font-[400] text-[13px] p-4'>
                            Only change these default dates if this payment record is not for your current information.
                        </div>

                        {/* Rent Duration */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Rent Duration <span className='text-red-600'>*</span>
                            </label>
                            <div className="w-[52%] relative">
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', e.target.value)}
                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                    placeholder="1 Month"
                                />
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Start Date <span className='text-red-600'>*</span>
                            </label>
                            <div className="relative">
                                <div className='w-full'>
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={(date) => handleInputChange('startDate', date)} // Update with Date object
                                        dateFormat="d MMMM, yyyy" // Format displayed in UI
                                        placeholderText="Select Start Date"
                                        className="w-full h-[45px] px-4 py-2 rounded-md border"
                                    />

                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <DateIcon />
                                </div>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="pointer-events-none py-4 px-6 flex items-center justify-between">
                            <label className="text-BlackHomz font-[400] w-[40%]">
                                Due Date <span className='text-red-600'>*</span>
                            </label>
                            <div className="relative">
                                <div className='w-full'>
                                    <DatePicker
                                        selected={formData?.dueDate} // Pass the Date object
                                        onChange={(date) => handleInputChange('dueDate', date)} // Update with Date object
                                        dateFormat="d MMMM, yyyy" // Format displayed in UI
                                        placeholderText="Select End Date"
                                        className={`w-full h-[45px] px-4 py-2 rounded-md border`}
                                    />
                                </div>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <DateIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    {errors && (
                        <span className="text-red-500 text-xs mt-1">{errors}</span>
                    )}

                    {/* Submit Button */}
                    <button
                        disabled={isLoadingForm}
                        type="submit"
                        className={`h-[48px] w-full 
                                 ${isValid ? 'bg-BlueHomz' : 'pointer-events-none bg-GrayHomz6'}
                                 rounded-[4px] text-white ${isLoadingForm ? "flex justify-center items-center" : ""}`}
                    >
                        {isLoadingForm ? <LoadingFormII /> : 'Update Transaction'}
                    </button>
                </form>
                <div className='mt-4 text-[12px] md:text-[14px]'>
                    <button
                        disabled={isLoadingForm}
                        onClick={() => setUpdateForm(false)}
                        className='h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz'>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUpUpdateMenu