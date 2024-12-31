import BlueAvatar from '@/components/icons/blueAvatar';
import BlueThickArrow from '@/components/icons/blueThickArrow';
import { BulkUpload } from '@/components/icons/bulkUpload';
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

const InviteTenant = ({ id, setOpenTenantInvite, setOpenSingleInvite, setOpenBulkInvite   }) => {
    return (
        <div className="w-full p-8 max-w-[620px] bg-white rounded-[12px] flex gap-4 flex-col items-center">
            <Toaster />
            <div>
                <h1 className='font-medium text-[16px] md:text-[18px] text-BlackHomz'>
                    Choose How You Want to Add Tenants
                </h1>
                <h3 className='hidden md:block font-normal text-[14px] text-GrayHomz'>
                    Select an option to add tenant details: manually for a single tenant or upload a CSV file for multiple tenants.
                </h3>
                <h3 className='md:hidden font-normal text-[13px] text-GrayHomz'>
                    Select an option to add tenant details
                </h3>
            </div>
            <div className='w-full flex gap-4 flex-col items-center'>
                <div className={`w-full bg-whiteblue px-4 md:px-6 py-4 flex justify-between items-center rounded-[12px]`}>
                    <div className='flex gap-4 items-center'>
                        <div className='bg-[#FDFEFF] w-[40px] h-[40px] rounded-full flex justify-center items-center flex-shrink-0'>
                            <BlueAvatar />
                        </div>
                        <div>
                            <h2 className='font-medium text-[14px] md:text-[16px] text-BlackHomz'>
                                Add a Single Tenant
                            </h2>
                            <h3 className='font-normal text-[11px] md:text-[13px] text-GrayHomz'>
                                Add one tenant at a time by filling a form.
                            </h3>
                        </div>
                    </div>
                    <div className='cursor-pointer' onClick={() => setOpenSingleInvite(true)}>
                        <BlueThickArrow />
                    </div>
                </div>
                <div className={`w-full bg-whiteblue px-4 md:px-6 py-4 flex justify-between items-center rounded-[12px]`}>
                    <div className='flex gap-4 items-center'>
                        <div className='bg-[#FDFEFF] w-[40px] h-[40px] rounded-full flex justify-center items-center flex-shrink-0'>
                            <BulkUpload />
                        </div>
                        <div>
                            <h2 className='font-medium text-[14px] md:text-[16px] text-BlackHomz'>
                                Import Bulk Tenants
                            </h2>
                            <h3 className='font-normal text-[11px] md:text-[13px] text-GrayHomz'>
                                Upload a CSV file containing tenant details.
                            </h3>
                        </div>
                    </div>
                    <div className='cursor-pointer' onClick={() => setOpenBulkInvite(true)}>
                        <BlueThickArrow />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InviteTenant;