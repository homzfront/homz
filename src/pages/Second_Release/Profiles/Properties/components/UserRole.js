"use client";
import Image from "next/image";
import React, { useState } from "react";

const UserRole = ({
  data = null || [],
  handleStatusChange,
  isOpen,
  toggleDropdown,
  Editable,
}) => {
     // Ensure that Data is defined and not null
     if (!data) {
      return []; // or handle accordingly, e.g., return a loading state
    }
  return (
    <div className={` w-[473px] h-[45px] adminCellBorder  rounded-[] hover:border-stone-500 `}>
      <button
        className={`w-[473px] h-[45px] ${!Editable ? 'bg-[#E6E6E6]' : 'bg-white'} adminCellBorders flex justify-between rounded-md  text-star`}
        onClick={toggleDropdown}
        disabled={!Editable && true}

      >
        <div className={`p-[7px] flex items-center justify-between gap-1 w-[473px] h-[45px] `}>


        <p className="">{data.No_of_Houses}</p>
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
  className={`dropdown-menu absolute flex flex-col items-start py-2 gap-2 z-30 w-[473px] bg-white shadow-md rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
    isOpen ? "block" : "hidden"
  }`}
>
  {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
    <li key={number}>
      <button
        className={`dropdown-item text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue text-start w-[473px] h-[40px] bg-white px-2`}
        onClick={() => handleStatusChange(number.toString())}
      >
        {number}
      </button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default UserRole;
