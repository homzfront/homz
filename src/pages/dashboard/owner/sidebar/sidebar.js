"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "@/store/profile";
import LandLordInactiveStore from "@/store/landLordInactiveStore/landLordInactiveStore";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Logout from '@/components/icons/dashboardMobile/logoutMain'
import { Data, Data2, Data3 } from "./sidebarData";

const Sidebar = () => {
  const { showKindlyWait } = LandLordInactiveStore();
  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="w-full h-[1024px] px-6 flex flex-col justify-around">
          <div>
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
          <div className={`grid gap-3 ${showKindlyWait ? "pointer-events-none" : ""}`}>
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
          <div className={`grid gap-3 ${showKindlyWait ? "pointer-events-none" : ""}`}>
          {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md text-GrayHomz text-[16px] font-[500] 
                ${
                  data.name === "Setting" ? "gap-[4px]" : "gap-[12px]"
                }
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
          <div className={`grid gap-3 ${showKindlyWait ? "pointer-events-none" : ""}`}>
          {Data3.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[7px] text-GrayHomz text-[16px] font-[500]
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
