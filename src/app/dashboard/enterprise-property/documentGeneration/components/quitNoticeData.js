import Image from 'next/image';
import React from 'react'

const QuitNoticeData = () => {
    return (
        <div className='mb-[60px]'>
            <div className='h-[700px] bg-white flex flex-col justify-center  text-[13px] font-[400] text-BlackHomz gap-3.5 p-4'>
                <div className=' flex items-center gap-4 border-b pb-4 w-full'>
                    <Image
                        src={"/Frame 1278.png"}
                        alt='avatar'
                        width={64}
                        height={64}
                    />
                    <p className='text-[13px] font-[600] text-GrayHomz'>
                        [Property Manager’s Company]
                    </p>
                </div>
                <div className='font-[600]'>[Document Generation Date] </div>
                <div className='font-[600] flex flex-col'>
                    <span>[Tenant’s Name]</span>
                    <span>[Tenant’s Address]</span>
                </div>
                <div>Dear <span className='font-[600]'>[Tenant’s Name]</span>, </div>

                <div>NOTICE TO QUIT - <span className='font-[600]'>[Notice Period]</span></div>

                <div>I, <span className='font-[600]'>[Property Manager’s Name]</span>, the Property Manager to the Estate of <span className='font-[600]'>[Landlord’s Name]</span> (hereinafter referred to as “Our Client”), Your landlord on whose instruction we write. </div>

                <div>You are by this notice required to deliver up possession of the <span className='font-[600]'>[Property Description]</span>, situated at, <span className='font-[600]'>[Property Address]</span>, which you hold as a yearly tenant be given to us on the expiration of your current tenancy period; <span className='font-[600]'>[Notice Period]</span> from the date of your receipt or service of this notice.</div>

                <div>Furthermore, you are requested to settle all your outstanding rent, rates, electricity bills, Levies and keep the apartment in a tenantable condition before your departure.</div>

                <div>Take Notice that in the event of your refusal to comply with the notice, we have the instruction of our client to apply to court for issuance of warrant directing an appropriate person to enter and take possession of the said premises and to eject any person there from. Thanks.</div>

                <div>Dated this <span className='font-[600]'>[Notice Commencement Date]</span></div>
                <div className='flex flex-col'>
                    <span>Yours faithfully,</span>
                    <span>For and On Behalf Of;</span>
                    <span className='font-[600]'>[Property Manager’s Company]</span>
                </div>
                <div>
                    <span>Signed</span>
                    <span className='font-[600]'>[Property Manager’s Name]</span>
                </div>
            </div>
        </div>
    )
}

export default QuitNoticeData;