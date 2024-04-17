"use client";
import React, { useState } from "react";
import Image from "next/image";

const Bedrooms = ({getBedrooms, width}) => {
  const [dropdowns, setDropdowns] = useState({
    "Bedroom": false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    "Bedroom": null,
  });

  const options = {
    "Bedroom": [
      { id: 1, label: "1 Bedroom" },
      { id: 2, label: "2 Bedrooms" },
      { id: 3, label: "3 Bedrooms" },
      { id: 4, label: "4 Bedrooms" },
      { id: 5, label: "5 Bedrooms" },
      { id: 6, label: "6 Bedrooms" },
      { id: 7, label: "7+ Bedrooms" },    
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
    getBedrooms(option.label, "Bedroom")
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2 w-full">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`${width ? `${width} md:w-[131px]` : 'w-[117px] md:w-[135px] '}  h-[42px] md:h-[44px] bg-white text-[#A9A9A9]  adminCellBorders md:mb-1 md:pt-3 px-2 pt-2  rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => toggleDropdown(dropdown)}
          >
            <div className="flex text-[13px] md:text-[14px] font-[500] text-GrayHomz2 justify-between items-center">
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
            <div className="absolute text-[14px]  font-[500] max-h-[200px] overflow-y-auto text-BlackHomz mt-0 w-full bg-white rounded-md shadow-md mb-3 z-30">
              {options[dropdown].map((option) => (
                <label
                  key={option.id}
                  className="flex text-[13px] md:text-[14px] items-center justify-between pt-[2px] pl-2 cursor-pointer  rounded-md mb-3"
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

export default Bedrooms;
