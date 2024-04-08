"use client";
import React, { useEffect, useState } from "react";
import DropDown from "../components/threeDropDown";
import Image from "next/image";
import TenantsTwo from "./tenantsTwo";
import Modal from "../components/modal";
import MobileNav from "../../sidebar/MobileNav";

const Tenants = () => {
  const [inviteTenant, setInviteTenant] = useState(false);
  const toggleInvite = () => {
    setInviteTenant(true);
  };
  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = inviteTenant ? "hidden" : "auto";
  }, [inviteTenant]);

  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 8,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 9,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 10,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 11,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 12,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 13,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 14,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 15,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 16,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 17,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 18,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 19,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 20,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 21,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 22,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 23,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 24,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 25,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 26,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 27,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 28,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 29,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 30,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 31,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 32,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 33,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 34,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 35,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 36,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
  ];
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSidebar = () => {
    setShowSideNav(!showSideNav);
  };
  const [data, setData] = useState(Data || []);

  return (
    <div className="w-[375px] md:w-[1147px] py-5 md:p-8">
      <div className={!showSideNav && "hidden"}>
        <MobileNav closeBars={() => setShowSideNav(false)} />
      </div>
      <div className={!showSideNav ? "block" : "hidden"}>
        {data.length < 1 ? (
          <div>
            <div className="flex justify-between pt-[0px] md:p-4 items-center">
              {/* <div> */}
              <div className="flex gap-2 items-center">
                <p className="text-[20px] font-[500]">Tenants</p>
                <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                  <span className="text-BlueHomz text-[18px] font-[400]">
                    {data?.length}
                  </span>
                </span>
              </div>
              <div className="block md:hidden">
                <button onClick={toggleSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5 h-[600px] justify-center items-center">
              <div className="bg-whiteblue rounded-[100%] flex justify-center items-center h-[120px] w-[120px]">
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/tenants/profile-2user.png"
                  }
                  height={88}
                  width={88}
                  alt=""
                  className="mt-1"
                />
              </div>

              <p className="text-[18px] font-[400] text-GrayHomz">
                All registered tenants under your property will be visible here
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className=" flex justify-between  items-center">
              <div className="flex flex-col gap-[1rem] pb-1 w-[375px] md:w-full">
                <div className="flex w-[375px] md:w-auto justify-between pt-[0px] md:p-4 items-center">
                  {/* <div> */}
                  <div className="flex gap-2 items-center">
                    <p className="text-[20px] font-[500]">Tenants</p>
                    <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                      <span className="text-BlueHomz text-[18px] font-[400]">
                        {data.length}
                      </span>
                    </span>
                  </div>
                  <div className="block md:hidden">
                    <button onClick={toggleSidebar}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between  w-[375px]  gap-2 items-center md:hidden">
                  <div className="searchPan h-[40px] block md:hidden my-1 ">
                    <input
                      type="text"
                      className="border-1 searchPane h-[40px] pl-8 rounded-md w-[332px]"
                      placeholder="search"
                    />

                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/header/search-normal.png"
                      }
                      alt=""
                      className="relative bottom-[27px] left-[13px] "
                      height={15}
                      width={15}
                    />
                  </div>
                  <div className="flex items-center">
                      <button>
                        <Image
                          src="/static/images/filter_icon.svg"
                          alt=""
                          className=""
                          height={35}
                          width={35}
                        />
                      </button>
                    </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <p className="text-[16px] font-[400] text-BlackHomz">
                  Filter by:
                </p>
                <DropDown />

                <input
                  type="date"
                  className="border items-center gap-4 flex text-GrayHomz2 px-4 h-10 w-[120px] mb-1 p-2 rounded cursor-pointer"
                />
                <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
                  <span>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                      }
                      alt=""
                      height={17}
                      width={16}
                    />
                  </span>
                  Reset
                </button>
              </div>
            </div>
            <TenantsTwo Data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenants;
