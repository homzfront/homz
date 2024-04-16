"use client";
import Loading from "/src/components/mainmenu/loading";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InviteLink = ({ openLink, loading, inviteLink, setInviteLink }) => {


  const handleInputChange = (event) => {
    setInviteLink(event.target.value);
  };

  console.log(inviteLink);

  const handleOpenLink = (e) => {
    e.preventDefault();
    openLink({ e, inviteLink });
  };

  return (
    <div className="p-8 mt-4 flex flex-col gap-3">
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
          className="bg-BlueHomz text-white h-[48px] w-[128px] rounded-[4px]"
        >
          Join Property
        </button>
      </div>
    </div>
  );
};

export default InviteLink;
