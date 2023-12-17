"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
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
      name: "Estates",
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
      image: "/static/dashboard/enterprisemanager/sidebar/application.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/application.png",
      link: "",
      name: "Applications",
      coming: "Coming soon",
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
      link: "",
      name: "Switch",
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/logout.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/logout.png",
      link: "",
      name: "Logout",
    },
  ];

  const [pathname, setPathname] = useState("");

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
  console.log(pathname);

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="w-full h-[1024px] px-6 flex flex-col justify-around">
          <div>
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={28}
              width={131}
              priority
              alt="img"
            />
          </div>
          <div className="grid gap-3 ">
            {Data.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
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
          <div className="grid gap-3 ">
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
          <div className="grid gap-3 ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
