"use client";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "../icons/Menu";
import Close from "../icons/Close";
import Image from "next/image";
import Down from "../icons/Down";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-BlackHomz px-6 font-normal sm:flex justify-between text-[16px] max-w-[1160px] items-center m-auto pt-12 shadow-m">
      <Link href={'/'}>
        <Image
          src={"/Homz_Logo_Blue.png"}
          alt="HOMZ"
          height={"100"}
          className="cursor-pointer"
          
          width={"100"}
        />
      </Link>
      <nav
        className={` sm:my-0 my-4 flex gap-14 sm:items-center items-start flex-col sm:flex-row ${
          open ? "block" : "hidden sm:flex"
        }`}
      >
        <div className="flex  gap-10 flex-col sm:flex-row">
          <Link href={"/"} className="hover:text-blue-400">
            Home
          </Link>
          <Link href={""} className="hover:text-blue-400 relative mr-4 flex ">
            Properties <Down className="absolute right-[-20px] top-1"/>
          </Link>
          <Link href={""} className="hover:text-blue-400 ">
            Enterprise
          </Link>
        </div>

        <div
          className={`sm:flex sm:justify-center space-y-4 sm:space-y-0 items-center sm:space-x-4 space-x-0 `}
        >
          <Link
            href="/login"
            className="hover:text-blue-400"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className=" text-md  w-[147px] rounded-[4px] font-normal  text-white bg-BlueHomz2 items-center flex justify-center h-[48px] py-1 hover:bg-blue-400"
          >
            Create Account 
          </Link>
        </div>
      </nav>
      <div
        onClick={() => setOpen(!open)}
        className="sm:hidden absolute right-8 top-[48px] cursor-pointer"
      >
        {open ? <Close /> : <Menu />}
      </div>
    </div>
  );
};

export default Header;
