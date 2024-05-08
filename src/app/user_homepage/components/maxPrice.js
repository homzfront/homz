"use client";
import React, { useState } from "react";
import Image from "next/image";
import useClickOutside from "@/utils/clickOutside";
import lowerCaseData from "@/utils/lowerCaseData";

const Prices = ({ getPrice, className, selectOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));


  const options = [
    { id: 1, label: "100,000" },
    { id: 2, label: "200,000" },
    { id: 3, label: "400,000" },
    { id: 4, label: "600,000" },
    { id: 5, label: "1000000" },
    { id: 6, label: "5000000 +" },
  ];


  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    getPrice(lowerCaseData(option.label), "maxPrice");
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center justify-between">
          <span className={`mr-2 truncate text-GrayHomz2`}>{selectOption}</span>
          <div className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}>
            <Image src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png" height={16} width={16} alt="" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute z-20 top-14 w-full text-GrayHomz2 text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
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

export default Prices;
