import React from 'react'

const ShowKindlyWait = ({dropdownRef}) => {
    return (
        <div className="absolute px-8 md:px-0 top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div  ref={dropdownRef} className='md:w-[464px] md:h-[149px] bg-white rounded-[12px] p-[32px]'>
                <div className='flex flex-col gap-2 w-full items-center'>
                    <p className='text-[20px] text-BlackHomz text-center font-[700]'>
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