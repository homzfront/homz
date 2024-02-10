import useProfileStore from "@/store/profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopUpMenu = ({ user }) => {
  const { logout } = useProfileStore();
  return (
    <div className="drop-down absolute z-20 text-GrayHomz font-[500] top-12 right-0 border h-[250px] w-[244px] rounded-md bg-white flex flex-col items-center justify-around">
      <Link
        href={`/dashboard/enterprise-property/profile`}
        className="flex gap-1 border-b w-full px-4 py-2"
      >
        <Image
          src={user?.businessLogo?.url}
          alt=""
          height={41}
          width={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-[600] text-[14px] text-BlackHomz">
            {user?.fullName}
          </span>
          <span className="font-[400] text-[11px] text-GrayHomz">
            {user?.user?.email}
          </span>
        </div>
      </Link>
      <Link
        href={"/dashboard/enterprise-property/notifications"}
        className="cursor-pointer hover:bg-whiteblue h-[40px] rounded-md flex gap-1 items-center  py-2 px-4 w-full  text-center"
      >
        <Image
          src={"/static/dashboard/enterprisemanager/header/notification.png"}
          alt=""
          height={16}
          width={16}
        />
        <p className="text-[14px] font-[500] text-GrayHomz hover:text-BlueHomz">
          Notification
        </p>
      </Link>
      <Link
        href={"/dashboard/enterprise-property/setting"}
        className="cursor-pointer hover:bg-whiteblue h-[40px] rounded-md   flex gap-1 items-center  py-2 px-4 w-full  text-center"
      >
        <Image
          src={"/static/dashboard/enterprisemanager/header/setting-2.png"}
          alt=""
          height={16}
          width={16}
        />
        <p className="text-[14px] font-[500] text-GrayHomz hover:text-BlueHomz">
          Settings
        </p>
      </Link>
      <Link
        href={""}
        className=" cursor-pointer hover:bg-whiteblue h-[40px] rounded-md   flex gap-1  items-center py-2  px-4 w-full  text-center"
      >
        <Image
          src={"/static/dashboard/enterprisemanager/header/logout.png"}
          alt=""
          height={16}
          width={16}
        />
        <p
          onClick={() => logout(logout)}
          className="text-[14px] font-[500] text-GrayHomz hover:text-BlueHomz"
        >
          Logout
        </p>
      </Link>
    </div>
  );
};

export default PopUpMenu;
