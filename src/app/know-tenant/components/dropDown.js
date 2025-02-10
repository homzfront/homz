"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";

const Dropdown = ({ label, onSelect, options, register = () => ({}), className, width, emptyValue }) => {
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
        <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
            <label className="block text-GrayHomz text-sm font-medium mb-1">{label}</label>
            <div
                className={`${width} mt-2 text-BlackHomz px-4 border h-[45px] flex items-center rounded-[4px] cursor-pointer ${isOpen ? "border" : ""}`}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full justify-between items-center">
                    <div className={`font-[500] text-[14px] w-full ${selectedOption ? "text-BlackHomz" : "text-GrayHomz2"}`}>
                        {selectedOption ? selectedOption : emptyValue}
                    </div>
                    <div className={`${isOpen ? "transform rotate-180" : ""}`}>
                        <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="w-full absolute z-20 top-[74px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                            onClick={() => handleOptionClick(option.label ?? option)}
                        >
                            {option.label ?? option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
