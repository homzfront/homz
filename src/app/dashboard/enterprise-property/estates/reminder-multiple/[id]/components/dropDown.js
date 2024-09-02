"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";

const Dropdown = ({ options, onSelect, className, label, width }) => {
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

  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase()
  );

  return (
    <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
      <div
        className={`${width} mt-2 text-BlackHomz px-4 border h-[45px] flex items-center rounded-[4px] cursor-pointer ${isOpen ? "border" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex w-full justify-between items-center">
          <div className={`font-[500] text-[14px] w-full ${selectedOption ? "text-BlackHomz" : "text-GrayHomz2"}`}>
            {selectedOption ? selectedOption : "Insert tag"}
          </div>
          <div className={` ${isOpen ? "transform rotate-180" : ""}`}>
            <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full absolute z-20 top-[74px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
