"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";
import ArrowDownWhite from "@/components/icons/arrowDownWhite";
import Export from "@/components/icons/export";
import ExportSmall from "@/components/icons/exportSmall";

const DropDownBlue = ({ options, onSelect, className, width, placeholder = "Export as" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));
    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const filteredOptions = options?.filter((option) =>
        option?.toLowerCase()
    );

    return (
        <div className={`relative inline-block w-auto ${className}`} ref={dropdownRef}>
            <div
                className={`${width} text-walletBg px-4 h-[42px] flex items-center rounded-[4px] cursor-pointer`}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full">
                    <div className="flex w-full gap-4 items-center">
                        <div
                            className={``}>
                            <Export className="#006AFF" />
                        </div>
                    </div>
                </div>
            </div >
            {
                isOpen && (
                    <div className={`absolute border z-20 w-[180px] right-[15px] top-[40px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container ${width}`}>
                        <div className="px-2">
                            <div className="pt-2 flex items-center gap-1">
                                <ExportSmall /> <span className="text-[11px] font-[400] text-GrayHomz">Export as</span>
                            </div>
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="py-2 px-4 cursor-pointer bg-[#FCFCFC] hover:text-white hover:bg-BlueHomz my-2 rounded-[2px]"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default DropDownBlue;
