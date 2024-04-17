"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";
import Close from "/src/components/icons/Close";
import Menu from "/src/components/icons/Menu";

const sideBarMobile = (setopen) => {
//   const [popUpMenu, setPopUpMenu] = useState(false);
//   const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
// //   const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  const openSidebar = () => {
    setOpen(!open);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="header  w-[1147px]">
     <div className="absolute h-screen bg-white z-10 w-[100%]">
            <div className="mt-8 flex justify-between px-8">
              <p>Dashboard</p>
              <div className="cursor-pointer" onClick={closeSidebar}>
                <Close />
              </div>
            </div>
            <div className="mt-8 h-[200px] flex flex-col w-[70%] m-auto justify-around text-white">
              <Link
                onClick={() => setOpen(false)}
                href={"/dashboard/property-owner/dashboard"}
                className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={"/dashboard/property-owner/tenants"}
                className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
              >
                Tenants
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={"/dashboard/property-owner/estates"}
                className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
              >
                Property Management
              </Link>
            </div>
          </div>    </div>
  );
};

export default sideBarMobile;
