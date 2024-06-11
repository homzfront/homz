import React, { useEffect, useRef, useState } from 'react'
import useBodyScroll from '@/utils/useBodyScroll';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import NationalPassport from './nationalPassport';
import { uploadNINLandlordKYC } from '@/api/propertyService';
import { toast } from 'react-toastify';

const NationalIdentityNumber = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nationalPassport, setNationalPassport] = useState(null);
    const [nationalPassportUploaded, setNationalPassportUploaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [nationalPassportLoading, setNationalPassportLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [nationalPassportSuccess, setNationalPassportSuccess] = useState(false);
    const [NIN, setNIN] = useState(null);
    const [error, setError] = useState(null);

    const nationalPassportRef = useRef(null);

    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const uploadNationalPassport = () => {
        if (NIN === null) {
            setError("Input NIN")
            return;
        }
        if (NIN.length !== 11) {
            setError("NIN must be 11 digits")
            return;
        }
        if (nationalPassportRef.current) {
            nationalPassportRef.current.click();
        }
    };

    useBodyScroll([isOpen]);

    const viewFile = (file) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }
    };

    const handleRemoved = (e) => {
        e.preventDefault();
        setNationalPassport(null);
        setErrorMsg(null);
        setNationalPassportUploaded(false);
        setIsOpen(false);
    };

    const handleUploadNationalPassport = async () => {
        setNationalPassportLoading(true);

        if (!nationalPassport) {
            setNationalPassportLoading(false);
            return;
        }

        try {
            const { success, updatedPassport, error } = await uploadNINLandlordKYC(
                nationalPassport,
                NIN
            );

            if (success) {
                setNationalPassportLoading(true);
                setNationalPassportSuccess(true);
                setProgress(0);
                setTimeout(() => {
                    const totalSize = nationalPassport.size;
                    let uploadedSize = 0;
                    const uploadInterval = setInterval(() => {
                        uploadedSize += 10000;
                        const currentProgress = (uploadedSize / totalSize) * 100;
                        setProgress(currentProgress);
                        setNationalPassportUploaded(false);
                        if (currentProgress >= 100) {
                            clearInterval(uploadInterval);
                        }
                    }, 40);
                    setTimeout(() => {
                        setNationalPassportLoading(false);
                    }, 1000);
                }, 800);
            } else {
                toast.error(error?.response?.data?.data?.detail);
                setNationalPassportLoading(false);
            }
        } catch (error) {
            setNationalPassportLoading(false);
            if (
                error?.response?.data?.error?.errors &&
                error.response.data.error.errors.length > 0
            ) {
                const errorMessage = error.response.data.error.errors[0];
                toast.error(`Update failed: ${errorMessage}`);
            } else if (error?.response?.data?.message) {
                const errorMessage = error.response.data.message;
                toast.error(`Update failed: ${errorMessage}`);
            } else {
                toast.error("Update failed");
            }
        }
    }

    return (
        <div className="">
            {
                isOpen &&
                <NationalPassport
                    uploadNationalPassport={uploadNationalPassport}
                    setIsOpen={setIsOpen}
                    setErrorMsg={setErrorMsg}
                    setNationalPassportUploaded={setNationalPassportUploaded}
                    setNationalPassport={setNationalPassport}
                    nationalPassportRef={nationalPassportRef}
                    NIN={NIN}
                    setNIN={setNIN}
                    error={error}
                    setError={setError}
                />
            }
            <div className="bg-inputBg rounded-[12px] p-6">
                {
                    nationalPassportUploaded ? (
                        <div className="flex md:items-center flex-col md:flex-row md:justify-between w-full gap-[12px] md:gap-0">
                            <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left flex flex-col gap-[4px]">
                                <span className="text-BlueHomz inline-block">
                                    [{nationalPassport?.name && nationalPassport.name}]
                                </span>
                                <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                                    ({nationalPassport?.size && (nationalPassport.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                            </p>
                            <div className={`flex flex-row gap-[20px] items-center ${nationalPassportLoading ? "pointer-events-none" : ""}`}>
                                <p className="text-BlueHomz text-[13px] font-[400] leading-[19.5px] cursor-pointer" onClick={() => viewFile(nationalPassport)}>
                                    View
                                </p>
                                <p
                                    className="text-[#D92D20] text-[13px] font-[400] leading-[19.5px] cursor-pointer flex items-center gap-1"
                                    onClick={handleRemoved}
                                >
                                    <Image src="/static/images/trash.svg" alt="upload-cloud" width={16} height={16} />
                                    <span className="text-[13px]">Remove</span>
                                </p>
                                <div>
                                    {!nationalPassportLoading ? (
                                        <p
                                            className="border border-BlueHomz py-[8px] px-[12px] hover:bg-BlueHomz hover:text-white rounded-[4px] cursor-pointer text-BlueHomz leading-[19.5px] md:text-[14px] font-[500] text-[13px]"
                                            onClick={handleUploadNationalPassport}
                                        >
                                            <span className="hidden md:block">Upload Document</span>
                                            <span className="md:hidden">Upload</span>
                                        </p>
                                    ) : (
                                        <div className="editBtn px-[12px] rounded-[4px] py-[8px] h-[37px] flex items-center justify-center">
                                            <ThreeDots
                                                visible={true}
                                                height="30"
                                                width="30"
                                                color="#006AFF"
                                                radius="9"
                                                ariaLabel="three-dots-loading"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                        :
                        nationalPassportSuccess ? (
                            <>
                                {progress >= 100 ? (
                                    <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                                            <span className="inline-block">
                                                [{nationalPassport?.name && nationalPassport.name}]
                                            </span>{' '}
                                            <span>is currently under review</span>
                                        </p>
                                        <p className="text-BlueHomz text-[13px] font-[400] leading-[19.5px] cursor-pointer" onClick={() => viewFile(nationalPassport)}>
                                            View
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-[8px] w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-BlueHomz">
                                                <span className="text-BlueHomz inline-block ">
                                                    [{nationalPassport?.name && nationalPassport.name}]
                                                </span>
                                            </p>
                                        </div>
                                        <progress id="businessCert" value={progress} max="100" className="w-full h-[4px]" />
                                    </div>
                                )}
                            </>
                        )
                            :
                            <div
                                onClick={handleDropdownToggle}
                                className="flex w-full justify-between items-center cursor-pointer"
                            >
                                <div className="text-[16px] font-[400] text-GrayHomz">
                                    National Identity Number (NIN)
                                </div>
                                <div className={` ${isOpen ? "transform rotate-180" : ""}`}>
                                    <Image
                                        src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                                        height={16}
                                        width={16}
                                        alt=""
                                    />
                                </div>
                            </div>
                }
            </div>
            {errorMsg &&
                <div className='text-[12px] italic text-error'>
                    {errorMsg}
                </div>
            }
        </div>
    );
}

export default NationalIdentityNumber