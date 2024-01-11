import React from "react";
import Dropdown from "../../../components/dropDownTwo";
import Image from "next/image";
import Widget from "../widget/widget";

const Request = () => {
    const options = [
        {
          id: 1,
          label: "Pending",
        },
        {
          id: 2,
          label: "In-progress",
        },
        {
          id: 3,
          label: "Resolved",
        },
      ];
    
  return (
    <div>
      <div className="p-9 flex items-center justify-between w-full border-b">
        <p className="text-[20px] font-[500] text-BlackHomz">
          Maintenance Request
        </p>
        <div className="flex items-center justify-center gap-2 ">
          <p className="text-[16px] font-[400] text-BlackHomz">Filter by:</p>
          <Dropdown options={options} selectOption={"Status"} />
          <input
            type="date"
            className="border text-GrayHomz2 px-4 h-[45px] w-[120px] mb-1 py-2 rounded cursor-pointer"
          />
          <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[45px] w-[92px] mb-1 p-1 rounded cursor-pointer">
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
      </div>
      <div>
        <Widget/>
      </div>
    </div>
  );
};

export default Request;
