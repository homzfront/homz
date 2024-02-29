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
import usePathName from '@/utils/usePathName'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SidebarMobile = ({ setOpen, user, open }) => {
  const pathname = usePathName();
  const { logout } = useProfileStore();

  console.log(pathname)

  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className='bg-inputBg rounded-[8px]'>
        <div
          className="w-full flex justify-between items-center px-4 py-2"
        >
          <div className="flex gap-4 items-center">
            {!user?.businessLogo?.url ? (
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
                src={user?.businessLogo?.url}
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
            href={`/dashboard/enterprise-property/profile`}>
            <RightArrow />
          </Link>
        </div>
      </div>
      <div className='p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]'>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/dashboard"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/dashboard" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/dashboard"
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
          href={"/dashboard/enterprise-property/tenants"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/tenants" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/tenants"
                ?
                <div>
                  <Tenants className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Tenants />
                </div>
            }
          </div>
          <p className=''>Tenants</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/estates"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/estates" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/estates"
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
          <p className=''> Property Management</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/propertylisting"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/propertylisting" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/propertylisting"
                ?
                <div>
                  <PropertyListing className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <PropertyListing />
                </div>
            }
          </div>
          <p className=''> Property Listing</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/payments"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/payments" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/payments"
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
          <p className=''>Payments</p>
        </Link>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/request"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/request" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/request"
                ?
                <div>
                  <Requests className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Requests />
                </div>
            }
          </div>
          <p className=''>
            Requests</p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/maintenance"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/maintenance" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/maintenance"
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
          href={"/dashboard/enterprise-property/support"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/support" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/support"
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
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/setting"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/setting" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/enterprise-property/setting"
                ?
                <div>
                  <Settings className='text-BlueHomz ' />
                </div>
                :
                <div>
                  <Settings />
                </div>
            }
          </div>
          <p className=''> Settings</p>
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