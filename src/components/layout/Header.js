"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Menu from "../icons/Menu";
import Close from "../icons/Close";
import Image from "next/image";
import useProfileStore from "@/store/profile";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import LoadingTable from "../mainmenu/loadingTable";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { fetchProfile, profile, loading, logout } = useProfileStore();
  const path = usePathname();
  const pathname = keepThree(path);
  const [isLoading, setIsLoading] = useState(false); // Internal loading state


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
    }
  }, [profile]);

  const isUserPresent = profile && Object.keys(profile).length > 0;


  // Function to extract username from email address
  const extractUsername = (userOrEmail) => {
    if (userOrEmail) {
      let email;
      if (typeof userOrEmail === "string") {
        // If the input is a string, assume it's an email
        email = userOrEmail;
      } else if (userOrEmail && userOrEmail.email) {
        // If the input is an object with an 'email' property, use that email
        email = userOrEmail.email;
      } else if (userOrEmail?.user?.email) {
        email = userOrEmail?.user?.email
      }

      // Split the email address by "@" to get an array
      const parts = email?.split("@");

      // The username is the first part of the array (index 0)
      const username = parts[0];

      return username;
    } else {
      return;
    }
  };

  function determineUserDashboard(profile) {
    let user;


    if (typeof user === "string") {
      // If the input is a string, assume it's an email
      user = profile;
    } else if (profile && profile?.isVerified) {
      user = profile
    }
    else if (profile?.user && profile?.user?.isVerified) {
      user = profile?.user
    }
    if (user?.isVerified && user?.accounts.length === 0) {
      return "/select-plan"; // Redirect to select plan for verified users with no accounts
    } else if (user?.accounts?.[0].name === "TENANT") {
      return "/dashboard/tenant/dashboard";
    } else if (user?.accounts?.[0].name === "ENTERPRISE_PLAN") {
      return "/dashboard/enterprise-property/dashboard";
    } else if (user?.accounts?.[0].name === "MANAGE_PROPERTY") {
      return "/dashboard/property-owner/dashboard";
    } else if (user?.accounts?.[0].name === "LIST_PROPERTY") {
      return "/dashboard/list_Property";
    } else {
      return '/'; // No specific dashboard identified
    }

  }

  return (
    <div className="text-BlackHomz px-6 font-normal w-[147px] md:w-full md:flex justify-between text-[16px] max-w-[1160px] items-center  md:m-auto pt-12 shadow-m">
      <Link href={"/"}>
        <Image
          src={"/Homz_Logo_Blue.png"}
          alt="HOMZ"
          height={28}
          className="cursor-pointer "
          width={131}
        />
      </Link>
      <nav
        className={` sm:my-0 my-4 flex gap-14 md:items-center items-start flex-col md:flex-row ${open ? "block" : "hidden md:flex"
          }`}
      >
        <div className="mt-5 text-[12px] lg:text-[16px] md:mt-0 flex gap-4 md:gap-5 lg:gap-10  flex-col md:flex-row">
          <Link href={"/"} className={`hover:text-blue-400 ${pathname === "/" || pathname === "/user_homepage/PropertyListing"  || pathname === "/user_homepage/PreviewProperty" || pathname === "/user_homepage" ? "text-BlueHomz" : ""}`}>
            Home
          </Link>
          <Link
            href={"/landingPage-PropertyOwner"}
            className={`hover:text-blue-400   ${pathname === "/landingPage-PropertyOwner" ? "text-BlueHomz" : ""}`}
            // href={"/"}
            onClick={() => setOpen(false)}
          >
            Management
          </Link>
          <Link
            href={"/landing-page-property"}
            // href={""}
            className={`hover:text-blue-400 ${pathname === "/landing-page-property" ? "text-BlueHomz" : ""}`}
            onClick={() => setOpen(false)}
          >
            Enterprise
          </Link>
          <Link
            href={"/landing-page-tenant"}
            // href={""}
            className={`hover:text-blue-400 ${pathname === "/landing-page-tenant" ? "text-BlueHomz" : ""}`}
            onClick={() => setOpen(false)}
          >
            Tenant
          </Link>
          {/* <Link
            href={"/"}
            className="hover:text-blue-400 "
            onClick={() => setOpen(false)}
          >
            List Property
          </Link> */}
        </div>
      </nav>
      <div
        className={`mt-[20px] md:mt-0 md:text-[12px] lg:text-[16px] ml-0 md:ml-[-20px] lg:ml-0  md:flex md:justify-center space-y-4 md:space-y-0 items-center md:space-x-4 space-x-0  ${open ? "block" : "hidden md:flex"
          } `}
      >
        {isLoading ? (
          <div className="w-full justify-center items-center">
            {
              profile ?
                <div className={`flex items-center ${open ? "flex  flex-col gap-4 items-start" : "gap-2"}`}>
                  <Link href={profile ? determineUserDashboard(profile) : "/"}>
                    <p className={`w-full ${open ? "text-[12px] " : ""}`}>Hi, {extractUsername(profile)}!</p>
                  </Link>
                  <button
                    onClick={() => logout(logout)}
                    className={`w-[110px] rounded-[4px] px-2 text-white bg-BlueHomz h-[48px] py-1 hover:bg-blue-400 ${open ? "text-[12px]" : ""}`}
                  >
                    Logout
                  </button>
                  {/* Add more user information or actions as needed */}
                </div>
                :
                <div className="w-full justify-center items-center">
                  {/* <LoadingTable />  */}
                </div>
            }
          </div>
        ) : (
          <>
            <Link
              href="/login"
              // href={"https://forms.gle/aCwKh8aW7goPoRGWA"}
              // href={""}
              className={`hover:text-blue-400 ${open ? "text-[12px]" : ""}`}>
              Sign in

            </Link>
            <Link
              href="/register"
              //  href={"https://forms.gle/aCwKh8aW7goPoRGWA"}
              className={`  w-[147px] rounded-[4px]  text-white bg-BlueHomz items-center flex justify-center h-[48px] py-1 hover:bg-blue-400 ${open ? "text-[12px] " : ""}`}
            >
              Create Account
              {/* Join Waitlist */}
            </Link>
          </>
        )}
      </div>
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