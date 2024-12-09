"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PopUpMenu from "./components/popUpMenu";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import useClickOutside from "@/utils/clickOutside";
import SidebarMobile from "../sidebarMobile/sidebarHeader";
import Menu from "@/components/icons/Menu";
import TrialWarning from "./components/trialWarning";
import calculateDaysLeft from "@/utils/trailEndDays";
import useHeaderStore from "@/store/useHeaderStore";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import Notification from "@/components/icons/notification";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [popUpMenu, setPopUpMenu] = useState(false);
  const popUpMenuTwo = useHeaderStore((state) => state.popUpMenuTwo);
  const headerOpenedOnce = useHeaderStore((state) => state.headerOpenedOnce);
  const setPopUpMenuTwo = useHeaderStore((state) => state.setPopUpMenuTwo);
  const setHeaderOpenedOnce = useHeaderStore((state) => state.setHeaderOpenedOnce);
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

  const dropdownRef = useClickOutside(() => setPopUpMenu(false));
  const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setPopUpMenu(!popUpMenu);
  };

  const handleToggleMenuTwo = () => {
    setPopUpMenuTwo(!popUpMenuTwo);
  };

  const closeMenu = () => {
    setPopUpMenuTwo(false);
  }

  const openSidebar = () => {
    setOpen(!open);
  };
  const closeSidebar = () => {
    setOpen(false);
  };

  const { data, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    if (!headerOpenedOnce) {
      // If header has not been opened once, set popUpMenuTwo to true
      setPopUpMenuTwo(true);
      // Set headerOpenedOnce to true to indicate that header has been opened once
      setHeaderOpenedOnce(true);
    } else {
      // If header has been opened once, set a timeout to make popUpMenuTwo true again after 3 hours
      const timeout = setTimeout(() => {
        setPopUpMenuTwo(true);
      }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds
      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [headerOpenedOnce, setHeaderOpenedOnce, setPopUpMenuTwo]);


  const user = data;

  const trialEndDate = user?.trialEndDate;
  const daysLeft = calculateDaysLeft(trialEndDate);

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const closeModal = () => {
    setShowLongLoadingMessage(false);
  };

  return (
    <div className="header relative">
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>
      {user?.trialEndDate && user?.PlanStatus !== "active" && (user?.planName === "Enterprise Free" || user?.planName === "Enterprise Trial") && popUpMenuTwo && <TrialWarning closeMenu={closeMenu} user={user} />}
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
        <Link href={"/"}>
          <Image src="/homz.svg" width={86} height={18} alt="" />
        </Link >
        <div className="cursor-pointer h-full " onClick={openSidebar}>
          <Menu />
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center py-8 px-10">
        <div className="">
        </div>
        <div className="flex gap-4 items-center relative">
          <div onClick={handleToggleMenuTwo} className={`cursor-pointer relative ${user?.trialEndDate && user?.PlanStatus !== "paid" ? "" : "hidden"}`}>
            <Notification />
            <p
              className={`absolute top-0 right-[2px] ${user?.trialEndDate ? "bg-error" : "bg-transparent"
                } h-2 w-2 rounded-full`}
            ></p>
          </div>
          <div ref={dropdownRef} onClick={handleToggleMenu} className="relative cursor-pointer">
            {!user?.businessLogo?.url ? (
              <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                <EmptyAvatar />
              </div>
            ) : (
              <Image
                src={user?.businessLogo?.url}
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
};

export default Header;
