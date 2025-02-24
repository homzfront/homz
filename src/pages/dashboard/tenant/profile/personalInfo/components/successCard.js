import Badge from '@/components/icons/badge'
import React from 'react'
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from 'next/image';
import ExportSmall from '@/components/icons/exportSmall';
import DownloadSmall from '@/components/icons/downloadSmall';


const SuccessCard = () => {
    const [openBadge, setOpenBadge] = React.useState(false);
    return (
        <div className='w-full p-6 rounded-[12px] bg-successBg flex gap-4 flex-col md:flex-row items-center md:justify-between'>
            <CustomizedModal isOpen={openBadge} onRequestClose={() => setOpenBadge(false)}>
                <div className='sm:w-[518px] bg-white px-4 py-6 rounded-[8px] h-auto'>
                    <div className='relative'>
                        <Image
                            src={"/Badge-Bubble.png"}
                            alt='badge-img'
                            height={4096}
                            width={3192}
                            className='w-full'
                        />
                        <Image
                            src={"/Badge-Ribbon.png"}
                            alt='badge-imgII'
                            className='absolute top-[32%] sm:top-[40%] md:top-[35%] left-1/2 transform -translate-x-1/2  h-[150px] md:h-[250px] w-[150px] md:w-[250px]'
                            height={626}
                            width={626}
                        />
                        <p className='absolute top-[92%] sm:top-[90%] w-full text-center text-[16px] md:text-[23px] font-bold text-BlackHomz'>Congrats [Tenant Name]!</p>
                    </div>
                    <p className='text-sm md:text-[16px] mt-2 font-normal text-GrayHomz text-center'>
                        You have successfully completed the tenant KYC verification process and are now a verified tenant of [Property Name]
                    </p>
                    <div className='flex flex-col w-full gap-2 mt-2 text-sm md:text-[16px] font-medium'>
                        <div className='flex gap-2 justify-center w-full'>
                            <button
                                className='w-[50%] py-3 px-6 rounded-[4px] bg-BlueHomz text-white flex justify-center items-center gap-2'>
                                <ExportSmall className='#FFFFFF' />
                                Share
                            </button>
                            <button
                                className='w-[50%] py-3 px-6 rounded-[4px] flex justify-center items-center gap-2 border border-BlueHomz text-BlueHomz'>
                                <DownloadSmall />
                                Download
                            </button>
                        </div>
                        <button onClick={() => setOpenBadge(false)} className='w-full text-GrayHomz'>
                            close
                        </button>
                    </div>
                </div>
            </CustomizedModal>
            <div className='w-full md:w-[70%] flex items-start gap-2'>
                <Badge />
                <p className='text-BlacHomz font-normal text-sm w-[80%] md:w-full mt-[-2px]'>
                    Congratulations! Your submission has been approved. You are now officially a tenant of
                    [Property Name]
                </p>
            </div>
            <button onClick={() => setOpenBadge(true)} className='bg-Success hover:bg-successBg hover:border hover:border-Success py-2 px-3 rounded-[4px] text-sm font-medium text-white hover:text-Success w-full md:w-auto'>
                View confirmation
            </button>
        </div>
    )
}

export default SuccessCard