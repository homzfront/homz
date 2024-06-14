import React, { useState } from "react";
import Image from "next/image";

const Bedrooms = ({ getBedrooms, width }) => {
  const [dropdowns, setDropdowns] = useState({
    Bedroom: false,
  });

  const [selectedOptions, setSelectedOptions] = useState({
    Bedroom: null,
  });

  const Bedrooms = [
    "1 Bedroom",
    "2 Bedrooms",
    "3 Bedrooms",
    "4 Bedrooms",
    "5 Bedrooms",
    "6 Bedrooms",
    "7+ Bedrooms",
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
    getBedrooms(`${option.split("")[0]}`, "Bedroom");
    // Do something with the selected option, e.g., trigger an action or update state
  };

  return (
    <div className="flex gap-2 w-full">
      {Object.keys(dropdowns).map((dropdown) => (
        <div key={dropdown} className="relative">
          <div
            className={`${
              width ? `${width} md:w-[131px]` : "w-[117px] md:w-[133px]"
            }  h-[37px] bg-white text-[#A9A9A9]  border md:mb-1 px-2 pt-2  rounded cursor-pointer  ${
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
            <div className="absolute text-[14px]  font-[500] max-h-[200px] overflow-y-auto text-BlackHomz mt-0 w-full bg-white rounded-md shadow-md mb-3 z-30">
              {Bedrooms.map((option, index) => (
                <label
                  key={index}
                  className="flex text-[11px] md:text-[14px] items-center justify-between pt-[2px] pl-2 cursor-pointer  rounded-md mb-3"
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

export default Bedrooms;
