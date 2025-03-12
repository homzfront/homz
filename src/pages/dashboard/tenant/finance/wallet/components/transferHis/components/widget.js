"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AllData from "./allData";
import WalletPayement from "./walletPayement";
import OfflinePayment from "./offlinePayment";

const Widget = ({
    handleToggleMenu,
    setReceiptdata,
    popUpMenuTwo,
    selectedDataId,
    openReceipt,
    dropdownRef,
}) => {
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const router = useRouter()


    const handlePageChange = () => {
        setActive(true);
        setActiveTwo(false);
        setActiveThree(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true);
    };

    return (
        <div>
            <div className={`w-full h-auto`}>
                <div className="mt-1 px-4 flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
                    <div className="flex gap-4 w-auto items-center">
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col items-center py-2 px-4 justify-center  ${active
                                    ? `border-b-[2px] border-BlueHomz text-BlueHomz hover:text-BlueHomz`
                                    : "text-BlackHomz "
                                    }
                                    `}
                                onClick={handlePageChange}
                                justify-center
                            >
                                <p className="text-[11px] md:text-[13px] font-500">All</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center ${activeTwo
                                    ? `border-b-[2px] border-BlueHomz text-BlueHomz hover:text-BlueHomz`
                                    : "text-BlackHomz "
                                    }
                                    `}
                                onClick={handlePageChangeTwo}
                            >
                                <p className="text-[11px] md:text-[13px] font-500">
                                    Wallet Payments
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center ${activeThree
                                    ? `border-b-[2px] border-BlueHomz text-BlueHomz hover:text-BlueHomz`
                                    : "text-BlackHomz "
                                    }
                                    `}
                                onClick={handlePageChangeThree}
                            >
                                <p className="text-[11px] md:text-[13px] font-500">
                                    {" "}
                                    Offline Payments
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <AllData
                            handleToggleMenu={handleToggleMenu}
                            setReceiptdata={setReceiptdata}
                            popUpMenuTwo={popUpMenuTwo}
                            selectedDataId={selectedDataId}
                            openReceipt={openReceipt}
                            dropdownRef={dropdownRef}
                        />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <WalletPayement
                            handleToggleMenu={handleToggleMenu}
                            setReceiptdata={setReceiptdata}
                            popUpMenuTwo={popUpMenuTwo}
                            selectedDataId={selectedDataId}
                            openReceipt={openReceipt}
                            dropdownRef={dropdownRef}
                        />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <OfflinePayment
                            handleToggleMenu={handleToggleMenu}
                            setReceiptdata={setReceiptdata}
                            popUpMenuTwo={popUpMenuTwo}
                            selectedDataId={selectedDataId}
                            openReceipt={openReceipt}
                            dropdownRef={dropdownRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
