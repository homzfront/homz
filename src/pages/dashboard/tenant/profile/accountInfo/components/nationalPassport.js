import Close from '@/components/icons/Close'
import Image from 'next/image'
import React from 'react'

const NationalPassport = ({
    nationalPassportRef,
    setIsOpen,
    setNationalPassport,
    setNationalPassportUploaded,
    setErrorMsg,
    uploadNationalPassport,
    NIN,
    setNIN,
    error,
    setError
}) => {

    const handleNationalPassport = (e) => {
        if (NIN === null) {
            setError("Input NIN")
            return;
        }
        const file = e.target.files[0];
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMsg("File size exceeds 5MB.");
                setIsOpen(false);
                return;
            } else {
                setErrorMsg("");
                setNationalPassport(file);
                setNationalPassportUploaded(true);
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
                            National Identity Number
                        </p>
                        <div
                            onClick={() => setIsOpen(false)}
                            className='cursor-pointer w-6 h-6 rounded-lg border border-GrayHomz2 flex justify-center items-center'
                        >
                            <Close />
                        </div>
                    </div>
                    <p className='text-[16px] font-[400] text-GrayHomz'>
                        Kindly enter your valid National Identity Number
                    </p>
                </div>
                <div>
                    <input
                        type='number'
                        placeholder='00000000000'
                        value={NIN}
                        onChange={(e) => {
                            setNIN(e.target.value)
                            setError(null);
                        }}
                        className='w-full pl-4 font-[500] outline-none text-[14px] text-GrayHomz placeholder:text-GrayHomz2 placeholder:text-[14px] placeholder:font-[500] h-[45px] border rounded-[4px]'
                    />
                    {
                        error &&
                        <span className='text-[12px] italic font-[400]'>
                            {error}
                        </span>
                    }
                </div>
                <div className='flex flex-col gap-2 border rounded-[4px] p-4 items-center'>
                    <Image
                        src="/static/images/document-upload.svg"
                        alt="upload-cloud"
                        width={40}
                        height={40}
                    />
                    <input
                        type="file"
                        name="BusinessCertificate"
                        ref={nationalPassportRef}
                        id="BusinessCertificate"
                        onChange={handleNationalPassport}
                        style={{ display: 'none' }}
                        accept=".jpg, .jpeg, .png"
                    />
                    <div className='flex flex-col items-center'>
                        <p
                            onClick={uploadNationalPassport}
                            className='text-[14px] font-[500] text-BlueHomz'>
                            <span className='cursor-pointer'>Select Headshot Image </span> <span className='text-GrayHomz'>or drag and drop</span>
                        </p>
                        <p className='text-[11px] font-[400]'>
                            JPG, JPEG or PNG (max. 5mb)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NationalPassport