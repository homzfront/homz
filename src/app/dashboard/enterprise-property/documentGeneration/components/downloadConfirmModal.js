import AddBlueSmall from "@/components/icons/addBlueSmall";
import Close from "@/components/icons/Close";
import Flask from "@/components/icons/flask";
import Image from "next/image";
import React from "react";

const DownloadConfirmModal = ({ header, body, button, returnHome, buttonTwo, returnHomeTwo }) => {
    return (
        <div className="px-4 md:px-0 absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="md:max-w-[464px] m-auto bg-white h-auto rounded-md">
                <div onClick={returnHome} className="w-full hidden md:flex justify-end p-4 cursor-pointer">
                    <div className="p-1 border border-BlackHomz rounded-[8px]">
                        <Close />
                    </div>
                </div>
                <div className="mt-[-10px] md:mt-[-40px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
                    <Image
                        src={
                            "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                        }
                        alt=""
                        height={48}
                        width={48}    
                    />
                    <h1 className="text-BlackHomz text-center font-[700] text-[16px] md:text-[20px]">{header}</h1>
                    <p className="text-[14px] md:text-[16px] font-[400] text-GrayHomz text-center">{body}</p>
                    <div className="flex gap-2 items-center w-full">
                        <button
                            onClick={returnHome}
                            className="hover:bg-BlueHomz2 px-4 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[8px] md:text-[14px] font-[500] flex items-center justify-center gap-1"
                        >
                            <Flask />
                            {button}
                        </button>
                        <button
                            onClick={returnHomeTwo}
                            className="hover:bg-whiteblue px-4 h-[48px] rounded-md w-full text-BlueHomz border border-BlueHomz text-[8px] md:text-[14px] font-[500] flex items-center justify-center gap-1"
                        >
                            <AddBlueSmall />
                            {buttonTwo}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadConfirmModal