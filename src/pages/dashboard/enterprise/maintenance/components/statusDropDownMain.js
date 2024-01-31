import Image from "next/image";
import React, { useState, useEffect } from "react";

const StatusDropDownMain = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
}) => {
  // // Ensure that Data is defined and not null
  // if (!data) {
  //   return []; // or handle accordingly, e.g., return a loading state
  // }

  console.log(data);  // State to manage the selected status

  const [selectedStatus, setSelectedStatus] = useState(data?.status);

  return (
    <div className="dropdown w-full">
      <button
        className={`rounded-md text-start `}
        onClick={toggleDropdown}
      >
        <div className="flex gap-1 items-center">
          <p className="">{selectedStatus}</p>
          <div className={`  ${isOpen ? "transform rotate-180" : ""}`}>
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
              height={16}
              width={16}
              alt=""
            />
          </div>
        </div>
      </button>

      <ul
        className={`dropdown-menu absolute  mt-2 w-[95px] h-[80px] flex flex-col items-start justify-around px-2 py-1 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-warningBg text-start w-[80px] rounded-md px-2 h-[20px]`}
            onClick={() => {
              setSelectedStatus("pending");
              handleStatusChange("pending");
            }}
          >
            Pending
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-red-100  text-start w-[80px] rounded-md px-2 h-[20px]`}
            onClick={() => {
                setSelectedStatus("in-progress");
                handleStatusChange("in-progress");
            }}
            >
            In-Progress
          </button>
        </li>
        <li>
          <button
                className={`dropdown-item text-GrayHomz hover:bg-successBg text-start w-[80px] rounded-md px-2 h-[20px]`}
            onClick={() => {
                setSelectedStatus("resolved");
              handleStatusChange("resolved");
            }}
          >
           Resolved
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StatusDropDownMain;
