import formatDateII from '@/utils/formatDateII'
import React from 'react'

const DownloadData = React.forwardRef(({ data }, ref) => (
    <div
    id="download-KYC"
    ref={ref}
    >
        <div className="bg-white w-full min-w-[350px] max-w-[800px] p-4 rounded-[12px]">
            <div className='h-[44px] flex justify-center items-center bg-BlueHomz rounded-[8px]'>
                <p className='text-sm font-medium text-white'>
                    KYC - {data?.fullName}
                </p>
            </div>
            <div className='bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz'>
                <p className='text-[14px] md:text-[16px] font-medium text-BlackHomz'>Personal Information</p>
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
                            <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Marital Status</p>
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
            <div className='py-4 px-4 md:px-8 bg-[#FCFCFC] text-[12px] md:text-[14px] mt-4 grid grid-cols-2 md:grid-cols-3 w-full gap-4 rounded-[12px] text-GrayHomz'>
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
            <div className={`py-4 px-4 md:px-8 bg-[#FCFCFC] mt-4 w-full rounded-[12px] text-[12px] md:text-[14px] font-medium text-GrayHomz ${!data?.spouseDetails && "hidden"}`}>
                <p className='text-[14px] md:text-[16px] font-medium text-BlackHomz'>Spouse/Kin Information</p>
                <div className='mt-2 grid grid-cols-2 w-full gap-4 '>
                    <div>
                        <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Spouse/Kin’s Occupation</p>
                        <p>{data?.spouseDetails?.spouseOccupation ?? "[Spouse/Kin’s Occupation]"}</p>
                    </div>
                    <div>
                        <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Spouse/Kin’s Address</p>
                        <p>{data?.spouseDetails?.spouseOfficeAddress ?? "[Spouse/Kin’s Address]"}</p>
                    </div>
                </div>
            </div>
            <div className={`bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz ${!data?.occupantDetails && "hidden"}`}>
                <p className='text-[14px] md:text-[16px] font-medium text-BlackHomz'>Occupant Details</p>
                <div className='mt-2'>
                    <div className='flex flex-col gap-2'>
                        {data?.occupantDetails?.map((occupant, index) => (
                            <div key={index} className='py-4 border-b border-[#E6E6E6] flex flex-wrap md:flex-nowrap justify-between w-full gap-4'>
                                <div>
                                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Name</p>
                                    <p>{occupant?.occupantAge ?? "[Name]"}</p>
                                </div>
                                <div>
                                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Age (years)</p>
                                    <p>{occupant?.occupantName ?? "[Age]"}</p>
                                </div>
                                <div>
                                    <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>Occupation</p>
                                    <p> {occupant?.occupantOccupation ?? "[Occupation]"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`bg-[#FCFCFC] rounded-[12px] py-4 px-4 md:px-8 mt-4 text-[12px] md:text-[14px] font-medium text-GrayHomz ${!data?.numberOfCars && "hidden"}`}>
                <div className='pt-4 flex flex-wrap md:flex-nowrap justify-between w-full gap-4'>
                    <div>
                        <p className='break-words text-[11px] md:text-[13px] mb-1 font-normal text-[#A9A9A9]'>No. of cars</p>
                        <p>{data?.numberOfCars ?? "[No. of cars]"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

DownloadData.displayName = "DownloadData";
export default DownloadData