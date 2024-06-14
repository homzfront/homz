import EmptyAvatar from "@/components/icons/emptyAvatar";
import LandLordInactiveStore from "@/store/landLordInactiveStore/landLordInactiveStore";
import useProfileStore from "@/store/profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopUpMenu = ({ user }) => {
  const { logout } = useProfileStore();
  const { showKindlyWait} = LandLordInactiveStore();
  return (
    <div className="drop-down absolute z-20 text-GrayHomz font-[500] top-12 right-[20px] border h-auto w-[244px] rounded-md bg-white flex flex-col items-center py-1 justify-around">
      <Link
        href={`/dashboard/property-owner/profile`}
        className={`flex gap-2 border-b w-full px-4 py-2 ${showKindlyWait ? "pointer-events-none" : ""}`}
      >
        {!user?.coverPhoto?.url ? (
              <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
              <EmptyAvatar />
            </div>
          ) : (
            <Image
              src={user?.coverPhoto?.url}
              alt=""
              width={40}
              height={40}
              layout="full" // Specify the desired height
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[40px] rounded-full"
              priority
            />
          )}
        <div className="flex flex-col w-full">
          <span className="font-[600] text-[14px] text-BlackHomz break-words w-[95%]">
            {user?.fullName}
          </span>
          <span className="font-[400] text-[11px] text-GrayHomz break-words w-[95%]">
            {user?.user?.email}
          </span>
        </div>
      </Link>
      <div className="p-2 w-full">
        {/* <Link
          href={"/dashboard/property-owner/notifications"}
          className="hover:bg-whiteblue h-[40px] rounded-md flex gap-1 items-center py-2 px-2 w-full text-GrayHomz hover:text-BlueHomz text-center"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/header/notification.png"}
            alt=""
            height={16}
            width={16}
          />
          <p className="text-[14px] font-[500]">
            Notification
          </p>
        </Link> */}
        <div
          onClick={() => logout(logout)}
          className=" cursor-pointer hover:bg-whiteblue hover:text-BlueHomz text-GrayHomz h-[40px] rounded-md flex gap-1 items-center py-2 px-2 w-full text-center"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/header/logout.png"}
            alt=""
            height={16}
            width={16}
          />
          <p

            className="text-[14px] font-[500]"
          >
            Logout
          </p>
        </div >
      </div>

    </div>
  );
};

export default PopUpMenu;
