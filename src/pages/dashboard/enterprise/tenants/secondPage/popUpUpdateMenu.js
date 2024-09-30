import Close from '@/components/icons/Close'
import React, { useEffect, useState } from 'react'
import Dropdown from './updateDropDown.js'
import api from '@/utils/api';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const PopUpUpdateMenu = ({ setUpdateForm, data, setFetchDataAgain, setSuccessfulModal }) => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusTwo, setSelectedStatusTwo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState('');
    const [inputDateValue, setDateInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const optionOne = [
        { id: 1, label: "Cash" },
        { id: 2, label: "Cheque" },
        { id: 3, label: "Transfer" }
    ];

    const optionTwo = [
        { id: 1, label: "Part Payment" },
        { id: 2, label: "Full Payment" },
    ];

    useEffect(() => {
        if (data) {
            setInputValue(data.amountPaid || '');
            setDisplayValue(Number(data.amountPaid || 0).toLocaleString());
            setDateInputValue(data.paidAt ? new Date(data.paidAt).toISOString().split('T')[0] : '');

            const initialMode = optionOne.find(option => option.label.toLowerCase() === data.modeOfTransaction);
            setSelectedStatus(initialMode || null);

            const initialDescription = optionTwo.find(option =>
                option.label.toLowerCase().includes(data.description.toLowerCase()));
            setSelectedStatusTwo(initialDescription || null);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (/^\d*\.?\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            setDisplayValue(rawValue);
        }
    };

    const handleBlur = () => {
        if (inputValue) {
            const formattedValue = Number(inputValue).toLocaleString();
            setDisplayValue(formattedValue);
        }
    };

    const handleFocus = () => {
        setDisplayValue(inputValue);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const paymentId = data?._id
        const tenantId = data?.tenantId?._id
        try {
            const response = await api.patch(`/offlinePayment/enterprise/rent/tenant/${tenantId}/update/${paymentId}`, {
                "description": selectedStatusTwo?.label === "Part-Payment" ? "part payment" : "full payment",
                "amountPaid": inputValue,
                "modeOfTransaction": selectedStatus?.label?.toLowerCase(),
                "dateOfTransaction": inputDateValue,
                "reference" : data?.reference
            })
            if (response?.data?.success === true) {
                setSuccessfulModal(true);
                setUpdateForm(false);
                setFetchDataAgain(true);
            } else {
                setError(response?.data?.message);
            }
        } catch (error) {
            if (error && error?.response?.data?.error?.errors) {
                setError(error?.response?.data?.error?.errors)
            }
            else if (error && error?.response?.data?.message) {
                setError(error?.response?.data?.message)
            } else {
                throw error
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6'>
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
            <div className='mt-3 w-full bg-inputBg py-4 px-6 rounded-[8px] text-[12px] md:text-[14px]'>
                <div className='flex items-center justify-between'>
                    <div className='text-BlackHomz font-[400] w-[35%]'>
                        Date of Transaction
                    </div>
                    <div className='w-[55%]'>
                        <input
                            value={inputDateValue}
                            type='date'
                            className='w-full h-[45px] p-3 rounded-md bg-white text-BlackHomz cursor-pointer'
                            onChange={(e) => {
                                setDateInputValue(e.target.value)
                                setError(null)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-3 w-full bg-inputBg py-4 px-6 rounded-[8px] text-[12px] md:text-[14px]'>
                <div className='flex items-center justify-between'>
                    <div className='text-BlackHomz font-[400] w-[35%]'>
                        Mode of Transaction
                    </div>
                    <div className='w-[55%]'>
                        <Dropdown
                            options={optionOne}
                            onSelect={(option) => setSelectedStatus(option)}
                            selectOption={selectedStatus === null ? null : selectedStatus}
                            className={"w-full font-[500] text-GrayHomz2"}
                        />
                    </div>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                    <div className='text-BlackHomz font-[400] w-[35%]'>
                        Amount Paid
                    </div>
                    <div className='w-[55%] relative'>
                        <span
                            className={`pt-[0.5px] absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500]  placeholder:text-[13px] ${inputValue[0]?.length > 0 || displayValue ? "text-BlackHomz" : "text-GrayHomz2"
                                }`}
                        >
                            ₦
                        </span>
                        <input
                            value={displayValue}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            type='text'
                            placeholder='0.00'
                            className='w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2 text-BlackHomz'
                        />
                    </div>
                </div>
                <div className='mt-4 flex items-center justify-between'>
                    <div className='text-BlackHomz font-[400] w-[35%]'>
                        Description
                    </div>
                    <div className='w-[55%]'>
                        <Dropdown
                            options={optionTwo}
                            onSelect={(option) => setSelectedStatusTwo(option)}
                            selectOption={selectedStatusTwo === null ? null : selectedStatusTwo}
                            className={"w-full font-[500] text-GrayHomz2"}
                        />
                    </div>
                </div>
            </div>
            {error && <span className='text-[11px] font-[400] text-error italic'>{error}</span>}
            <div className='mt-4 text-[12px] md:text-[14px]'>
                {
                    selectedStatus && inputValue[0]?.length > 0 && inputDateValue && selectedStatusTwo
                        ? <button
                            onClick={() => handleSubmit()}
                            className={`h-[48px] w-full bg-BlueHomz rounded-[4px] text-white hover:text-BlueHomz hover:bg-transparent hover:border hover:border-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center" : ""}`}>
                            {loading ? <LoadingFormII /> : "Confirm Transaction"}
                        </button> :
                        <button disabled className='h-[48px] w-full bg-GrayHomz6 rounded-[4px] text-GrayHomz5 '>
                            Confirm Transaction
                        </button>}
            </div>
            <div className='mt-4 text-[12px] md:text-[14px]'>
                <button
                    onClick={() => setUpdateForm(false)}
                    className='h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default PopUpUpdateMenu