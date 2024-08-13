import React from 'react'
import Image from 'next/image';

const ReceiptData = () => {
    return (
        <div className='mb-[60px]'>
            <div className='md:h-[700px] bg-white flex flex-col justify-center  text-[13px] font-[400] text-BlackHomz gap-3.5 p-4'>
                <div className=' flex items-center gap-4 border-b pb-4 w-full'>
                    <Image
                        src={"/Frame 1278.png"}
                        alt='avatar'
                        width={64}
                        height={64}
                    />
                    <p className='text-[13px] font-[600] text-GrayHomz'>
                        [Property Manager’s Company]
                    </p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-[13px] font-[700] text-BlackHomz'>
                        RENT RECEIPT
                    </p>
                    <div className='flex gap-2'>
                        <p className='text-[11px] font-[500] text-BlackHomz'>
                            Date
                        </p>
                        <p className='text-[11px] font-[400] text-GrayHomz'>
                            [Date]
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='py-2 md:py-0 md:h-[26px] w-full bg-BlackHomz text-white flex items-center px-2'>
                        <p className='text-[12px] font-[400]'>Property  Information</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-1">
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Property Address
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Property Address]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Property Description
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Property - Description]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='py-2 md:py-0 md:h-[26px] w-full bg-BlackHomz text-white flex items-center px-2'>
                        <p className='text-[12px] font-[400]'>Property Manager’s Information </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-1">
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Company Name
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Property Manager’s Company Name]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Company Address
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Property Manager’s Company Address]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Company Phone Number
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Property Manager’s Company Phone Number]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='py-2 md:py-0 md:h-[26px] w-full bg-BlackHomz text-white flex items-center px-2'>
                        <p className='text-[12px] font-[400]'>Tenant Information </p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-1">
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Name
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Tenant’s Name]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Phone Number
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Tenant’s Phone Number]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Tenancy Period
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Tenancy period] (Month/Year)
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full flex justify-between pl-2'>
                            <div className='w-[30%]'>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Tenancy start date] - [Tenancy end date]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <div className='py-2 md:py-0 md:h-[26px] w-full bg-BlackHomz text-white flex items-center px-2'>
                        <p className='text-[12px] font-[400]'> Payment Information</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-1">
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Amount in words
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Amount in words]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Amount in figures
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Currency] [Amount in figures]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Mode of payment
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Mode of payment]
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full border-b flex justify-between pl-2'>
                            <div className='w-[30%]'>
                                <p className='text-[11px] font-[500] text-BlackHomz'>
                                    Tenancy End Date
                                </p>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    [Tenancy end date]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiptData