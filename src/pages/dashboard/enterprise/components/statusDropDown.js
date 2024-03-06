import LoadingTable from "@/components/mainmenu/loadingTable";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const StatusDropDownMain = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  loading,
  setSelectedStatus,
  selectedStatus,
  value,
  dropdownRef
}) => {
  console.log(data);
console.log(value)
console.log(selectedStatus)
  return (
    <div 
    // ref={dropdownRef} 
    className="dropdown w-full">
      {loading ? (
        <div className="w-[95px] flex justify-center">
          <LoadingTable />
        </div>
      ) : (
        <div>
          <button
         className={`rounded-md py-1 w-[95px] flex items-center justify-center ${
          selectedStatus === "Pending" ? "bg-warningBg text-warning2" :
          selectedStatus === "Paid" ? "bg-successBg text-Success" :
          selectedStatus === "Over due" ? "bg-error text-white" :
          value === "Pending" ? "bg-warningBg text-warning2" :
          value === "Paid" ? "bg-successBg text-Success" :
          value === "Over due" ? "bg-error text-white" :
          ""
        }`}
            onClick={toggleDropdown}
          >
            <div className="flex gap-1 items-center">
              <p className={``}>{selectedStatus === null ? value : capitalizeFirstLetter(selectedStatus)}</p>
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
                className={`dropdown-item text-GrayHomz text-start w-[80px] rounded-md px-2 h-[20px] ${"hover:bg-warningBg hover:text-warning2"}`}
                onClick={() => {
                  setSelectedStatus("Pending");
                  handleStatusChange("Pending");
                }}
              >
                Pending
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item text-GrayHomz text-start w-[80px] rounded-md px-2 h-[20px] ${"hover:bg-successBg hover:text-Success"}`}
                onClick={() => {
                  setSelectedStatus("Paid");
                  handleStatusChange("Paid");
                }}
              >
                Paid
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item text-GrayHomz  text-start w-[80px] rounded-md px-2 h-[20px] ${"hover:bg-error hover:text-white"}`}
                onClick={() => {
                  setSelectedStatus("Over due");
                  handleStatusChange("Over due");
                }}
              >
                Over ue
              </button>
            </li>
          </ul>{" "}
        </div>
      )}
    </div>
  );
};

export default StatusDropDownMain;
