"use client"
import React, { useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowDownWhite from "@/components/icons/arrowDownWhite";
import Export from "@/components/icons/export";

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
                className={`${width} text-walletBg px-4 md:bg-BlueHomz h-[42px] flex items-center rounded-[4px] cursor-pointer`}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full">
                    <div className="flex w-full gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            <div
                                className={`hidden md:block`}>
                                <Export />
                            </div>
                            <div
                                className={`md:hidden`}>
                                <Export className="#006AFF" />
                            </div>
                            <div className={`hidden md:block font-[500] text-[14px] w-full truncate`}>
                                {placeholder}
                            </div>
                        </div>
                        <div
                            className={`hidden md:block  ${isOpen ? "transform rotate-180" : ""}`}>
                            <ArrowDownWhite />
                        </div>
                    </div>
                </div>
            </div >
            {
                isOpen && (
                    <div className={`absolute z-20 w-[140px] md:w-full right-[13px] md:right-0 md:top-[50px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container ${width}`}>
                        {filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="py-2 px-4 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default DropDownBlue;
