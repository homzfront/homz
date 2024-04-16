"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import PopUpMenu from "./popUpMenu";
import useScroll from "/src/hooks/use-scroll";
import { cn } from "/src/libs/utils";
import Image from "next/image";
import PopUpMenuAlert from "./popUpMenuAlert";
import {useRouter} from "next/navigation"

const AdminHeader = ({ setSearchValue, searchValue }) => {
   const router = useRouter();
  const currentPathname = router.pathname;
  // let currentPathname = window.location.pathname; //get the href of the page you are on
  // console.log(searchValue)

  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  // const [searchValue, setSearchValue] = useState("");

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };
  // padding-top:1.5rem;
  // padding-bottom: 2rem;
  return (
    <div
      className={cn(
        `hidden sm:block inset-x-0  headerAdmin py-[.5rem] mb-3  z-30 w-full transition-all sm:h-[85px]`,
        {
          "border-b border-gray-500 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-500 bg-white": selectedLayout,
        }
      )}
    >
      <div className="sm:flex h-full  sm:items-center sm:justify-between px-4 sm:pt-0 pt-10">
        

        <div className="searchPane relative hidden sm:block">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-md w-[320px]"
            id="search"
            placeholder={`${
              currentPathname &&  currentPathname.includes("/second_release/Tenants/AccessRecords")
                ? "Access Code"
                : "Search"
            }`}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={17}
            width={16}
          />
        </div>

        <div className="hidden sm:block ml-auto">
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
