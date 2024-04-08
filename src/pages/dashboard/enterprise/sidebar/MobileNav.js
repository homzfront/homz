"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "/src/store/profile";

const MobileNav = ({ closeBars }) => {
  const Data = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/dashboard.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/dashboardwhite.png",
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
      link: "/dashboard/enterprise-property/tenants",
      name: "Tenants",
      coming: null,
      active: false,
    },
    {
      id: 3,
      image: "/static/dashboard/enterprisemanager/sidebar/estatedark.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/estates.png",
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: "/static/dashboard/enterprisemanager/sidebar/buliding.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/bulidingwhite.png",
      link: "/dashboard/enterprise-property/propertylisting",
      name: "Property Listing",
      coming: null,
      active: false,
    },
    {
      id: 5,
      image: "/static/dashboard/enterprisemanager/sidebar/card.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/cardwhite.png",
      link: "/dashboard/enterprise-property/payments",
      name: "Payments",
      coming: null,
      active: false,
    },
    {
      id: 6,
      image: "/static/dashboard/enterprisemanager/sidebar/RequestBlack.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/Request.png",
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: false,
    },
    {
      id: 7,
      image: "/static/dashboard/enterprisemanager/sidebar/maintenance.png",
      image2:
        "/static/dashboard/enterprisemanager/sidebar/maintenanceWhite.png",
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: false,
    },
    {
      id: 8,
      image: "/static/dashboard/enterprisemanager/sidebar/call.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/callwhite.png",
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/profile.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/profilewhite.png",
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/setting.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/settingwhite.png",
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  const { logout } = useProfileStore();

  const [pathname, setPathname] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };

  useEffect(() => {
    // Function to get the current URL
    const url = () => {
      if (typeof window !== "undefined") {
        return window.location.href;
      }
      return "";
    };

    const extractPathname = (url) => {
      const parsedUrl = new URL(url);
      let pathname = parsedUrl.pathname;

      // Split the pathname into segments
      const segments = pathname.split("/").filter(Boolean); // Remove empty segments

      // Keep only the first three segments
      const firstThreeSegments = segments.slice(0, 3);

      // Join the segments back to form the updated pathname
      pathname = `/${firstThreeSegments.join("/")}`;

      return pathname;
    };

    setPathname(extractPathname(url()));
  }, []);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = logoutModal ? "hidden" : "auto";
    if (logoutModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [logoutModal]);

  // console.log(pathname);
  const [close, setClose] = useState(true);

  return (
    <div className={close ? "mobileNav " : "hidden"}>
      <div className="shadow-lg">
        <div className=" pb-3 px-6 flex flex-col justify-around">
          <div className=" flex justify-between items-center pt-3">
            <div>
              <Link href={"/"}>
                <Image
                  src={"/Homz_Logo_Blue.png"}
                  height={20}
                  width={100}
                  priority
                  alt="img"
                />
              </Link>
            </div>
            <button
              className="md:hidden bg-stone-300 rounded-md p-1"
              onClick={() => closeBars(!close)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex py-[15px] bg-stone-100 rounded-md mt-5 justify-between items-center">
            <div className="">
              <Link href={""} className="relative">
                <p className="inline pl-1">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/header/Avatar.png"
                    }
                    alt=""
                    height={41}
                    width={40}
                    className="rounded-full inline-block pr-2"
                  />
                  Victor
                </p>
                {/* {popUpMenu && <PopUpMenu />} */}
              </Link>
            </div>
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-3 md:bg-white md:gap-0">
            <div className="grid gap-3 pt-3 px-3 bg-stone-100 rounded-md md:bg-white">
              {Data.map((data) => (
                <Link
                  key={data.id}
                  href={data.link}
                  className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
                    data.name === "Property Management" ? "h-[60px]" : ""
                  } ${
                    pathname === data.link
                      ? "bg-BlueHomz text-white"
                      : " hover:bg-blue-100"
                  } ${
                    data.coming === null ? "" : "opacity-50 pointer-events-none"
                  } `}
                >
                  {pathname === data.link ? (
                    <Image src={data.image2} height={16} width={16} alt="img" />
                  ) : (
                    <Image src={data.image} height={16} width={16} alt="img" />
                  )}
                  <span>
                    <span className="pr-1">{data.name}</span>
                    <span className="text-Success mt-[1px] font-[300] text-[12px]">
                      {data.coming}
                    </span>
                  </span>
                </Link>
              ))}
            </div>{" "}
            <div className="grid gap-3 px-3 bg-stone-100 rounded-md md:bg-white">
              {Data2.map((data) => (
                <Link
                  key={data.id}
                  href={data.link}
                  className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
                    pathname === data.link
                      ? "bg-BlueHomz text-white"
                      : "hover:text-white hover:bg-blue-300"
                  } `}
                >
                  {pathname === data.link ? (
                    <Image src={data.image2} height={16} width={16} alt="img" />
                  ) : (
                    <Image src={data.image} height={16} width={16} alt="img" />
                  )}
                  <span className="">{data.name}</span>
                </Link>
              ))}
            </div>
            <div className="grid gap-3 px-3 bg-stone-100 rounded-md md:bg-white">
              {Data3.map((data) => (
                <Link
                  key={data.id}
                  href={data.link}
                  className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
                    pathname === data.link
                      ? "bg-BlueHomz text-white"
                      : "hover:text-white hover:bg-blue-300"
                  } `}
                >
                  {pathname === data.link ? (
                    <Image src={data.image2} height={16} width={16} alt="img" />
                  ) : (
                    <Image src={data.image} height={16} width={16} alt="img" />
                  )}
                  <span className="">{data.name}</span>
                </Link>
              ))}
              <div
                onClick={logoutII}
                className={`h-[40px] px-2 cursor-pointer flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]hover:text-white hover:bg-blue-300
                 `}
              >
                <Image
                  src="/static/dashboard/enterprisemanager/sidebar/logout.png"
                  height={16}
                  width={16}
                  alt="img"
                />
                <span className="">Logout</span>
              </div>
            </div>
            {logoutModal && (
              <ConfirmModalI
                header={"Are you leaving?"}
                body={"You’re about to exit your dashboard"}
                button={"Yes, log me out"}
                buttonTwo={"No, take me back"}
                returnHome={() => logout(logout)}
                returnHomeTwo={closeLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
