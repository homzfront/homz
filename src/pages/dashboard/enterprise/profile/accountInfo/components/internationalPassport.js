import React, { useEffect, useRef, useState } from 'react'
import useBodyScroll from '@/utils/useBodyScroll';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import InterPassport from './interPassport';


const InternationalPassport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [interPassport, setInterPassport] = useState(null);
    const [interPassportUploaded, setInterPassportUploaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [interPassportLoading, setInterPassportLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [interPassportSuccess, setInterPassportSuccess] = useState(false);

    const interPassportRef = useRef(null);

    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const uploadInterPassport = () => {
        if (interPassportRef.current) {
            interPassportRef.current.click();
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
        setInterPassport(null);
        setErrorMsg(null);
        setInterPassportUploaded(false);
        setIsOpen(false);
    };

    const handleUploadInterPassport = () => {
        // e.preventDefault();
        setInterPassportLoading(true);
        setInterPassportSuccess(true);
        setProgress(0);
        setTimeout(() => {
            const totalSize = interPassport.size;
            let uploadedSize = 0;
            const uploadInterval = setInterval(() => {
                uploadedSize += 10000;
                const currentProgress = (uploadedSize / totalSize) * 100;
                setProgress(currentProgress);
                setInterPassportUploaded(false);
                if (currentProgress >= 100) {
                    clearInterval(uploadInterval);
                }
            }, 40);
            setTimeout(() => {
                setInterPassportLoading(false);
            }, 1000);
        }, 800);
    }

    return (
        <div className="">
            {
                isOpen &&
                <InterPassport
                    uploadInterPassport={uploadInterPassport}
                    setIsOpen={setIsOpen}
                    setErrorMsg={setErrorMsg}
                    setInterPassportUploaded={setInterPassportUploaded}
                    setInterPassport={setInterPassport}
                    interPassportRef={interPassportRef}
                />
            }
            <div className="bg-inputBg rounded-[12px] p-6">
                {
                    interPassportUploaded ? (
                        <div className="flex md:items-center flex-col md:flex-row md:justify-between w-full gap-[12px] md:gap-0">
                            <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left flex flex-col gap-[4px]">
                                <span className="text-BlueHomz inline-block">
                                    [{interPassport?.name && interPassport.name}]
                                </span>
                                <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                                    PDF ({interPassport?.size && (interPassport.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                            </p>
                            <div className={`flex flex-row gap-[20px] items-center ${interPassportLoading ? "pointer-events-none" : ""}`}>
                                <p className="text-BlueHomz text-[13px] font-[400] leading-[19.5px] cursor-pointer" onClick={() => viewFile(interPassport)}>
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
                                    {!interPassportLoading ? (
                                        <p
                                            className="border border-BlueHomz py-[8px] px-[12px] hover:bg-BlueHomz hover:text-white rounded-[4px] cursor-pointer text-BlueHomz leading-[19.5px] md:text-[14px] font-[500] text-[13px]"
                                            onClick={handleUploadInterPassport}
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
                        interPassportSuccess ? (
                            <>
                                {progress >= 100 ? (
                                    <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                                            <span className="inline-block">
                                                [{interPassport?.name && interPassport.name}]
                                            </span>{' '}
                                            <span>is currently under review</span>
                                        </p>
                                        <p className="text-BlueHomz text-[13px] font-[400] leading-[19.5px] cursor-pointer" onClick={() => viewFile(interPassport)}>
                                            View
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-[8px] w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-BlueHomz">
                                                <span className="text-BlueHomz inline-block ">
                                                    [{interPassport?.name && interPassport.name}]
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
                                    International Passport
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
};
export default InternationalPassport;