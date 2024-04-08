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

  const handleCloseDropdowns = (opt) => {
    setDropdowns(initialState);
  };

  return { dropdowns, handleToggleDropdown, handleCloseDropdowns };
};

const DropDown = ({hide, width, height, edit}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    "State": null,
    "Area": null,
  });

  const options = {
    Area: [
      { id: 1, label: "Lagos" },
      { id: 2, label: "Ogun" },
      { id: 3, label: "Oyo" },
      { id: 4, label: "Abuja" },
    ],
    State: [
      { id: 1, label: "Area " },
      { id: 2, label: "Area 2" },
      { id: 3, label: "Area 3" },
      { id: 4, label: "Area 4" },
    ],
 
  };

  const { dropdowns, handleToggleDropdown, handleCloseDropdowns } = useDropdown(
    {
      "State": false,
      "Area": false,

    }
  );
    
  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    handleToggleDropdown(dropdown);
  //  console.log()
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
    <div className={`${height && 'gap-4'} flex gap-2`}>
      <p className={`${hide && 'hidden'} text-[16px] font-[400] text-BlackHomz pt-1`}>Filter by:</p>

      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative" ref={dropdownRef}>
          <div
            className={`text-BlackHomz  mb-1 ${height ? 'p-0' : "p-1 px-4"}  rounded cursor-pointer ${!edit ? "bg-[#E6E6E6]" : "bg-white proBorders"} border-[#A9A9A9] ${width && width} ${height && height} ${
              dropdowns[dropdown] ? "proBorders" : ""
            }`}
            onClick={() => handleToggleDropdown(dropdown)}
            style={{ pointerEvents: edit ? "auto" : "none" }}
          >
            <div className={`flex text-[14px] font-[500] ${height && 'p-2'} text-GrayHomz2 justify-between items-center ${width && width} ${height && height} ${!edit && "bg-[#E6E6E6]"}`}>
              <span className="mr-2">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown].label
                  : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={` pr-2 ${
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
            <div className={`absolute text-[14px] font-[500] text-GrayHomz2 mt-2  ${width? width : 'w-full'}  bg-white rounded-md shadow-md `}>
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
