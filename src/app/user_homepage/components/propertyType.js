"use client";
import React, { useState } from "react";
import Image from "next/image";

const PropertyType = ({getPropertyType, width}) => {
  const [dropdowns, setDropdowns] = useState({
    "Property Type": false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    "Property Type": null,
  });

  const options = {
    "Property Type": [
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
    getPropertyType(option.label, "PropertyType")
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2 ">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={` ${width ? `${width} md:w-[139px]` : 'w-[176px]'} md:min-w-[208px] h-[37px] md:h-[44px] bg-white text-[#A9A9A9]  adminCellBorders md:mb-1 md:pt-3 px-2 pt-2 rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => toggleDropdown(dropdown)}
          >
            <div className="flex text-[11px] md:text-[14px] font-[500] text-GrayHomz2 justify-between items-center">
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
            <div className="absolute text-[14px] max-h-[200px] overflow-y-auto font-[500] text-BlackHomz mt-0 w-full bg-white rounded-md shadow-md mb-3 z-30">
              {options[dropdown].map((option) => (
                <label
                  key={option.id}
                  className="flex text-[11px] md:text-[14px] items-center justify-between pt-[2px] pl-2 cursor-pointer  rounded-md mb-3"
                  onClick={() => handleOptionClick(option, dropdown)}
                >
                  <span>{option.label}</span>
                 
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyType;
