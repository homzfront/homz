import Close from '@/components/mainmenu/close'
import calculateDaysLeft from '@/utils/trailEndDays'
import Link from 'next/link'
import React from 'react'

const TrialWarning = ({ closeMenu, user }) => {
    return (
        <div>
            <div className="absolute right-[110px] top-[70px] w-[400px] h-[125px] bg-warningBg border border-warning2 rounded-[12px] shadow-md px-4 py-2 z-20">
                <div className='flex items-center justify-between w-full'>
                    <p className='text-[13px] font-[600] text-BlackHomz'>
                        Free Trial: {calculateDaysLeft(user?.trialEndDate)} {calculateDaysLeft(user?.trialEndDate) === 1 ? 'day' : 'days'} left.
                    </p>
                    <button onClick={closeMenu}>
                        <Close />
                    </button>
                </div>
                <div>
                    <p className='text-[13px] font-[400] text-GrayHomz'>
                        Upgrade your enterprise plan to fully enjoy all features on your dashboard
                    </p>
                    <Link href={"/plan/pricing"} className='text-[13px] font-[500] text-warning2'>
                        Get Enterprise Plan
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TrialWarning;