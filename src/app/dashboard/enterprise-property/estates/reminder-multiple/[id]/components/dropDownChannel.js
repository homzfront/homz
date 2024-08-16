"use client"
import React, { useEffect, useState } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowRightSmall from "@/components/icons/arrowRightSmall";

const DropDownChannel = ({ options, onSelect, selectOption, className, channelSettings, setBackendData, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useClickOutside(() => setIsOpen(false));


  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  
  useEffect(() => {
    if (options.length > 0 && channelSettings?.channels) {
      const { channels } = channelSettings;
      const newSelectedOptions = [];
      if (
        (channels.all && channels.email && channels.sms && channels.inApp) ||
        (channels.all && !channels.email && !channels.sms && !channels.inApp)
      ) {
        newSelectedOptions.push(options[0]); // "All"
        onSelect(["In-App", "Email", "SMS"]);
      } else if (
        (channels.all && channels.email && !channels.sms && !channels.inApp) ||
        (!channels.all && channels.email && !channels.sms && !channels.inApp)) {
        newSelectedOptions.push(options[2]); // "Email"
        onSelect(["Email"]);
      } else if (
        (channels.all && !channels.email && channels.sms && !channels.inApp) ||
        (!channels.all && !channels.email && channels.sms && !channels.inApp)) {
        newSelectedOptions.push(options[3]); // "SMS"
        onSelect(["SMS"]);
      } else if (
        (channels.all && !channels.email && !channels.sms && channels.inApp) ||
        (!channels.all && !channels.email && !channels.sms && channels.inApp)) {
        newSelectedOptions.push(options[1]); // "In-App"
        onSelect(["In-App"]);
      } else if (
        (channels.all && !channels.email && channels.sms && channels.inApp) ||
        (!channels.all && !channels.email && channels.sms && channels.inApp)) {
        newSelectedOptions.push(options[1], options[3]); // "In-App" and "SMS"
        onSelect(["In-App", "SMS"]);
      } else if (
        (channels.all && channels.email && !channels.sms && channels.inApp) ||
        (!channels.all && channels.email && !channels.sms && channels.inApp)) {
        newSelectedOptions.push(options[1], options[2]); // "In-App" and "Email"
        onSelect(["In-App", "Email"]);
      } else if (
        (channels.all && channels.email && channels.sms && !channels.inApp) ||
        (!channels.all && channels.email && channels.sms && !channels.inApp)) {
        newSelectedOptions.push(options[2], options[3]); // "Email" and "SMS"
        onSelect(["Email", "SMS"]);
      }
      setSelectedOptions(newSelectedOptions);
    }
  }, [channelSettings]);


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


  useEffect(() => {
    const generateChannelsObject = (selectedOptions) => {
      let channels = {
        all: false,
        email: false,
        sms: false,
        inApp: false,
      };
      if (selectedOptions) {
        if (selectedOptions?.some(option => option.label === "All")) {
          // If "All" is selected, set "all" to true and others to false
          channels.all = true;
        } else {
          // Set "all" to true only if all other options are selected
          channels.all = true;
          selectedOptions.forEach(option => {
            if (option.label === "Email") {
              channels.email = true;
            } else if (option.label === "SMS") {
              channels.sms = true;
            } else if (option.label === "In-App") {
              channels.inApp = true;
            }
          });
          channels.all = selectedOptions.length === 3; // Set "all" to true if all specific channels are selected
        }
        return channels;
      }
    };
    generateChannelsObject(selectedOptions);
    setData(selectedOptions)
    setBackendData({ channels: generateChannelsObject(selectedOptions) });
    console.log(generateChannelsObject(selectedOptions));
  }, [selectedOptions]);


  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div
        className={`text-BlackHomz px-4 border-GrayHomz border h-[45px] p-3 rounded-md cursor-pointer ${isOpen ? "border z-[-3px]" : ""
          }`}
        onClick={handleDropdownToggle}
      >
        <div className="flex items-center justify-between">
          <span className="mr-2">
            {selectedOptions && selectedOptions?.length > 0
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
                checked={selectedOptions?.some((selectedOption) => selectedOption.id === option.id)}
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
