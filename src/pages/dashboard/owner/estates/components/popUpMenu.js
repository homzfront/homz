import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopUpMenu = ({ data }) => {

  return (
    <div className="z-20 drop-down absolute text-GrayHomz font-[500] top-6 md:top-8 right-2 border py-2 w-[140px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div className="h-[30px] rounded-md md:flex gap-1 items-center px-2 w-full ">
        <Link
          href={`/dashboard/property-owner/estates/dashboard/${data}`}
          className="flex h-[34px] text-[11px] md:text-[13px] px-2 items-center font-[500]  text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue w-full rounded-md"
        >
          <p className="">
            View Dashboard
          </p>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <Link
          href={`/dashboard/property-owner/estates/tenants/${data}`}
          className="flex h-[34px] text-[11px] md:text-[13px] px-2 items-center font-[500] text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue w-full rounded-md"
        >
          <p className="">
            View Tenants
          </p>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <Link
          href={`/dashboard/property-owner/estates/estateInfo/${data}`}
          className="flex h-[34px] truncate text-[11px] md:text-[13px] px-2 items-center font-[500] text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue w-full rounded-md"
        >
          <p className="">
            View Property Info
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PopUpMenu;
