"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import useClickOutside from "@/utils/clickOutside";
import SidebarMobile from "../sidebarMobile/sidebarHeader";
import Menu from "@/components/icons/Menu";
import useDisableBodyScroll from "@/utils/useDisableBodyScroll";

const Header = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenu(false));
  const [open, setOpen] = useState(false);

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

  const { data, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, []);

  const user = data;
  console.log(user);

  useDisableBodyScroll(open)

  return (
    <div className="header">
      {open && (
        <div className="">
          <div className="absolute bg-white h-auto z-50 w-[100%]">
            <div className="flex justify-between items-center p-8">
              <div>
                <Image src="/homz.svg" width={86} height={18} alt="" />
              </div>
              <div className="cursor-pointer" onClick={closeSidebar}>
                <Image src="/close.svg" width={16} height={16} alt="" />
              </div>
            </div>
            <div>
              <SidebarMobile user={user} open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden w-full flex justify-between items-center p-8">
        <div>
          <Image src="/homz.svg" width={86} height={18} alt="" />
        </div>
        <div className="cursor-pointer h-full " onClick={openSidebar}>
          <Menu />
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center py-8 px-10">
        <div className="">
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
          <div ref={dropdownRef} onClick={handleToggleMenu} className="relative cursor-pointer">
            {!user?.businessLogo?.url ? (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                }
                alt=""
                width={40}
                height={40}
                className=""
              />
            ) : (
              <Image
                src={user?.businessLogo?.url}
                alt=""
                height={40}
                width={40}
                className="rounded-full"
              />
            )}
            {popUpMenu && <PopUpMenu user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
