"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";
import ArrowRightSmall from "@/components/icons/arrowRightSmall";

const DropDownReminder = ({ options, onSelect, selectOption, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useClickOutside(() => setIsOpen(false)); 


    const handleDropdownToggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <div
                className={`text-BlackHomz px-4 border-BlueHomz border h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border  z-[-3px]" : ""
                    }`}
                onClick={handleDropdownToggle}

            >
                <div className="flex items-center justify-between">
                    <span className="mr-2">{selectedOption?.label || selectOption}</span>
                    <div className={`w-5 h-5 ${isOpen ? "transform rotate-90" : ""}`}>
                        <ArrowRightSmall />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="p-2 z-10 absolute top-14 w-full text-GrayHomz2 text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDownReminder;
