import WarningIcon from '@/components/icons/warningIcon'
import React from 'react'

const PendingCard = () => {
    return (
        <div className='w-full p-6 rounded-[12px] bg-warningBg flex gap-4 items-start md:items-center'>
            <WarningIcon />
            <p className='text-warning2 font-normal text-sm'>
                The property manager is reviewing your details and will notify you once a decision has been made.
            </p>
        </div>
    )
}

export default PendingCard