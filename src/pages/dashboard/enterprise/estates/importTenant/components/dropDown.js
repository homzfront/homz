"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";
import ArrowDown from "@/components/icons/arrowDown";
import ArrowUp from "@/components/icons/arrowUp";

const DropDown = ({ fileheader, options, onSelect, className, label, width }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect({ [fileheader]: option });
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
            <div
                className={`${width} mt-2 text-BlackHomz px-4 border h-[45px] flex items-center rounded-[4px] cursor-pointer ${selectedOption ? "border-BlackHomz" : "border-GrayHomz2"
                    }`}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full justify-between items-center">
                    <div className={`font-[500] text-[14px] w-full ${selectedOption ? "text-BlackHomz" : "text-GrayHomz2"}`}>
                        {selectedOption ? selectedOption : "Select attribute"}
                    </div>
                    <div className={``}>
                        {
                            isOpen && selectedOption ? <ArrowUp className="#202020" /> :
                                selectedOption ? <ArrowDown className="#202020" /> :
                                    isOpen ?
                                        <ArrowUp className="#a9a9a9" /> :
                                        <ArrowDown className="#a9a9a9" />
                        }
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="w-full absolute z-[999999] top-[74px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
                    {options.map((data) => (
                        <div
                            key={data.id}
                            className={`p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md ${data?.option === "Do not import" ? "bg-[#FDF2F2] text-[#D92D20]" : ""}`}
                            onClick={() => handleOptionClick(data.option)}
                        >
                            {data.option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
