"use client";
import React, { useEffect, useState } from "react";
import PendingRequest from "./pendingRequest";
import Image from "next/image";
import Modal from "../tenants/components/modal";

const RequestPage = () => {
  const Data = [
    {
      Id: 1,
      Name: "Tunde Olayemi",
      Image: "/static/dashboard/enterprisemanager/request/Avatar.png",
      Request: true,
    },
    {
      Id: 2,
      Name: "Jimoh Michael",
      Image: null,
      Request: true,
    },
    {
      Id: 3,
      Name: "Fortune Winifred",
      Image: "/static/dashboard/enterprisemanager/request/Avatar.png",
      Request: true,
    },
    {
      Id: 4,
      Name: "Haruna Ishola",
      Image: "",
      Request: true,
    },
  ];

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []); // Assuming Data is defined elsewhere
  const [inviteTenant, setInviteTenant] = useState(false);
  const [friendRequests, setFriendRequests] = useState(Data || []);
  const [done, setDone] = useState(false)
  const [doneTwo, setDoneTwo] = useState(false)

  const toggleInvite = () => {
    setInviteTenant(true);
  };

  const handleAccept = (id) => {
    console.log(id);
    // Find the user with the given id and update the request status
    setFriendRequests((prevRequests) =>
      prevRequests.map((user) =>
        user.Id === id ? { ...user, Request: false } : user
      )
    );
    setDone(!done);
  };
  const returnToPage = () => {
    setDone(false);
    setDoneTwo(false);
    setPopUpMenu(false);
    setPopUpMenuTwo(false);
  }
  console.log(friendRequests);
  const handleReject = (id) => {
    // Remove the user with the given id from the friend requests
    setFriendRequests((prevRequests) =>
      prevRequests.filter((user) => user.Id !== id)
    );
    setDoneTwo(!doneTwo);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenu(!popUpMenu);
    setSelectedDataId(id);
  };
  const handleToggleMenuTwo = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  const returnHomeTwo = () => {
    setPopUpMenu(false);
    setPopUpMenuTwo(false);
  };

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      inviteTenant || popUpMenu || popUpMenuTwo ? "hidden" : "auto";
  }, [inviteTenant, popUpMenu, popUpMenuTwo]);

  return (
    <div>
      {friendRequests.length >= 1 ? (
        <PendingRequest
          selectedDataId={selectedDataId}
          popUpMenu={popUpMenu}
          popUpMenuTwo={popUpMenuTwo}
          friendRequests={friendRequests}
          handleAccept={handleAccept}
          handleReject={handleReject}
          handleToggleMenu={handleToggleMenu}
          handleToggleMenuTwo={handleToggleMenuTwo}
          returnHomeTwo={returnHomeTwo}
          done={done}
          doneTwo={doneTwo}
          returnToPage={returnToPage}
        />
      ) : inviteTenant ? (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal setInviteTenant={setInviteTenant} />
        </div>
      ) : (
        <div className="w-[1081px] p-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>Tenancy Request</p>
              <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                <span className="text-BlueHomz ">0</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="text-[20px] font-[500] text-BlueHomz">
              You Have No Request At the Moment
            </h1>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Share your unique link to invite your tenants to your properties.
            </p>
          </div>
          <button
            onClick={toggleInvite}
            className="p-[12px] w-[145px] mt-3 bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
              alt=""
              width={16}
              height={16}
            />
            Invite Tenant
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestPage;
