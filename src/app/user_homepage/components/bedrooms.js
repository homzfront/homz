"use client";
import React, { useState } from "react";
import Image from "next/image";
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
    { id: 6, label: "6 Bedrooms" },
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
