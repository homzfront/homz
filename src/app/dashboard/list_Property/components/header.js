"use client";

import React, { useEffect, useState } from "react";
import PopUpMenu from "./popUpMenu";
import Image from "next/image";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import useClickOutside from "@/utils/clickOutside";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";

const AdminHeader = () => {
  const dropdownRef = useClickOutside(() => setPopUpMenu(false)); 
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  const { data, loading, fetchData } = useProfileListingMe();

  useEffect(() => {
    fetchData();
  }, []);

  const user = data;



  return (
    <div
      className={
        `hidden md:block header mb-3 w-full sm:h-[85px]`}
    >
      <div className="sm:flex h-full  sm:items-center sm:justify-between px-4 sm:pt-0 pt-10">
        <div className="relative hidden sm:block">
          {/* <input
            type="text"
            className="border h-[40px] pl-8 rounded-md w-[320px]"
            id="search"
            placeholder="Search"
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
          /> */}
        </div>
        <div className="hidden sm:block ml-auto">
          <div className="flex gap-[20px] items-center">
            {/* <div onClick={handleToggleMenuTwo} className="cursor-pointer">
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
            </Link> */}
            <div ref={dropdownRef} onClick={() => setPopUpMenu(prevState => !prevState)} className="relative cursor-pointer">
              {!user?.coverPhoto?.url ? (
                <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                  <EmptyAvatar />
                </div>
              ) : (
                <Image
                  src={user?.coverPhoto?.url}
                  alt=""
                  height={40}
                  width={40}
                  layout="full" // Specify the desired height
                  objectFit="cover"
                  objectPosition="center"
                  className="object-cover bg-center h-[40px] rounded-full"
                  quality={100}
                  priority
                />
              )}
              {popUpMenu && <PopUpMenu user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
