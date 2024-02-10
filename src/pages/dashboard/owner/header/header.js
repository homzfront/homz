"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";
import Close from "@/components/icons/Close";
import Menu from "@/components/icons/Menu";
import SidebarMobile from "../../enterprise/sidebarMobile/sidebarHeader";
import useProfileStore from "@/store/profile";
import { propertyMe } from "@/api/propertyService";

const Header = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUSer] = useState('')
  const { logout } = useProfileStore();

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  const openSidebar = () => {
    setOpen(!open);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await propertyMe();
        setUSer(response?.data);
      } catch (error) {
        // Handle errors if the fetch fails
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
console.log(user);

  return (
    <div className="header w-[1147px]">
    <div className="flex justify-between items-center py-8 px-10">
      <div className="relative">
        {/* <input
          type="text"
          className="border h-[40px] pl-8 rounded-md w-[320px]"
          placeholder="search"
        /> */}
{/*          
          <Image
            src={
              "/static/dashboard/enterprisemanager/header/search-normal.png"
            }
            alt=""
            className="absolute top-3 left-3"
            height={17}
            width={16}
          /> */}
 
      </div>
      <div className="flex gap-4 items-center relative">
        <div onClick={handleToggleMenuTwo} className="cursor-pointer">
          <Image
            src={
              "/static/dashboard/enterprisemanager/header/notification.png"
            }
            alt=""
            height={25}
            width={24}
          />
          {popUpMenuTwo && <PopUpMenuAlert />}
        </div>
        {/* <Link href={"/dashboard/enterprise-property/letterHead"}>
          <Image
            src={"/static/dashboard/enterprisemanager/header/sms.png"}
            alt=""
            height={25}
            width={24}
          />
        </Link> */}
        <Link href={""} onClick={handleToggleMenu} className="relative">
          <Image
            src={user?.businessLogo?.url}
            alt=""
            height={41}
            width={40}
            className="rounded-full"
          />
          {popUpMenu && <PopUpMenu logout={logout} user={user}/>}
        </Link>
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
