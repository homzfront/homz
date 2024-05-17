import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarData, OtherSideNav } from "./sideBarData";
import Image from "next/image";
import keepThree from "@/utils/keepThree";
import ConfirmModalI from "./confirmModalI";
import useProfileStore from "@/store/profile";

const SideNav = () => {
  return (
    <div className="sidebar md:w-60 shadow-md bg-white h-screen border-r border-zinc-200 hidden md:flex md:pt-4 sideNav ">
      <div className="flex flex-col space-y-7 ">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 mt-4"
        >
          <span className="font-bold text-xl hidden md:flex">
            <div className="flex items-center space-x-4">
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
  const path = keepThree(pathname);

  const { logout } = useProfileStore();
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };
  return (
    <div className="">
      {
        item.title === "Logout" ? (
          <div
            onClick={logoutII}
            className={`flex flex-row space-x-4 items-center cursor-pointer p-2 rounded-lg fontSize ${item.path === path || item.pathII === path || item.pathIII === path || item.pathIV === path ? "bg-BlueHomz text-white" : "hover:bg-blue-100"
              }`}
          >
            {item.path === path || item.pathII === path || item.pathIII === path || item.pathIV === path
              ?
              <Image src={item.icon2} height={16} width={16} alt="img" className="icons" />
              :
              <Image src={item.icon} height={16} width={16} alt="img" className="icons" />

            }
            <span className=" text-xl flex fontSize">{item.title}</span>
          </div>
        ) : (
          <Link
            href={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg fontSize ${item.path === path || item.pathII === path || item.pathIII === path || item.pathIV === path ? "bg-BlueHomz text-white" : "hover:bg-blue-100"
              }`}
          >
            {item.path === path || item.pathII === path || item.pathIII === path || item.pathIV === path
              ?
              <Image src={item.icon2} height={16} width={16} alt="img" className="icons" />
              :
              <Image src={item.icon} height={16} width={16} alt="img" className="icons" />

            }
            <span className=" text-xl flex fontSize">{item.title}</span>
          </Link>
        )
      }
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
  );
};
