import Image from "next/image";
import React from "react";
import Dropdown from "../components/dropDown";

const Filter = () => {
    const options = [
        {
            id: 1,
            label: "Read"
        },
        {
            id: 2,
            label: "Unread"
        }
    ]
  return (
    <div className="flex justify-between items-center w-[460px] px-4 ">
      <p className="text-[14px] font-[400]">Filter by:</p>
      <input type="date" className="border h-[37px] w-[128px] p-2" />
    <div>
    <Dropdown options={options} className={"w-[128px]"} selectOption={"Read/Unre.."}/>
    </div>
      <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[37px] w-[92px] mb-1 p-1 rounded cursor-pointer">
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
