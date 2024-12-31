"use client";
import Image from "next/image";
import React from "react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
const StatusDropdown = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  status,
}) => {


  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  return (
    <div
      className="dropdown"
      // ref={dropdownRef}
    >
      <button
        className={`relative text-[11px] leading-[16.5px] ${
          data?.accessStatus === "signed in" ? "bg-successBg text-Success" : ""
        } ${
          data?.accessStatus === "pending" ? "bg-warningBg text-warning2" : ""
        } ${
          data?.accessStatus === "signed out" ? "bg-error text-white" : ""
        } flex items-center w-[105px]  h-[33px] rounded-[4px]  justify-between px-[12px] py-[8px]`}
        onClick={() => toggleDropdown(!isOpen)}
      >
        <span className="">{capitalizeFirstLetter(data?.accessStatus)}</span>
        {data?.accessStatus != "signed out" && (
          <div className={`w-5 h-5  ${isOpen ? "transform rotate-180" : ""}`}>
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
              height={16}
              width={16}
              alt=""
            />
          </div>
        )}

        <ul
          className={`dropdown-menu absolute top-[30px] left-0 m-auto z-50 w-[100px] flex flex-col items-start justify-around gap-3 px-2 mt-1 py-2 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isOpen && data?.accessStatus != "signed out" ? "block" : "hidden"
          }`}
        >
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-warningBg text-start w-[80px] rounded-md px-2 h-[20px] ${
                data?.accessStatus === "pending"
                  ? "bg-warningBg text-warning2"
                  : ""
              }`}
              onClick={() => {
                handleStatusChange("pending");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Pending
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-successBg text-start w-[80px] rounded-md px-2 h-[20px] ${
                data?.accessStatus === "signed in"
                  ? "bg-successBg text-Success"
                  : ""
              }`}
              onClick={() => {
                handleStatusChange("signed in");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Sign in
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-red-100  text-start w-[80px] rounded-md px-2 h-[20px] ${
                data?.accessStatus === "signed out" ? "bg-error text-white" : ""
              }`}
              onClick={() => {
                handleStatusChange("signed out");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Sign out
            </button>
          </li>
        </ul>
      </button>
    </div>
  );
};

export default StatusDropdown;
