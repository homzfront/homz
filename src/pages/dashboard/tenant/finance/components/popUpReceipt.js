"use client";
import React, { useState } from "react";
import Image from "next/image";
import Receipt from "./receipt";

function PopUpReceipt({ data, openReceipt, dropdownRef }) {
    if (!data) {
      return null; // or handle accordingly, e.g., return a loading state
    }

  return (
    <div ref={dropdownRef}>
      <div className="drop-down absolute top-10 z-30  text-GrayHomz font-[400] text-[11px] right-[35px] border p-2  rounded-[12px] bg-white flex flex-col items-center justify-around">
        <div
          onClick={openReceipt}
          className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center  px-4 py-2 gap-1  rounded-md text-center w-[100px]"
        >
          View Receipt
        </div>
      </div>
    </div>
  );
}
export default PopUpReceipt;
