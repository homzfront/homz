import DownloadDocuMini from '@/components/icons/downloadDocuMini'
import React from 'react'

const SpouseNextKYC = ({data}) => {
    return (
        <div className='mb-4 w-full text-[12px] md:text-[14px] font-medium text-GrayHomz'>
            <div className='py-4 px-4 md:px-8 bg-[#FCFCFC] mt-4 grid grid-cols-1 md:grid-cols-2 w-full gap-4 rounded-[12px]'>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Spouse/Kin’s Occupation</p>
                    <p>{data?.spouseDetails?.spouseOccupation ??"[Spouse/Kin’s Occupation]"}</p>
                </div>
                <div>
                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Spouse/Kin’s Address</p>
                    <p>{data?.spouseDetails?.spouseOfficeAddress ?? "[Spouse/Kin’s Address]"}</p>
                </div>
            </div>
            <div className='flex justify-end w-full mt-4'>
                <button className='h-[48px] rounded-[4px] text-BlueHomz hover:bg-whiteblue border border-BlueHomz text-[16px] font-medium w-full md:w-[170px] flex gap-2 items-center justify-center'>
                    <DownloadDocuMini /> Download
                </button>
            </div>
        </div>
    )
}

export default SpouseNextKYC