import Close from "@/components/icons/Close";
import React, { useState } from "react";
import SelectDocument from "./selectDocument";
import NewDocument from "./newDocument";
import CustomInformation from "./customInformation";
import { useSearchParams } from "next/navigation";

const Widget = ({ setDocumentCreation,  setShowPreview }) => {
    const urlParams = useSearchParams();
    const tab = urlParams.get("tab")
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState((tab === 'customInfo'));
    const [activeFour, setActiveFour] = useState(false);

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        setActiveFour(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
        setActiveFour(false);
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true);
        setActiveFour(false);
    };

    const handlePageChangeFour = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(false);
        setActiveFour(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <div>
            <div className="sm:w-full w-[360px] h-auto">
                <div className="h-auto flex justify-center pr-4 py-3">
                    <div className="z-0 absolute w-[360px] sm:w-[620px] pr-[105px] pl-[79px] py-[27.5px]">
                        <div className="border-b-[1px] border-GrayHomz"></div>
                    </div>
                    <div className="z-1 relative flex mt-5 gap-4 justify-between items-center px-8 w-[360px] sm:w-[620px]">
                        <div className="flex flex-col items-center gap-2 justify-center">
                            <div
                                className={`flex flex-col items-center p-2 justify-center ${active
                                    ? " bg-white rounded-full  w-1 h-1 shadow-md "
                                    : "h-1 w-1"
                                    }`}
                                onClick={handlePageChange}
                            >
                                <div
                                    className={`${active ? "bg-BlueHomz" : "w-[1px] h-[1px] border border-BlueHomz bg-white"} rounded-full w-[1px] h-[1px] cursor-pointer p-1 text-[14px] font-[500] text-center`}
                                ></div>
                            </div>
                            <p className={`text-[13px] font-400 text-center ${active ? "text-GrayHomz" : "text-GrayHomz2"}`}>Select Document</p>
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
                                    className={`${activeTwo ? "bg-BlueHomz" : "w-[1px] h-[1px] border border-BlueHomz bg-white"} rounded-full w-[1px] h-[1px] cursor-pointer p-1 text-[14px] font-[500] text-center`}
                                ></div>
                            </div>
                            <p className={`text-[13px] font-400 text-center ${activeTwo ? "text-GrayHomz" : "text-GrayHomz2"}`}>Name Document</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center">
                            <div
                                className={`flex flex-col p-2 items-center justify-center ${activeThree
                                    ? " bg-white rounded-full  w-1 h-1 shadow-md "
                                    : "h-1 w-1"
                                    }`}
                                onClick={handlePageChangeThree}
                            >
                                <div
                                    className={`${activeThree ? "bg-BlueHomz" : "w-[1px] h-[1px] border border-BlueHomz bg-white"} rounded-full w-[1px] h-[1px] cursor-pointer p-1 text-[14px] font-[500] text-center`}
                                ></div>
                            </div>
                            <p className={`text-[13px] font-400 text-center ${activeThree ? "text-GrayHomz" : "text-GrayHomz2"}`}>Custom Information</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center">
                            <div
                                className={`flex flex-col p-2 items-center justify-center ${activeFour
                                    ? " bg-white rounded-full  w-1 h-1 shadow-md "
                                    : "h-1 w-1"
                                    }`}
                                onClick={handlePageChangeFour}
                            >
                                <div
                                    className={`${activeFour ? "bg-BlueHomz" : "w-[1px] h-[1px] border border-BlueHomz bg-white"} rounded-full w-[1px] h-[1px] cursor-pointer p-1 text-[14px] font-[500] text-center`}
                                ></div>
                            </div>
                            <p className={`text-[13px] font-400 text-center ${activeFour ? "text-GrayHomz" : "text-GrayHomz2"}`}>Preview & Download</p>
                        </div>
                    </div>
                    <button className="mt-4 cursor-pointer border h-[20px] border-BlackHomz rounded-[4px]" onClick={() => setDocumentCreation(false)}>
                        <Close />
                    </button>
                </div>
                <div className="border-b-[1px]">

                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <SelectDocument handlePageChangeTwo={handlePageChangeTwo} />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <NewDocument handlePageChangeThree={handlePageChangeThree} handlePageChange={handlePageChange} />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <CustomInformation handlePageChangeTwo={handlePageChangeTwo}  setShowPreview={setShowPreview}/>
                    </div>
                    <div className={`${activeFour ? "inline" : "hidden"}`}>
                        {/* <PreviewAndDownload /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
