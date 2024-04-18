'use client';
import React, { useState } from "react";
import Image from "next/image";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";

const Preview = ({ modalIsOpen, setModalIsOpen }) => {

const tenantName = "John Doe";
  const rentAmount = 1000; 
  const dueDate = "March 15, 2024"; 

  const message = `Dear ${tenantName},
    We hope this message finds you well. As part of our commitment to ensuring a smooth and 
    convenient rental experience, we want to remind you of your upcoming rent due date. Your payment 
    is due on ${dueDate}.
    
    Important Details:
    Amount Due: ${rentAmount}
    Due Date: ${dueDate}`;

  const [isTextAreaEnabled, setTextAreaEnabled] = useState(false);
  const [msg, setMsg]=useState(message);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);


  

  const handleClick = () => {
    setTextAreaEnabled(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setTextAreaEnabled(false);

  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditMessage= () =>{
    setSuccessModalIsOpen(true)

  }

  return (
    <div>
      <CustomizeModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col md:w-[858px] bg-white rounded-[12px] p-[28px] space-y-7 w-[350px]">
          <div className="flex items-center justify-between preview">
            <div className="flex gap-[24px]">
              <p className="pt-1">
                <Image
                  src={"/static/images/Notification.svg"}
                  alt=""
                  height={40}
                  width={40}
                />
              </p>
              <div className="">
                <p className="text-[#202020] text-[14px] md:text-[20px] leading-[30px] font-[700] mb-1">
                  Rent Due Reminder
                </p>
                <p className="text-[13px] leading-[19.5px] text-[#4E4E4E]">
                  2 mins ago
                </p>
              </div>
            </div>
            <div>
              <button onClick={closeModal} className="cursor-pointer md:mb-2">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="flex gap-[2rem] flex-col">
            <textarea
              value={msg}
              className={`w-full md:w-[806px] h-[276px] p-4 border border-gray-300 rounded bg-gray-100 overflow-y-auto ${
                isTextAreaEnabled ? "" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!isTextAreaEnabled}
              onChange={(e)=> setMsg(e.target.value)}
            > 
            {msg}
             </textarea>
            {
                !isTextAreaEnabled ?
            <button
              onClick={handleClick}
              className="bg-blue-600 flex justify-center gap-1  text-white p-2 rounded hover:bg-blue-500 md:ml-auto"
            >
              <Image
                src="/static/images/white_edit-2.svg"
                height={16}
                width={16}
                alt=""
              />
             <span>Edit message</span> 
            </button>
            :
            <button
              onClick={handleEditMessage}
              className="bg-blue-600 flex gap-1 justify-center  text-white p-2 rounded hover:bg-blue-500 md:ml-auto"
            >
              
             <span>Save message </span> 
            </button>
            }          
          </div>
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
              Reminder Message Saved Successfully
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
    </div>
  );
};

export default Preview;
