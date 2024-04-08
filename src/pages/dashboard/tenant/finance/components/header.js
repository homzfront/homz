import React from "react";
import Dropdown from "../../components/dropDownTwo";
import Image from "next/image";

const Header = () => {
    const options = [
        {
          id: 1,
          label: "Full Payment",
        },
        {
          id: 1,
          label: "Half Payment",
        },
      ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-[20px] font-[500]">Payment</div>
        <div className="flex gap-2 items-center">
          <p className="text-[16px] font-[400] pr-2">Filter by:</p>
          <div className="flex gap-2">
            <Dropdown
              selectOption={"Description"}
              options={options}
              className={"font-[400] text-[13px] text-GrayHomz"}
            />
            <Dropdown
              selectOption={"Description"}
              options={options}
              className={"font-[400] text-[13px] text-GrayHomz"}
            />
            <Dropdown
              selectOption={"Description"}
              options={options}
              className={"font-[400] text-[13px] text-GrayHomz"}
            />
            <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[44px] w-[92px] mb-1 p-1 rounded cursor-pointer">
              <span>
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
    </div>
  );
};

export default Header;
