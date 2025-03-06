import Badge from '@/components/icons/badge'
import React from 'react'
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from 'next/image';
import ExportSmall from '@/components/icons/exportSmall';
import DownloadSmall from '@/components/icons/downloadSmall';
import { useReactToPrint } from "react-to-print";
import html2canvas from 'html2canvas'


const SuccessCard = ({ data }) => {
    const [openBadge, setOpenBadge] = React.useState(false);
    const downloadRef = React.useRef();
    const [showShare, setShowShare] = React.useState(false);


    const handlePrint = useReactToPrint({
        content: () => downloadRef.current,
        documentTitle: `${data?.fullName}-KYC-Badge`,
        onAfterPrint: () => console.log("KYC printed."),
    });

    // Handle sharing the badge as an image
    const handleShare = async () => {
        try {
            // Capture the badge content as an image
            if (!downloadRef.current) {
                console.error("Element not found!");
                return;
            }

            // Capture the badge content as an image
            const canvas = await html2canvas(downloadRef.current, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL("image/png");

            // Create a temporary link for downloading the image
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${data?.fullName || 'Tenant'}-KYC-Badge.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Share the image using the Web Share API
            if (navigator.share) {
                const blob = await (await fetch(imgData)).blob();
                console.log(blob)
                const file = new File([blob], 'KYC-Badge.png', { type: 'image/png' });

                await navigator.share({
                    title: 'KYC Verification Badge',
                    text: `Check out ${data?.fullName || 'Tenant'}'s KYC verification badge!`,
                    files: [file],
                });
            } else {
                // Fallback for browsers that don't support the Web Share API
                console.log('Image downloaded. You can manually share it.');
            }
        } catch (error) {
            console.error('Sharing failed:', error);
        }
    };


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
                        <p className='absolute top-[92%] sm:top-[90%] w-full text-center text-[16px] md:text-[23px] font-bold text-BlackHomz'>Congrats {data?.fullName ? data?.fullName : "[Tenant Name]"}!</p>
                    </div>
                    <p className='text-sm md:text-[16px] mt-2 font-normal text-GrayHomz text-center'>
                        You have successfully completed the tenant KYC verification process and are now a verified tenant of {data?.estateId?.name ? data?.estateId?.name : "[Property Name]"}
                    </p>
                    <div className='flex flex-col w-full gap-2 mt-2 text-sm md:text-[16px] font-medium'>
                        <div className='flex gap-2 justify-center w-full'>
                            <button
                                onClick={() => {
                                    handleShare()
                                }}
                                className='w-[50%] py-3 px-6 rounded-[4px] bg-BlueHomz text-white flex justify-center items-center gap-2'>
                                <ExportSmall className='#FFFFFF' />
                                Share
                            </button>
                            <button
                                onClick={() => {
                                    setOpenBadge(false)
                                    setShowShare(false)
                                }}
                                className='w-[50%] py-3 px-6 rounded-[4px] flex justify-center items-center gap-2 border border-BlueHomz text-BlueHomz'>
                                 close
                            </button>
                        </div>
                    </div>
                </div>
            </CustomizedModal>
            <div className='w-full md:w-[70%] flex items-start gap-2'>
                <Badge />
                <p className='text-BlacHomz font-normal text-sm w-[80%] md:w-full mt-[-2px]'>
                    Congratulations! Your submission has been approved. You are now officially a tenant of
                    {data?.estateId?.name ? data?.estateId?.name : "[Property Name]"}
                </p>
            </div>
            <button onClick={() => setOpenBadge(true)} className='bg-Success hover:bg-successBg hover:border hover:border-Success py-2 px-3 rounded-[4px] text-sm font-medium text-white hover:text-Success w-full md:w-auto'>
                View confirmation
            </button>
            <div style={{ display: openBadge ? openBadge : "none" }} className="w-full h-full">
                <div ref={downloadRef} className='w-full h-full p-4 flex justify-center mt-[100px] items-center'>
                    <div className='w-[518px] bg-[#fcfcfc] px-4 py-6 rounded-[8px] h-auto'>
                        <div className='relative'>
                            <Image
                                src={"/Badge-Bubble.png"}
                                alt='badge-img'
                                height={4096}
                                width={3192}
                                className='w-full'
                                crossOrigin="anonymous"
                            />
                            <Image
                                src={"/Badge-Ribbon.png"}
                                alt='badge-imgII'
                                className='absolute top-[32%] sm:top-[40%] md:top-[35%] left-1/2 transform -translate-x-1/2 h-[250px] w-[250px]'
                                height={626}
                                width={626}
                                crossOrigin="anonymous"
                            />
                            <p className='absolute top-[96%] w-full text-center text-[16px] md:text-[23px] font-bold text-BlackHomz'>Congrats {data?.fullName ? data?.fullName : "[Tenant Name]"}!</p>
                        </div>
                        <p className='text-sm md:text-[16px] mt-7 font-normal text-GrayHomz text-center'>
                            You have successfully completed the tenant KYC verification process and are now a verified tenant of {data?.estateId?.name ? data?.estateId?.name : "[Property Name]"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessCard