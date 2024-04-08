"use client"
import React, { useState } from "react";
import Image from "next/image";

const Dropdown = ({ options, onSelect, selectOption, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`text-BlackHomz px-4 border h-[45px] p-3 rounded-md cursor-pointer ${
          isOpen ? "border z-[-3px]" : ""
        }`}
        onClick={handleDropdownToggle}
     
      >
        <div className="flex items-center justify-between">
          <span className="mr-2 text-[14px] text-GrayHomz">{selectedOption?.label || selectOption }</span>
          <div className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}>
            <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 block top-14 w-full text-GrayHomz text-[14px] bg-white rounded-md shadow-md">
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-2 cursor-pointer hover:text-BlueHomz hover:bg-blue-100 m-2 rounded-md ${option.label === "Remove" ? "text-error hover:text-error hover:bg-blue-100" : ""}`}
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

export default Dropdown;
