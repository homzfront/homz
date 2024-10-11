import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import React from 'react'

const PrintableReceiptData = ({ printableRef, formData }) => {
    return (
        <div ref={printableRef} className='mt-4'>
            <div className='h-auto bg-white flex flex-col justify-center  text-[13px] font-[400] text-BlackHomz gap-3.5 p-8'>
                <div className=' flex items-center gap-4 border-b pb-4 w-full'>
                    <Image
                        src={formData?.image && formData.image instanceof File
                            ? URL.createObjectURL(formData.image) : "/Frame 1278.png"}
                        alt='avatar'
                        width={64}
                        height={64}
                        className='rounded-full object-cover bg-center h-[64px]'
                    />
                    <p className='text-[13px] font-[600] text-GrayHomz'>
                        {formData?.propertyManagerCompanyName ? formData?.propertyManagerCompanyName : ""}
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
                            {formData?.receiptDate ? formatDate(formData?.receiptDate) : ""}
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
                                    {formData?.propertyAddress ? formData?.propertyAddress : ""}
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
                                    {formData?.propertyDesc ? formData?.propertyDesc : ""}
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
                                    {formData?.propertyManagerCompanyName ? formData?.propertyManagerCompanyName : ""}
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
                                    {formData?.propertyManagerCompanyAddress ? formData?.propertyManagerCompanyAddress : ""}
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
                                    {formData?.propertyManagerCompanyPhoneNumber ? formData?.propertyManagerCompanyPhoneNumber : ""}
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
                                    {formData?.tenantName ? formData?.tenantName : ""}
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
                                    {formData?.tenantPhoneNumber ? formData?.tenantPhoneNumber : ""}
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
                                    {formData?.tenancy ? formData?.tenancy : ""}
                                </p>
                            </div>
                        </div>
                        <div className='py-2 md:py-0 md:h-[21px] w-full flex justify-between pl-2'>
                            <div className='w-[30%]'>
                            </div>
                            <div className='w-[60%]'>
                                <p className='text-[11px] font-[400] text-GrayHomz'>
                                    {formData?.tenancyStartDate && formData?.tenancyEndDate ? `${formatDate(formData?.tenancyStartDate)} - ${formatDate(formData?.tenancyEndDate)}` : ""}
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
                                    {formData?.rentPaymentInWords ? formData?.rentPaymentInWords : ""}
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
                                    {formData?.rentPayment ? formData?.rentPayment : ""}
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
                                    {formData?.modOfPayment ? formData?.modOfPayment : ""}
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
                                    {formData?.tenancyEndDate ? formatDate(formData?.tenancyEndDate) : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintableReceiptData