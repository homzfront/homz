"use client"
import Image from "next/image";
import ArrowLeftII from "@/components/icons/arrowLeftII";
import PinNoti from "@/components/icons/pinNoti";
import ToggleButton from "@/pages/dashboard/enterprise/components/toggle";
import Link from "next/link";
import React, { useState } from "react";
import Settings from "./components/settings";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import SettingsII from "./components/settingsII";
import Data from "./components/reminderData";

const Reminder = () => {
  const [toggleStates, setToggleStates] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [openCompleted, setOpenCompleted] = useState(false);

  const handleToggle = (id) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleSetting = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const isAnyToggleActive = Object?.values(toggleStates)?.some(value => value);

  return (
    <div className="pt-8 md:pt-6 flex flex-col gap-y-6 w-full">
      <div className="px-8">
        <Link href="/dashboard/enterprise-property/tenants">
          <button className="flex items-center gap-1">
            <ArrowLeftII />
            <span className=" text-gray-400 text-[14px]">Go Back</span>
          </button>
        </Link>
      </div>
      <div className="w-full px-8">
        <div className="p-4 bg-BlueHomz rounded-[8px] flex flex-col gap-2">
          <p className="text-[20px] font-[500] text-white">
            Rent Due Reminder
          </p>
          <p className="text-[16px] font-[400] text-walletBg">
            Set rent due reminders to ensure your tenants receive timely notifications.
          </p>
        </div>
      </div>
      <div className="py-[24px] px-8 bg-whiteblue">
        <div className="flex flex-row md:gap-[56px] items-center">
          <div className="w-[50%] md:w-[132px] h-[132px] rounded-[100%] ">
            <Image
              src="/static/images/papaDrinking.png"
              alt=""
              width={132}
              height={132}
              className="rounded-[100%] "
            />
          </div>
          <div className="flex flex-col w-[50%] gap-[5px] md:w-full">
            <div className="md:flex w-full md:w-[338px] justify-between items-center">
              <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
                Full Name
              </p>
              <p className="text-[14px] font-[500]  leading-[21x] text-[#202020] text-left w-[132px]">
                Adeyemo Olayemi
              </p>
            </div>
            <div className="md:flex w-full md:w-[338px] justify-between items-center">
              <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
                Apartment Number
              </p>
              <p className="text-[14px] truncate font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
                Apartment 1
              </p>
            </div>
            <div className="hidden md:flex w-full md:w-[338px] justify-between items-center">
              <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
                Estate
              </p>
              <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
                Sunrise Estate
              </p>
            </div>
            <div className="hidden md:flex w-full md:w-[338px] justify-between items-center">
              <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
                Rent Amount
              </p>
              <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
                N750,000
              </p>
            </div>
            <div className="hidden md:flex w-full md:w-[338px] justify-between items-center">
              <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
                Due Date
              </p>
              <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
                4th January, 2024
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex">
          <div className="md:hidden flex w-[33.3%] break-words flex-col">
            <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
              Estate
            </p>
            <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              Sunrise Estate
            </p>
          </div>
          <div className="md:hidden flex w-[33.3%] break-words flex-col">
            <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
              Rent Amount
            </p>
            <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              N750,000
            </p>
          </div>
          <div className="md:hidden flex w-[33.3%] break-words flex-col">
            <p className="text-[14px] font-[400] leading-[21x] text-[#4E4E4E] text-left">
              Due Date
            </p>
            <p className="text-[14px] font-[500] leading-[21x] text-[#202020] text-left w-[132px]">
              4th January, 2024
            </p>
          </div>
        </div>
      </div>
      <div className="px-8 flex flex-col gap-4 ">
        <div className="w-full p-4 bg-inputBg rounded-[8px] flex justify-between gap-4 md:gap-0 items-start md:items-center">
          <div className="flex gap-2 items-center">
            <PinNoti />
            <p className="text-GrayHomz text-[16px] font-[400] hidden md:block">
              Note that this feature can only be applied when you have set a rent due date for your tenant
            </p>
          </div>
          <div className="">
            <p className={`text-GrayHomz text-[16px] font-[400] md:hidden`}>
              Note that this feature can only be applied when you have set a rent due date for your tenant
            </p>
            <button className="text-BlueHomz text-[14px] font-[500]">
              Set your tenant rent due date
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {Data?.map((data) => (
            <div key={data.id}>
              <div className="w-full p-4 bg-walletBg border border-BlueHomz rounded-[8px]">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex gap-2 md:gap-4">
                    <ToggleButton
                      onToggle={() => handleToggle(data.id)}
                      isOpen={toggleStates[data.id]}
                    />
                    <div className="flex flex-col">
                      <div>
                        <p className="text-[16px] font-[500] text-BlueHomz">
                          {data.reminderDate}
                        </p>
                        <p className="text-[14px] font-[500] text-BlackHomz">
                          {data.tenant}
                        </p>
                      </div>
                      <div className="md:hidden mt-2">
                        <button
                          onClick={() => handleSetting(data.id)}
                          className="text-BlueHomz"
                        >
                          View settings
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <button
                      onClick={() => handleSetting(data.id)}
                      className="text-BlueHomz"
                    >
                      View settings
                    </button>
                  </div>
                </div>
              </div>
              {selectedId === data.id && data?.reminderDate !== "Post Due Date" && (
                <div className="mt-2 px-4 bg-white border border-lightblue rounded-[8px]">
                  <Settings data={data} />
                </div>
              )}
              {selectedId === data.id && data?.reminderDate === "Post Due Date" && (
                <div className="mt-2 px-4 bg-white border border-lightblue rounded-[8px]">
                  <SettingsII data={data} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end mt-4 mb-10">
          {
            isAnyToggleActive ?
              <button
                onClick={() => setOpenCompleted(true)}
                className="text-[14px] font-[500] w-[155px] bg-BlueHomz text-white py-3 rounded-[4px]">
                Save settings
              </button>
              :
              <button className="text-[14px] font-[500] w-[155px] bg-GrayHomz6 text-GrayHomz5 py-3 rounded-[4px]">
                Save settings
              </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Reminder;
