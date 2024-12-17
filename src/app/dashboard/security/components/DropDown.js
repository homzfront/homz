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

const DropDown = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    "Profile Type": null,
    "User Role": null,
    "Status": null,
  });

  const options = {
    "Profile Type": [
      { id: 1, label: "Profile 1" },
      { id: 2, label: "Profile 2" },
      { id: 3, label: "Profile 3" },
      { id: 4, label: "Profile 4" },
    ],
    "User Role": [
      { id: 1, label: "user role 1" },
      { id: 2, label: "user role 2" },
      { id: 3, label: "user role 3" },
      { id: 4, label: "user role 4" },
    ],
    "Status": [
      { id: 1, label: "Status" },
      { id: 2, label: "Status" },
      { id: 3, label: "Status" },
      { id: 4, label: "Status" },
    ],
  };

  const { dropdowns, handleToggleDropdown, handleCloseDropdowns } = useDropdown(
    {
      "Profile Type": false,
      "User Role": false,
      "Status": false,
    }
  );

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    handleToggleDropdown(dropdown);
    // Do something with the selected option, e.g., trigger an action or update state
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
      <p className="text-[16px] font-[400] text-BlackHomz pt-1">Filter by:</p>

      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative" ref={dropdownRef}>
          <div
            className={`text-BlackHomz px-4 border mb-1 p-1 rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => handleToggleDropdown(dropdown)}
          >
            <div className="flex text-[14px] font-[500] text-GrayHomz2 justify-between items-center">
              <span className="mr-2">
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
