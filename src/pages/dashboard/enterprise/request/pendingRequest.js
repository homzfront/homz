"use client";
import Image from "next/image";
import React, { useState } from "react";
import AcceptAndRejectModel from "./components/acceptAndRejectModel";
import ConfirmModal from "../components/confirmModal";
import { ConfirmTenantRequest } from "@/api/requestService";

const PendingRequest = ({
  popUpMenu,
  popUpMenuTwo,
  handleToggleMenu,
  handleToggleMenuTwo,
  handleAccept,
  handleReject,
  returnHomeTwo,
  selectedDataId,
  friendRequests,
  done,
  doneTwo,
  returnToPage,
  tenantData,
  setTenantData,
}) => {
  console.log(tenantData);
  console.log(friendRequests);
  if (!friendRequests) {
    return null; // or display a loading state or any other fallback
  }

  const pendingData = friendRequests.filter(item => item.status === 'pending');

  // Get the length of the filtered data
  const pendingCount = pendingData.length;

  console.log(pendingCount);

  function timeAgo(timestamp) {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const timeDifference = currentDate - createdAtDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    } else if (hours > 1) {
      return `${hours} hours ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }

  // Example usage:
  const timestamp = "2024-01-19T05:14:45.672Z";
  console.log(timeAgo(timestamp));

  console.log(selectedDataId);

  return (
    <div className="w-[1147px] p-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>Tenancy Request</p>
              <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                <span className="text-BlueHomz ">
                  {pendingCount}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pr-2">
            Filter by:{" "}
          </p>
          <input
            type="date"
            className="border text-GrayHomz2 px-4 h-10 w-[120px] mb-1 py-2 rounded cursor-pointer"
          />
          <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
        </div>
      </div>
      <div>
        {friendRequests.map((request) => (
          <div key={request._id} className={`${request.status === "accepted" ? "hidden" : ""}`}>
            {tenantData.map((data) => (
              <div key={data.tenants._id}>
                {request.tenant === data.tenants._id && (
                  <div className="flex items-center justify-between w-full border-t border-b py-2">
                    <div className="flex gap-4">
                      <div>
                        {data.tenants.coverPhoto ? (
                          <Image
                            src={data.tenants.coverPhoto.url}
                            alt=""
                            height={40}
                            width={40}
                            className="rounded-full"
                          />
                        ) : (
                          <Image
                            src={
                              "/static/dashboard/enterprisemanager/request/AvatarEmpty.png"
                            }
                            alt=""
                            height={40}
                            width={40}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-[16px] font-[600] text-BlackHomz">
                          {data.tenants.fullName}
                        </p>
                        <p className="text-[14px] font-[400] text-GrayHomz">
                          {data.tenants.fullName} has sent a request to join{" "}
                          <span className="text-[14px] font-[600] text-GrayHomz">
                            {request.estate} Estate
                          </span>
                        </p>
                        <p className="text-[13px] font-[400] text-GrayHomz">
                          {timeAgo(request.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleToggleMenu(request._id)}
                        className="text-[14px] font-[700] text-white bg-BlueHomz px-3 py-1 rounded-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleToggleMenuTwo(request._id)}
                        className="text-[14px] font-[700] text-BlueHomz border border-BlueHomz px-3 py-1 rounded-md"
                      >
                        Decline
                      </button>
                    </div>
                    {popUpMenu && selectedDataId === request._id && (
                      <div>
                        <AcceptAndRejectModel
                          header={"Proceed To Add  tenant to Property?"}
                          body={`${data.tenants.fullName} will be added as a tenant to New Suncity Estate.`}
                          button={"Yes, Proceed"}
                          buttonTwo={"Cancel"}
                          returnHome={() => ConfirmTenantRequest(selectedDataId, "accepted")}
                          returnHomeTwo={returnHomeTwo}
                        />
                      </div>
                    )}
                    {popUpMenuTwo && selectedDataId === request._id && (
                      <div key={request._id}>
                        <AcceptAndRejectModel
                          header={"Decline Tenant Request?"}
                          body={`You’re about to decline ${data.tenants.fullName}’s request to join New Suncity Estate.`}
                          button={"Yes, Proceed"}
                          buttonTwo={"Cancel"}
                          returnHome={() => handleReject(selectedDataId)}
                          returnHomeTwo={returnHomeTwo}
                        />
                      </div>
                    )}
                    {done && (
                      <div>
                        <ConfirmModal
                          header={"Tenant Added Successfully"}
                          returnHome={returnToPage}
                          button={"View Tenants"}
                        />
                      </div>
                    )}
                    {doneTwo && (
                      <div>
                        <ConfirmModal
                          header={"Tenant Request Declined Successfully"}
                          returnHome={returnToPage}
                          button={"Close"}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequest;
