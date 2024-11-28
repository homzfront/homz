import Image from "next/image";
import React from "react";

const ExpiredPlanModal = ({
    header,
    body,
    returnHome,
    returnHomeTwo,
    button,
    buttonTwo,
}) => {
    return (
        <div>
            <div className="absolute px-8 md:px-0 top-0 z-20 h-screen w-full  inset-0 flex items-center  bg-black bg-opacity-30">
                <div className="max-w-[464px] p-2 m-auto bg-white rounded-md">
                    <div className="flex flex-col gap-1 justify-around items-center h-full p-4">
                        <Image
                            src={"/Featured_Icon.png"}
                            alt="trialIcon"
                            width={48}
                            height={48}
                        />
                        <h1 className="text-BlackHomz font-[700] text-[20px] text-center">
                            {header}
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            {body}
                        </p>
                        <button
                            onClick={
                                returnHome}
                            className="mt-2 h-[48px] rounded-md w-full hover:bg-BlueHomz4 bg-BlueHomz text-white text-[16px] font-[500]"
                        >
                            {button}
                        </button>
                        <button
                            onClick={
                                returnHomeTwo
                            }
                            className="mt-2 h-[48px] rounded-md w-full hover:border hover:border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            {buttonTwo}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpiredPlanModal;
