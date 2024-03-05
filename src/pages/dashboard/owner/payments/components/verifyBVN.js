"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FailedModal from "./failedModal";
import ConfirmModal from "../../components/confirmModal";
import AcAndRejModel from "../../components/acAndRejModel";
import Loading from "@/components/mainmenu/loading";
import { createPropertyOwnerWallet, propertyMe } from "@/api/propertyService";



const VerifyBVN = ({ closeForm, fetchDataAgain, handlePageChangeTwo }) => {
    const [data, setData] = useState("");
    const [BVN, setBVN] = useState("");
    const [BVNDate, setBVNDate] = useState("");
    const [openProceed, setOpenProceed] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailed, setOpenFailed] = useState(false);
    const [error, setError] = useState("");
    const [inputError, setInputError] = useState(false);
    const [pinCode, setPinCode] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve email from localStorage
        if (typeof window !== 'undefined') {
            const UserData = localStorage.getItem('date');
            if (UserData) {
                setPinCode(JSON.parse(UserData));
            }
        }
    }, [handlePageChangeTwo]);

    const validateBVN = (value) => {
        const isValid = value.length === 11;
        setInputError(!isValid);
    };

    const openProceedModal = () => {
        setOpenProceed(!openProceed);
    };

    const closeProceed = () => {
        setOpenProceed(false);
    };

    console.log(pinCode);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const BVNDetails = {
                bvn: BVN,
                bvnDateOfBirth: BVNDate,
                pinCode: pinCode?.date
            };
            console.log(BVNDetails);
            const { success, upDateddata, error } = await createPropertyOwnerWallet(
                BVNDetails
            );

            if (success) {
                console.log("Form successfully updated", upDateddata);
                setOpenSuccess(!openSuccess);
                setLoading(false);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('date');
                }


            } else {
                console.error("Update failed", error);
                setOpenFailed(!openFailed);
                setError(error?.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Update error", error);
            setOpenFailed(!openFailed);
            setError(error?.message);
            setLoading(false);
        }
    };

    const closeFailedModal = () => {
        setOpenFailed(false);
        setOpenProceed(false);
        closeForm();
    };

    const goBack = () => {
        setOpenFailed(false);
        setOpenProceed(false);

    }

    const closeAllMOdal = () => {
        setOpenProceed(false);
        setOpenSuccess(false);
        setOpenFailed(false);
        fetchDataAgain();
        closeForm();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await propertyMe();
                console.log(data);
                setData(data);
            } catch { }
        };
        fetchData();
    }, []);

    console.log(data);


    return (
        <div className="">
            {
                loading && <Loading />
            }
            {openFailed ? (
                <FailedModal
                    body={"Kindly enter a valid BVN"}
                    header={"BVN Not Found"}
                    button={"Go back"}
                    returnHome={goBack}
                />
            ) : openSuccess ? (
                <ConfirmModal
                    header={"Wallet Created Successfully"}
                    body={"You can now carry out transactions from your wallet"}
                    button={"Go to wallet"}
                    returnHome={closeAllMOdal}
                />
            ) : openProceed ? (
                <div>
                    <AcAndRejModel
                        header={"Create Wallet?"}
                        body={"Kindly ensure that all information are valid and correct"}
                        button={"Proceed"}
                        buttonTwo={"Go back"}
                        returnHome={handleSubmit}
                        returnHomeTwo={closeProceed}
                    />
                </div>
            ) : (
                <div className="">
                    <div className="flex items-start w-full justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-[500] text-BlueHomz">
                                Create Wallet
                            </p>
                            <p className="text-[13px] font-[400] text-GrayHomz">
                                Update your profile to create wallet
                            </p>
                        </div>

                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                        <div>
                            <label className="text-[13px] font-[500] text-GrayHomz2">
                                Full Name
                            </label>
                            <input
                                className="pointer-events-none border mt-2 text-GrayHomz rounded-md p-3 h-[45px] w-full bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]"
                                type="text"
                                placeholder="[Registered Full Name]"
                                value={data === undefined ? "....." : data?.data?.fullName}
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-[500] text-GrayHomz2">
                                Email
                            </label>
                            <input
                                className="pointer-events-none border mt-2 text-GrayHomz rounded-md p-3 h-[45px] w-full bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]"
                                type="text"
                                placeholder="[Registered Email]"
                                value={data === undefined ? "....." : data?.data?.user?.email}
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-[500] text-GrayHomz2">
                                Phone Number
                            </label>
                            <input
                                className="pointer-events-none border mt-2 text-GrayHomz rounded-md p-3 h-[45px] w-full bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]"
                                type="text"
                                placeholder="[Registered Email]"
                                value={data === undefined ? "....." : data?.data?.phoneNumber}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-3">
                        <div className="w-[50%]">
                            <p className="text-[13px] font-[500] text-GrayHomz">BVN</p>
                            <p className="text-[11px] font-[400] text-GrayHomz2">
                                Enter your valid BVN issued by the Central Bank of Nigeria
                                (CBN)
                            </p>
                            <input
                                className={`w-full border mt-2 rounded-md p-3 h-[45px] text-GrayHomz bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500] ${inputError ? "border-red-500" : ""
                                    }`}
                                type="text"
                                value={BVN}
                                placeholder="00000000000"
                                onChange={(e) => {
                                    setBVN(e.target.value);
                                    validateBVN(e.target.value);
                                    setError("");
                                }}
                                onBlur={() => validateBVN(BVN)}
                            />
                            {inputError && (
                                <p className="text-red-500 text-[12px] mt-1">
                                    Invalid input, 11 digits required
                                </p>
                            )}
                            {error && (
                                <p className="text-red-500 text-[12px] mt-1">{error}</p>
                            )}
                        </div>
                        <div className="w-[50%]">
                            <p className="text-[13px] font-[500] text-GrayHomz">
                                Date-of-Birth
                            </p>
                            <p className="text-[11px] font-[400] text-GrayHomz2">
                                Enter the date of birth registered with your BVN
                            </p>
                            <input
                                value={BVNDate}
                                className="w-full border mt-2 rounded-md p-3 h-[45px] text-GrayHomz bg-inputBg  placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]"
                                type="date"
                                placeholder="yyyy - mm - dd"
                                onChange={(e) => setBVNDate(e.target.value)}
                            />
                        </div>
                    </div>
                    {BVN !== "" && BVNDate !== "" && BVN.length === 11 ? (
                        <button
                            onClick={openProceedModal}
                            className="mt-4 rounded-[6px] text-[16px] font-[700] border h-[48px] bg-BlueHomz text-white w-full"
                        >
                            Create Wallet
                        </button>
                    ) : (
                        <button
                            disabled
                            className="mt-4 rounded-[6px] text-[16px] font-[700] border h-[48px] bg-GrayHomz6 text-GrayHomz5 w-full"
                        >
                            Create Wallet
                        </button>
                    )}
                </div>
            )}
        </div>

    )
}

export default VerifyBVN