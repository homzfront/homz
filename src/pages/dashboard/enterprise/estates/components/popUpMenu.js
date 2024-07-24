import Reminder from "@/components/icons/reminder";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PopUpMenu = ({ data }) => {
  const [activeTwo, setActiveTwo] = useState(false);

  return (
    <div className="z-20 drop-down absolute text-GrayHomz py-2 font-[500] top-5 md:top-8 right-1 md:right-2 border h-auto w-[150px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
          <Link href={`/dashboard/enterprise-property/estates/dashboard/${data}`}>
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  text-GrayHomz hover:text-BlueHomz">
              View Dashboard
            </p>
          </Link>
        </div>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
          <Link href={`/dashboard/enterprise-property/estates/tenants/${data}`}>
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              View Tenants
            </p>
          </Link>
        </div>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
          <Link
            href={`/dashboard/enterprise-property/estates/reminder-multiple`}>
            <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Set rent due reminder
            </div>
          </Link>
        </div>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
          <Link href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
            <p className="hidden md:block text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Manage Property Information
            </p>
          </Link>
          <Link href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
            <p className="md:hidden text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Manage Property Info..
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUpMenu;
