"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmModalI from "../components/confirmModalI";
import useProfileStore from "@/store/profile";
import useRequestEnterprise from "@/store/enterpriseStore/useRequestEnterprise";
import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { request, tenantData, loading, fetchData } = useRequestEnterprise();
  const { request: maintenanceRequest, fetchData: fetchMaintenance } =
    useMaintenanceRequestStore();

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
      fetchMaintenance();
    }, 3 * 60 * 1000); // 3 minutes in milliseconds

    // Fetch data immediately when the component mounts
    fetchData();
    fetchMaintenance();

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(fetchDataInterval);
  }, []);

  // Assuming data is the object containing the provided data
  const results = maintenanceRequest?.results;

  // Check if any request status is "pending"
  const isAnyPending = results?.some(item => item.status === "pending");

  // Perform action if any request status is "pending"
  if (isAnyPending) {
    // Perform your action here
    // console.log("At least one request is pending", isAnyPending);
  }

  const Data = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/dashboard.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/dashboardwhite.png",
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
      link: "/dashboard/enterprise-property/Tenants/ManageTenants",
      name: "Tenants",
      coming: null,
      active: false,
      submenu: true,
      subMenuItems: [
        {
          name: "Manage Tenants",
          link: "/dashboard/enterprise-property/Tenants/ManageTenants",
          image: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
          image2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
        },
        {
          name: "Access Control",
          link: "/dashboard/enterprise-property/Tenants/AccessRecords",
          image: "/static/images/people.svg",
          image2: "/static/images/people.svg",
        },
        {
          name: "Tenant Poll",
          link: "/dashboard/enterprise-property/Tenants/TenantPoll",
          image: "/static/images/black_chart.svg",
          image2: "/static/images/white_chart.svg",
        },
      ],
    },
    {
      id: 3,
      image: "/static/dashboard/enterprisemanager/sidebar/estatedark.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/estates.png",
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: "/static/dashboard/enterprisemanager/sidebar/buliding.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/bulidingwhite.png",
      link: "/dashboard/enterprise-property/propertylisting",
      name: "Property Listing",
      coming: null,
      active: false,
    },
    {
      id: 5,
      image: "/static/dashboard/enterprisemanager/sidebar/card.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/cardwhite.png",
      link: "/dashboard/enterprise-property/payments",
      name: "Payments",
      coming: null,
      active: false,
    },
    {
      id: 6,
      image: "/static/dashboard/enterprisemanager/sidebar/RequestBlack.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/Request.png",
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: `${request?.[0]?.status === "pending" ? true : false}`,
    },
    {
      id: 7,
      image: "/static/dashboard/enterprisemanager/sidebar/maintenance.png",
      image2:
        "/static/dashboard/enterprisemanager/sidebar/maintenanceWhite.png",
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: `${isAnyPending === true ? true : false}`,
    },
    {
      id: 8,
      image: "/static/dashboard/enterprisemanager/sidebar/call.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/callwhite.png",
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/profile.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/profilewhite.png",
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/setting.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/settingwhite.png",
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  const { logout } = useProfileStore();

  // const [pathname, setPathname] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const logoutII = () => {
    setLogoutModal(!logoutModal);
  };

  const closeLogout = () => {
    setLogoutModal(false);
  };

  // useEffect(() => {
  //   // Function to get the current URL
  //   const url = () => {
  //     if (typeof window !== "undefined") {
  //       return window.location.href;
  //     }
  //     return "";
  //   };

  //   const extractPathname = (url) => {
  //     const parsedUrl = new URL(url);
  //     let pathname = parsedUrl.pathname;

  //     // Split the pathname into segments
  //     const segments = pathname.split("/").filter(Boolean); // Remove empty segments

  //     // Keep only the first three segments
  //     const firstThreeSegments = segments.slice(0, 3);

  //     // Join the segments back to form the updated pathname
  //     pathname = `/${firstThreeSegments.join("/")}`;

  //     return pathname;
  //   };

  //   setPathname(extractPathname(url()));
  // }, []);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = logoutModal ? "hidden" : "auto";
    if (logoutModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [logoutModal]);

  console.log(pathname);


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
              <>
                {data.submenu ? (
                  <>
                    <Link
                      key={data.id}
                      href={'/dashboard/enterprise-property/Tenants/ManageTenants'}
                      onClick={toggleSubMenu}
                      className={`flex flex-row space-x-4 items-center p-2 rounded-lg justify-between ${"/dashboard/enterprise-property/Tenants/ManageTenants" === pathname
                        || "/dashboard/enterprise-property/Tenants/AccessRecords" === pathname ||
                        "/dashboard/enterprise-property/Tenants/TenantPoll" === pathname
                        ? "bg-BlueHomz text-white"
                        : "hover:bg-blue-100 text-GrayHomz "
                        }`}
                    >
                      <div className="flex flex-row space-x-3 items-center">
                        {
                          "/dashboard/enterprise-property/Tenants/ManageTenants" === pathname
                            || "/dashboard/enterprise-property/Tenants/AccessRecords" === pathname ||
                            "/dashboard/enterprise-property/Tenants/TenantPoll" === pathname
                            ? (
                              <Image src={data.image2} height={16} width={16} alt="img" />
                            ) : (
                              <Image src={data.image} height={16} width={16} alt="img" />
                            )}
                        <span className="text-[16px] font-[500]">{data.name}</span>
                      </div>

                      <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                        <Icon icon="lucide:chevron-down" width="24" height="24" />
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
                            // transform: "rotate(90deg)", // Rotate the <hr> element 90 degrees
                          }}
                        />
                        <div className="my-2 flex flex-col space-y-4">
                          {data.subMenuItems?.map((subItem, idx) => {
                            return (
                              <Link
                                key={idx}
                                href={subItem.link}
                                className={`flex flex-row space-x-2 items-center p-1 rounded-md ${subItem.link === pathname
                                  ? "text-BlueHomz"
                                  : "hover:bg-blue-100"
                                  }`}
                              >
                                <div className="flex flex-row  items-center gap-[12px]">
                                  {/* {subItem.link === pathname ? (
                                    <Image
                                      src={subItem.image2}
                                      height={16}
                                      width={16}
                                      alt="img"
                                    />
                                  ) :

                                } */}
                                  <Image
                                    src={subItem.image}
                                    height={16}
                                    width={16}
                                    alt="img"
                                  />
                                  <span className=" text-[13px] font-[500] leading-[20px] text-left">
                                    {subItem.name}
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
                    className={`h-[40px] px-2 flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${data.name === "Property Management" ? "h-[60px]" : ""
                      } ${data.link === pathname
                        ? "bg-BlueHomz text-white"
                        : "hover:bg-blue-100"
                      } ${data.coming === null ? "" : "opacity-50 pointer-events-none"
                      } `}
                  >
                    {data.link === pathname ? (
                      <Image src={data.image2} height={16} width={16} alt="img" />
                    ) : (
                      <Image src={data.image} height={16} width={16} alt="img" />
                    )}
                    <div className="flex items-center w-full justify-between">
                      <span className="pr-1">{data.name}</span>
                      <p className={`${data?.active === "true" ? "bg-error" : "bg-transparent"
                        } mt-1 h-2 w-2 rounded-full`}
                      ></p>
                    </div>
                  </Link>
                )}
              </>
            ))}
          </div>{" "}
          <div className="grid gap-3 ">
            {Data2.map((data) => (
              <Link
                key={data.id}
                href={data.link}
                className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${pathname === data.link
                  ? "bg-BlueHomz text-white"
                  : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <Image src={data.image2} height={16} width={16} alt="img" />
                ) : (
                  <Image src={data.image} height={16} width={16} alt="img" />
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
                className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${pathname === data.link
                  ? "bg-BlueHomz text-white"
                  : "hover:text-white hover:bg-blue-300"
                  } `}
              >
                {pathname === data.link ? (
                  <Image src={data.image2} height={16} width={16} alt="img" />
                ) : (
                  <Image src={data.image} height={16} width={16} alt="img" />
                )}
                <span className="">{data.name}</span>
              </Link>
            ))}
            <div
              onClick={logoutII}
              className={`h-[40px] px-2 cursor-pointer flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]hover:text-white hover:bg-blue-300
                   `}
            >
              <Image
                src="/static/dashboard/enterprisemanager/sidebar/logout.png"
                height={16}
                width={16}
                alt="img"
              />
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
