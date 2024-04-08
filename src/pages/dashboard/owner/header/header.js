"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";
import useProfileOwnerMe from "@/store/propertyOwnerStore/useProfileOwnerMe";
import useClickOutside from "@/utils/clickOutside";
import Menu from "@/components/icons/Menu";
import SidebarMobile from "../sidebarMobile/sidebarHeader";
import useDisableBodyScroll from "@/utils/useDisableBodyScroll";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import Notification from "@/components/icons/notification";


const Header = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenu(false)); // Use the custom hook
  const dropdownRefII = useClickOutside(() => setPopUpMenuTwo(false));

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(prevState => !prevState);
  };

  const openSidebar = () => {
    setOpen(!open);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  const { data, loading, fetchData } = useProfileOwnerMe();

  useEffect(() => {
    fetchData();
  }, []);

  const user = data;
  useDisableBodyScroll(open)

  return (
    <div className="header">
      {open && (
        <div className="">
          <div className="absolute bg-white h-auto z-50 w-[100%]">
            <div className="flex justify-between items-center p-8">
              <Link href={"/"}>
                <Image src="/homz.svg" width={86} height={18} alt="" />
              </Link >
              <div className="cursor-pointer" onClick={closeSidebar}>
                <Image src="/close.svg" width={16} height={16} alt="" />
              </div>
            </div>
            <div>
              <SidebarMobile user={user} setOpen={setOpen} />
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden w-full flex justify-between items-center p-8">
        <div>
          <Image src="/homz.svg" width={86} height={18} alt="" />
        </div>
        <div className="cursor-pointer h-full " onClick={openSidebar}>
          <Menu />
        </div>
      </div>
      <div className=" hidden md:flex justify-between items-center py-8 px-10">
        <div className="">
        </div>
        <div className="flex gap-4 items-center relative">
          <div onClick={handleToggleMenuTwo} className="cursor-pointer hidden" >
            <Notification />
            {popUpMenuTwo && <PopUpMenuAlert />}
          </div>
          <div ref={dropdownRef} onClick={() => setPopUpMenu(prevState => !prevState)} className="relative cursor-pointer">
            {!user?.coverPhoto?.url ? (
              <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                <EmptyAvatar />
              </div>
            ) : (
              <Image
                src={user?.coverPhoto?.url}
                alt=""
                height={40}
                width={40}
                layout="full" // Specify the desired height
                objectFit="cover"
                objectPosition="center"
                className="object-cover bg-center h-[40px] rounded-full"
                quality={100}
                priority
              />
            )}
            {popUpMenu && <PopUpMenu user={user} />}
          </div>
        </div>
      </div>
    </div>
  );

  //   <div className="header  w-[1147px]">
  //     {open && (
  //       <div>
  //         <div className="absolute h-screen bg-white z-10 w-[100%]">
  //           <div className="mt-8 flex justify-between px-8">
  //             <p>Dashboard</p>
  //             <div className="cursor-pointer" onClick={closeSidebar}>
  //               <Close />
  //             </div>
  //           </div>
  //           <SidebarMobile setOpen={setOpen}/>
  //         </div>
  //       </div>
  //     )}
  //     <div className="md:hidden w-[412px] flex justify-between p-8">
  //       <div>
  //         <Image
  //           src={"/static/images/Homz_5.png"}
  //           alt=""
  //           height={18}
  //           width={87}
  //         />
  //       </div>
  //       <div className="cursor-pointer" onClick={openSidebar}>
  //         <Menu />
  //       </div>
  //     </div>
  //     <div className=" hidden md:flex justify-between items-center py-8 px-10">
  //       <div className="relative">
  //         <input
  //           type="text"
  //           className="border h-[40px] pl-8 rounded-md w-[320px]"
  //           placeholder="search"
  //         />
  //         <Image
  //           src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
  //           alt=""
  //           className="absolute top-3 left-3"
  //           height={17}
  //           width={16}
  //         />
  //       </div>
  //       <div className="flex gap-4 items-center relative">
  //         <div onClick={handleToggleMenuTwo} className="cursor-pointer">
  //           <Image
  //             src={
  //               "/static/dashboard/enterprisemanager/header/notification.png"
  //             }
  //             alt=""
  //             height={25}
  //             width={24}
  //           />
  //           {popUpMenuTwo && <PopUpMenuAlert />}
  //         </div>
  //         <Link href={"/dashboard/property-owner/letterHead"}>
  //           <Image
  //             src={"/static/dashboard/enterprisemanager/header/sms.png"}
  //             alt=""
  //             height={25}
  //             width={24}
  //           />
  //         </Link>
  //         <Link href={""} onClick={handleToggleMenu} className="relative">
  //           <Image
  //             src={"/static/dashboard/enterprisemanager/header/Avatar.png"}
  //             alt=""
  //             height={41}
  //             width={40}
  //             className="rounded-full"
  //           />
  //           {popUpMenu && <PopUpMenu />}
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Header;
