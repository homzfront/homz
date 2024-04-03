"use client";
import Image from "next/image";
import React, { useState } from "react";

const UserRole = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  bg_color,
 
}) => {
     // Ensure that Data is defined and not null
     if (!data) {
      return []; // or handle accordingly, e.g., return a loading state
    }
  return (
    <div className={`w-[313px] adminCellBorder  rounded-[] hover:border-stone-500 h-[45px]`}>
      <button
        className={`${!bg_color ? 'bg-[#E6E6E6]' : 'bg-white'} w-[313px] h-45 adminCellBorders flex justify-between rounded-md  text-star`}
        onClick={toggleDropdown}
        disabled={!bg_color && true}
      >
        <div className={`field p-[7px] flex items-center justify-between gap-1`}>


        <p className="">{data.UserRole}</p>
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
            onClick={() => handleStatusChange("Admin")}
          >
            Admin
          </button>
        </li>
        <li>
          <button
            className={`field dropdown-item px-2 text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue text-start`}
            onClick={() => handleStatusChange("Customer Support")}
          >
            Customer Support
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item px-2 text-GrayHomz hover:text-BlueHomz field hover:bg-whiteblue text-start`}
            onClick={() => handleStatusChange("Security")}
          >
            Security
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item px-2 text-GrayHomz hover:text-BlueHomz field hover:bg-whiteblue  text-start`}
            onClick={() => handleStatusChange("Landlord")}
          >
            Landlord
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserRole;
