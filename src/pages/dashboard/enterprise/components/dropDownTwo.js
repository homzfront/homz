"use client"
import React, { useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";

const Dropdown = ({ value, options, onSelect, selectOption, className, border }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useClickOutside(() => setIsOpen(false)); // Use the custom hook

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border h-[45px] p-3 rounded-[4px] cursor-pointer ${border}`}
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center justify-between">
          <span className={`mr-2 ${(selectedOption?.label || selectedOption) || value ? "text-BlackHomz" : "text-GrayHomz2"}`}>{(selectedOption?.label ? selectedOption.label : selectedOption ? selectedOption : value ? value : selectOption)}</span>
          <div className={`w-5 h-5`}>
            {isOpen ?
              <ArrowUpII className="#4E4E4E" /> :
              <ArrowDown className="#4E4E4E" />
            }
          </div>
        </div>
      </div>

      {isOpen && (
        <div className=" absolute z-20 top-14 w-full text-GrayHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
          {options.map((option, index) => (
            <div
              key={index}
              className=" p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
              onClick={() => handleOptionClick(option)}
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
