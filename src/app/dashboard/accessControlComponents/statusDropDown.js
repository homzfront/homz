"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const StatusDropdown = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
}) => {
  const dropdownRef = useRef(null);
  
  // Ensure that Data is defined and not null
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  //  console.log(isOpen)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [toggleDropdown]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className={`relative text-[11px] leading-[16.5px] ${
          data.AccessStatus === "Signed In" ? "bg-successBg text-Success" : ""
        } ${
          data.AccessStatus === "Pending" ? "bg-warningBg text-warning2" : ""
        } ${
          data.AccessStatus === "Signed Out" ? "bg-error text-white" : ""
        } flex items-center w-[105px]  h-[33px] rounded-[4px]  justify-between px-[12px] py-[8px]`}
        onClick={() => toggleDropdown(!isOpen)}
      >
        <span className="">{data.AccessStatus}</span>
        <div className={`w-5 h-5  ${isOpen ? "transform rotate-180" : ""}`}>
          <Image
            src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
            height={16}
            width={16}
            alt=""
          />
        </div>

        <ul
          className={`dropdown-menu absolute top-[30px] left-0 m-auto z-50 w-[100px] flex flex-col items-start justify-around gap-3 px-2 mt-1 py-2 bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-warningBg text-start w-[80px] rounded-md px-2 h-[20px] ${
                data.AccessStatus === "Pending"
                  ? "bg-warningBg text-warning2"
                  : ""
              }`}
              onClick={() => {
                handleStatusChange("Pending");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Pending
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-successBg text-start w-[80px] rounded-md px-2 h-[20px] ${
                data.AccessStatus === "Signed In"
                  ? "bg-successBg text-Success"
                  : ""
              }`}
              onClick={() => {
                handleStatusChange("Signed In");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              className={`dropdown-item text-GrayHomz hover:bg-red-100  text-start w-[80px] rounded-md px-2 h-[20px] ${
                data.AccessStatus === "Signed Out" ? "bg-error text-white" : ""
              }`}
              onClick={() => {
                handleStatusChange("Signed Out");
                toggleDropdown(false); // Close dropdown
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </button>
    </div>
  );
};

export default StatusDropdown;
