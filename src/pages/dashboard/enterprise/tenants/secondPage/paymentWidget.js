"use client";
import React, { useState } from "react";
import AddBlueSmall from "@/components/icons/addBlueSmall";
import WalletPayement from "./walletPayement";
import OfflinePayment from "./offlinePayment";
import AllData from "./allData";
import paymentData from "../../payments/components/payementData";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import SetOfflineData from "./setOfflineData";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmModal from "../../components/confirmModal";

const Widget = ({ Data }) => {
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [offlinepay, setOfflinepay] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const handlePageChange = () => {
        setActive(true);
        setActiveTwo(false);
        setActiveThree(false)
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false)
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true)
    };

    const openAddOfflinePayment = () => {
        setOfflinepay(true);
    };

    const successfullModal = () => {
        setOpenModel(!openModel);
        setOfflinepay(false);

    }

    const DataTwo = paymentData

    return (
        <div>
            <div className="w-full h-auto">
                <div className="mt-5 flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
                    <div className="flex gap-4 w-auto items-center">
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col items-center py-2 px-4 justify-center hover:text-BlueHomz ${active ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChange}
                                justify-center
                            >
                                <p className="text-[14px] font-500">All</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeTwo ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChangeTwo}
                            >
                                <p className="text-[14px] font-500">Wallet Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeThree ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChangeThree}
                            >
                                <p className="text-[14px] font-500"> Offline Payments</p>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={openAddOfflinePayment}
                        className="hover:border hover:border-BlueHomz hover:p-2 hover:rounded-md flex flex-row gap-1 items-center cursor-pointer">
                        <AddBlueSmall />
                        <span className="text-[13px] font-[400] mt-[0.5px] text-BlueHomz">Add offline payment record</span>
                    </div>
                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <AllData data={DataTwo} />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <WalletPayement data={DataTwo} />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <OfflinePayment data={DataTwo} />
                    </div>
                </div>
            </div>
            <CustomizedModal isOpen={offlinepay}>
                <SetOfflineData setOfflinepay={setOfflinepay} successfullModal={successfullModal} />
            </CustomizedModal>
            <CustomizedModal isOpen={openModel}>
                <ConfirmModal
                    header={"Offline Payment Added Successfully"}
                    body={"You have successfully added an offline payment record for [Tenant’s Name]"}
                    button={"Close"}
                    returnHome={successfullModal}
                />
            </CustomizedModal>
        </div>
    );
};

export default Widget;
