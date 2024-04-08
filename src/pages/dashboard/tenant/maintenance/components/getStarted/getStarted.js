import React from "react";
import Image from "next/image";
import Dropdown from "../../../components/dropDownTwo";

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

const GetStarted = ({ openMaintenanceForm }) => {
  return (
    <div className="">
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
      <div className=" p-8">
        <div className="flex flex-col gap-4">
          <p className="text-[20px] font-[500] text-BlackHomz">
            Maintenance Request
          </p>
          <p className="text-[18px] font-[400] text-GrayHomz">
            Send a request for utility maintenance
          </p>
        </div>
        <div className="h-[850px] w-full flex items-center justify-around">
          <div className="flex flex-col justify-center items-center gap-1 h-[400px]">
            <div className="w-[120px] h-[120px] bg-whiteblue rounded-[100%] flex justify-center items-center">
              <Image
                src={"/static/dashboard/tenant/maintenance/setting-2.png"}
                alt=""
                height={89}
                width={89}
                className="m-auto"
              />
            </div>
            <p className="text-[41px] font-[700] text-BlueHomz">Get Started</p>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Send a request for utility maintenance
            </p>
            <button
              onClick={openMaintenanceForm}
              className="mt-3 bg-BlueHomz w-[220px] h-[48px] text-white rounded-[4px]"
            >
              Request for maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
