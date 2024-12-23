"use client";
import React, { useEffect } from "react";
import Dashboard from "@/components/icons/dashboard/dashboard";
import Logout from "@/components/icons/dashboard/logout";
import Maintenance from "@/components/icons/dashboard/maintenance ";
import Payment from "@/components/icons/dashboard/payment";
import PropertyManagement from "@/components/icons/dashboard/propertyManagement";
import RightArrow from "@/components/icons/dashboard/rightArrow";
import Support from "@/components/icons/dashboard/support";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import useProfileStore from "@/store/profile";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Switch from "@/components/icons/dashboardMobile/switch";
import TenantAccessControl from "@/components/icons/dashboard/tenantAccessControl";
import tenantProfile from "@/store/tenantStore/tenantProfile";

const SidebarMobile = ({ setOpen, user }) => {
  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();
  const { data, fetchData } = tenantProfile();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className="bg-inputBg rounded-[8px]">
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="flex gap-4 items-center">
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
                className=" object-cover bg-center h-[40px] rounded-full"
                quality={100}
                priority
              />
            )}
            <span className="font-[500] text-[16px] text-GrayHomz">
              {user?.fullName}
            </span>
          </div>
          <Link href={`/dashboard/tenant/profile`}>
            <RightArrow />
          </Link>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]">
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/dashboard"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/dashboard"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/tenant/dashboard" ? (
              <div>
                <Dashboard className="text-BlueHomz fill-BlueHomz" />
              </div>
            ) : (
              <div>
                <Dashboard />
              </div>
            )}
          </div>
          <p className="">Dashboard</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/estateInformation"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/estateInformation"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/tenant/estateInformation" ? (
              <div>
                <PropertyManagement className="text-BlueHomz fill-BlueHomz" />
              </div>
            ) : (
              <div>
                <PropertyManagement />
              </div>
            )}
          </div>
          <p className=""> Property Information</p>
        </Link>
        {data?.enterPriseId && (
          <Link
            onClick={() => setOpen(false)}
            href="/dashboard/tenant/accessControl"
            className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/accessControl"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
          >
            <div>
              {pathname === "/dashboard/tenant/accessControl" ? (
                <div>
                  <TenantAccessControl className="text-BlueHomz fill-BlueHomz" />
                </div>
              ) : (
                <div>
                  <TenantAccessControl />
                </div>
              )}
            </div>
            <p className="">Access Control</p>
          </Link>
        )}
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/finance"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/finance"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/tenant/finance" ? (
              <div>
                <Payment className="text-BlueHomz fill-BlueHomz" />
              </div>
            ) : (
              <div>
                <Payment />
              </div>
            )}
          </div>
          <p className="">Finance</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/maintenance"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/maintenance"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/tenant/maintenance" ? (
              <div>
                <Maintenance className="text-BlueHomz fill-BlueHomz" />
              </div>
            ) : (
              <div>
                <Maintenance />
              </div>
            )}
          </div>
          <p className=""> Maintenance</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/support"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${
            pathname === "/dashboard/tenant/support"
              ? "bg-white text-BlueHomz"
              : "text-GrayHomz"
          } hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/tenant/support" ? (
              <div>
                <Support className="text-BlueHomz fill-BlueHomz" />
              </div>
            ) : (
              <div>
                <Support />
              </div>
            )}
          </div>
          <p className=""> Support</p>
        </Link>
        <Link
          href={"/switch-profile"}
          onClick={() => setOpen(false)}
          className="text-GrayHomz w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4"
        >
          <Switch />
          <p className=""> Switch</p>
        </Link>
      </div>

      <div className="p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]">
        <div
          onClick={() => logout(logout)}
          className="hover:bg-white cursor-pointer w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4"
        >
          <Logout />
          <p className="text-red-500">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
