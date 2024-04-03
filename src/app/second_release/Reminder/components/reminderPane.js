"use client";
import Image from "next/image";
import React, { useState } from "react";
import Frequency from "./frequency";
import Channels from "./channels";
import CustomizeModal from "../../components/CustomizedModal";
import Preview from "./previewReminder";

const ReminderPane = () => {
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");
  const [dueDays, setDueDays] = useState("");
  const [reminderChannel, setReminderChannel] = useState("");

  const openModal = () => {
    setSaveModalIsOpen(true);
  };
const handlePreview=()=>{
    setModalIsOpen(true)
}
  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };

  const handleSaved = () => {
    setSuccessModalIsOpen(true);
    setSaveModalIsOpen(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  // Function to check if any of the fields are empty or null
  const isSaveButtonDisabled = () => {
    return !frequency || !time || !reminderChannel || !dueDays; 
  };
  return (
    <div className="flex flex-col pt-3 ">
      <main className="px-3 md:px-0 min-w-[335px] md:w-full">
        <div className="flex flex-col gap-3 md:flex-row md:items-center reminderBorder md:gap-[120px] pb-[24px]">
          <div className="flex flex-col w-[335px] md:w-[395px] gap-2">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              Frequency <span className="text-red-600">*</span>
            </p>
            <p className="text-[13px] leading-[19.5px] text-[400] text-[#4E4E4E]">
              Set how frequent you want your tenant(s) to receive the reminder
            </p>
          </div>
          <div className="">
            <Frequency setFrequency={setFrequency} />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center reminderBorder md:gap-[120px] pt-2 pb-[24px]">
          <div className="flex flex-col w-[335px] md:w-[395px] gap-2">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              Time <span className="text-red-600">*</span>
            </p>
            <p className="text-[13px] leading-[19.5px] text-[400] text-[#4E4E4E]">
              Enter your preferred time for reminder(s) to be sent out
            </p>
          </div>
          <div className="">
            <input
              type="time"
              id="remindTime"
              name="remindTime"
              required
              placeholder="00:00 AM"
              className="w-full md:w-[236px] h-[45px] text-BlackHomz adminCellBorders px-2"
              onChange={(e)=> setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center reminderBorder md:gap-[120px] pt-2 pb-[24px]">
          <div className="flex flex-col w-[335px] md:w-[395px] gap-2">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              Days before due date <span className="text-red-600">*</span>
            </p>
            <p className="text-[13px] leading-[19.5px] text-[400] text-[#4E4E4E]">
              Enter the number of days you want reminder(s) to be sent out
              before rent due day
            </p>
          </div>
          <div className="">
            <input
              type="number"
              className=" w-full md:w-[236px] h-[45px] text-BlackHomz adminCellBorders px-2"
              id="days_before"
              name="days_before"
              min={0}
              placeholder="0 day(s)"
              onChange={(e)=>setDueDays(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center reminderBorder md:gap-[120px] pt-2 pb-[24px]">
          <div className="flex flex-col w-[335px] md:w-[395px] gap-2">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              Set reminder channel(s) <span className="text-red-600">*</span>
            </p>
            <p className="text-[13px] leading-[19.5px] text-[400] text-[#4E4E4E]">
              Select the channels through which your tenants 
              would receive rent
              due reminders.
            </p>
          </div>
          <div className="">
            <Channels  setReminderChannel={setReminderChannel}/>
          </div>
        </div>
      </main>
      <div className=" mt-5 flex w-full flex-col md:flex-row justify-center gap-[24px] px-2 md:px-0 md:justify-end md:items-center md:gap-3">
        <button className="flex justify-center order-2 md:order-1" onClick={handlePreview} 
         disabled={isSaveButtonDisabled()} 
        >
          <p className="flex gap-1">
            <Image src="/static/images/eye.svg" alt="" width={16} height={16} />
            <span className="">Preview reminder</span>
          </p>
        </button>
        <button
          className={`w-full
                    md:w-[120px] h-[48px] ${isSaveButtonDisabled() ? " bg-GrayHomz2 text-BlackHomz" : 'bg-BlueHomz text-white'} rounded-[4px] md:mr-[3rem] text-center  relative order-1 md:order-2`}
          onClick={openModal}
          disabled={isSaveButtonDisabled()} 
        >
          Save settings
        </button>
      </div>

      <CustomizeModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Save Settings?
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Proceed with saving rent due reminder settings?
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={handleSaved}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              setSaveModalIsOpen(false);
            }}
          >
            No, go back
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Reminder Settings Saved
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Tenants will now receive reminders to prompt swift rent payment
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            Close
          </button>
        </div>
      </CustomizeModal>
      <Preview  modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
    </div>
  );
};

export default ReminderPane;
