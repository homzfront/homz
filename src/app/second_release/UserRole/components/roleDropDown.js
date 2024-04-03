"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const useDropdown = (initialState) => {
  const [dropdowns, setDropdowns] = useState(initialState);

  const handleToggleDropdown = (dropdown) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdown]: !prevDropdowns[dropdown],
    }));
  };

  const handleCloseDropdowns = () => {
    setDropdowns(initialState);
  };

  return { dropdowns, handleToggleDropdown, handleCloseDropdowns };
};

const DropDown = ({handleFilter}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    "User Role": null,
  });

  const options = {
    "User Role": [
      { id: 1, label: "Security" },
      { id: 2, label: "Customer Support" },
    ],
  };

  const { dropdowns, handleToggleDropdown, handleCloseDropdowns } = useDropdown(
    {
      "User Role": false,
    }
  );

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    handleToggleDropdown(dropdown);
    handleFilter(option.label);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-2">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative" ref={dropdownRef}>
          <div
            className={`text-BlackHomz h-[36px] px-3 adminCellBorders w-[318px] md:w-full p-1 rounded cursor-pointer  ${
              dropdowns[dropdown] ? "adminCellBorders" : ""
            }`}
            onClick={() => handleToggleDropdown(dropdown)}
          >
            <div className="flex text-[14px] h-full font-[500] text-GrayHomz2 justify-between items-center ">
              <span className="mr-3 w-full">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown].label
                  : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={`${
                  dropdowns[dropdown]
                    ? "transform rotate-180 transition duration-300 ease-in-out"
                    : ""
                }`}
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                />
              </div>
            </div>
          </div>

          {dropdowns[dropdown] && (
            <div className="absolute text-[14px] font-[500] text-GrayHomz2 mt-2 w-full bg-white rounded-md shadow-md">
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

export default DropDown;
