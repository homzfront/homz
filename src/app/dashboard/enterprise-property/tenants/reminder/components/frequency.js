'use client';
import React, { useState } from "react";
import Image from "next/image";

const Frequency = ({setFrequency}) => {
  const [dropdowns, setDropdowns] = useState({
    "Select frequency": false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    "Select frequency": null,
  });

  const options = {
    "Select frequency": [
      { id: 1, label: "Daily" },
      { id: 2, label: "Weekly" },
      { id: 3, label: "Monthly" },
      { id: 4, label: "Quarterly" },
    ],
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdown]: !prevDropdowns[dropdown],
    }));
  };

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    toggleDropdown(dropdown);
    setFrequency(option.label);
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2 w-full">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`w-[335px] md:w-[236px] h-[45px] text-[#A9A9A9]  adminCellBorders  mb-1 px-2 py-3 rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => toggleDropdown(dropdown)}
          >
            <div className="flex text-[14px] font-[500] text-GrayHomz2 justify-between items-center">
              <span className="mr-2">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown].label
                  : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={`w-5 h-5 ${
                  dropdowns[dropdown]
                    ? "transform rotate-90 transition duration-300 ease-in-out"
                    : ""
                }`}
              >
                <Image
                  src={"/static/images/arrow-right.svg"}
                  height={16}
                  width={16}
                  alt=""
                />
              </div>
            </div>
          </div>

          {dropdowns[dropdown] && (
            <div className="absolute text-[14px] font-[500] text-BlackHomz  w-full bg-white rounded-md shadow-md">
              {options[dropdown].map((option) => (
                <div
                  key={option.id}
                  className="p-2 pl-4 cursor-pointer hover:bg-BlueHomz rounded-md hover:text-white"
                  onClick={() => handleOptionClick(option, dropdown)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Frequency;
