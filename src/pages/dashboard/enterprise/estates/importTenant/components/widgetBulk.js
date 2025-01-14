import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import UploadYourFile from "./uploadYourFile";
import DataMapping from "./dataMapping";
import Close from "@/components/icons/Close";

const WidgetBulk = ({ setOpenBulkInvite, setImportData }) => {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [dashboard, setDashboard] = useState(false);

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-[360px] sm:w-full">
            <CustomizedModal isOpen={dashboard}>
                <div className="w-full m-auto bg-white h-[260px] rounded-md shadow-lg">
                    <div className="mt-[-10px] lg:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
                        <Image
                            src={
                                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                            }
                            alt=""
                            height={48}
                            width={48}
                        />
                        <h1 className="text-BlackHomz font-[700] text-[20px]">
                            Account Created
                        </h1>
                        <p className="text-[16px] font-[400] text-GrayHomz text-center">
                            Your account has successfully been created.
                        </p>
                        <Link
                            href={"/dashboard/property-owner/dashboard"}
                            className="h-[48px] rounded-md w-full bg-BlueHomz flex justify-center items-center text-white text-[16px] font-[700]"
                        >
                            Go to dashboard
                        </Link>
                    </div>
                </div>
            </CustomizedModal>
            <div className="sm:w-full w-[360px] px-4 sm:px-0 h-auto">
                <div className="flex w-full justify-between items-center">
                    <div className="h-auto flex justify-center">
                        <div className="z-0 absolute w-[172px] lg:w-[915px] lg:pr-[92px] lg:pl-[96px] py-[29px]">
                            <div className="border-[1px] border-GrayHomz2"></div>
                        </div>
                        <div className="z-1 relative flex mt-5 gap-4 justify-between items-center w-[257px] lg:w-[830px]">
                            <div className="flex flex-col items-center gap-2 justify-center">
                                <div
                                    className={`cursor-pointer flex flex-col items-center p-[6px] justify-center shadow-lg ${!active
                                        ? "bg-white rounded-full"
                                        : "border border-[#559CFF] rounded-full bg-[#EEF5FF]"
                                        }`}
                                    onClick={handlePageChange}
                                >
                                    <div
                                        className={`${!active && "rounded-full w-[1px] h-[1px] bg-BlueHomz p-[4px] text-[14px] font-[500] text-center flex-shrink-0"}`}
                                    ></div>
                                </div>
                                <p className="text-[13px] font-400">Upload your file</p>
                            </div>

                            <div className="flex flex-col items-center gap-2 justify-center">
                                <div
                                    className={`cursor-pointer flex flex-col p-[6px] items-center justify-center shadow-lg ${activeTwo
                                        ? "bg-white rounded-full"
                                        : "border border-[#559CFF] rounded-full bg-[#EEF5FF]"
                                        }`}
                                    onClick={handlePageChangeTwo}
                                >
                                    <div
                                        className={`${activeTwo && "rounded-full w-[1px] h-[1px] bg-BlueHomz p-[4px] text-[14px] font-[500] text-center flex-shrink-0"}`}
                                    ></div>
                                </div>
                                <p className="text-[13px] font-400">Data Mapping</p>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => setOpenBulkInvite(false)}
                        className="z-20  cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                    >
                        <Close />
                    </div>
                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${!active ? "inline" : "hidden"}`}>
                        <UploadYourFile
                            handlePageChangeTwo={handlePageChangeTwo}
                        />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <DataMapping
                            handlePageChange={handlePageChange}
                            setImportData={setImportData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetBulk;
