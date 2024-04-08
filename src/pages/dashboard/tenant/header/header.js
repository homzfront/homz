"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";

const Header = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  return (
    <div className="hidden border-0 header w-[375px] md:w-[1024px]">
      <div className="py-8  flex justify-between items-center px-10  ">
      <div className=" hidden relative md:block">
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
        <div className="hidden gap-4 items-center relative md:flex">
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
          <Link href={""}>
            <Image
              src={"/static/dashboard/enterprisemanager/header/sms.png"}
              alt=""
              height={25}
              width={24}
            />
          </Link>
          <Link href={""} onClick={handleToggleMenu} className="relative">
            <Image
              src={"/static/dashboard/enterprisemanager/header/Avatar.png"}
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
  );
};

export default Header;
