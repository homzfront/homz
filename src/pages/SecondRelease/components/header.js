"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import PopUpMenu from "./popUpMenu";
import useScroll from "/src/hooks/use-scroll";
import { cn } from "/src/libs/utils";
import Image from "next/image";
import PopUpMenuAlert from "./popUpMenuAlert";

const AdminHeader = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0  headerAdmin  z-30 w-full transition-all md:h-[85px]`,
        {
          "border-b border-gray-500 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-500 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={20}
              width={100}
              priority
              alt="img"
            />
          </Link>
        </div>
        <div className="searchPane relative hidden md:block">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-md w-[320px]"
            placeholder="search"
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={17}
            width={16}
          />
        </div>

        <div className="hidden md:block ml-auto">
          <div className="flex gap-[20px] items-center">
            <div onClick={handleToggleMenuTwo} className="cursor-pointer">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/header/notification.png"
                }
                alt=""
                height={25}
                width={24}
              />
              {popUpMenuTwo && <PopUpMenuAlert />}
            </div>
            <Link href={"/dashboard/enterprise-property/letterHead"}>
            <Image
              src={"/static/dashboard/enterprisemanager/header/sms.png"}
              alt=""
              height={25}
              width={24}
            />
          </Link>
            <Link href={""} onClick={handleToggleMenu} className="relative">
              <Image
                src={"/static/images/homz.svg"}
                alt=""
                height={41}
                width={40}
                className="rounded-full"
              />
              {popUpMenu && <PopUpMenu />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
