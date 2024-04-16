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
import Dashboard from '@/components/icons/dashboardMobile/dashboard'
import Logout from '@/components/icons/dashboardMobile/logoutMain'
import Maintenance from '@/components/icons/dashboardMobile/maintenance '
import Payment from '@/components/icons/dashboardMobile/payment'
import PropertyListing from '@/components/icons/dashboardMobile/propertyListing'
import PropertyManagement from '@/components/icons/dashboardMobile/propertyManagement'
import Requests from '@/components/icons/dashboardMobile/requests'
import Settings from '@/components/icons/dashboardMobile/settings'
import Support from '@/components/icons/dashboardMobile/support'
import Switch from '@/components/icons/dashboardMobile/switch'
import Tenants from '@/components/icons/dashboardMobile/tenants'
import Profile from "@/components/icons/dashboardMobile/profile";


const Sidebar = () => {
  const path = usePathname();
  const pathname = keepThree(path);
  const { logout } = useProfileStore();
  const [logoutModal, setLogoutModal] = useState(false);
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
      image: <Dashboard />,
      image2: <Dashboard className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: <Tenants />,
      image2: <Tenants className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/tenants",
      name: "Tenants",
      coming: null,
      active: false,
    },
    {
      id: 3,
      image: <PropertyManagement />,
      image2: <PropertyManagement className='text-BlueHomz fill-white' />,
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: <PropertyListing />,
      image2: <PropertyListing className='text-BlueHomz fill-white' />,
      link: "/dashboard/enterprise-property/propertylisting",
      name: "Property Listing",
      coming: null,
      active: false,
    },
    {
      id: 5,
      image: <Payment />,
      image2: <Payment className='text-BlueHomz fill-white' />,
      link: "/dashboard/enterprise-property/payments",
      name: "Payments",
      coming: null,
      active: false,
    },
    {
      id: 6,
      image: <Requests />,
      image2: <Requests className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: `${request?.[0]?.status === "pending" ? true : false}`,
    },
    {
      id: 7,
      image: <Maintenance />,
      image2: <Maintenance className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: `${isAnyPending === true ? true : false}`,
    },
    {
      id: 8,
      image: <Support />,
      image2: <Support className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: <Profile />,
      image2: <Profile className='text-white fill-white' />,
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: <Settings />,
      image2: <Settings className='text-white' />,
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: <Switch />,
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="w-full h-[1024px] px-6 flex flex-col justify-around">
          <Link href={"/"}>
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={28}
              width={131}
              priority
              alt="img"
            />
          </Link>
          <div className="grid gap-3">
            {Data.map((data) => (
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
                  <p className={`${data?.active === "true" ? "bg-error" : "bg-transparent"
                    } mt-1 h-2 w-2 rounded-full`}
                  ></p>
                </div>
              </Link>
            ))}
          </div>{" "}
          <div className="grid gap-3 ">
            {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md text-GrayHomz text-[16px] font-[500] 
                ${
                  data.name === "Setting" ? "gap-[4px]" : "gap-[12px]"
                }
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
          <div className="grid gap-3 ">
            {Data3.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2 flex items-center rounded-md gap-[7px] text-GrayHomz text-[16px] font-[500]
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
