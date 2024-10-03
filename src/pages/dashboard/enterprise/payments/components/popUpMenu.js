import Close from '@/components/icons/Close'
import addCommasToNumber from '@/utils/addCommasToNumber'
import changeBackendDateFormat from '@/utils/changeBackendDateFormat'
import React from 'react'

const PopUpMenu = ({ data, setPopUpMenu }) => {
    return (
        <div className='w-[100%] md:w-[470px] h-auto bg-white rounded-[12px] p-6'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-BlackHomz font-[500] text-[16px]'>
                    Rent Payment Details
                </p>
                <div onClick={() => setPopUpMenu(false)} className='cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center'>
                    <Close />
                </div>
            </div>
            <div className='mt-3 w-full bg-inputBg py-4 px-6 rounded-[8px]'>
                <div className='w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Property
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {data?.estateId?.name}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Rent Amount
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {addCommasToNumber(data?.totalRent)}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Due Date
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {changeBackendDateFormat(data?.dueDate)}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Payment Status
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {data?.status}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Mode of Payment
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {data?.paymentMethod}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Amount Paid
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {addCommasToNumber(data?.amountPaid)}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Description
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {data?.description}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Rent Duration
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {data?.duration === 1 ? `${data?.duration} year` : `${data?.duration} years`}
                        </p>
                    </div>
                </div>
                <div className='mt-2 w-full'>
                    <div className='flex justify-between items-start w-full'>
                        <p className='text-BlackHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            Payment Date
                        </p>
                        <p className='text-GrayHomz font-[400] text-[12px] md:text-[14px] w-[45%]'>
                            {changeBackendDateFormat(data?.paymentDate)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpMenu
