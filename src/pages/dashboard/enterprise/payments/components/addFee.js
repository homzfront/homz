import React, { useState } from 'react';
import CloseSmall from '@/components/icons/closeSmall';
import DeleteRed from '@/components/icons/deleteRed';

const AddFee = ({ setInclude }) => {
    const [fees, setFees] = useState([
        { name: 'Management fee', amount: 700000, percent: 10 },
    ]);

    const addFee = () => {
        setFees([...fees, { name: '', amount: '', percent: '' }]);
    };

    const removeFee = (index) => {
        const newFees = [...fees];
        newFees.splice(index, 1);
        setFees(newFees);
    };

    const handleFeeChange = (index, field, value) => {
        const updatedFees = [...fees];
        updatedFees[index][field] = value;
        setFees(updatedFees);
    };

    const calculateTotalAfterFees = () => {
        const totalAmount = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
        return 7000000 - totalAmount;
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
                            value="₦7,000,000"
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
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label className='w-[40%]'>Amount (₦) <span className='text-error'>*</span></label>
                            <input
                                value={fee.amount}
                                onChange={(e) => handleFeeChange(index, 'amount', e.target.value)}
                                type="number"
                                placeholder="e.g 700000"
                                className="w-[60%] border border-[#E6E6E6] px-4 py-2 rounded"
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label className='w-[40%]'>Amount (%) <span className='text-error'>*</span></label>
                            <input
                                value={fee.percent}
                                onChange={(e) => handleFeeChange(index, 'percent', e.target.value)}
                                type="number"
                                placeholder="e.g 10"
                                className="w-[60%] border border-[#E6E6E6] px-4 py-2 rounded"
                            />
                        </div>
                        <div className='w-full flex justify-end'>
                            {index !== 0 && (
                                <button
                                    onClick={() => removeFee(index)}
                                    className="text-sm text-red-500 flex item-center gap-1"
                                >
                                    <DeleteRed />    Remove fee
                                </button>
                            )}<span className='text-error'>
</span>                        </div>
                    </div>
                ))}

                <button
                    onClick={addFee}
                    className="text-BlueHomz mt-2 text-sm font-medium flex gap-1 items-center"
                >
                    <span className='text-[20px] mb-1.5'>+</span> Add new fee
                </button>

                <div className="bg-inputBg py-4 px-6 rounded-[8px] flex flex-col gap-2 justify-between">
                    <div className='flex gap-4 items-center'>
                        <label className='w-[40%]'>Total Fees</label>
                        <input
                            value={calculateTotalAfterFees()}
                            readOnly
                            className="w-[60%] bg-GrayHomz6 px-4 py-2 rounded text-sm"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between gap-4">
                    <button
                        onClick={() => setInclude('')}
                        className="border border-BlueHomz text-BlueHomz px-4 py-2 rounded w-[40%]"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setInclude('withoutFee')}
                        className="bg-BlueHomz text-white px-4 py-2 rounded w-[60%]">
                        Generate Statement
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFee;
