import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import React from 'react'

const PrintableQuitNoticeData = ({ printableRef, formData }) => {
    return (
        <div ref={printableRef} className='mt-4'>
            <div className='h-auto bg-white flex flex-col justify-center text-[13px] font-[400] text-BlackHomz gap-3.5 p-8'>
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
                <div className='font-[600]'>{formData?.noticeStartDate ? formatDate(formData?.noticeStartDate) : ""} </div>
                <div className='font-[600] flex flex-col'>
                    <span>{formData?.tenantName ? formData?.tenantName : ""}</span>
                    <span>{formData?.tenantAddress ? formData?.tenantAddress : ""}</span>
                </div>
                <div>Dear <span className='font-[600]'>{formData?.tenantName ? formData?.tenantName : ""}</span>, </div>

                <div>NOTICE TO QUIT - <span className='font-[600]'>{formData?.noticePeriod ? formData?.noticePeriod : ""}</span></div>

                <div>I, <span className='font-[600]'>{formData?.propertyManagerName ? formData?.propertyManagerName : ""}</span>, the Property Manager to the Estate of <span className='font-[600]'>{formData?.landlordName ? formData?.landlordName : ""}</span> (hereinafter referred to as “Our Client”), Your landlord on whose instruction we write. </div>

                <div>You are by this notice required to deliver up possession of the <span className='font-[600]'>{formData?.propertyDesc ? formData?.propertyDesc : ""}</span>, situated at, <span className='font-[600]'>{formData?.propertyManagerCompanyAddress ? formData?.propertyManagerCompanyAddress : ""}</span>, which you hold as a yearly tenant be given to us on the expiration of your current tenancy period; <span className='font-[600]'>{formData?.noticePeriod ? formData?.noticePeriod : ""}</span> from the date of your receipt or service of this notice.</div>

                <div>Furthermore, you are requested to settle all your outstanding rent, rates, electricity bills, Levies and keep the apartment in a tenantable condition before your departure.</div>

                <div>Take Notice that in the event of your refusal to comply with the notice, we have the instruction of our client to apply to court for issuance of warrant directing an appropriate person to enter and take possession of the said premises and to eject any person there from. Thanks.</div>

                <div>Dated this <span className='font-[600]'>{formData?.noticeStartDate ? formatDate(formData?.noticeStartDate) : ""}</span></div>
                <div className='flex flex-col'>
                    <span>Yours faithfully,</span>
                    <span>For and On Behalf Of;</span>
                    <span className='font-[600]'>{formData?.propertyManagerCompanyName ? formData?.propertyManagerCompanyName : ""}</span>
                </div>
                <div className='flex gap-1'>
                    <span>Signed</span>
                    <span className='font-[600]'>{formData?.propertyManagerName ? formData?.propertyManagerName : ""}</span>
                </div>
            </div>
        </div>
    )
}

export default PrintableQuitNoticeData