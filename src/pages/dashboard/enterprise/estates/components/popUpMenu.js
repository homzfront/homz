import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopUpMenu = () => {
  return (
    <div className="drop-down absolute text-GrayHomz font-[500] top-8 right-2 border h-[140px] w-[204px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <div className="hover:bg-whiteblue h-full w-full rounded-md">
          <p className="text-[13px] font-[500] py-1 px-2  text-GrayHomz hover:text-BlueHomz">
            View Dashboard
          </p>
        </div>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <div className="hover:bg-whiteblue h-full w-full rounded-md">
          <p className="text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
            View Tenants
          </p>
        </div>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <div className="hover:bg-whiteblue h-full w-full rounded-md">
          <p className="text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
            Manage Estate Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopUpMenu;
