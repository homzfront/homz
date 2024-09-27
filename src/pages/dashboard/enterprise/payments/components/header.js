import React from "react";
import Image from "next/image";
import Dropdown from "../../components/dropDownFilter";

const Header = ({
  options,
  setSelectedDate,
  setSelectedProperty,
  selectedProperty,
  clear
}) => {
  return (
    <div>
      <div className="hidden md:flex justify-between items-center">
        <div className="text-[20px] font-[500]">Payment</div>
        <div className="flex gap-2 items-center">
          <p className="text-[16px] font-[400] pr-2">Filter by:</p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[160px]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null
                    ? "Property"
                    : selectedProperty
                }
                className="mr-2"
              />
            </div>
          </div>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 h-[42px] w-[130px] text-GrayHomz2 border-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
          />
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
          </button>
        </div>
      </div>
    </div>

  );
};

export default Header;
