import React from "react";
import Image from "next/image";
import Dropdown from "../../components/dropDownFilter";

const Header = ({
  options,
  setFromDate,
  setToDate,
  toDate,
  fromDate,
  setSelectedProperty,
  selectedProperty,
  clear
}) => {
  return (
    <div>
      <div className="hidden md:flex justify-between items-center">
        <div className="text-[20px] font-[500]">Payment Record</div>
        {/* <div className="flex gap-4 items-center">
          <p className="text-[16px] font-[400] pr-2">Filter by:</p>
          <div className="flex items-center gap-2">
            <div className="w-[160px]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null
                    ? "Property"
                    : selectedProperty
                }
                className="mr-2 text-BlackHomz"
              />
            </div>
          </div> */}
          {/* <div className="flex w-full md:w-[320px] justify-between md:justify-normal md:gap-4">
            <div className="h-[45px] flex flex-col  px-2 rounded-md border-BlackHomz border shadow-sm">
              <label
                htmlFor="fromDate"
                className="block text-sm font-medium text-BlackHomz"
              >
                From:
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
                className="block outline-none w-[87%] md:w-full focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="h-[45px] flex flex-col  px-2 rounded-md border-BlackHomz border shadow-sm">
            <label
                htmlFor="toDate"
                className="block text-sm font-medium text-BlackHomz"
              >
                To:
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
                className="block w-[87%] md:w-full outline-none  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={clear}
            type="text"
            className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] w-[92px] mb-1 p-1 rounded cursor-pointer"
          >   <span>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button> */}
        {/* </div> */}
      </div>
    </div>

  );
};

export default Header;
