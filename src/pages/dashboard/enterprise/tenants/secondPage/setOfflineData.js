import Close from '@/components/icons/Close'
import React, { useState } from 'react'
import Dropdown from './dropDown'

const SetOfflineData = ({ setOfflinepay, successfullModal }) => {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedStatusTwo, setSelectedStatusTwo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputDateValue, setDateInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const optionOne = [
        { id: 1, label: "Cash" },
        { id: 2, label: "Cheque" },
        { id: 3, label: "Transfer" }
    ];

    const optionTwo = [
        { id: 1, label: "Part-Payment" },
        { id: 2, label: "Full Payment" },
    ];

    return (
        <div className='w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col w-[85%]'>
                    <p className='text-BlackHomz font-[500] text-[14px] md:text-[16px]'>
                        Offline Payment Record
                    </p>
                    <p className='text-GrayHomz font-[400] text-[12px] md:text-[13px]'>
                        Fill in the details  for [Tenant’s Name]’s offline payment
                    </p>
                </div>
                <div onClick={() => setOfflinepay(false)} className='cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center'>
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
                            onChange={(e) => setDateInputValue(e.target.value)}
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
                    <div className='w-[55%]'>
                        <input
                            onChange={handleInputChange}
                            value={inputValue}
                            type='text'
                            placeholder='₦0.00'
                            className='w-full h-[45px] p-3 rounded-md bg-white placeholder:text-GrayHomz2 text-BlackHomz'
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
            <div className='mt-4 text-[12px] md:text-[14px]'>
                {
                    selectedStatus && inputValue && inputDateValue && selectedStatusTwo
                        ? <button
                            onClick={successfullModal}
                            className='h-[48px] w-full bg-BlueHomz rounded-[4px] text-white hover:text-BlueHomz hover:bg-transparent hover:border hover:border-BlueHomz'>
                            Confirm Transaction
                        </button> :
                        <button disabled className='h-[48px] w-full bg-GrayHomz6 rounded-[4px] text-GrayHomz5 '>
                            Confirm Transaction
                        </button>}
            </div>
            <div className='mt-4 text-[12px] md:text-[14px]'>
                <button
                    onClick={() => setOfflinepay(false)}
                    className='h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz'>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SetOfflineData