"use client";
import Loading from "@/components/mainmenu/loading";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InviteLink = ({ openLink, loading, inviteLink, setInviteLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };


  const handleInputChange = (event) => {
    setInviteLink(event.target.value);
  };

  console.log(inviteLink);

  const handleOpenLink = (e) => {
    e.preventDefault();
    openLink({ e, inviteLink });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="p-8 mt-4 hidden sm:flex flex-col gap-3">
        {loading && <Loading />}
        <p className="text-[20px] font-[500] text-BlueHomz">
          Have an Invite Link?
        </p>
        <p className="mt-2 text-[18px] font-[400] text-GrayHomz">
          Paste in your invite link to join property
        </p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter invite link"
            value={inviteLink}
            onChange={handleInputChange}
            className="placeholder:text-GrayHomz2 w-[524px] h-[45px] border pl-4 rounded-[4px]"
          />
          <button
            onClick={(e) => handleOpenLink(e)}
            className={`bg-BlueHomz text-white h-[48px] w-[128px] rounded-[4px] ${!inviteLink ? "bg-GrayHomz6 text-GrayHomz5 pointer-events-none" : "" }`}
          >
            Join Property
          </button> 
        </div>
      </div>

      <div className="sm:hidden px-8">
        <div className="sm:hidden w-full bg-inputBg rounded-[12px] h-auto py-8 flex flex-col items-center justify-center ">
          <div
            onClick={handleDropdownToggle}
            className="flex w-full justify-between items-center cursor-pointer px-4"
          >
            <p className="text-[16px] font-[400] text-BlueHomz">
              Have an Invite Link?
            </p>
            <div className={` ${isOpen ? "transform rotate-180" : ""}`}>
              <Image
                src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                height={16}
                width={16}
                alt=""
              />
            </div>
          </div>
          {
            <div
              className={`mt-4 w-full px-4 ${isOpen ? "block" : "hidden"
                }`}
            >
              <p className="text-[13px] font-[400] text-GrayHomz">
                Paste in your invite link to join property
              </p>
              <div className="mt-2 w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter invite link"
                  value={inviteLink}
                  onChange={handleInputChange}
                  className="placeholder:text-GrayHomz2 placeholder:text-[13px] w-full h-[42px] border pl-4 rounded-[4px]"
                />
                <button
                  onClick={(e) => handleOpenLink(e)}
                  className={`bg-BlueHomz text-[14px] text-white h-[45px] w-full rounded-[4px] ${!inviteLink ? "bg-GrayHomz6 text-GrayHomz5 pointer-events-none" : "" }`}
                >
                  Join Property
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default InviteLink;
