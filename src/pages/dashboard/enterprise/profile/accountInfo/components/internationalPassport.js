import React, { useEffect, useRef, useState } from 'react'
import useBodyScroll from '@/utils/useBodyScroll';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import InterPassport from './interPassport';
import { uploadKYC } from '@/api/enterpriseManagerService';
import { toast } from 'react-toastify';
import UseWalletStore from '@/store/enterpriseStore/useWalletStore';
import TickSuccess from '@/components/icons/tickSuccess';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import { useRouter } from 'next/navigation';

const InternationalPassport = ({ passportProfile }) => {
    const route = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [interPassport, setInterPassport] = useState(null);
    const [interPassportUploaded, setInterPassportUploaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [interPassportLoading, setInterPassportLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [interPassportSuccess, setInterPassportSuccess] = useState(false);
    const { fetchData: fetchWallet } = UseWalletStore();
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

    const viewFileII = (file) => {
        if (file) {
            window.open(file);
        }
    };


    const handleRemoved = (e) => {
        e.preventDefault();
        setInterPassport(null);
        setErrorMsg(null);
        setInterPassportUploaded(false);
        setIsOpen(false);
    };

    const handleUploadInterPassport = async () => {
        setInterPassportLoading(true);

        if (!interPassport) {
            setInterPassportLoading(false);
            return;
        }

        try {
            const { success, updatedPassport, error } = await uploadKYC(
                interPassport
            );
            if (success) {
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
                fetchWallet();
            } else {
                toast.error(error);
                setInterPassportLoading(false);
            }
        } catch (error) {
            setInterPassportLoading(false);
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

    const pushToContactPage = () => {
        route.push("/dashboard/enterprise-property/support")
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    
    return (
        <div className="">
              <CustomizedModal isOpen={isOpen}
            >
                <div className="max-w-[464px] w-[380px] md:w-auto  p-2 m-auto bg-white rounded-[12px]">
                    <div className="flex flex-col justify-around items-center h-full w-full p-6">
                        <div className="w-[48px] h-[48px] bg-successBg flex justify-center items-center rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.82424 4.7957L2.82425 4.7957L2.82528 4.79306C3.0367 4.2557 3.37327 3.75637 3.85311 3.3037L3.85319 3.30378L3.86076 3.29633C4.42529 2.74062 5.00458 2.5 5.59 2.5C5.79998 2.5 6.00543 2.54522 6.18363 2.63076L6.18361 2.63081L6.19047 2.63398C6.37619 2.7197 6.53388 2.84401 6.6589 3.0246L6.65888 3.02462L6.66221 3.02932L8.98221 6.29932L8.9822 6.29933L8.98423 6.30215C9.14612 6.52699 9.25497 6.72269 9.32723 6.89932L9.32716 6.89934L9.33043 6.90696C9.40094 7.07148 9.43 7.21384 9.43 7.32C9.43 7.45935 9.39009 7.61035 9.2929 7.77003L9.2887 7.77693L9.28472 7.78397C9.18264 7.96457 9.02379 8.1691 8.80645 8.38645L8.80638 8.38638L8.79967 8.39335L8.04255 9.18036C7.83378 9.39116 7.74 9.65048 7.74 9.93C7.74 10.0574 7.75672 10.1684 7.78493 10.2813L7.79184 10.3089L7.80184 10.3356C7.81947 10.3826 7.83717 10.4243 7.84971 10.4539C7.85095 10.4568 7.85214 10.4596 7.85327 10.4623C7.86758 10.4961 7.87269 10.5092 7.87566 10.5181L7.88974 10.5603L7.91105 10.5994C8.11468 10.9727 8.44946 11.4325 8.89831 11.963L8.89828 11.963L8.90192 11.9672C9.357 12.4931 9.84415 13.0311 10.3731 13.5702L10.3731 13.5702L10.3764 13.5736C10.4308 13.6279 10.487 13.6814 10.5381 13.7301L10.5402 13.7321C10.5935 13.7828 10.6415 13.8286 10.6864 13.8736L10.6864 13.8736L10.6909 13.878C10.8937 14.0757 10.8972 14.3957 10.6964 14.5964L8.84645 16.4464C8.65453 16.6384 8.34692 16.6457 8.13821 16.4511C8.08089 16.3939 8.02423 16.3399 7.97195 16.29L7.97024 16.2883C7.91491 16.2355 7.86432 16.1872 7.81436 16.1372C6.80215 15.1151 5.88922 14.045 5.07507 12.9269C4.27366 11.8126 3.63406 10.7059 3.17124 9.61697C2.72168 8.52581 2.5 7.5016 2.5 6.54C2.5 5.91926 2.60943 5.33272 2.82424 4.7957Z" fill="#039855" stroke="#039855" />
                                <path d="M21.9696 18.3291C21.9696 18.6091 21.9196 18.8991 21.8196 19.1791C21.7896 19.2591 21.7596 19.3391 21.7196 19.4191C21.5496 19.7791 21.3296 20.1191 21.0396 20.4391C20.5496 20.9791 20.0096 21.3691 19.3996 21.6191C19.3896 21.6191 19.3796 21.6291 19.3696 21.6291C18.7796 21.8691 18.1396 21.9991 17.4496 21.9991C16.4296 21.9991 15.3396 21.7591 14.1896 21.2691C13.0396 20.7791 11.8896 20.1191 10.7496 19.2891C10.3596 18.9991 9.96961 18.7091 9.59961 18.3991L12.8696 15.1291C13.1496 15.3391 13.3996 15.4991 13.6096 15.6091C13.6596 15.6291 13.7196 15.6591 13.7896 15.6891C13.8696 15.7191 13.9496 15.7291 14.0396 15.7291C14.2096 15.7291 14.3396 15.6691 14.4496 15.5591L15.2096 14.8091C15.4596 14.5591 15.6996 14.3691 15.9296 14.2491C16.1596 14.1091 16.3896 14.0391 16.6396 14.0391C16.8296 14.0391 17.0296 14.0791 17.2496 14.1691C17.4696 14.2591 17.6996 14.3891 17.9496 14.5591L21.2596 16.9091C21.5196 17.0891 21.6996 17.2991 21.8096 17.5491C21.9096 17.7991 21.9696 18.0491 21.9696 18.3291Z" fill="#039855" />
                            </svg>
                        </div>
                        <h1 className="mt-1 text-BlackHomz font-[700] text-[16px] md:text-[20px] text-center">
                            Contact Support
                        </h1>
                        <p className="text-[13px] md:text-[16px] font-[500] text-GrayHomz text-center">
                            Kindly contact support to complete KYC with passport verification.
                        </p>
                        <button
                            onClick={pushToContactPage}
                            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[13px] md:text-[16px] font-[500]"
                        >
                            Support
                        </button>
                        <button
                            onClick={
                             closeModal
                            }
                            className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[13px] md:text-[16px] font-[500]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CustomizedModal>
{/* 
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
            } */}
            <div className="bg-inputBg rounded-[12px] p-6">
                {
                    passportProfile?.verification?.status === 'VERIFIED' ?
                        (<div className="flex flex-col gap-[4px] w-full">
                            <div className="w-full flex justify-between items-center mt-[10px]">
                                <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-BlueHomz">
                                    {passportProfile?.basic_passport?.internationalPassportImageName ? `[${passportProfile?.basic_passport?.internationalPassportImageName}]` : "International Passport"}
                                </p>
                                <p
                                    className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                                    onClick={() => viewFileII(passportProfile?.basic_passport?.image?.url)}
                                >
                                    View
                                </p>
                            </div>
                        </div>
                        ) :
                        interPassportUploaded ? (
                            <div className="flex md:items-center flex-col md:flex-row md:justify-between w-full gap-[12px] md:gap-0">
                                <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left flex flex-col gap-[4px]">
                                    <span className="text-BlueHomz inline-block">
                                        [{interPassport?.name && interPassport.name}]
                                    </span>
                                    <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                                     ({interPassport?.size && (interPassport.size / (1024 * 1024)).toFixed(2)} MB)
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
                                       <div className='flex gap-2'>
                                           <TickSuccess />
                                           <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-BlueHomz">
                                               <span className="inline-block">
                                                   [{interPassport?.name && interPassport.name}]
                                               </span>
                                           </p>
                                       </div>
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