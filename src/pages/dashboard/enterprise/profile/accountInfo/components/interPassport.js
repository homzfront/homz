import Close from '@/components/icons/Close'
import Image from 'next/image'
import React from 'react'

const InterPassport = ({
    interPassportRef,
    setIsOpen,
    setInterPassport,
    setInterPassportUploaded,
    setErrorMsg,
    uploadInterPassport,
}) => {

    const handleInterPassport = (e) => {
        const file = e.target.files[0];
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMsg("File size exceeds 5MB.");
                setIsOpen(false);
                return;
            } else {
                setErrorMsg("");
                setInterPassport(file);
                setInterPassportUploaded(true);
                setIsOpen(false);
            }
        }
    };

    return (
        <div className='px-8 md:px-0 absolute top-0 z-20 h-screen w-full  inset-0 flex items-center justify-center bg-black bg-opacity-30'>
            <div className="p-4 md:p-8 relative flex flex-col gap-3 h-auto w-full sm:w-[500px] m-auto bg-white rounded-lg">
                <div className='flex flex-col'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-[20px] font-[700] text-BlackHomz'>
                            International Passport
                        </p>
                        <div
                            onClick={() => setIsOpen(false)}
                            className='cursor-pointer w-6 h-6 rounded-lg border border-GrayHomz2 flex justify-center items-center'
                        >
                            <Close />
                        </div>
                    </div>
                    <p className='text-[16px] font-[400] text-GrayHomz'>
                        Kindly upload your valid International Passport
                    </p>
                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <Image
                        src="/static/images/document-upload.svg"
                        alt="upload-cloud"
                        width={40}
                        height={40}
                    />
                    <input
                        type="file"
                        name="BusinessCertificate"
                        ref={interPassportRef}
                        id="BusinessCertificate"
                        onChange={handleInterPassport}
                        style={{ display: 'none' }}
                        accept="application/pdf"
                    />
                    <div className='flex flex-col items-center'>
                        <p
                            onClick={uploadInterPassport}
                            className='text-[14px] font-[500] text-BlueHomz'>
                            <span className='cursor-pointer'>Select Internaional Passport </span> <span className='text-GrayHomz'>or drag and drop</span>
                        </p>
                        <p className='text-[11px] font-[400]'>
                            PNG or PDF (max. 5mb)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterPassport