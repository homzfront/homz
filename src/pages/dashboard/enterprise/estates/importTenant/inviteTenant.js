import BlueAvatar from '@/components/icons/blueAvatar';
import BlueThickArrow from '@/components/icons/blueThickArrow';
import { BulkUpload } from '@/components/icons/bulkUpload';
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';

const InviteTenant = ({ id, setOpenTenantInvite, setOpenSingleInvite }) => {
    return (
        <div className="w-full p-8 max-w-[620px] bg-white rounded-[12px] flex gap-4 flex-col items-center">
            <Toaster />
            <div>
                <h1 className='font-medium text-[18px] text-BlackHomz'>
                    Choose How You Want to Import Tenants
                </h1>
                <h3 className='font-normal text-[14px] text-GrayHomz'>
                    Select an option to add tenant details: manually for a single tenant or upload a CSV file for multiple tenants.
                </h3>
            </div>
            <div className='w-full flex gap-4 flex-col items-center'>
                <div className={`w-full bg-whiteblue px-6 py-4 flex justify-between items-center rounded-[12px]`}>
                    <div className='flex gap-4 items-center'>
                        <div className='bg-[#FDFEFF] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <BlueAvatar />
                        </div>
                        <div>
                            <h2 className='font-medium text-[16px] text-BlackHomz'>
                                Import Single Tenant
                            </h2>
                            <h3 className='font-normal text-[13px] text-GrayHomz'>
                                Add one tenant at a time by filling a form.
                            </h3>
                        </div>
                    </div>
                    <div className='cursor-pointer' onClick={() => setOpenSingleInvite(true)}>
                        <BlueThickArrow />
                    </div>
                </div>
                <div className={`w-full bg-whiteblue px-6 py-4 flex justify-between items-center rounded-[12px]`}>
                    <div className='flex gap-4 items-center'>
                        <div className='bg-[#FDFEFF] w-[40px] h-[40px] rounded-full flex justify-center items-center'>
                            <BulkUpload />
                        </div>
                        <div>
                            <h2 className='font-medium text-[16px] text-BlackHomz'>
                                Import Bulk Tenants
                            </h2>
                            <h3 className='font-normal text-[13px] text-GrayHomz'>
                                Upload a CSV file containing tenant details.
                            </h3>
                        </div>
                    </div>
                    <div className='cursor-pointer' onClick={() => setOpenTenantInvite(false)}>
                        <BlueThickArrow />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InviteTenant;