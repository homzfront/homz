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

const DropDown = ({openModal}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    "Select property you want Landlord to view": null,
   
  });

  const options = {
    "Select property you want Landlord to view": [
      { id: 1, label: "Property 1" },
      { id: 2, label: "Property 2" },
      { id: 3, label: "Property 3" },
      { id: 4, label: "Property 4" },
      { id: 5, label: "Property 5" },
      { id: 6, label: "Property 6" },
    ],
 
  
  };

  const { dropdowns, handleToggleDropdown, handleCloseDropdowns } = useDropdown(
    {
      "Select property you want Landlord to view": false
    }
  );

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    handleToggleDropdown(dropdown);
    openModal()
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
     

      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative" ref={dropdownRef}>
          <div
            className={`text-BlackHomz w-[348px] h-[44px] px-4 adminCellBorders mb-1 p-1 rounded cursor-pointer  ${
              dropdowns[dropdown] ? "adminCellBorders" : ""
            }`}
            onClick={() => handleToggleDropdown(dropdown)}
          >
         

            <div className="flex text-[14px] h-full font-[500] text-GrayHomz2 justify-between items-center ">
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
