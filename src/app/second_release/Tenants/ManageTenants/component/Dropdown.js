"use client";
import Image from "next/image";
import React, { useState } from "react";

const DropDown = ({setSearch, setStatus}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    Property: null,
    Status: null,
  });
  const [dropdowns, setDropdowns] = useState({
    Property: false,
    Status: false,
  });

  const options = {
    Property: [
      { id: 1, label: "Sunrise Property" },
      { id: 2, label: "KLL Property" },
      { id: 3, label: "Jalala Property" },
      { id: 4, label: "GateWay" },
      { id: 5, label: "Ephrathat" },
      { id: 6, label: "BandLand" },
      { id: 7, label: "Fenczoo" },
      { id: 8, label: "Shurews" },
      { id: 9, label: "Greenland" },
    ],

    Status: [
      { id: 1, label: "Pending" },
      { id: 3, label: "Paid" },
      { id: 2, label: "Over Due" },
    ],
  };

  const handleOptionClick = (option, dropdown) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
    if (option.label === "Pending" || option.label === "Paid" || option.label === "Over due") 
    setStatus(option.label)
    
    setSearch(option.label);

    setDropdowns((prevDropdowns) => ({ ...prevDropdowns, [dropdown]: false }));
    // Do something with the selected option, e.g., trigger an action or update state
  };
  // const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       handleCloseDropdowns();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="flex gap-2">
      <p className="text-[16px] font-[400] text-BlackHomz pt-1">Filter by:</p>

      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`text-BlackHomz px-2 adminCellBorders flex items-center justify-between  h-[37px] rounded cursor-pointer min-w-[128px] ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() =>
              setDropdowns((prevDropdowns) => ({
                ...prevDropdowns,
                [dropdown]: !prevDropdowns[dropdown],
              }))
            }
          >
            <div className="flex items-center text-[12px] md:text-[14px] font-[500] text-GrayHomz2 justify-between w-full">
              <span className=" mr-2">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown].label
                  : dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
              </span>
              <div
                className={` ${
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
                  className="p-2  cursor-pointer hover:bg-BlueHomz rounded-md hover:text-white w-full"
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
