import React from 'react'

const PersonalKYC = () => {
    return (
        <div className='mb-4'>
            <div className='bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz'>
                <p className='text-[14px] md:text-[16px] font-normal text-BlackHomz'>Personal Information</p>
                <div className='mt-2'>
                    <div className='mt-4 grid grid-cols-2 md:grid-cols-3 w-full gap-4'>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Full Name</p>
                            <p>[Adeyemo Olayemi]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Gender</p>
                            <p>[Gender]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Phone Number</p>
                            <p>[Phone Number]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Email</p>
                            <p>[Email]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Marital Status</p>
                            <p>[Marital Status]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Office Address</p>
                            <p>[Office Address]</p>
                        </div>
                        <div>
                            <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Permanent Contact Address</p>
                            <p>[Permanent Contact Address]</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-4 px-4 md:px-8 bg-[#FCFCFC] text-[12px] md:text-[14px] mt-4 grid grid-cols-2 md:grid-cols-3 w-full gap-4 rounded-[12px]'>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Nationality</p>
                    <p>[Nationality]</p>
                </div>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>State of Origin</p>
                    <p>[State of Origin]</p>
                </div>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Religion</p>
                    <p>[Religion]</p>
                </div>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Rent Purpose</p>
                    <p>[Rent Purpose]</p>
                </div>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Accommodation Type</p>
                    <p>[Accommodation Type]</p>
                </div>
                <div>
                    <p className='text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Date to move in</p>
                    <p>[Date to move in]</p>
                </div>
            </div>
        </div>
    )
}

export default PersonalKYC