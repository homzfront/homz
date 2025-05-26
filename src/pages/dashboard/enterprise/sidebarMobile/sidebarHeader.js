"use client"
import React, { useEffect } from 'react'
import Dashboard from '@/components/icons/dashboard/dashboard'
import Logout from '@/components/icons/dashboard/logout'
import Maintenance from '@/components/icons/dashboard/maintenance '
import Payment from '@/components/icons/dashboard/payment'
import PropertyListing from '@/components/icons/dashboard/propertyListing'
import PropertyManagement from '@/components/icons/dashboard/propertyManagement'
import Requests from '@/components/icons/dashboard/requests'
import RightArrow from '@/components/icons/dashboard/rightArrow'
import Settings from '@/components/icons/dashboard/settings'
import Support from '@/components/icons/dashboard/support'
import Tenants from '@/components/icons/dashboard/tenants'
import EmptyAvatar from '@/components/icons/emptyAvatar'
import useProfileStore from '@/store/profile'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Switch from '@/components/icons/dashboardMobile/switch'
import useRequestEnterprise from '@/store/enterpriseStore/useRequestEnterprise'
import useMaintenanceRequestStore from '@/store/enterpriseStore/useMaintenanceStore'
import DocumentInformation from '@/components/icons/dashboard/documentInformation'
import PaymentSub from '@/components/icons/dashboard/paymentSub'
import Expenses from '@/components/icons/dashboard/expenses'
import Finance from '@/components/icons/dashboard/finance'
import Down from '@/components/icons/Down'

const SidebarMobile = ({ setOpen, user }) => {
  const { request, tenantData, loading, fetchData } = useRequestEnterprise();
  const [openExp, setOpenExp] = React.useState(false);
  const { request: maintenanceRequest, fetchData: fetchMaintenance } = useMaintenanceRequestStore();

  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
      fetchMaintenance();
    }, 3 * 60 * 1000); // 3 minutes in milliseconds
    fetchData();
    fetchMaintenance();

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(fetchDataInterval);
  }, []);

  // Assuming data is the object containing the provided data
  const results = maintenanceRequest?.results;

  // Check if any request status is "pending"
  const isAnyPending = results?.some(item => item.status === "pending");

  const Data = {
    subMenuItems: [
      {
        title: "Payments",
        link: "/dashboard/enterprise-property/payments",
        image: <PaymentSub className="#202020" />,
        image2: <PaymentSub />,
      },
      {
        title: "Expenses",
        link: "/dashboard/enterprise-property/expenses",
        image: <Expenses />,
        image2: <Expenses className="#006AFF" />,
      },
    ]
  }

  return (
    <div className="h-[2000px] px-8 flex flex-col w-[100%] m-auto text-white">
      <div className='bg-inputBg rounded-[8px]'>
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="flex gap-4 items-center">
            {!user?.businessLogo?.url ? (
              <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                <EmptyAvatar />
              </div>
            ) : (
              <Image
                src={user?.businessLogo?.url}
                alt=""
                width={40}
                height={40}
                layout="full"
                objectFit="cover"
                objectPosition="center"
                className="object-cover bg-center h-[40px] rounded-full"
                quality={100}
                priority
              />
            )}
            <span className="font-[500] text-[16px] text-GrayHomz">
              {user?.fullName}
            </span>
          </div>
          <Link href={`/dashboard/enterprise-property/profile`}>
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
            {pathname === "/dashboard/enterprise-property/dashboard" ?
              <Dashboard className='text-BlueHomz fill-BlueHomz' /> :
              <Dashboard />}
          </div>
          <p>Dashboard</p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/tenants"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/tenants" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/enterprise-property/tenants" ?
              <Tenants className='text-BlueHomz fill-BlueHomz' /> :
              <Tenants />}
          </div>
          <p>Tenants</p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/estates"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/estates" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/enterprise-property/estates" ?
              <PropertyManagement className='text-BlueHomz fill-BlueHomz' /> :
              <PropertyManagement />}
          </div>
          <p>Property Management</p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/documentGeneration"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/documentGeneration" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div className={`pt-1 w-[7%]`}>
            {pathname === "/dashboard/enterprise-property/documentGeneration" ?
              <DocumentInformation className='text-BlueHomz fill-BlueHomz' /> :
              <DocumentInformation />}
          </div>
          <p>Document Generation</p>
        </Link>

        <div className="w-full">
          <div
            onClick={() => setOpenExp(!openExp)}
            className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
            ${(pathname === "/dashboard/enterprise-property/payments"  || pathname === "/dashboard/enterprise-property/expenses")? "bg-white text-BlueHomz"
                : "text-GrayHomz"} hover:text-BlueHomz cursor-pointer`}
          >
            <div>
              {(pathname === "/dashboard/enterprise-property/payments" || pathname === "/dashboard/enterprise-property/expenses") ?
                <Finance className='#006aff'/> :
                <Finance className="#4E4E4E" />}
            </div>
            <div className="flex items-center w-full justify-between">
              <span className="">Finance</span>
              <div
                className={`${openExp ? "rotate-180" : ""} flex`}
              >
                <Down />
              </div>
            </div>

          </div>

          {openExp && (
            <div className="flex items-start space-x-7 ml-[20px] mt-2">
              <hr className="w-[1.5px] h-[106px] border-0 bg-[#4E4E4E]" />
              <div className="my-2 flex flex-col space-y-4">
                {Data.subMenuItems?.map((subItem, idx) => (
                  <Link
                    key={idx}
                    href={subItem.link}
                    onClick={() => setOpen(false)}
                    className={`flex flex-row space-x-2 items-center p-1 rounded-md 
                    ${subItem.link === pathname ? "text-BlueHomz" : "text-GrayHomz"}`}
                  >
                    {subItem.link === pathname ? subItem.image2 : subItem.image}
                    <span className="text-[13px] font-[500] leading-[20px]">
                      {subItem.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/request"}
          className={`w-full h-[45px] flex justify-between rounded-[4px] items-center px-4 
          ${pathname === "/dashboard/enterprise-property/request" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div className='flex gap-2'>
            {pathname === "/dashboard/enterprise-property/request" ?
              <Requests className='text-BlueHomz fill-BlueHomz' /> :
              <Requests />}
            <p>Requests</p>
          </div>
          <p className={`${request?.[0]?.status === "pending" ? "bg-error mt-1 h-2 w-2 rounded-full" : "bg-transparent"}`}></p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/maintenance"}
          className={`w-full h-[45px] flex justify-between rounded-[4px] items-center px-4 
          ${pathname === "/dashboard/enterprise-property/maintenance" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div className='flex gap-2'>
            {pathname === "/dashboard/enterprise-property/maintenance" ?
              <Maintenance className='text-BlueHomz fill-BlueHomz' /> :
              <Maintenance />}
            <p>Maintenance</p>
          </div>
          <p className={`${isAnyPending === true ? "bg-error mt-1 h-2 w-2 rounded-full" : "bg-transparent"}`}></p>
        </Link>

        <Link
          onClick={() => setOpen(false)}
          href={"/dashboard/enterprise-property/support"}
          className={`w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4 
          ${pathname === "/dashboard/enterprise-property/support" ? "bg-white text-BlueHomz"
              : "text-GrayHomz"} hover:text-BlueHomz`}
        >
          <div>
            {pathname === "/dashboard/enterprise-property/support" ?
              <Support className='text-BlueHomz fill-BlueHomz' /> :
              <Support />}
          </div>
          <p>Support</p>
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
            {pathname === "/dashboard/enterprise-property/setting" ?
              <Settings className='text-BlueHomz' /> :
              <Settings />}
          </div>
          <p>Settings</p>
        </Link>

        <Link
          href={"/switch-profile"}
          onClick={() => setOpen(false)}
          className='text-GrayHomz w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'
        >
          <Switch />
          <p>Switch</p>
        </Link>
      </div>

      <div className='p-4 flex flex-col gap-5 mt-8 h-auto bg-inputBg rounded-[8px]'>
        <div
          onClick={() => logout()}
          className='hover:bg-white cursor-pointer w-full h-[45px] rounded-[4px] items-center flex gap-2 justify-start px-4'
        >
          <Logout />
          <p className='text-red-500'>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarMobile