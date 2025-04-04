"use client"
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";

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
  const filteredOptions = options?.filter((option) =>
    option?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border border-GrayHomz h-[42px] flex items-center rounded-[4px] cursor-pointer ${isOpen ? "border" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex w-full justify-between items-center text-BlackHomz">
          <input
            type="text"
            className="font-[500] text-[14px] w-full text-BlackHomz placeholder:text-BlackHomz outline-none focus:border-none"
            placeholder={selectedOption?.label === selectOption ? selectedOption?.label === selectOption : selectOption}
            value={selectedOption?.label === selectOption ? selectOption : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isOpen ?
            <ArrowUpII className="#4e4e4e" /> :
            <ArrowDown className="#4e4e4e" />
          }
        </div>

      </div>

      {isOpen && (
        <div className="w-full absolute z-20 top-14 font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
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
