"use client";
import React, { useState } from "react";
import Image from "next/image";

const Channels = ({setReminderChannel}) => {
  const [dropdowns, setDropdowns] = useState({
    "Select channel(s)": false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    "Select channel(s)": null,
  });

  const options = {
    "Select channel(s)": [
      { id: 1, label: "All" },
      { id: 2, label: "Dashboard" },
      { id: 3, label: "Email" },
      { id: 4, label: "SMS" },
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
    setReminderChannel(option.label)
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2 w-full">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`w-[335px] md:w-[236px] h-[45px] text-[#A9A9A9]  adminCellBorders mb-1 pt-3 px-2 rounded cursor-pointer  ${
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
            <div className="absolute text-[14px]  font-[500] text-BlackHomz mt-2 w-full bg-white rounded-md shadow-md mb-3 z-30">
              {options[dropdown].map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between p-2 pl-4 cursor-pointer  rounded-md mb-3"
                  onClick={() => handleOptionClick(option, dropdown)}
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name={dropdown}
                    value={option.label}
                    className="mr-2"
                    style={{
                      border: "2px solid #3182ce",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                    }}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Channels;
