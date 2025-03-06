import WarningIcon from '@/components/icons/warningIcon'
import React from 'react'

const RejectedCard = ({ text }) => {
    return (
        <div className='w-full p-6 rounded-[12px] bg-[#FDF2F2] font-normal text-sm h-auto'>
            <div className='flex gap-4 items-start md:items-center'>
                <WarningIcon className="#D92D20" />
                <p className='text-error'>
                    Unfortunately, your submission has been rejected. Please review the feedback provided and update your details before resubmitting.
                </p>
            </div>
            <div className='mt-3 rounded-[8px] w-full bg-white py-3 px-6 text-GrayHomz'>
                {text}
            </div>
        </div>
    )
}

export default RejectedCard