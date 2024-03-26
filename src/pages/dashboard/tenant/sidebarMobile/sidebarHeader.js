"use client"
import Dashboard from '@/components/icons/dashboardMobile/dashboard'
import Logout from '@/components/icons/dashboardMobile/logout'
import Maintenance from '@/components/icons/dashboardMobile/maintenance '
import Message from '@/components/icons/dashboardMobile/message'
import Notifications from '@/components/icons/dashboardMobile/notifications'
import Payment from '@/components/icons/dashboardMobile/payment'
import PropertyListing from '@/components/icons/dashboardMobile/propertyListing'
import PropertyManagement from '@/components/icons/dashboardMobile/propertyManagement'
import Requests from '@/components/icons/dashboardMobile/requests'
import RightArrow from '@/components/icons/dashboardMobile/rightArrow'
import Settings from '@/components/icons/dashboardMobile/settings'
import Support from '@/components/icons/dashboardMobile/support'
import Switch from '@/components/icons/dashboardMobile/switch'
import Tenants from '@/components/icons/dashboardMobile/tenants'
import useProfileStore from '@/store/profile'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SidebarMobile = ({ setOpen, user }) => {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    // Function to get the current URL
    const url = () => {
      if (typeof window !== "undefined") {
        return window.location.href;
      }
      return "";
    };

    const extractPathname = (url) => {
      const parsedUrl = new URL(url);
      let pathname = parsedUrl.pathname;

      // Split the pathname into segments
      const segments = pathname.split("/").filter(Boolean); // Remove empty segments

      // Keep only the first three segments
      const firstThreeSegments = segments.slice(0, 3);

      // Join the segments back to form the updated pathname
      pathname = `/${firstThreeSegments.join("/")}`;

      return pathname;
    };

    setPathname(extractPathname(url()));
  }, []);

  const { logout } = useProfileStore();

  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className='bg-inputBg rounded-[8px]'>
        <div
          className="w-full flex justify-between items-center px-4 py-2"
        >
          <div className="flex gap-4 items-center">
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
            <span className="font-[500] text-[16px] text-GrayHomz">
              {user?.fullName}
            </span>
          </div>
          <Link
            href={`/dashboard/tenant/profile`}>
            <RightArrow />
          </Link>
        </div>
      </div>
      <div className='p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]'>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/dashboard"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/tenant/dashboard" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/dashboard"
                ?
                <div>
                  <Dashboard className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Dashboard />
                </div>
            }
          </div>
          <p className=''>Dashboard</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/estateInformation"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/tenant/estateInformation" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/estateInformation"
                ?
                <div>
                  <PropertyManagement className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <PropertyManagement />
                </div>
            }
          </div>
          <p className=''> Property Information</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/finance"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/tenant/finance" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/finance"
                ?
                <div>
                  <Payment className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Payment />
                </div>
            }
          </div>
          <p className=''>Finance</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/maintenance"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/tenant/maintenance" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/maintenance"
                ?
                <div>
                  <Maintenance className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Maintenance />
                </div>
            }
          </div>
          <p className=''> Maintenance</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/tenant/support"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/tenant/support" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/support"
                ?
                <div>
                  <Support className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Support />
                </div>
            }
          </div>
          <p className=''> Support</p>
        </Link>

      </div>
 
      <div className='p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]'>
        <div onClick={() => logout(logout)} className='hover:bg-white cursor-pointer w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'>
          <Logout />
          <p className='text-red-500'>Logout</p>
        </div>
      </div>

    </div>
  )
}

export default SidebarMobile