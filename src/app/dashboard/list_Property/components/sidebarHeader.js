"use client"
import React from 'react'
import Logout from '@/components/icons/dashboard/logout'
import PropertyListing from '@/components/icons/dashboard/propertyListing'
import RightArrow from '@/components/icons/dashboard/rightArrow'
import EmptyAvatar from '@/components/icons/emptyAvatar'
import useProfileStore from '@/store/profile'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Switch from '@/components/icons/dashboardMobile/switch'

const SidebarMobile = ({ setOpen, user }) => {
  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();

  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className='bg-inputBg rounded-[8px]'>
        <div
          className="w-full flex justify-between items-center px-4 py-2"
        >
          <Link
            onClick={() => setOpen(false)}
            href={`/dashboard/list_Property/Profile`}>
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
          </Link>
          <RightArrow />
        </div>
      </div>
      <div className='p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]'>
        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/list_Property"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/list_Property" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/list_Property"
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
          href={"/switch-profile"}
          onClick={() => setOpen(false)}
          className='text-GrayHomz w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'>
          <Switch />
          <p className=''> Switch</p>
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