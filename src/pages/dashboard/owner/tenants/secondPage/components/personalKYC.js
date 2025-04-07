import DownloadDocuMini from '@/components/icons/downloadDocuMini'
import formatDateII from '@/utils/formatDateII'
import React from 'react'

const PersonalKYC = ({ handlePrint, data }) => {
    return (
        <div className='mb-4'>
            <div className='bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz'>
                <p className='text-[14px] md:text-[16px] font-normal text-BlackHomz'>Personal Information</p>
                <div className='mt-2'>
                    <div className='mt-4 grid grid-cols-2 md:grid-cols-3 w-full gap-4'>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Full Name</p>
                            <p>{data?.fullName ?? "[Adeyemo Olayemi]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Gender</p>
                            <p>{data?.personalDetails?.gender ?? "[Gender]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Phone Number</p>
                            <p>{data?.phoneNumber ?? "[Phone Number]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Email</p>
                            <p>{data?.user?.email ?? "[Email]"}</p>
                        </div>
                        <div>
                            <p className='truncate text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Marital Status</p>
                            <p>{data?.personalDetails?.maritalStatus ?? "[Marital Status]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Office Address</p>
                            <p>{data?.addressDetails?.officeAddress ?? "[Office Address]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Permanent Contact Address</p>
                            <p>{data?.addressDetails?.permanentContactAddress ?? "[Permanent Contact Address]"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-4 px-4 md:px-8 bg-[#FCFCFC] text-[12px] md:text-[14px] mt-4 grid grid-cols-2 md:grid-cols-3 w-full gap-4 rounded-[12px]'>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Nationality</p>
                    <p>{data?.personalDetails?.nationality ?? "[Nationality]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>State of Origin</p>
                    <p>{data?.personalDetails?.stateOfOrigin ?? "[State of Origin]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Religion</p>
                    <p>{data?.personalDetails?.religion ?? "[Religion]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Rent Purpose</p>
                    <p>{data?.accommodation?.rentPurpose ?? "[Rent Purpose]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Accommodation Type</p>
                    <p>{data?.accommodation?.accommodationType ?? "[Accommodation Type]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Date to move in</p>
                    <p>{formatDateII(data?.moveInDetails?.moveInDate) ?? "[Date to move in]"}</p>
                </div>
            </div>
            <div
                onClick={() => {
                    if (handlePrint) handlePrint()
                }}
                className='flex justify-end w-full mt-4'>
                <button className='h-[48px] rounded-[4px] text-BlueHomz hover:bg-whiteblue border border-BlueHomz text-[16px] font-medium w-full md:w-[170px] flex gap-2 items-center justify-center'>
                    <DownloadDocuMini /> Download
                </button>
            </div>
        </div >
    )
}

export default PersonalKYC