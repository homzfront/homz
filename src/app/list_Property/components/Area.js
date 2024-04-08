import React, { useState } from "react";
import Image from "next/image";

const Area = ({ getArea, width }) => {
  const [dropdowns, setDropdowns] = useState({
    Area: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    Area: null,
  });

  const Area = [
    "Ajah",
    "Lekki",
    "Ikotun",
    "Adolor",
    "Challenge",
    "Ekaite",
    "Musa",
    "Ikeja",
    "Oshodi",
    "Surulere",
    "Agege",
    "Yaba",
    "Victoria Island",
    "Lekki Phase One",
    "Badagry",
    "Jalingo",
  ];

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
    getArea(option, "Area");
  };

  return (
    <div className="flex gap-2 w-full">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`${
              width ? `${width} md:w-[102px]` : "w-[134px]"
            } h-[37px] text-[#A9A9A9] bg-white  adminCellBorders md:mb-1  px-2 pt-2   rounded cursor-pointer  ${
              dropdowns[dropdown] ? "border" : ""
            }`}
            onClick={() => toggleDropdown(dropdown)}
          >
            <div className="flex text-[11px] md:text-[14px] font-[500] text-GrayHomz2 justify-between items-center">
              <span className="mr-2">
                {selectedOptions[dropdown]
                  ? selectedOptions[dropdown]
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
            <div className="absolute text-[14px] max-h-[200px] overflow-y-auto font-[500] text-BlackHomz mt-0 w-full bg-white rounded-md shadow-md mb-3 z-30">
              {Area.map((option, index) => (
                <label
                  key={index}
                  className="flex text-[11px] md:text-[14px]  items-center justify-between pt-[2px] pl-2 cursor-pointer  rounded-md mb-3"
                  onClick={() => handleOptionClick(option, dropdown)}
                >
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Area;
