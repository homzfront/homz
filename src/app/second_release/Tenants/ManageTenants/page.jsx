"use client";
import Image from "next/image";
import React, { useState } from "react";
import DropDown from "./component/Dropdown";
import { TenantData } from "./component/tenantData";
import VisitorRecords from "./component/visitorsRecords";
import Link from "next/link";

const ManageTenants = () => {
  const [selectedRow, setSelectedRows] = useState([]);
  const [data, setData] = useState(TenantData || []);
  const [status, setStatus] = useState("");
  const [property, setProperty] = useState("");
  // console.log(search)
  // const [search, setSearch] = useState("")
  const [date, setDate] = useState("");
  const handleSearches = (search) => {
    let newData = [];
    if (search !== "Pending" && search !== "Paid" && search !== "Over due") {
      newData = TenantData.filter((item) => item.Property === search);
    }
    else {
      newData = TenantData.filter((item) => item.Status === search);
    }

    setData(newData);
  };

  return (
    <div className="space-y-7 pt-5 md:pt-0 px-2 md:pr-0">
      <div className="flex justify-between items-center mt-4 ">
        <div className="flex gap-2 items-center ">
          <p className="text-[20px] font-[500]">Tenants</p>
          <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
            <span className="text-BlueHomz text-[18px] font-[400]">
              {TenantData.length}
            </span>
          </span>
          <span className="hidden md:block">
            <Image
              src={"/static/images/blue_add.svg"}
              alt=""
              height={32}
              width={32}
            />
          </span>
          <span className="md:hidden">
            <Image
              src={"/static/images/addButton.svg"}
              alt=""
              height={32}
              width={32}
            />
          </span>
          <span
            className={`md:hidden w-[32px] h-[32px] flex items-center justify-center ${
              selectedRow.length > 0
                ? "border-[#006AFF] bg-[#006AFF]"
                : " border-GrayHomz2 bg-GrayHomz2"
            }  rounded-[8px] cursor-pointer`}
          >
            <Link
              href={` ${
                selectedRow.length > 0 ? "/second_release/Reminder" : "#"
              }`}
            >
              <Image
                src={"/static/images/white_clock.svg"}
                alt=""
                height={16}
                width={16}
              />
            </Link>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="pt-[5px] hidden md:block">
            <DropDown setSearch={handleSearches} setStatus={setStatus} />
          </div>
          <input
            type="date"
            id="date"
            className="adminBorders border-GrayHomz2 text-GrayHomz2 rounded-[4px] mt-1 px-[8px] h-[37px]"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button
            className="hidden adminBorders border-BlueHomz items-center text-[14px] font-[500] md:flex text-BlueHomz w-[40px] h-[37px] p-[12px]  rounded cursor-pointer mt-1"
            onClick={() => setData(TenantData)}
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={16}
                width={16}
              />
            </span>
          </button>
        </div>
        <div className="hidden md:block">
          <Link
            href={` ${
              selectedRow.length > 0 ? "/second_release/Reminder" : "#"
            }`}
          >
            <span
              className={`adminBorders flex gap-1 h-[37px] ${
                selectedRow.length > 0
                  ? "border-[#006AFF] bg-[#006AFF]"
                  : " border-GrayHomz2 bg-GrayHomz2"
              } items-center text-[14px] font-[500] flex text-white px-[10px] p-1 rounded cursor-pointer`}
            >
              <Image
                src={"/static/images/clock.svg"}
                alt=""
                height={16}
                width={16}
              />{" "}
              <span>Set due date reminder</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-between  md:hidden w-full px-2 ">
        <div className="searchPane relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            placeholder="Search"
            // onChange= {e=>{setSearchValue(e.target.value)}}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
          />
        </div>
        <div className=" rounded-[4px] p-[11px] filterBorder hover:border-blue-600">
          <button
          // onClick={openMobileModal}
          >
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <div className="">
        <VisitorRecords Data={data} setRows={setSelectedRows} />
      </div>
    </div>
  );
};

export default ManageTenants;
