import React, { useState } from "react";
import CreateTransactionPin from './createTransactionPin'
import VerifyBVN from './verifyBVN'
import Image from "next/image";

const WidgetTwo = ({ closeForm, fetchDataAgain }) => {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
    };

    return (
        <div className="sm:w-full w-[360px] h-auto">
            <div className="h-auto flex justify-between items-start ">
                <div className="z-0 absolute w-[360px] sm:w-[400px] mt-[7px] pr-[28px] pl-[12px]">
                    <div className="border-[1px]"></div>
                </div>
                <div className="z-1 relative flex justify-between items-start w-[360px] sm:w-[400px]">
                    <div className="flex flex-col items-start gap-2">
                        <div
                            className={`flex flex-col items-center p-2 justify-center ${!active
                                ? " bg-white rounded-full  w-1 h-1 shadow-md "
                                : "h-1 w-1"
                                }`}
                            onClick={handlePageChange}
                        >
                            <div
                                className={`rounded-full w-[1px] h-[1px] cursor-pointer ${!active ? "bg-BlueHomz" : "border border-BlueHomz4 bg-whiteblue"} p-1 text-[14px] font-[500] text-center`}
                            ></div>
                        </div>
                        <p className="text-GrayHomz2 text-[11px] font-400">Create Transaction Pin</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 justify-center">
                        <div
                            className={`flex flex-col p-2 items-center justify-center ${activeTwo
                                ? " bg-white rounded-full  w-1 h-1 shadow-md "
                                : "h-1 w-1"
                                }`}
                            onClick={handlePageChangeTwo}
                        >
                            <div
                                className={`rounded-full w-[1px] h-[1px] cursor-pointer ${activeTwo ? "bg-BlueHomz" : "border border-BlueHomz4 bg-whiteblue"} p-1 text-[14px] font-[500] text-center`}
                            ></div>
                        </div>
                        <p className="text-GrayHomz2 text-[11px] font-400">Verify BVN</p>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={closeForm}>
                    <Image
                        src={
                            "/static/dashboard/enterprisemanager/payment/close-square.png"
                        }
                        height={24}
                        width={24}
                        alt=""
                    />
                </div>
            </div>
            <div className=" my-5  rounded-[12px]">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <CreateTransactionPin handlePageChangeTwo={handlePageChangeTwo}
                    />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <VerifyBVN closeForm= {closeForm} fetchDataAgain={fetchDataAgain} handlePageChangeTwo={handlePageChangeTwo}
                    /> 
                </div>
            </div>
        </div>
    )
}

export default WidgetTwo;