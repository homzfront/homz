"use client";
import Image from "next/image";
import React, { useState } from "react";

const UserRole = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  classname,
  width,
  bg_color,
}) => {
     // Ensure that Data is defined and not null
     if (!data) {
      return []; // or handle accordingly, e.g., return a loading state
    }
  return (
    <div className={`${width ? width: ' '} w-[145px] adminCellBorder  rounded-[] hover:border-stone-500`}>
      <button
        className={`${bg_color ? bg_color : 'w-[145px] h-10 bg-white adminCellBorders'} flex justify-between rounded-md  text-star`}
        onClick={toggleDropdown}
      >
        <div className={` p-[7px] flex items-center justify-between gap-1 ${classname ? classname: 'w-[145px] h-full'}`}>


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
        className={`dropdown-menu absolute  flex flex-col items-start py-2 gap-2 z-30 ${bg_color ? "bg_color": 'w-[146px] bg-white h-full'} shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <button
            className={`dropdown-item text-GrayHomz  hover:text-BlueHomz hover:bg-whiteblue text-start ${width ? width: 'w-[140px] bg-white h-[40px]'} px-2`}
            onClick={() => handleStatusChange("Admin")}
          >
            Admin
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item px-2 text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue text-start ${classname ? classname: 'w-[140px] bg-white h-[40px]'}`}
            onClick={() => handleStatusChange("Customer Support")}
          >
            Customer Support
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item px-2 text-GrayHomz hover:text-BlueHomz ${classname ? classname: 'w-[140px] bg-white h-[40px]'} hover:bg-whiteblue text-start`}
            onClick={() => handleStatusChange("Security")}
          >
            Security
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item px-2 text-GrayHomz hover:text-BlueHomz ${classname ? classname: 'w-[140px] h-[40px] bg-white'} hover:bg-whiteblue  text-start`}
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
