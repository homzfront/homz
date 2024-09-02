import Image from "next/image";
import React from "react";
import Dropdown from "../../components/dropDownFilter";


const Filter = ({
  options,
  selectedStatus,
  setSelectedStatus,
  setSelectedDate,
  clear
}) => {

  return (
    <div className="flex flex-wrap gap-2 md:gap-0 md:justify-between items-center w-[460px] md:px-4 ">
      <p className="hidden md:block text-[14px] font-[400]">Filter by:</p>
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border px-4 h-[42px] w-[25%] md:w-[130px] text-GrayHomz2 p-2 rounded cursor-pointer"
      />
      <div>
        <div className="w-full md:w-[140px]">
          <Dropdown
            options={options}
            onSelect={(option) => setSelectedStatus(option)}
            selectOption={
              selectedStatus === null ? "Status" : selectedStatus
            }
            className="mr-2"
          />
        </div>
      </div>
      <button
        onClick={clear}
        type="text"
        className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] w-[20%] md:w-[92px] p-1 rounded cursor-pointer">
        <span>
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
            alt=""
            height={17}
            width={16}
          />
        </span>
        Reset
      </button>
    </div>
  );
};

export default Filter;
