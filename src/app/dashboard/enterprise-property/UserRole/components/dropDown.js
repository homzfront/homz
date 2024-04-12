"use client";
import Image from "next/image";
import React, { useState } from "react";

const DropDown = () => {
  const [dropdowns, setDropdowns] = useState({
    State: false,
    Area: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    State: null,
    Area: null,
  });

  const options = {
    State: [
      { id: 1, label: "Abia" },
      { id: 2, label: "Adamawa" },
      { id: 3, label: "Akwa Ibom" },
      { id: 4, label: "Anambra" },
      { id: 5, label: "Bauchi" },
      { id: 6, label: "Bayelsa" },
      { id: 7, label: "Benue" },
      { id: 8, label: "Borno" },
      { id: 9, label: "Cross River" },
      { id: 10, label: "Delta" },
      { id: 11, label: "Ebonyi" },
      { id: 12, label: "Edo" },
      { id: 13, label: "Ekiti" },
      { id: 14, label: "Enugu" },
      { id: 15, label: "Gombe" },
      { id: 16, label: "Imo" },
      { id: 17, label: "Jigawa" },
      { id: 18, label: "Kaduna" },
      { id: 19, label: "Kano" },
      { id: 20, label: "Katsina" },
      { id: 21, label: "Kebbi" },
      { id: 22, label: "Kogi" },
      { id: 23, label: "Kwara" },
      { id: 24, label: "Lagos" },
      { id: 25, label: "Nasarawa" },
      { id: 26, label: "Niger" },
      { id: 27, label: "Ogun" },
      { id: 28, label: "Ondo" },
      { id: 29, label: "Osun" },
      { id: 30, label: "Oyo" },
      { id: 31, label: "Plateau" },
      { id: 32, label: "Rivers" },
      { id: 33, label: "Sokoto" },
      { id: 34, label: "Taraba" },
      { id: 35, label: "Yobe" },
      { id: 36, label: "Zamfara" },
      { id: 37, label: "FCT" },
    ],

    Area: [
      { id: 2, label: "Area 1" },
      { id: 3, label: "Area 2" },
      { id: 4, label: "Area 3" },
      { id: 4, label: "Area 4" },
      { id: 4, label: "Area 5" },
      { id: 4, label: "Area 6" },
    ],
  };

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    setDropdowns((prevDropdowns) => ({ ...prevDropdowns, [dropdown]: false }));
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`text-BlackHomz  adminCellBorders  mb-1 py-2 h-[33px] rounded cursor-pointer w-[102px] ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() =>
              setDropdowns((prevDropdowns) => ({
                ...prevDropdowns,
                [dropdown]: !prevDropdowns[dropdown],
              }))
            }
          >
            <div className="flex text-[12px] md:text-[14px] px-1 font-[500] text-GrayHomz2 justify-between  items-center w-[102px]">
              <span className="w-full">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown].label
                  : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={`w-5 h-5 ${
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
            <div className="absolute text-[14px] font-[500] text-GrayHomz2 mt-2 w-full bg-white rounded-md shadow-md z-50 max-h-[200px] overflow-y-auto">
              {options[dropdown].map((option) => (
                <div
                  key={option.id}
                  className="p-2 pl-4 cursor-pointer hover:bg-BlueHomz rounded-md hover:text-white w-full"
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
