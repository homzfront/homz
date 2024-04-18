"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBarData  from "../../../components/secondRelease/sideBarData";
import { Icon } from "@iconify/react";
import Image from "next/image";

// import { Icon } from '@iconify/react';

const adminSideNav = () => {
  return (
    <div className="md:w-60 adminSideNav bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex md:pt-4">
      <div className="flex flex-col space-y-6 w-full">
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

        <div className="flex flex-col space-y-3 md:px-6 pt-9">
          {SideBarData.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default adminSideNav;

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  

  return (
    <div className="">
      {item.submenu ? (
        <>
          <Link
            href={''}
            onClick={toggleSubMenu}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg justify-between ${
              (item.paths.some(path => pathname.includes(path)))
                ? "bg-BlueHomz text-white"
                : "hover:bg-blue-100"
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.path === pathname ? (
                <Image src={item.icon2} height={16} width={16} alt="img" />
              ) : (
                <Image src={item.icon} height={16} width={16} alt="img" />
              )}
              <span className=" text-xl flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </Link>

          {subMenuOpen && (
            <div className="flex items-center space-x-7 ml-[20px]">
              <hr
                style={{
                  width: "1.5px",
                  height: "106px",
                  borderWidth: "0",
                  background: "#4E4E4E",
                  // transform: "rotate(90deg)", // Rotate the <hr> element 90 degrees
                }}
              />
              <div className="my-2 flex flex-col space-y-4">
                {item.subMenuItems?.map((subItem, idx) => {
                  return (
                    <Link
                      key={idx}
                      href={subItem.path}
                      className={`flex flex-row space-x-2 items-center p-1 rounded-md ${
                        subItem.path === pathname
                          ? "text-BlueHomz"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      <div className="flex flex-row  items-center gap-[12px]">
                        {/* {subItem.path === pathname ? (
                          <Image
                            src={subItem.icon2}
                            height={16}
                            width={16}
                            alt="img"
                          />
                        ) :  */}
                        
                          <Image
                            src={subItem.icon}
                            height={16}
                            width={16}
                            alt="img"
                          />
                        {/* )} */}
                        <span className=" text-[13px] font-[500] leading-[20px] text-left">
                          {subItem.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg ${
            item.path === pathname
              ? "bg-BlueHomz text-white"
              : "hover:bg-blue-100"
          }`}
        >
          {/* {item.icon} */}
          {item.path === pathname ? (
            <Image src={item.icon2} height={16} width={16} alt="img" />
          ) : (
            <Image src={item.icon} height={16} width={16} alt="img" />
          )}

          <span className=" text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
