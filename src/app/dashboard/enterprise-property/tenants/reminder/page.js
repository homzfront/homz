import React from "react";
import Link from "next/link";
import ReminderPane from "./components/reminderPane";
import Image from "next/image";

const Reminder = () => {
  return (
    <div className="pt-8 flex flex-col gap-y-4 md:pt-4 px-8">
      <div className="hidden md:flex gap-6 items-center pb-1">
        <Link href="/dashboard/enterprise-property/tenants">
          <button className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-w_idth="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className=" text-gray-400 text-[14px]">Go Back</span>
          </button>
        </Link>
      </div>

      <div className="flex justify-between md:items-center pt-2">
        <div className="">
          <div className="flex items-center md:items-start space-x-20 md:space-x-0  mb-9 md:mb-0">
            <Link href="/dashboard/enterprise-property/tenants" className="bg-[#EEF5FF] rounded-[8px] p-[4px] md:hidden">
              <Image
                src={"/static/images/Button.svg"}
                alt=""
                height={22}
                width={22}
              />
            </Link>
            <p className=" md:text-[20px] text-[700]">Rent Due Reminder</p>
          
          </div>
          <p className="text-[#A9A9A9] leading-[24px] w-[335px]  md:pr-8 inline-block md:w-[880px] text-[14px]">
            Set a rent due reminder to ensures your tenants receive timely
            notifications, giving them enough time to prepare their rent and
            also pay on time.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row py-[24px] pr-0 pl-[12px] md:pl-[32px] gap-[56px] bg-[#F6F6F6]">
        <div className=" md:w-[132px] h-[132px] rounded-[100%] ">
          <Image
            src="/static/images/papaDrinking.png"
            alt=""
            width={132}
            height={132}
            className="rounded-[100%] "
          />
        </div>
        <div className="flex flex-col w-full gap-[5px] md:w-full">
          <div className="flex w-full md:w-[338px] justify-between items-center">
            <p className="text-[14px] text-[400] leading-[21x] text-[#4E4E4E] text-left">
              Full Name
            </p>
            <p className="text-[14px] text-[500]  leading-[21x] text-[#202020] text-left w-[132px]">
              {"data.Name"}
            </p>
          </div>
          <div className="flex w-full md:w-[338px] justify-between items-center">
            <p className="text-[14px] text-[400] leading-[21x] text-[#4E4E4E] text-left">
              Apartment Number
            </p>
            <p className="text-[14px] truncate text-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              {"data.ApartmentNumber"}
            </p>
          </div>
          <div className="flex w-full md:w-[338px] justify-between items-center">
            <p className="text-[14px] text-[400] leading-[21x] text-[#4E4E4E] text-left">
              Estate
            </p>
            <p className="text-[14px] text-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              {"data.Estate"}
            </p>
          </div>
          <div className="flex w-full md:w-[338px] justify-between items-center">
            <p className="text-[14px] text-[400] leading-[21x] text-[#4E4E4E] text-left">
              Rent Amount
            </p>
            <p className="text-[14px] text-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              {"data.Rent"}
            </p>
          </div>
          <div className="flex w-full md:w-[338px] justify-between items-center">
            <p className="text-[14px] text-[400] leading-[21x] text-[#4E4E4E] text-left">
              Due Date
            </p>
            <p className="text-[14px] text-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              {"data.DueDate"}
            </p>
          </div>
        </div>
      </div>

      <ReminderPane />
    </div>
  );
};

export default Reminder;
