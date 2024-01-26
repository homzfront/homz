"use client"
import Image from "next/image";
import React, { useState } from "react";

const DropDown = () => {
  const [dropdowns, setDropdowns] = useState({
    property: false,
    home: false,
    status: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    property: null,
    home: null,
    status: null,
  });

  const options = {
    property: [
      { id: 1, label: "Property" },
      { id: 2, label: "Property" },
      { id: 3, label: "Property" },
      { id: 4, label: "Property" },
    ],
    home: [
      { id: 1, label: "Home" },
      { id: 2, label: "Home" },
      { id: 3, label: "Home" },
      { id: 4, label: "Home" },
    ],
    status: [
      { id: 1, label: "Status" },
      { id: 2, label: "Status" },
      { id: 3, label: "Status" },
      { id: 4, label: "Status" },
    ],
  };

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [dropdown]: option }));
    setDropdowns((prevDropdowns) => ({ ...prevDropdowns, [dropdown]: false }));
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`text-BlackHomz px-4 border w-[120px] mb-1 p-2 h-10 rounded cursor-pointer  ${
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
            <div className="absolute text-[14px] font-[500] text-GrayHomz2  mt-2 w-[120px] bg-white rounded-md shadow-md">
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
