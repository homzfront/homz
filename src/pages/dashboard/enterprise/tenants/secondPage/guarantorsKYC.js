import DocuDownload from '@/components/icons/docuDownload'
import React from 'react'

const documents = [
    { name: 'Guarantor_ID', format: 'pdf' },
    { name: 'Guarantor_Proof', format: 'jpg' },
    { name: 'Guarantor_Signature', format: 'png' }
];

const GuarantorsKYC = () => {
    return (
        <div className='mb-4 w-full text-[14px] font-normal text-GrayHomz'>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 w-full gap-2'>
                {documents.map((doc, index) => (
                    <div key={index} className='flex gap-2 items-center p-3 rounded-[12px] bg-[#FCFCFC]'>
                        <DocuDownload />
                        <div>
                            <p className='text-[11px]'>{doc.name}.{doc.format}</p>
                            <button className='text-BlueHomz text-[11px]'>Download</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuarantorsKYC;
