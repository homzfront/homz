import React, { useState } from 'react'
import InternationalPassport from './components/internationalPassport';
import NationalIdentityNumber from './components/nationalIdentityNumber';


const AccountInfo = () => {
    return (
        <div className="mt-8">
            <div className="border-t p-8 ">
                <div className='mb-4'>
                    <p className='text-[18px] font-[500] text-BlackHomz'>
                        Verify your identity
                    </p>
                    <p className='text-[14px] font-[400] text-GrayHomz'>
                        Choose either ‘International Passport’ or ‘National Identity Card’ to complete your verification
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <InternationalPassport />
                    <NationalIdentityNumber />
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;