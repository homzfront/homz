"use client";
import React, { useState } from "react";
import RentUpdate from "./rentUpdate";
import PropertyUpdate from "./propertyUpdate";
import Notifications from "./notifications";

const Widget = ({
    fetchNoti,
    filteredData,
    openAndClose,
    setOpenAndClose
}) => {
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);

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

    return (
        <div className="md:mt-4 px-4">
            <div className="w-full h-auto">
                <div className="flex gap-4 w-auto items-center">
                    <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                        <div
                            className={`flex flex-col items-center py-2 px-4 justify-center hover:text-BlueHomz ${active ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                }`}
                            onClick={handlePageChange}
                            justify-center
                        >
                            <p className="text-[13px] md:text-[14px] font-500">All</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                        <div
                            className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeTwo ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                }`}
                            onClick={handlePageChangeTwo}
                        >
                            <p className="text-[13px] md:text-[14px] font-500">Rent Updates</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                        <div
                            className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeThree ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                }`}
                            onClick={handlePageChangeThree}
                        >
                            <p className="text-[13px] md:text-[14px] font-500">Property Updates</p>
                        </div>
                    </div>
                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <Notifications fetchData={fetchNoti} Data={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose} />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <RentUpdate fetchData={fetchNoti} Data={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose} />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <PropertyUpdate fetchData={fetchNoti} Data={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
