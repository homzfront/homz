"use client";
import Image from "next/image";
import React, { useState } from "react";

const StatusDropdown = ({
  data,
  handleStatusChange,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <div className="dropdown">
      <button
        className={`${
          data.Status === "Paid" ? "bg-successBg text-Success" : ""
        } ${data.Status === "Pending" ? "bg-warningBg text-warning2" : ""} ${
          data.Status === "Over Due" ? "bg-error text-white" : ""
        }  w-[100px] h-10 rounded-md text-start `}
        onClick={toggleDropdown}
      >
        <div className="px-[10px] py-[4px] flex items-center justify-between gap-1 w-full h-full">


        <p className="w-[80%]">{data.Status}</p>
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
        className={`dropdown-menu absolute  w-[100px] h-[80px] flex flex-col items-start justify-around px-2 mt-1 py-1 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
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
              data.Status === "Paid" ? "bg-successBg text-Success" : ""
            }`}
            onClick={() => handleStatusChange("Paid")}
          >
            Paid
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item text-GrayHomz hover:bg-red-100  text-start w-[80px] rounded-md px-2 h-[20px] ${
              data.Status === "Over Due" ? "bg-error text-white" : ""
            }`}
            onClick={() => handleStatusChange("Over Due")}
          >
            Over Due
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StatusDropdown;
