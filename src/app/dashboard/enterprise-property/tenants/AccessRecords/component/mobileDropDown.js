"use client"
import Image from "next/image";
import React, { useState } from "react";

const DropDown = () => {
  const [dropdowns, setDropdowns] = useState({
    "Access Status": false,
    property: false 
  
  });

  const [selectedOptions, setSelectedOptions] = useState({
    "Access Status": null,
    property: null
    
  });

  const options = {
    "Access Status": [
      { id: 2, label: "Pending" },
      { id: 3, label: "Signed Out" },
      { id: 4, label: "Signed In" },
      
    ],
    property: [
      { id: 1, label: "Property" },
      { id: 2, label: "Property" },
      { id: 3, label: "Property" },
      { id: 4, label: "Property" },
    ],

  };

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [dropdown]: option }));
    setDropdowns((prevDropdowns) => ({ ...prevDropdowns, [dropdown]: false }));
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex flex-col gap-[16px] w-[318px] h-[88px]">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`text-BlackHomz px-4 adminCellBorders  mb-1 p-2 h-[36px] rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => setDropdowns((prevDropdowns) => ({ ...prevDropdowns, [dropdown]: !prevDropdowns[dropdown] }))}
          >
            <div className="flex text-[14px] font-[500] text-GrayHomz2 justify-between  items-center">
              <span className="mr-2">
                {selectedOptions[dropdown] ? selectedOptions[dropdown].label : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={`w-5 h-5 ${
                  dropdowns[dropdown]
                    ? "transform rotate-180 transition duration-300 ease-in-out"
                    : ""
                }`}
              >
                <Image src={"/static/dashboard/enterprisemanager/dashboard/arrow-down.png"} height={16} width={16} alt=""/>
              </div>
            </div>
          </div>

          {dropdowns[dropdown] && (
            <div className="absolute text-[14px] font-[500] text-GrayHomz2  mt-2 w-full bg-white rounded-md shadow-md z-50">
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
