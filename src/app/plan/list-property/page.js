"use client";

import Loading from "/src/components/mainmenu/loading";
import api from "/src/utils/api";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import { useState, useRef, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import useBodyScroll from "@/utils/useBodyScroll";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/profile";
import LoadingProlonged from "@/components/general/loadingProlonged";

const ListProperty = () => {
    const router = useRouter();
    const { fetchProfile, profile } = useProfileStore();
    const [email, setEmail] = useState(profile?.email || "");
    const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
        useState(false);
    const [businessLogo, setBusinessLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const BusinessCertificateRef = useRef(null);
    const [businessCertificateUpload, setBusCertUploaded] = useState(false);
    const [businessCertificate, setBusinessCertificate] = useState(null);
    const [progress, setProgress] = useState(0);
    const [busCertSuccess, setBusCertSuccess] = useState(false);
    const [uploadIntervalID, setUploadIntervalID] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsg2, setErrorMsg2] = useState("");
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const [certificateRemoved, setCertificateRemoved] = useState(false);
    const [removeCertificate, setRemoveCertificate] = useState(false);
    const [formError, setFormError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

    useEffect(() => {
        if (!profile) {
            fetchProfile();
        }
        setEmail(profile?.email);
    }, [profile, fetchProfile]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        criteriaMode: "all",
    });
    const handleBusinessCertificate = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                // File size exceeds the limit
                setErrorMsg("File size exceeds 5MB.");
                return;
            } else {
                setErrorMsg("");
                setBusinessCertificate(file);
                setBusCertUploaded(true);
            }
        }
    };

    const UploadBusCertificate = (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when starting upload
        setTimeout(() => {
            const totalSize = businessCertificate.size;
            let uploadedSize = 0;
            const uploadInterval = setInterval(() => {
                uploadedSize += 10000;
                const currentProgress = (uploadedSize / totalSize) * 100;
                setProgress(currentProgress);
                if (currentProgress >= 100) {
                    clearInterval(uploadInterval);
                }
            }, 40); // Update progress every 30 milliseconds

            // Set loading to false after delay
            setTimeout(() => {
                setIsLoading(false);
                setBusCertSuccess(true);
            }, 1000);
        }, 800); // Simulate 2 seconds delay before starting upload
    };

    const cancelUpload = () => {
        setProgress(0);
        setBusCertUploaded(false);
        setBusCertSuccess(false);
        setBusinessCertificate(null);
        clearInterval(uploadIntervalID);
    };
    const closeModal = () => {
        setRemoveCertificate(false);
        setRemoveCertificate(true);
    };
    const closeSuccessModal = () => {
        setCertificateRemoved(false);
    };
    const handleRemoved = (e) => {
        e.preventDefault();
        setBusinessCertificate(null);
        setCertificateRemoved(true);
        setRemoveCertificate(false);
    };
    const viewFile = (file) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            // console.log('viewing')
        }
    };

    const uploadBusinessCertificate = () => {
        if (BusinessCertificateRef.current) {
            BusinessCertificateRef.current.click();
        }
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                setErrorMsg2("Only JPEG or PNG files are allowed.");
                return;
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                // File size exceeds the limit
                setErrorMsg2("File size exceeds 5MB.");
                return;
            } else {
                setErrorMsg2("");
                setBusinessLogo(file);
            }
        }
    };

    const handleImageRemove = () => {
        setBusinessLogo(null);
    };

    const onSubmit = async (data) => {
        // e.preventDefault();
        setLoading(true);

        // Prepare form data
        const formData = new FormData();
        formData.append("businessLogo", businessLogo);
        formData.append("certificateCAC", businessCertificate);
        formData.append("businessName", data.businessName);
        formData.append("fullName", data.fullName);
        formData.append("businessEmail", profile?.email)
        data.phoneNumber != "" && formData.append("phoneNumber", data.phoneNumber);

        // Send the data to your API endpoint
        try {
            const response = await api.post(
                "/listingProperty/createAccount",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.success === true) {
                setSubmitConfirmationVisible(true);
                reset();
                // console.log("form successfully filled ", response.data);
                setLoading(false);
            } else {
                setFormError(response.data.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error creating profile:", error);
            setFormError(error?.response?.data?.message);
            setFormError(error?.response?.data?.error);
        }
    };

    // useEffect to handle scrolling
    useBodyScroll([loading]);

    const toDashboard = () => {
        router.push("/dashboard/list_Property")
    }

    const goBack = () => {
        router.back();
    };

    useEffect(() => {
        let timer;

        if (loading) {
            // Set a timer to show the long loading message after 3 seconds
            timer = setTimeout(() => {
                setShowLongLoadingMessage(true);
            }, 20000); // 20 seconds
        } else {
            // Reset when loading is false
            setShowLongLoadingMessage(false);
        }

        // Cleanup the timer on component unmount or when loading changes
        return () => clearTimeout(timer);
    }, [loading]);

    const closeModalDelay = () => {
        setShowLongLoadingMessage(false);
    };

    return (
        <div className="pt-[64px] max-w-[1156px] m-auto">
            {loading && <Loading />}
            <CustomizedModal isOpen={showLongLoadingMessage}>
                <LoadingProlonged closeModal={closeModalDelay} />
            </CustomizedModal>
            <CustomizedModal isOpen={isSubmitConfirmationVisible}>
                <div className="bg-white p-8 rounded-md">
                    <Image
                        className="m-auto my-2"
                        src={"/Featured icon.png"}
                        height={48}
                        width={48}
                        alt="img"
                    />
                    <p className="text-center text-[24px] font-[700] text-BlackHomz mb-4">
                        Account Created
                    </p>
                    <p className="text-center text-[14px] sm:text-[16px] text-BlackHomz mb-8">
                        Your account has been successfully created.
                    </p>
                    <div onClick={toDashboard}>
                        <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </CustomizedModal>
            <div className="flex flex-col sm:gap-[35px] px-6 pt-8 sm:pt-0 miniPadding">
                <div className="h-[29px] mt-0 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse sm:items-center sm:p-4 justify-between">
                    <p className="text-[23px] font-[700] text-BlackHomz">List Property</p>
                    <div
                        onClick={goBack}
                        className="flex gap-1 cursor-pointer">
                        <Image
                            src="/static/images/arrow-left.svg"
                            height={16}
                            alt="img"
                            width={16}
                        />
                        <span className="text-[#559CFF] leading-[24px] font-[400]">
                            Change Profile
                        </span>
                    </div>
                </div>
                <div className="w-full h-[320px] m-auto mt-4 sm:mt-0">
                    <div className="max-w-[1156px] m-auto sm:px-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:bg-inputBg rounded-[12px] sm:p-8 sm:pr-6 sm:pl-8">
                            <div className="flex flex-col gap-2 ">
                                <label className="text-[14px] font-[500] text-BlackHomz">
                                    Business Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("businessName", {
                                        required: "Business name is required",
                                    })}
                                    placeholder="Enter your business name"
                                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                                />
                                {errors.businessName && (
                                    <span className=" text-red-500 text-[11px] font-normal">
                                        {errors.businessName?.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-[500] text-BlackHomz">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("fullName", {
                                        required: "Full name field cannot be empty",
                                    })}
                                    id="fullname"
                                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                                />
                                {errors.fullName && (
                                    <span className=" text-red-500 text-[11px] font-normal">
                                        {errors.fullName?.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 text-BlackHomz">
                                <label className="text-[14px] font-[500]">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                                    value={email}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-[500] text-BlackHomz">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    {...register("phoneNumber", {
                                        pattern: {
                                            value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                                            message: "Invalid Phone number",
                                        },
                                    })}
                                    placeholder="Enter your phone number"
                                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] "
                                // onChange={(e)=>setPhoneNumber(e.target)}
                                />
                                {errors.phoneNumber && (
                                    <span className=" text-red-500 text-[11px] font-normal">
                                        {errors.phoneNumber?.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="w-full my-14  rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CustomizedModal isOpen={removeCertificate} onRequestClose={closeModal}>
                <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
                    <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
                        Remove Certificate?
                    </p>
                    <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
                        Removing your certificate will restrict you to listing only one
                        property on your dashboard
                    </p>
                    <div className="flex flex-wrap md:flex-col gap-[16px]">
                        <button
                            className="bg-BlueHomz2 w-[137.5px]  text-white rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
                            onClick={handleRemoved}
                        >
                            Proceed
                        </button>
                        <button
                            className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
                            onClick={() => {
                                setRemoveCertificate(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomizedModal>
            <CustomizedModal
                isOpen={certificateRemoved}
                onRequestClose={closeSuccessModal}
            >
                <div className="bg-white border flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
                    <div className="flex flex-col gap-6 items-center justify-center">
                        <Image
                            src="/static/images/success_icon.svg"
                            height={48}
                            width={46}
                            alt=""
                        />
                        <div className="flex  flex-col">
                            <p className="text-[14px] md:text-[20px] font-[700] leading-[17.64px] md:leading-[25.2px] text-center mb-1">
                                Certificate Removed Successfully
                            </p>
                        </div>
                    </div>

                    <button
                        className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px]"
                        onClick={() => {
                            closeSuccessModal();
                            setBusCertSuccess(false);
                            setBusCertUploaded(false);
                            setProgress(0);
                        }}
                    >
                        Close
                    </button>
                </div>
            </CustomizedModal>
        </div >
    );
};

export default ListProperty;