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
import Dashboard from "@/components/icons/dashboard/dashboard";
import Logout from "@/components/icons/dashboard/logoutMain";
import Maintenance from "@/components/icons/dashboard/maintenance ";
import Payment from "@/components/icons/dashboard/payment";
import PropertyManagement from "@/components/icons/dashboard/propertyManagement";
import Requests from "@/components/icons/dashboard/requests";
import Settings from "@/components/icons/dashboard/settings";
import Support from "@/components/icons/dashboard/support";
import Switch from "@/components/icons/dashboard/switch";
import Tenants from "@/components/icons/dashboard/tenants";
import Profile from "@/components/icons/dashboard/profile";
import TenantPoll from "@/components/icons/dashboard/tenantPoll";
import AccessRecord from "@/components/icons/dashboard/accessRecord";
import Down from "@/components/icons/Down";
import keepFour from "@/utils/keepFour";
import ManageTenant from "@/components/icons/dashboard/manageTenant";
import DocumentInformation from "@/components/icons/dashboard/documentInformation";
import Finance from "@/components/icons/dashboard/finance";
import PaymentSub from "@/components/icons/dashboard/paymentSub";
import Expenses from "@/components/icons/dashboard/expenses";

const Sidebar = () => {
  const path = usePathname();
  const pathname = keepThree(path);
  const pathname2 = keepFour(path);

  const { logout } = useProfileStore();
  const [logoutModal, setLogoutModal] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [selectedName, setSelecetedName] = useState(null);

  const toggleSubMenu = (name) => {
    setSubMenuOpen(!subMenuOpen);
    setSelecetedName(name)
  };

  const { request, tenantData, loading, fetchData } = useRequestEnterprise();
  const { request: maintenanceRequest, fetchData: fetchMaintenance } =
    useMaintenanceRequestStore();

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
  const isAnyPending = results?.some((item) => item.status === "pending");

  const Data = [
    {
      id: 1,
      image: <Dashboard height="16" width="16" />,
      image2: (
        <Dashboard className="text-white fill-white" height="16" width="16" />
      ),
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: <Tenants height="16" width="16" />,
      image2: (
        <Tenants className="text-white fill-white" height="16" width="16" />
      ),
      link: "",
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
          // link: "/dashboard/enterprise-property/tenants/access-records",
          link: "",
          image: <AccessRecord />,
          image2: <AccessRecord className="#006AFF" />,
        },
        {
          title: "Tenant Poll",
          // link: "/dashboard/enterprise-property/tenants/tenant-poll",
          link: "",
          image: <TenantPoll />,
          image2: <TenantPoll className="#006AFF" />,
        },
      ],
    },
    {
      id: 3,
      image: <PropertyManagement height="16" width="16" />,
      image2: (
        <PropertyManagement
          className="text-BlueHomz fill-white"
          height="16"
          width="16"
        />
      ),
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: <DocumentInformation />,
      image2: <DocumentInformation className="text-BlueHomz fill-white" />,
      link: "/dashboard/enterprise-property/documentGeneration",
      name: "Document Generation",
      coming: null,
      active: false,
    },
    // {
    //   id: 5,
    //   image: <Payment height="16" width="16" />,
    //   image2: (
    //     <Payment className="text-BlueHomz fill-white" height="16" width="16" />
    //   ),
    //   link: "/dashboard/enterprise-property/payments",
    //   name: "Payments",
    //   coming: null,
    //   active: false,
    // },
    {
      id: 5,
      image: <Finance />,
      image2: (
        <Finance className="#FFFFFF" />
      ),
      link: "",
      name: "Finance",
      coming: null,
      active: false,
      submenu: true,
      subMenuItems: [
        {
          title: "Payments",
          link: "/dashboard/enterprise-property/payments",
          image: <PaymentSub className="#202020" />,
          image2: <PaymentSub />,
        },
        {
          title: "Expenses",
          link: "",
          // link: "/dashboard/enterprise-property/expenses",
          image: <Expenses />,
          image2: <Expenses className="#006AFF" />,
        },
      ],
    },
    {
      id: 6,
      image: <Requests height="16" width="16" />,
      image2: (
        <Requests className="text-white fill-white" height="16" width="16" />
      ),
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: `${request?.[0]?.status === "pending" ? true : false}`,
    },
    {
      id: 7,
      image: <Maintenance height="16" width="16" />,
      image2: (
        <Maintenance className="text-white fill-white" height="16" width="16" />
      ),
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: `${isAnyPending === true ? true : false}`,
    },
    {
      id: 8,
      image: <Support height="16" width="16" />,
      image2: (
        <Support className="text-white fill-white" height="16" width="16" />
      ),
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: <Profile height="16" width="16" />,
      image2: (
        <Profile className="text-white fill-white" height="16" width="16" />
      ),
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: <Settings height="16" width="16" />,
      image2: <Settings className="text-white" height="16" width="16" />,
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: <Switch height="16" width="16" />,
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  const isActiveMenu = (data, pathname) => {
    if (data.link === pathname) return true;
    if (data.submenu && data.subMenuItems) {
      return data.subMenuItems.some(item => item.link === pathname);
    }
    return false;
  };

  
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
            {Data.map((data) =>
              data.submenu ? (
                <>
                  <button onClick={()=>toggleSubMenu(data.name)} key={data.id}>
                    <Link
                      href={data.link}
                      className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-[16px] font-[500]
                        ${isActiveMenu(data, pathname) ? "bg-BlueHomz text-white" : "hover:bg-blue-100 text-GrayHomz"}
                        ${data.coming === null ? "" : "opacity-50 pointer-events-none"}
                      `}                      
                    >
                    {isActiveMenu(data, pathname) ? data.image2 : data.image}
                      <div className="flex items-center w-full justify-between">
                        <span className="">{data.name}</span>
                        <div
                          onClick={()=>toggleSubMenu(data.name)}
                          className={`${subMenuOpen ? "rotate-180" : ""} flex`}
                        >
                          <Down />
                        </div>
                      </div>
                    </Link>
                  </button>
                  {subMenuOpen && selectedName === data.name && (
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
                                : "text-GrayHomz"
                                // : "hover:bg-blue-100 text-GrayHomz"
                                }`}
                            >
                              <div
                                className={`flex flex-row items-center gap-[12px] 
                                ${subItem.link === "" &&
                                  "pointer-events-none opacity-50"
                                  }`}
                              >
                                {subItem.link === pathname2 ? (
                                  <>{subItem.image2}</>
                                ) : (
                                  <>{subItem.image}</>
                                )}
                                <span className=" text-[13px] font-[500] leading-[20px] text-left">
                                  {subItem.title} <br />
                                  <span
                                    className={` ${subItem.link === ""
                                      ? "pointer-events-none opacity-50"
                                      : "hidden"
                                      }
                                text-[10px] font-[400] text-Success`}
                                  >
                                    coming soon!
                                  </span>
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
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
                    <div
                      className={`${data.name === "Document Generation"
                        ? "pt-1 pl-[1px] w-[7%]"
                        : ""
                        }`}
                    >
                      {data.image2}
                    </div>
                  ) : (
                    <div
                      className={`${data.name === "Document Generation"
                        ? "pt-1 pl-[1px] w-[7%]"
                        : ""
                        }`}
                    >
                      {data.image}
                    </div>
                  )}
                  <div className="flex items-center w-full">
                    <span className={``}>{data.name}</span>
                    <p
                      className={`${data?.active === "true" ? "bg-error" : "bg-transparent"
                        } mt-1 ml-1 h-2 w-2 rounded-full`}
                    ></p>
                  </div>
                </Link>
              )
            )}
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
                  <div>{data.image2}</div>
                ) : (
                  <div>{data.image}</div>
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
                  <div>{/* {data.image2} */}</div>
                ) : (
                  <div>{data.image}</div>
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
