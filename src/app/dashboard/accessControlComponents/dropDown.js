import React, { forwardRef, useImperativeHandle, useState } from "react";
import Image from "next/image";

const DropDown = forwardRef(({ setStatus }, ref) => {
  const [dropdowns, setDropdowns] = useState({
    property: false,
    "Access Status": false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    property: null,
    "Access Status": null,
  });

  const options = {
    property: [
      { id: 1, label: "Property" },
      { id: 2, label: "Property" },
      { id: 3, label: "Property" },
      { id: 4, label: "Property" },
    ],
    "Access Status": [
      { id: 2, label: "Pending" },
      { id: 3, label: "Signed Out" },
      { id: 4, label: "Signed In" },
    ],
  };

  const handleReset = () => {
    setSelectedOptions({
      property: null,
      "Access Status": null,
    });
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
  }));

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
    setStatus(option.label.toLowerCase());
  };

  return (
    <div className="flex gap-2">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`text-BlackHomz px-4 border flex items-center text-center mb-1 p-2 h-[33px] rounded cursor-pointer ${
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
                className={`w-5 h-5 flex items-center text-center ${
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
            <div className="absolute text-[14px] font-[500] z-50 text-GrayHomz2 mt-2 w-full bg-white rounded-md shadow-md">
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
});

export default DropDown;
