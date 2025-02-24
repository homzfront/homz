import DownloadDocuMini from '@/components/icons/downloadDocuMini'
import React from 'react'

const OccupationDetailsKYC = ({ data }) => {
    return (
        <div className='mb-4'>
            <div className='bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz'>
                <p className='text-[14px] md:text-[16px] font-normal text-BlackHomz'>Occupant Details</p>
                <div className='mt-2'>
                    <div className='py-4 border-b border-[#E6E6E6] flex flex-wrap md:flex-nowrap justify-between w-full gap-4'>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Name</p>
                            <p>{data?.occupantDetails?.occupantAge ?? "[Name]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Age (years)</p>
                            <p>{data?.occupantDetails?.occupantName ?? "[Age]"}</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Occupation</p>
                            <p> {data?.occupantDetails?.occupantOccupation ?? "[Occupation]"}</p>
                        </div>
                    </div>
                    <div className='py-4 border-b border-[#E6E6E6] flex flex-wrap md:flex-nowrap justify-between w-full gap-4'>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Full Name</p>
                            <p>[Name]</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Age (years)</p>
                            <p>[Age]</p>
                        </div>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Occupation</p>
                            <p>[Occupation]</p>
                        </div>
                    </div>
                    <div className='pt-4 flex flex-wrap md:flex-nowrap justify-between w-full gap-4'>
                        <div>
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>No. of cars</p>
                            <p>{data?.occupantDetails?.numberOfCars ?? "[No. of cars]"}</p>
                        </div>
                    </div>
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

export default OccupationDetailsKYC