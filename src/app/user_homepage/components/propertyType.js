"use client";
import React, { useState } from "react";
import Image from "next/image";
import lowerCaseData from "@/utils/lowerCaseData";
import useClickOutside from "@/utils/clickOutside";
import ArrowDown from "@/components/icons/arrowDown";

const PropertyType = ({ getPropertyType, className, selectOption, classNameII, classNameIII, classNameIV, arrowColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  const options = [
    { id: 1, label: "Boys Quarters" },
    { id: 2, label: "Mini-flat" },
    { id: 3, label: "Penthouse" },
    { id: 4, label: "Self contain" },
    { id: 5, label: "Studio Apartment" },
    { id: 6, label: "Block of flats" },
    { id: 7, label: "Detached Bungalow" },
    { id: 8, label: "Semi-Detached Bungalow" },
    { id: 9, label: "Terraced Bungalow" },
    { id: 10, label: "Detached Duplex" },
    { id: 11, label: "Semi-Detached Duplex" },
    { id: 12, label: "Terraced Duplex" },
  ];

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    getPropertyType(lowerCaseData(option.label), "propertyType")
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`px-4 border ${classNameII} h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border" : ""
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

export default PropertyType;
