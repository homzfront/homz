"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarData ,OtherSideNav} from "./sideBarData";
import { Icon } from "@iconify/react";
import Image from "next/image";

// import { Icon } from '@iconify/react';

const SideNav = () => {
  return (
    <div className="md:w-60 shadow-md bg-whit h-full flex-1 fixed border-r border-zinc-200 hidden md:flex md:pt-4 sideNav ">
      <div className="flex flex-col space-y-7 ">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <span className="font-bold text-xl hidden md:flex">
            <div className="flex items-center space-x-4">
              {/* <span className="h-7 w-7 bg-zinc-300 rounded-lg" /> */}
              <span className="font-bold text-xl flex ">
                <Image
                  src={"/Homz_Logo_Blue.png"}
                  height={20}
                  width={100}
                  priority
                  alt="img"
                />
              </span>
            </div>
          </span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 pt-9">
          {SideBarData.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div className="flex flex-col space-y-3  md:px-6 pt-9 fontSize">
          {OtherSideNav.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const highlightClass = (itemPath) => {
    return (itemPath === pathname || itemPath === `${pathname}/new`) ? "bg-BlueHomz text-white" : "hover:bg-blue-100";
  };

  const linkClass = highlightClass("/listProperty");

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100  fontSize ${
              pathname.includes(item.path) ? "bg-BlueHomz text-white"  : "hover:text-white hover:bg-blue-300"
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex fontSize">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg fontSize ${
            
            item.path === pathname ? "bg-BlueHomz text-white" : "hover:bg-blue-100"
          }`}
        >
          {/* {item.icon} */}
          {item.path === pathname 
          
          ?
          <Image src={item.icon2} height={16} width={16} alt="img" className="icons"  />
          :
          <Image src={item.icon} height={16} width={16} alt="img"  className="icons" />
          
          }

          <span className=" text-xl flex fontSize">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
