"use client";
import Image from "next/image";
import React, { useState } from "react";

const StatusDropdown = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
}) => {
     // Ensure that Data is defined and not null
     if (!data) {
      return []; // or handle accordingly, e.g., return a loading state
    }
  return (
    <div className="dropdown">
      <button
        className={`text-[11px] leading-[16.5px] ${
          data.AccessStatus === "Signed In" ? "bg-successBg text-Success" : ""
        } ${data.AccessStatus === "Pending" ? "bg-warningBg text-warning2" : ""} ${
          data.AccessStatus === "Signed Out" ? "bg-error text-white" : ""
        }  w-[105px] h-[34px] rounded-md text-start `}
        onClick={toggleDropdown}
      >
        <div className="px-[12px] py-[8px] flex items-center justify-between w-full h-full">


        <p className="">{data.AccessStatus}</p>
        <div className={`w-5 h-5  ${isOpen ? "transform rotate-180" : ""}`}>
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
        className={`dropdown-menu absolute m-auto   w-[100px]  flex flex-col items-start justify-around gap-3 px-2 mt-1 py-2 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-warningBg text-start w-[80px] rounded-md px-2 h-[20px] ${
              data.Status === "Pending" ? "bg-warningBg text-warning2" : ""
            }`}
            onClick={() => handleStatusChange("Pending")}
          >
            Pending
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-successBg text-start w-[80px] rounded-md px-2 h-[20px] ${
              data.AccessStatus === "Signed In" ? "bg-successBg text-Success" : ""
            }`}
            onClick={() => handleStatusChange("Signed In")}
          >
            Sig In
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-red-100  text-start w-[80px] rounded-md px-2 h-[20px] ${
              data.AccessStatus === " Signed Out" ? "bg-error text-white" : ""
            }`}
            onClick={() => handleStatusChange("Signed Out")}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StatusDropdown;
