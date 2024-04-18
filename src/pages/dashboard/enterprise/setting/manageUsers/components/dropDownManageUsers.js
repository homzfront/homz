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
    <div className={`relative inline-block ${className} w-[390px]` } >
      <div
        className={`text-GrayHomz2 text-[14px] px-4 border mt-2  h-[45px] p-2 rounded-md cursor-pointer ${
          isOpen ? "border z-[-3px]" : ""
        }`}
        onClick={handleDropdownToggle}
     
      >
        <div className="flex items-center justify-between p-[2px]">
          <span className="mr-2">{selectedOption || selectOption }</span>
          <div className={`w-5 h-5 p-1 ${isOpen ? "transform rotate-180" : ""}`}>
            <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute   top-14 w-full text-GrayHomz2 text-[14px] bg-white rounded-md shadow-md">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
              onClick={() => handleOptionClick(option?.name)}
            >
              {option.name} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
