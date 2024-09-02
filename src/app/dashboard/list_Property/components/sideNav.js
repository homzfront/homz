"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "@/store/profile";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Logout from "@/components/icons/dashboard/logoutMain";
import Switch from "@/components/icons/dashboard/switch";
import Profile from "@/components/icons/dashboard/profile";
import PropertyListing from "@/components/icons/dashboard/propertyListing";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";

const Data = [
  {
    id: 1,
    image: <PropertyListing height="16" width="16" />,
    image2: (
      <PropertyListing
        className="text-BlueHomz fill-white"
        height="16"
        width="16"
      />
    ),
    link: "/dashboard/list_Property",
    name: "Property Listing",
    pathII: "/dashboard/list_Property/addProperty",
    pathIII: "/dashboard/list_Property/PreviewProperty",
    pathIV: "/dashboard/list_Property/edit_property",
    coming: null,
    active: false,
  },
  {
    id: 2,
    image: <Profile height="16" width="16" />,
    image2: (
      <Profile className="text-white fill-white" height="16" width="16" />
    ),
    link: "/dashboard/list_Property/Profile",
    name: "Profile",
    coming: null,
    active: false,
  },
];

const Data2 = [
  {
    id: 1,
    image: <Switch height="16" width="16" />,
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
    <div className="hidden min-w-[250px] sm:block ">
      <div className="shadow-lg fixed">
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
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
                  pathname === data.link ||
                  pathname === data.pathII ||
                  pathname === data.pathIII ||
                  pathname === data.pathIV
                    ? "bg-BlueHomz text-white"
                    : " hover:bg-blue-100"
                } ${
                  data.coming === null ? "" : "opacity-50 pointer-events-none"
                } `}
              >
                {pathname === data.link ||
                pathname === data.pathII ||
                pathname === data.pathIII ||
                pathname === data.pathIV ? (
                  <div>{data.image2}</div>
                ) : (
                  <div>{data.image}</div>
                )}
                <div className="flex items-center w-full justify-between">
                  <span className="">{data.name}</span>
                  <p
                    className={`${
                      data?.active === "true" ? "bg-error" : "bg-transparent"
                    } mt-1 h-2 w-2 rounded-full`}
                  ></p>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid gap-3 ">
            {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]
                ${
                  pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : "hover:text-white hover:bg-blue-300"
                } `}
              >
                {pathname === data.link ? <div></div> : <div>{data.image}</div>}
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
          <ConfirmationModal
            title="Are you leaving?"
            confirmatoryText="You’re about to exit your dashboard"
            optionText="Yes, log me out"
            optionText2="No, take me back"
            handleEvent={() => logout(logout)}
            cancel={closeLogout}
            isOpen={logoutModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
