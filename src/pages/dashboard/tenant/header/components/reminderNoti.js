import Close from '@/components/mainmenu/close'
import React from 'react'
import Link from 'next/link'

const ReminderNoti = ({ noti, closeMenu }) => {
    const lastElement = noti ? noti[noti?.length - 1] : null;

    if (!lastElement) {
        return null; 
    };

    return (
        <div>
            <div className="absolute right-[45px] md:right-[110px] top-[54px] md:top-[70px] w-[320px] md:w-[400px] h-auto bg-whiteblue border border-BlueHomz rounded-[12px] shadow-md px-4 py-2 z-20">
                <div className='flex items-center justify-between w-full'>
                    <p className='text-[13px] font-[600] text-BlackHomz'>
                        Rent Reminder
                    </p>
                    <button onClick={closeMenu}>
                        <Close />
                    </button>
                </div>
                <div>
                    <p className='text-[13px] font-[400] text-GrayHomz'>
                        {lastElement?.message}
                    </p>
                    <Link href={"/dashboard/tenant/notificationPage"} className='text-[13px] font-[500] text-BlueHomz'>
                        Open Notification
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ReminderNoti