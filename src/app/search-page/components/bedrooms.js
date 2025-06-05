"use client";
import React, { useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import extractNumbers from "@/utils/extractNumbers";
import ArrowDown from "@/components/icons/arrowDown";

const Bedrooms = ({ getBedrooms, className, selectOption, classNameII, classNameIII, classNameIV, arrowColor }) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  const options = [
    { id: 1, label: "1 Bedroom" },
    { id: 2, label: "2 Bedrooms" },
    { id: 3, label: "3 Bedrooms" },
    { id: 4, label: "4 Bedrooms" },
    { id: 5, label: "5 Bedrooms" },
    { id: 7, label: "7 Bedrooms" },
    { id: 8, label: "8 Bedrooms" },
    { id: 9, label: "9 Bedrooms" },
    { id: 10, label: "10 Bedrooms" },
    { id: 11, label: "11 Bedrooms" },
    { id: 12, label: "12 Bedrooms" },
    { id: 13, label: "13 Bedrooms" },
    { id: 14, label: "14 Bedrooms" },
    { id: 15, label: "15 Bedrooms" },
    { id: 16, label: "16 Bedrooms" },
    { id: 17, label: "17 Bedrooms" },
    { id: 18, label: "18 Bedrooms" },
    { id: 19, label: "19 Bedrooms" },
    { id: 20, label: "20 Bedrooms" },
  ];

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    getBedrooms(extractNumbers(option.label), "numberOfBathrooms")
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`text-GrayHomz px-4 border  ${classNameII} h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center justify-between">
          <span className={`mr-2 truncate text-[14px] ${classNameIII}`}>{selectOption}</span>
          <div className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}>
          <ArrowDown className={arrowColor}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`absolute z-20 top-14 w-full ${classNameIV} text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container`}>
          {options.map((option) => (
            <div
              key={option.id}
              className=" p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
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


export default Bedrooms;
