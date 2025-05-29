import React, { useState } from 'react';
import CloseSmall from '@/components/icons/closeSmall';
import DeleteRed from '@/components/icons/deleteRed';
import { toast } from 'react-toastify';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import api from '@/utils/api';
import usePaymentFilterStore from '@/store/enterpriseStore/usePaymentFilterStore';
import PropTypes from 'prop-types';

const FeeManagementModal = ({ totalRentCollected = 0, setInclude }) => {
    const [fees, setFees] = useState([
        { name: '', amount: null, percent: null },
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setFee, fetchFeeList } = usePaymentFilterStore();

    const addFee = () => {
        setFees([...fees, { name: '', amount: '', percent: '' }]);
    };

    const removeFee = (index) => {
        if (fees.length <= 1) return; // Don't remove the last fee
        const newFees = [...fees];
        newFees.splice(index, 1);
        setFees(newFees);
    };

    const handleFeeChange = (index, field, value) => {
        const updatedFees = [...fees];

        // For name field, just update it directly
        if (field === 'name') {
            updatedFees[index][field] = value;
            setFees(updatedFees);
            return;
        }

        // If the value is empty, clear both amount and percent fields
        if (value === '') {
            updatedFees[index][field] = '';
            if (field === 'amount') updatedFees[index]['percent'] = '';
            if (field === 'percent') updatedFees[index]['amount'] = '';
            setFees(updatedFees);
            return;
        }

        // Parse the value as a number
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) return;

        // Update the changed field
        updatedFees[index][field] = numericValue;

        // Calculate the other field based on which one was changed
        if (field === 'amount' && totalRentCollected > 0) {
            // Calculate percentage based on amount
            updatedFees[index]['percent'] = parseFloat(((numericValue / totalRentCollected) * 100).toFixed(2));
        } else if (field === 'percent' && totalRentCollected > 0) {
            // Calculate amount based on percentage
            updatedFees[index]['amount'] = parseFloat(((numericValue / 100) * totalRentCollected).toFixed(2));
        }

        setFees(updatedFees);
    };

    const calculateTotalAfterFees = () => {
        const totalAmount = fees?.reduce((sum, fee) => sum + Number(fee.amount || 0), 0) || 0;
        return totalRentCollected - totalAmount;
    };

    const calculateTotalFees = () => {
        if (!fees || fees.length === 0) return 0;
        return fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
    };

    const prepareDataForApi = () => {
        const totalAfterFees = calculateTotalAfterFees();
        const totalFeeList = calculateTotalFees();

        const formattedFees = fees?.map(fee => ({
            name: fee.name,
            amountN: Number(fee.amount) || 0,
            amountPct: Number(fee.percent) || 0
        }));

        return {
            totalRentCollected,
            totalAfterFees,
            totalFeeList,
            fees: formattedFees
        };
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const dataToSend = prepareDataForApi();

            // Validate data before sending
            if (dataToSend?.fees.some(fee => !fee.name)) {
                toast.error('Please fill in all fee names');
                setIsSubmitting(false);
                return;
            }

            const response = await api.post('/rentPayment/enterprise/fee/create', dataToSend);

            if (response.status === 200 || response.status === 201) {
                toast.success('Fees submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const resultList = await fetchFeeList();
                setInclude('withoutFee');
                setFee(response.data);
            } else {
                console.error('Error submitting fees:', response.data);
                toast.error('Failed to submit fees');
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error('An error occurred while submitting fees');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 w-full md:w-[550px] font-normal text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-container">
            <div className="w-full flex justify-between items-start">
                <p className="text-BlackHomz font-[500] text-[14px] md:text-[18px]">
                    Enter Fee Details
                </p>
                <div onClick={() => setInclude('')} className="cursor-pointer">
                    <CloseSmall />
                </div>
            </div>

            <div className="border-b border-[#E6E6E6] mt-2" />

            <div className="mt-4 space-y-4">
                <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col gap-2 justify-between">
                    <div className='flex gap-4 items-center'>
                        <label className='w-[40%]'>Total Rent Collected</label>
                        <input
                            value={`₦${totalRentCollected.toLocaleString()}`}
                            readOnly
                            className="w-[60%] bg-GrayHomz6 px-4 py-2 rounded text-sm"
                        />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <label className='w-[40%]'>Total (After fees)</label>
                        <input
                            value={`₦${calculateTotalAfterFees().toLocaleString()}`}
                            readOnly
                            className="w-[60%] bg-GrayHomz6 px-4 py-2 rounded text-sm"
                        />
                    </div>
                </div>

                {fees.map((fee, index) => (
                    <div key={index} className="bg-inputBg py-4 px-6 rounded-[8px] pt-4 relative space-y-2 flex flex-col gap-2">
                        <div className="flex gap-4 items-center">
                            <label className='w-[40%]'>Fee Name <span className='text-error'>*</span></label>
                            <input
                                value={fee.name}
                                onChange={(e) => handleFeeChange(index, 'name', e.target.value)}
                                placeholder="e.g Management fee"
                                className="w-[60%] border border-[#E6E6E6] px-4 py-2 rounded"
                                required
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label className='w-[40%]'>Amount (₦) <span className='text-error'>*</span></label>
                            <input
                                value={fee.amount || ''}
                                onChange={(e) => handleFeeChange(index, 'amount', e.target.value)}
                                type="number"
                                placeholder="e.g 700000"
                                className="w-[60%] border border-[#E6E6E6] px-4 py-2 rounded"
                                min="0"
                                required
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label className='w-[40%]'>Amount (%) <span className='text-error'>*</span></label>
                            <input
                                value={fee.percent || ''}
                                onChange={(e) => handleFeeChange(index, 'percent', e.target.value)}
                                type="number"
                                placeholder="e.g 10"
                                className="w-[60%] border border-[#E6E6E6] px-4 py-2 rounded"
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                        <div className='w-full flex justify-end'>
                            {index !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeFee(index)}
                                    className="text-sm text-red-500 flex item-center gap-1"
                                >
                                    <DeleteRed /> Remove fee
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addFee}
                    className="text-BlueHomz mt-2 text-sm font-medium flex gap-1 items-center"
                >
                    <span className='text-[20px] mb-1.5'>+</span> Add new fee
                </button>

                <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col gap-2 justify-between">
                    <div className='flex gap-4 items-center'>
                        <label className='w-[40%]'>Total Fees</label>
                        <input
                            value={`₦${calculateTotalFees().toLocaleString()}`}
                            readOnly
                            className="w-[60%] bg-GrayHomz6 px-4 py-2 rounded text-sm"
                        />
                    </div>
                </div>

                <div className={`mt-6 flex justify-between gap-4 ${isSubmitting && "pointer-events-none"}`}>
                    <button
                        type="button"
                        onClick={() => setInclude('')}
                        className="border border-BlueHomz text-BlueHomz px-4 py-2 rounded w-[40%]"
                        disabled={isSubmitting}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`bg-BlueHomz text-white px-4 py-2 rounded w-[60%] ${isSubmitting ? 'w-full flex justify-center' : ''}`}
                    >
                        {isSubmitting ? <LoadingFormII /> : 'Generate Statement'}
                    </button>
                </div>
            </div>
        </div>
    );
};

FeeManagementModal.propTypes = {
    totalRentCollected: PropTypes.number,
    setInclude: PropTypes.func.isRequired
};

FeeManagementModal.defaultProps = {
    totalRentCollected: 0
};

export default FeeManagementModal;