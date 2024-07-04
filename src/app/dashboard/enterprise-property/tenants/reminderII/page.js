"use client"
import ArrowLeftII from "@/components/icons/arrowLeftII";
import PinNoti from "@/components/icons/pinNoti";
import ToggleButton from "@/pages/dashboard/enterprise/components/toggle";
import Link from "next/link";
import React, { useState } from "react";
import Settings from "./components/settings";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import SettingsII from "./components/settingsII";

const Data = [
  {
    id: 1,
    reminderDate: "6 Months Reminder",
    tenant: "Tenants will receive a reminder 6 months to their due dates",
  },
  {
    id: 2,
    reminderDate: "3 Months Reminder",
    tenant: "Tenants will receive a reminder 3 months to their due dates",
  },
  {
    id: 3,
    reminderDate: "1 Month Reminder",
    tenant: "Tenants will receive a reminder 1 month to their due dates",
  },
  {
    id: 4,
    reminderDate: "7 Days Reminder",
    tenant: "Tenants will receive a reminder 3 days to their due dates",
  },
  {
    id: 5,
    reminderDate: "Due Date",
    tenant: "Tenants will receive a reminder on their due date",
  },
  {
    id: 6,
    reminderDate: "Post Due Date",
    tenant: "Tenants will frequently receive set reminder after their due date",
  },
]

const ReminderMultiple = () => {
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

  const isAnyToggleActive = Object.values(toggleStates).some(value => value);

  return (
    <div className="flex flex-col gap-4">
      <CustomizeModal isOpen={openCompleted}>
        <div className="p-2 m-auto bg-white h-auto rounded-md">
          <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
              }
              alt=""
              height={48}
              width={48}
            />
            <h1 className="text-BlackHomz text-center font-[700] text-[20px]">Reminder Settings Saved</h1>
            <p className="text-[16px] font-[400] text-GrayHomz text-center">Tenants will now receive reminders to prompt swift rent  payment</p>
            <button
              onClick={() => {
                setOpenCompleted(false)
              }}
              className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
            >
              Close
            </button>
          </div>
        </div>
      </CustomizeModal>
      <div className="p-8 border-b flex flex-col gap-4">
        <Link href="/dashboard/enterprise-property/tenants">
          <button className="flex items-center gap-1">
            <ArrowLeftII />
            <span className=" text-gray-400 text-[14px]">Go Back</span>
          </button>
        </Link>
        <div className="w-full p-4 bg-BlueHomz rounded-[8px] flex flex-col gap-2">
          <p className="text-[20px] font-[500] text-white">
            Rent Due Reminder
          </p>
          <p className="text-[16px] font-[400] text-walletBg">
            Set rent due reminders to ensure your tenants receive timely notifications.
          </p>
        </div>
      </div>
      <div className="px-8 flex flex-col gap-4 ">
        <div className="w-full p-4 bg-inputBg rounded-[8px] flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <PinNoti />
            <p className="text-GrayHomz text-[16px] font-[400]">
              Note that this feature can only be applied when you have set a rent due date for your tenant
            </p>
          </div>
          <button className="text-BlueHomz text-[14px] font-[500]">
            Set your tenant rent due date
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {Data.map((data) => (
            <div key={data.id}>
              <div className="w-full p-4 bg-walletBg border border-BlueHomz rounded-[8px]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <ToggleButton
                      onToggle={() => handleToggle(data.id)}
                      isOpen={toggleStates[data.id]}
                    />
                    <div>
                      <p className="text-[16px] font-[500] text-BlueHomz">
                        {data.reminderDate}
                      </p>
                      <p className="text-[14px] font-[500] text-BlackHomz">
                        {data.tenant}
                      </p>
                    </div>
                  </div>
                  <div>
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
                  <Settings />
                </div>
              )}
              {selectedId === data.id && data?.reminderDate === "Post Due Date" && (
                <div className="mt-2 px-4 bg-white border border-lightblue rounded-[8px]">
                  <SettingsII />
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
    </div >
  );
};

export default ReminderMultiple;
