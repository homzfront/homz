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
    <div className="header w-[1147px]">
      <div className="flex justify-between items-center py-8 px-10">
        <div className="relative">
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
        <div className="flex gap-4 items-center relative">
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
