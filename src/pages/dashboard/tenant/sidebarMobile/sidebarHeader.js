"use client"
import React from 'react'
import Dashboard from '@/components/icons/dashboard/dashboard'
import Logout from '@/components/icons/dashboard/logout'
import Maintenance from '@/components/icons/dashboard/maintenance '
import Payment from '@/components/icons/dashboard/payment'
import PropertyManagement from '@/components/icons/dashboard/propertyManagement'
import RightArrow from '@/components/icons/dashboard/rightArrow'
import Support from '@/components/icons/dashboard/support'
import EmptyAvatar from '@/components/icons/emptyAvatar'
import useProfileStore from '@/store/profile'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Switch from '@/components/icons/dashboardMobile/switch'
import Notification from '@/components/icons/notification'
import NotiTenant from '@/components/icons/notiTenant'

const SidebarMobile = ({ setOpen, user }) => {
  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();

  const unseen = notificationsData?.filter((data) => data?.status === "unread")

  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className='bg-inputBg rounded-[8px]'>
        <div
          className="w-full flex justify-between items-center px-4 py-2"
        >
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
        <Link
          href={"/switch-profile"}
          onClick={() => setOpen(false)}
          className='text-GrayHomz w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'>
          <Switch />
          <p className=''> Switch</p>
        </Link>
      </div>
      <Link
        onClick={() => setOpen(false)}
        href={"/dashboard/tenant/notificationPage"}
        className='p-4 flex items-center gap-5 mt-4 h-auto bg-inputBg rounded-[8px]'>
        <div
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-1 justify-start px-4 
          ${pathname === "/dashboard/tenant/notificationPage" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {
              pathname === "/dashboard/tenant/notificationPage"
                ?
                <div>
                  <Notification className='text-BlueHomz fill-BlueHomz' />
                </div>
                :
                <div>
                  <Notification />
                </div>
            }
          </div>
          <p className=''> Notifications</p>
        </div>
        <p
          className={` ${unseen?.length >= 1 ? "bg-error" : "bg-transparent"
            } h-2 w-2 rounded-full`}
        ></p>
      </Link>
      <div className='p-4 flex flex-col gap-5 mt-4 h-auto bg-inputBg rounded-[8px]'>
        <div onClick={() => logout(logout)} className='hover:bg-white cursor-pointer w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'>
          <Logout />
          <p className='text-red-500'>Logout</p>
        </div>
      </div>

    </div>
  )
}

export default SidebarMobile

const notificationsData = [
  {
    id: 1,
    subject: "Rent Information Update",
    message: "Your rent amount was updated to [New Rent Amount].",
    action: "Review details",
    date: "September 20, 2024",
    image: <NotiTenant />,
    time: "11:30 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 2,
    subject: "Property Information Update",
    message: "Property Address was updated to [New Property Address].",
    action: null,
    date: "September 20, 2024",
    image: <NotiTenant />,
    time: "11:30 AM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 3,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 21, 2024",
    image: <NotiTenant />,
    time: "10:45 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 4,
    subject: "Property Information Update",
    message: "Manager's contact was updated to [New Manager's Contact Name].",
    action: null,
    date: "September 21, 2024",
    image: <NotiTenant />,
    time: "10:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 5,
    subject: "Property Information Update",
    message: "Property Address for [Property Name] was updated to [New Property Address].",
    action: null,
    date: "September 22, 2024",
    image: <NotiTenant />,
    time: "09:15 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 6,
    subject: "Property Information Update",
    message: "Property Name for [Old Property Name] was updated to [New Property Name].",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "08:20 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 7,
    subject: "Rent Cashback!",
    message: "You received a cashback on your last rent payment.",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "08:00 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 8,
    subject: "Rent Information Update",
    message: "Your rent was increased by 5%.",
    action: "Review details",
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "09:00 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 9,
    subject: "Property Information Update",
    message: "The property manager's email was updated to [New Manager Email].",
    action: null,
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "08:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 10,
    subject: "Rent Cashback!",
    message: "You received a cashback reward on your rent.",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "03:15 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 11,
    subject: "Property Information Update",
    message: "The property's contact details have been updated.",
    action: null,
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "12:45 PM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 12,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 26, 2024",
    image: <NotiTenant />,
    time: "11:00 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 13,
    subject: "Property Information Update",
    message: "A new property has been assigned to you.",
    action: null,
    date: "September 26, 2024",
    image: <NotiTenant />,
    time: "10:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 14,
    subject: "Rent Information Update",
    message: "Your rent payment for this month is overdue.",
    action: "Review details",
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "02:15 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 15,
    subject: "Rent Cashback!",
    message: "You received a cashback on your rent payment.",
    action: null,
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "01:00 PM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 16,
    subject: "Property Information Update",
    message: "Your property lease has been extended.",
    action: null,
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "03:45 PM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 17,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "12:00 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 18,
    subject: "Property Information Update",
    message: "The property's maintenance has been scheduled.",
    action: null,
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "02:00 PM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 19,
    subject: "Rent Cashback!",
    message: "Your cashback for the rent has been applied.",
    action: null,
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "11:45 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 20,
    subject: "Property Information Update",
    message: "Property location updated to [New Location].",
    action: null,
    date: "September 29, 2024",
    image: <NotiTenant />,
    time: "04:00 PM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
];