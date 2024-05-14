"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";

const Dropdown = ({ options, onSelect, selectOption, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState(selectedOption?.label || ""); // State to hold search term
  const dropdownRef = useClickOutside(() => setIsOpen(false)); // Use the custom hook

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  // Filter options based on search term
// Filter options based on search term
const filteredOptions = options?.filter((option) =>
  typeof option === 'string' &&
  typeof searchTerm === 'string' &&
  option.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border h-[42px] p-2 rounded-md cursor-pointer ${isOpen ? "border" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex w-full justify-between items-center">
          <input
            type="text"
            className="w-full text-GrayHomz2 outline-none focus:border-none"
            placeholder={selectedOption?.label === selectOption ? selectedOption?.label === selectOption : selectOption}
            value={selectedOption?.label === selectOption ? selectOption : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={` ${isOpen ? "transform rotate-180" : ""}`}>
            <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
          </div>
        </div>

      </div>

      {isOpen && (
        <div className="w-full absolute z-20 top-14 text-GrayHomz2 text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
          {/* Display filtered options */}
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
