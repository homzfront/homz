import React from 'react'

const ModalTwo = ({ dropdownRef, email, loading, setEmail, handleInvite }) => {
    return (
        <div ref={dropdownRef} className={`w-[340px] md:w-auto md:max-w-[591px] px-[28px] py-[36px] h-auto bg-white rounded-[12px] ${loading && "pointer-events-none animate-pulse"}`}>
            <h2 className='text-BlackHomz font-semibold text-[16px] md:text-[18px]'>
                Invite Tenant to [Property Name]
            </h2>
            <p className='text-sm md:text-[16px] font-normal text-GrayHomz'>
                Send your unique invitation link directly to your tenant’s email
            </p>
            <div className='mt-3 w-full flex flex-col md:flex-row items-center gap-2'>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='outline-none w-full md:w-[60%] px-4 border h-[45px] placeholder:text-sm placeholder:font-normal placeholder:text-GrayHomz2'
                    placeholder='Enter tenant’s email'
                />
                <button 
                onClick={()=> handleInvite()}
                className='h-[45px] w-full md:w-[40%] hover:bg-BlueHomz4 bg-BlueHomz text-white rounded-[4px] p-3'>
                    Invite Tenant
                </button>
            </div>
        </div>
    )
}

export default ModalTwo