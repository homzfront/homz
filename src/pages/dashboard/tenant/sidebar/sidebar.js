"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "@/store/profile";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Logout from "@/components/icons/dashboard/logoutMain";
import Dashboard from '@/components/icons/dashboard/dashboard'
import Maintenance from '@/components/icons/dashboard/maintenance '
import Payment from '@/components/icons/dashboard/payment'
import PropertyManagement from '@/components/icons/dashboard/propertyManagement'
import Settings from '@/components/icons/dashboard/settings'
import Support from '@/components/icons/dashboard/support'
import Switch from '@/components/icons/dashboard/switch'
import Profile from "@/components/icons/dashboard/profile";

const Data = [
  {
    id: 1,
    image: <Dashboard height="16" width="16"/>,
    image2: <Dashboard className='text-white fill-white' height="16" width="16"/>,
    link: "/dashboard/tenant/dashboard",
    name: "Dashboard",
    coming: null,
    active: false,
  },
  {
    id: 2,
    image: <PropertyManagement height="16" width="16"/>,
    image2: <PropertyManagement className='text-BlueHomz fill-white' height="16" width="16"/>,
    link: "/dashboard/tenant/estateInformation",
    name: "Property Information",
    coming: null,
    active: false,
  },

  // {
  //   id: 3,
  //   image: <Payment height="16" width="16"/>,
  //   image2: <Payment className='text-BlueHomz fill-white' height="16" width="16"/>,
  //   link: "/dashboard/tenant/finance",
  //   name: "Finance",
  //   coming: null,
  //   active: false,
  // },
  {
    id: 4,
    image: <Maintenance height="16" width="16"/>,
    image2: <Maintenance className='text-white fill-white' height="16" width="16"/>,
    link: "/dashboard/tenant/maintenance",
    name: "Maintenance",
    coming: null,
    active: false,
  },
  {
    id: 5,
    image: <Support height="16" width="16"/>,
    image2: <Support className='text-white fill-white' height="16" width="16"/>,
    link: "/dashboard/tenant/support",
    name: "Support",
    coming: null,
    active: false,
  },
  {
    id: 6,
    image: <Profile height="16" width="16"/>,
    image2: <Profile className='text-white fill-white' height="16" width="16"/>,
    link: "/dashboard/tenant/profile",
    name: "Profile",
    coming: null,
    active: false,
  },
];

const Data2 = [

  // {
  //   id: 2,
  //   image: <Settings />,
  // image2: <Settings className='text-white' />,
  //   link: "/dashboard/tenant/setting",
  //   name: "Setting",
  // },
];

const Data3 = [
  {
    id: 1,
    image: <Switch height="16" width="16"/>,
    link: "/switch-profile",
    name: "Switch",
  },
];


const Sidebar = () => {
  const path = usePathname();
  const pathname = keepThree(path);
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };

  const { logout } = useProfileStore();

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="m-auto h-[70px] px-6 flex flex-col justify-end">
          <Link href={"/"}>
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={28}
              width={131}
              priority
              alt="img"
            />
          </Link>
        </div>
        <div className="w-full h-[1024px] px-6 flex flex-col gap-8 mt-14">
          <div className="grid gap-3 ">
            {Data.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${pathname === data.link
                  ? "bg-BlueHomz text-white"
                  : " hover:bg-blue-100"
                  } ${data.coming === null ? "" : "opacity-50 pointer-events-none"
                  } `}
              >
                {pathname === data.link ? (
                  <div>
                    {data.image2}
                  </div>
                ) : (
                  <div>
                    {data.image}
                  </div>
                )}
                <div className="flex items-center w-full justify-between">
                  <span className="">{data.name}</span>
                  <p className={`${data?.active === "true" ? "bg-error" : "bg-transparent"
                    } mt-1 h-2 w-2 rounded-full`}
                  ></p>
                </div>
              </Link>
            ))}
          </div>{" "}
          <div className="grid gap-3 ">
            {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] 
                ${pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <div>
                    {data.image2}
                  </div>
                ) : (
                  <div>
                    {data.image}
                  </div>
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
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]
                ${pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <div>
                    {/* {data.image2} */}
                  </div>
                ) : (
                  <div>
                    {data.image}
                  </div>
                )}
                <span className="">{data.name}</span>
              </Link>
            ))}
            <div
              onClick={logoutII}
              className={`h-[40px] px-2 cursor-pointer flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]hover:text-white hover:bg-blue-300
                 `}
            >
              <Logout />
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
  );
};

export default Sidebar;
