"use client";
import Image from "next/image";
import React, { useState } from "react";

const UserRole = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  editable,
}) => {
  // Ensure that Data is defined and not null
  if (!data) {
    return []; // or handle accordingly, e.g., return a loading state
  }
  return (
    <div className="dropdown  rounded-md hover:border-stone-500 w-[313px] h-[45px]">
      <button
        className={`${
          !editable ? "bg-[#E6E6E6]" : "bg-white"
        } w-[313px] rounded-md text-start h-[45px] adminCellBorders`}
        onClick={toggleDropdown}
        disabled={!editable && true}
      >
        <div
          className={`field p-[7px] flex items-center justify-between gap-1`}
        >
          <p className="">{data.Access}</p>
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
        className={`dropdown-menu absolute  flex flex-col items-start py-2 gap-2 z-30 w-[313px] bg-white  shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <button
            className={`dropdown-item text-GrayHomz  hover:text-BlueHomz hover:bg-whiteblue text-start w-[313px] bg-white h-[40px] px-2`}
            onClick={() => handleStatusChange("Can edit")}
          >
            Can edit
          </button>
        </li>
        <li>
          <button
            className={`field dropdown-item px-2 text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue text-start`}
            onClick={() => handleStatusChange("Can view")}
          >
            Can view
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserRole;
