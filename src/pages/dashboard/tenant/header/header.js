"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import PopUpMenuAlert from "./components/popUpMenuAlert";
import { tenantMe } from "@/api/tenantSevice";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import useClickOutside from "@/utils/clickOutside";
import useDisableBodyScroll from "@/utils/useDisableBodyScroll";
import SidebarMobile from "../sidebarMobile/sidebarHeader";
import Menu from "@/components/icons/Menu";
import PopNotification from "../notification/components/popNotification";
import tenantNotiReceive from "@/store/tenantStore/tenantNotiReceive";
import useBodyScroll from "@/utils/useBodyScroll";
import sortDataByStatusAndDate from "@/utils/sortByStatusAndDate";
import { updateTenantNoti } from "@/api/notification";


const Header = () => {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenu(false));
  const dropdownRefII = useClickOutside(() => setPopUpMenuTwo(false));
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState({});
  const [openAndClose, setOpenAndClose] = useState(false);

  const selectedData = (data) => {
    if (data) {
      fetchNoti();
      setSelectedId(data); // Update selectedId with the entire data object
      console.log("Selected Id:", data);
      updateTenantNoti(data?._id);
      // Delay toggling the openAndClose state
      setTimeout(() => {
        setOpenAndClose(true);
      }, 0);
    }
  };

  console.log("Selected Id:", selectedId);

  const closeMenu = () => {
    fetchNoti();
    setOpenAndClose(false);
  };

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

  const { data, loading, fetchData } = tenantProfile();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  
  const { data: noti, loading: laodingNoti, fetchData: fetchNoti } = tenantNotiReceive();

  useEffect(() => {
    fetchNoti(); // Fetch data on component mount
  }, []);

  const sortedData = sortDataByStatusAndDate(noti);
  console.log(sortedData);


  const unseen = sortedData?.filter((data) => data?.status === "unseen")

  const user = data;
  console.log(user);
  useDisableBodyScroll(open)
  useBodyScroll([openAndClose])

  return (
    <div className="header">
      {openAndClose && (
        <PopNotification selectedId={selectedId} closeMenu={closeMenu} />
      )}
      {open && (
        <div className="">
          <div className="absolute bg-white h-auto z-50 w-[100%]">
            <div className="flex justify-between items-center p-8">
              <div>
                <Image src="/homz.svg" width={86} height={18} alt="" />
              </div>
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
      <div className=" hidden md:flex justify-between items-center py-8 px-10 relative">
        {popUpMenuTwo && <PopUpMenuAlert
          selectedData={selectedData}
          Data={sortedData}
          // dropdownRef={dropdownRefII}
        />}
        <div className="">
        </div>
        <div className="flex gap-4 items-center ">
          <div onClick={handleToggleMenuTwo} className="cursor-pointer relative">
            <Image
              src={
                "/static/dashboard/enterprisemanager/header/notification.png"
              }
              alt=""
              height={25}
              width={24}
            />
                    <p
                  className={`absolute top-0 right-[2px] ${unseen?.length >= 1 ? "bg-error" : "bg-transparent"
                    } h-2 w-2 rounded-full`}
                ></p>
          </div>
          <div ref={dropdownRef} onClick={handleToggleMenu} className="relative cursor-pointer">
            {!user?.coverPhoto?.url ? (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                }
                alt=""
                width={40}
                height={40}
                className=""
              />
            ) : (
              <Image
                src={user?.coverPhoto?.url}
                alt=""
                height={40}
                width={40}
                className="rounded-full"
              />
            )}
            {popUpMenu && <PopUpMenu user={user} />}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;
