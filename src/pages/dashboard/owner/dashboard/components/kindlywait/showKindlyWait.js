import React from 'react'

const ShowKindlyWait = ({dropdownRef}) => {
    return (
        <div className="absolute top-0 z-20 h-screen w-[1440px] inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div  ref={dropdownRef} className='w-[464px] h-[149px] bg-white rounded-[12px] p-[32px]'>
                <div className='flex flex-col gap-2 w-full items-center'>
                    <p className='text-[20px] text-BlackHomz font-[700]'>
                        Kindly wait for confirmation call
                    </p>
                    <p className='text-[16px] text-GrayHomz font-[400] text-center'>
                        Access to the dashboard will be granted after your call with us.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ShowKindlyWait