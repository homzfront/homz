import DocuDownload from '@/components/icons/docuDownload';
import DownloadDocuMini from '@/components/icons/downloadDocuMini';
import ViewDocu from '@/components/icons/viewDocu';
import React from 'react'

const TenantVerificationKYC = () => {
    const documents = [
        { name: 'NIN', format: 'pdf' },
    ];

    return (
        <div className='mb-4 w-full text-[14px] font-normal text-GrayHomz'>
            <div className='mt-4 grid grid-cols-1 w-full gap-2'>
                {documents.map((doc, index) => (
                    <div key={index} className='flex gap-2 items-center p-3 rounded-[12px] bg-[#FCFCFC]'>
                        <DocuDownload />
                        <div>
                            <p className='text-[11px]'>{doc.name}.{doc.format}</p>
                            <div className='flex justify-center gap-2'>
                                <button className='text-BlueHomz text-[11px] flex items-center gap-1'><ViewDocu /> View Document</button>
                                <button className='text-BlueHomz text-[11px] flex items-center gap-1'><DownloadDocuMini /> Download</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-end w-full mt-4'>
                <button className='h-[48px] rounded-[4px] text-BlueHomz hover:bg-whiteblue border border-BlueHomz text-[16px] font-medium w-full md:w-[170px] flex gap-2 items-center justify-center'>
                    <DownloadDocuMini /> Download
                </button>
            </div>
        </div>
    );
};

export default TenantVerificationKYC;
