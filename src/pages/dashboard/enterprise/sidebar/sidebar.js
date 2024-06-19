"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "@/store/profile";
import useRequestEnterprise from "@/store/enterpriseStore/useRequestEnterprise";
import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import Dashboard from '@/components/icons/dashboard/dashboard'
import Logout from '@/components/icons/dashboard/logoutMain'
import Maintenance from '@/components/icons/dashboard/maintenance '
import Payment from '@/components/icons/dashboard/payment'
import PropertyListing from '@/components/icons/dashboard/propertyListing'
import PropertyManagement from '@/components/icons/dashboard/propertyManagement'
import Requests from '@/components/icons/dashboard/requests'
import Settings from '@/components/icons/dashboard/settings'
import Support from '@/components/icons/dashboard/support'
import Switch from '@/components/icons/dashboard/switch'
import Tenants from '@/components/icons/dashboard/tenants'
import Profile from "@/components/icons/dashboard/profile";
import TenantPoll from "@/components/icons/dashboard/tenantPoll";
import AccessRecord from "@/components/icons/dashboard/accessRecord";
import Down from "@/components/icons/Down";
import keepFour from "@/utils/keepFour";
import ManageTenant from "@/components/icons/dashboard/manageTenant";


const Sidebar = () => {
  const path = usePathname();
  const pathname = keepThree(path);
  const pathname2 = keepFour(path);
  
  const { logout } = useProfileStore();
  const [logoutModal, setLogoutModal] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const { request, tenantData, loading, fetchData } = useRequestEnterprise();
  const { request: maintenanceRequest, fetchData: fetchMaintenance } = useMaintenanceRequestStore();

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };


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


  const Data = [
    {
      id: 1,
      image: <Dashboard height="16" width="16"/>,
      image2: <Dashboard className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: <Tenants height="16" width="16"/>,
      image2: <Tenants className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/tenants",
      name: "Tenants",
      coming: null,
      active: false,
      submenu: true,
      subMenuItems: [
        {
          title: "Manage Tenants",
          link: "/dashboard/enterprise-property/tenants",
          image: <ManageTenant />,
          image2: <ManageTenant className="#006AFF" />,
        },
        {
          title: "Access Control",
          link: "/dashboard/enterprise-property/tenants/access-records",
          image: <AccessRecord />,
          image2: <AccessRecord className="#006AFF" />,
        },
        {
          title: "Tenant Poll",
          link: "/dashboard/enterprise-property/tenants/tenant-poll",
          image: <TenantPoll />,
          image2: <TenantPoll className="#006AFF" />,
        },
      ],
    },
    {
      id: 3,
      image: <PropertyManagement height="16" width="16"/>,
      image2: <PropertyManagement className='text-BlueHomz fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    // {
    //   id: 4,
    //   image: <PropertyListing height="16" width="16"/>,
    //   image2: <PropertyListing className='text-BlueHomz fill-white' height="16" width="16"/>,
    //   link: "/dashboard/enterprise-property/propertylisting",
    //   name: "Property Listing",
    //   coming: null,
    //   active: false,
    // },
    // {
    //   id: 5,
    //   image: <Payment height="16" width="16"/>,
    //   image2: <Payment className='text-BlueHomz fill-white' height="16" width="16"/>,
    //   link: "/dashboard/enterprise-property/payments",
    //   name: "Payments",
    //   coming: null,
    //   active: false,
    // },
    {
      id: 6,
      image: <Requests height="16" width="16"/>,
      image2: <Requests className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: `${request?.[0]?.status === "pending" ? true : false}`,
    },
    {
      id: 7,
      image: <Maintenance height="16" width="16"/>,
      image2: <Maintenance className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: `${isAnyPending === true ? true : false}`,
    },
    {
      id: 8,
      image: <Support height="16" width="16"/>,
      image2: <Support className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: <Profile height="16" width="16"/>,
      image2: <Profile className='text-white fill-white' height="16" width="16"/>,
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: <Settings height="16" width="16" />,
      image2: <Settings className='text-white'  height="16" width="16"/>,
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: <Switch  height="16" width="16"/>,
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="w-full h-[1024px] px-6 flex flex-col py-10">
          <Link href={"/"} className="mb-[50px]">
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={28}
              width={131}
              priority
              alt="img"
            />
          </Link>
          <div className="flex flex-col gap-3 mb-[50px]">
            {Data.map((data) => (
              data.submenu ? (
                <>
                  <Link
                    key={data.id}
                    href={data.link}
                    className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${pathname === data.link
                      ? "bg-BlueHomz text-white"
                      : " hover:bg-blue-100"
                      } ${data.coming === null ? "" : "opacity-50 pointer-events-none"
                      } `}
                  >
                    {pathname === data.link ? (
                      <div>
                        {data.image2}
                      </div>
                    ) : (
                      <div>
                        {data.image}
                      </div>
                    )}
                    <div className="flex items-center w-full justify-between">
                      <span className="">{data.name}</span>
                      {/* <div onClick={toggleSubMenu} className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                        <Down />
                      </div> */}
                    </div>
                  </Link>
                  {subMenuOpen && (
                    <div className="flex items-center space-x-7 ml-[20px]">
                      <hr
                        style={{
                          width: "1.5px",
                          height: "106px",
                          borderWidth: "0",
                          background: "#4E4E4E",
                        }}
                      />
                      <div className="my-2 flex flex-col space-y-4">
                        {data.subMenuItems?.map((subItem, idx) => {
                          return (
                            <Link
                              key={idx}
                              href={subItem.link}
                              className={`flex flex-row space-x-2 items-center p-1 rounded-md ${subItem.link === pathname2
                                ? "text-BlueHomz"
                                : "hover:bg-blue-100 text-GrayHomz"
                                }`}
                            >
                              <div className="flex flex-row  items-center gap-[12px]">
                                {subItem.link === pathname2 ? (
                                  <>
                                    {subItem.image2}
                                  </>
                                ) :
                                  <>
                                    {subItem.image}
                                  </>
                                }
                                <span className=" text-[13px] font-[500] leading-[20px] text-left">
                                  {subItem.title}
                                </span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              )
                :
                <Link
                  key={data.id}
                  href={data.link}
                  className={`h-[40px] px-2 flex justify-center items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : " hover:bg-blue-100"
                    } ${data.coming === null ? "" : "opacity-50 pointer-events-none"
                    } `}
                >
                  {pathname === data.link ? (
                    <div>
                      {data.image2}
                    </div>
                  ) : (
                    <div>
                      {data.image}
                    </div>
                  )}
                  <div className="flex items-center w-full justify-between">
                    <span className="">{data.name}</span>
                    <p className={`${data?.active === "true" ? "bg-error" : "bg-transparent"
                      } mt-1 h-2 w-2 rounded-full`}
                    ></p>
                  </div>
                </Link>
            ))}
          </div>{" "}
          <div className="flex flex-col gap-3 mb-[50px]">
            {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] 
                ${pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <div>
                    {data.image2}
                  </div>
                ) : (
                  <div>
                    {data.image}
                  </div>
                )}
                <span className="">{data.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Data3.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]
                ${pathname === data.link
                    ? "bg-BlueHomz text-white"
                    : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <div>
                    {/* {data.image2} */}
                  </div>
                ) : (
                  <div>
                    {data.image}
                  </div>
                )}
                <span className="">{data.name}</span>
              </Link>
            ))}
            <div
              onClick={logoutII}
              className={`h-[40px] px-2 cursor-pointer flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]hover:text-white hover:bg-blue-300
                 `}
            >
              <Logout />
              <span className="">Logout</span>
            </div>
          </div>
          {logoutModal && (
            <ConfirmModalI
              header={"Are you leaving?"}
              body={"You’re about to exit your dashboard"}
              button={"Yes, log me out"}
              buttonTwo={"No, take me back"}
              returnHome={() => logout(logout)}
              returnHomeTwo={closeLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
