"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Menu from "../icons/Menu";
import Close from "../icons/Close";
import Image from "next/image";
import useProfileStore from "@/store/profile";
import { useEffect } from "react";


const Header = () => {
  const [open, setOpen] = useState(false);
  const { fetchProfile, user, loading, logout } = useProfileStore();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  console.log(user);
  const isUserPresent = user && Object.keys(user).length > 0;

  console.log(isUserPresent)
  
  // Function to extract username from email address
  const extractUsername = (userOrEmail) => {
    let email;
  
    if (typeof userOrEmail === 'string') {
      // If the input is a string, assume it's an email
      email = userOrEmail;
    } else if (userOrEmail && userOrEmail.email) {
      // If the input is an object with an 'email' property, use that email
      email = userOrEmail.email;
    } 
  
    // Split the email address by "@" to get an array
    const parts = email.split("@");
  
    // The username is the first part of the array (index 0)
    const username = parts[0];
  
    return username;
  };






  return (
    <div className="text-BlackHomz px-6 font-normal w-[147px] md:w-full md:flex justify-between text-[16px] max-w-[1160px] items-center  md:m-auto pt-12 shadow-m">
      <Link href={'/'}>
        <Image
          src={"/Homz_Logo_Blue.png"}
          alt="HOMZ"
          height={28}
          className="cursor-pointer "
          
          width={131}
        />
      </Link>
      <nav
        className={` sm:my-0 my-4 flex gap-14 md:items-center items-start flex-col md:flex-row ${
          open ? "block" : "hidden md:flex"
        }`}
      >
        <div className="mt-5 sm:text-[12px] lg:text-[16px] md:mt-0 flex gap-4 md:gap-5 lg:gap-10  flex-col md:flex-row">
          <Link href={"/"} className="hover:text-blue-400">
            Home
          </Link>
          <Link href={"/landingPage-PropertyOwner"} className="hover:text-blue-400"onClick={() => setOpen(false)}>
            Management
          </Link>
          <Link href={"/landing-page-property"} className="hover:text-blue-400 "onClick={() => setOpen(false)}>
            Enterprise
          </Link>
          <Link href={"/landing-page-tenant"} className="hover:text-blue-400 " onClick={() => setOpen(false)}>
            Tenant
          </Link>
          <Link href={""} className="hover:text-blue-400 " onClick={() => setOpen(false)}>
            List Property
          </Link>
        </div>

        <div
          className={`mt-[-30px] md:mt-0 md:text-[12px] lg:text-[16px] ml-0 md:ml-[-20px] lg:ml-0  md:flex md:justify-center space-y-4 md:space-y-0 items-center md:space-x-4 space-x-0 `}
        >
          {loading ? (
          <p>Loading...</p>
        ) : isUserPresent ? (
          <div className="flex items-center">
            <p className="mr-4">Welcome, {extractUsername(user)}!</p>
            <button
              onClick={() => logout(logout)}
              className="w-[97px] rounded-[4px]  text-white bg-BlueHomz2 h-[48px] py-1 hover:bg-blue-400"
            >
              Logout
            </button>
            {/* Add more user information or actions as needed */}
          </div>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-400">
              Sign in
            </Link>
            <Link
              href="/register"
              className="  w-[147px] rounded-[4px]  text-white bg-BlueHomz2 items-center flex justify-center h-[48px] py-1 hover:bg-blue-400"
            >
              Create Account
            </Link>
          </>
        )}
        </div>
      </nav>
      <div
        onClick={() => setOpen(!open)}
        className="md:hidden border absolute right-8 top-[48px] cursor-pointer"
      >
        {open ? <Close /> : <Menu />}
      </div>
    </div>
  );
};

export default Header;
