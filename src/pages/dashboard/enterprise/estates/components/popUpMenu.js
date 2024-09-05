import Reminder from "@/components/icons/reminder";
import useEditPropertyTab from "@/store/enterpriseStore/useEditPropertyTab";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PopUpMenu = ({ data }) => {
  const { setTab } = useEditPropertyTab();
  return (
    <div className="z-20 drop-down absolute text-GrayHomz py-2 font-[500] top-5 md:top-8 right-1 md:right-2 border h-auto w-[150px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/estates/dashboard/${data}`}>
          <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  text-GrayHomz hover:text-BlueHomz">
              View Dashboard
            </p>
          </div>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/estates/tenants/${data}`}>
          <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              View Tenants
            </p>
          </div>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
          <div
            onClick={() => {
              setTab("bank")
            }}
            className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Add Bank Details
            </div>
          </div>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/reminder-multiple/${data}`}>
          <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Set rent due reminder
            </div>
          </div>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
          <div
            onClick={() => {
              setTab("document")
            }}
            className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Property Documents
            </div>
          </div>
        </Link>
      </div>
      <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
        <Link className="hidden md:block w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
          <div
            onClick={() => {
              setTab(null)
            }}
            className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Manage Property Information
            </p>
          </div>
        </Link>
        <Link className="md:hidden w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${data}`}>
          <div
            onClick={() => {
              setTab(null)
            }}
            className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
            <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
              Manage Property Info..
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopUpMenu;
