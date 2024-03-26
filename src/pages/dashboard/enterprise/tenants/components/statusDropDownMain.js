import Image from "next/image";
import React, { useState, useEffect } from "react";
import LoadingTable from "../../../../../components/mainmenu/loadingTable";

const StatusDropDownMain = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  loading,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(
    data?.maintenanceRequest?.status
  );

  return (
    <div className="dropdown w-full">
      {loading ? (
        <div className="w-[95px] flex justify-center">
          <LoadingTable />
        </div>
      ) : (
        <div>
          <button
            className={`rounded-md py-1 w-[95px] flex items-center justify-center ${
              selectedStatus === "pending" ? "bg-warningBg text-warning2 " : ""
            } ${
              selectedStatus === "resolved" ? "bg-successBg text-Success " : ""
            } ${
              selectedStatus === "in-progress"
                ? "bg-warning2  text-warningBg "
                : ""
            }`}
            onClick={toggleDropdown}
          >
            <div className="flex gap-1 items-center">
              <p className={``}>{selectedStatus}</p>
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
            className={`text-GrayHomz dropdown-menu absolute  mt-2 w-[95px] h-[80px] flex flex-col items-start justify-around px-2 py-1 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <button
                className={`dropdown-item  hover:text-warning2 hover:bg-warningBg text-start w-[80px] rounded-md px-2 h-[20px]  font-[500] text-[11px]`}
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
                className={`dropdown-item hover:bg-warning2  hover:text-warningBg  text-start w-[80px] rounded-md px-2 h-[20px] "bg-warning2    font-[500] text-[11px]`}
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
                className={`dropdown-item hover:text-Success hover:bg-successBg text-start w-[80px] rounded-md px-2 h-[20px]  font-[500] text-[11px]`}
                onClick={() => {
                  setSelectedStatus("resolved");
                  handleStatusChange("resolved");
                }}
              >
                Resolved
              </button>
            </li>
          </ul>{" "}
        </div>
      )}
    </div>
  );
};

export default StatusDropDownMain;
