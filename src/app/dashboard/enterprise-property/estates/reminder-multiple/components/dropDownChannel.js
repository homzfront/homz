"use client"
import React, { useEffect, useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowRightSmall from "@/components/icons/arrowRightSmall";

const DropDownChannel = ({ options, onSelect, selectOption, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    if (options.length > 0) {
      const firstOption = options[0];
      setSelectedOptions([firstOption]);
      onSelect(["In-App", "Email", "SMS"]);
    }
  }, []);

  const handleOptionClick = (option) => {
    if (option.label === "All") {
      setSelectedOptions([option]);
      onSelect(["In-App", "Email", "SMS"]);
    } else {
      setSelectedOptions((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (selectedOption) => selectedOption.id === option.id
        );

        if (isAlreadySelected) {
          return prevSelected.filter((selectedOption) => selectedOption.id !== option.id);
        } else {
          return prevSelected.filter((selectedOption) => selectedOption.label !== "All").concat(option);
        }
      });

      const newSelected = selectedOptions.filter((selectedOption) => selectedOption.label !== "All").concat(option);
      onSelect(newSelected.map((opt) => opt.label));
    }
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border-GrayHomz border h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border z-[-3px]" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">
            {selectedOptions.length > 0
              ? selectedOptions.map((opt) => opt.label).join(", ")
              : selectOption}
          </span>
          <div className={`w-5 h-5 ${isOpen ? "transform rotate-90" : ""}`}>
            <ArrowRightSmall />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-2 z-10 absolute top-14 w-full text-GrayHomz2 text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md flex justify-between items-center"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
              <input
                type="checkbox"
                name="channelOptions"
                checked={selectedOptions.some((selectedOption) => selectedOption.id === option.id)}
                readOnly
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownChannel;
