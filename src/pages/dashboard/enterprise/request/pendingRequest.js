"use client";
import Image from "next/image";
import React, { useState } from "react";
import AcceptAndRejectModel from "./components/acceptAndRejectModel";
import ConfirmModal from "../components/confirmModal";
import { ConfirmTenantRequest } from "@/api/requestService";
import Dropdown from "../components/dropDownFilter";
import timeAgo from "@/utils/timeAgo";
import EmptyAvatar from "@/components/icons/emptyAvatar";


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
  setSelectedProperty,
  selectedProperty,
  options,
  clear,
}) => {
  if (!friendRequests) {
    return null; // or display a loading state or any other fallback
  }

  const pendingData = friendRequests.filter(
    (item) => item.status === "pending"
  );

  // Get the length of the filtered data
  const pendingCount = pendingData.length;
  // Example usage:
  const timestamp = "2024-01-19T05:14:45.672Z";

  return (
    <div className="w-full p-8">
      <div className="flex w-full flex-col md:flex-row justify-between md:items-center mb-4">
        <div className="md:w-[20%]">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="w-full">Tenancy Request</p>
              <span className="bg-whiteblue p-1 rounded-[4px] flex justify-center ">
                <span className="text-BlueHomz ">{pendingCount}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pr-2">
            Filter by:{" "}
          </p>
          <div className="w-[120px]">
            <Dropdown
              options={options}
              onSelect={(option) => setSelectedProperty(option)}
              selectOption={
                selectedProperty === null ? "Property" : selectedProperty
              }
              className={"text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <button
            onClick={clear}
            className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer"
          >
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
        <div className="mt-4 flex justify-between md:hidden w-full">
          <div className="relative w-[86%] rounded-[4px]">
            <div className="w-full">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null ? "Property" : selectedProperty
                }
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
          </div>
          <button
            onClick={clear}
            className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 mb-1 p-1 rounded cursor-pointer"
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
          </button>
        </div>
      </div>
      <div>
        {friendRequests.map((request) => (
          <div
            key={request._id}
            className={`${request?.status === "accepted" || request?.status === "declined"
                ? "hidden"
                : ""
              }`}
          >
            {tenantData?.map((data) => (
              <div key={data?.data?._id}>
                {request?.tenant === data?.data?._id && (
                  <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-b py-2">
                    <div className="flex gap-4">
                      <div>
                        {!data?.data?.coverPhoto ? (
                          <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                            <EmptyAvatar />
                          </div>
                        ) : (
                          <Image
                            src={data?.data?.coverPhoto?.url}
                            alt=""
                            width={40}
                            height={40}
                            layout="full" // Specify the desired height
                            objectFit="cover"
                            objectPosition="center"
                            className="object-cover bg-center h-[40px] rounded-full"
                            priority
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-[16px] font-[600] text-BlackHomz">
                          {data?.data?.fullName}
                        </p>
                        <p className="text-[14px] font-[400] text-GrayHomz">
                          {data?.data?.fullName} has sent a request to join{" "}
                          <span className="text-[14px] font-[600] text-GrayHomz">
                            {request?.estate} Property
                          </span>
                        </p>
                        <p className="text-[13px] font-[400] text-GrayHomz">
                          {timeAgo(request?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 md:mt-0 flex gap-4 w-full md:justify-end">
                      <div className="w-[40px] md:hidden"></div>
                      <button
                        onClick={() => handleToggleMenu(request?._id)}
                        className="text-[14px] font-[700] text-white bg-BlueHomz px-3 py-1 rounded-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleToggleMenuTwo(request?._id)}
                        className="text-[14px] font-[700] text-BlueHomz border border-BlueHomz px-3 py-1 rounded-md"
                      >
                        Decline
                      </button>
                    </div>
                    {popUpMenu && selectedDataId === request?._id && (
                      <div>
                        <AcceptAndRejectModel
                          header={"Proceed To Add  tenant to Property?"}
                          body={`${data?.data.fullName} will be added as a tenant to ${request?.estate} Property.`}
                          button={"Yes, Proceed"}
                          buttonTwo={"Cancel"}
                          returnHome={() => handleAccept(selectedDataId)}
                          returnHomeTwo={returnHomeTwo}
                        />
                      </div>
                    )}
                    {popUpMenuTwo && selectedDataId === request?._id && (
                      <div key={request?._id}>
                        <AcceptAndRejectModel
                          header={"Decline Tenant Request?"}
                          body={`You’re about to decline ${data?.data?.fullName}’s request to join ${request?.estate} Property.`}
                          button={"Yes, Proceed"}
                          buttonTwo={"Cancel"}
                          returnHome={() => handleReject(selectedDataId)}
                          returnHomeTwo={returnHomeTwo}
                        />
                      </div>
                    )}
                    {done && (
                      <div className="px-8 md:px-0 absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="md:max-w-[464px] md:h-[240px] py-8 rounded-[8px] bg-white m-auto">
                          <div className="md:w-[464px] px-8 flex flex-col justify-center items-center gap-5">
                            <Image
                              src={
                                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                              }
                              alt=""
                              height={48}
                              width={48}
                            />
                            <h1 className="text-BlackHomz text-center font-[700] text-[20px]">
                              Tenant Added Successfully
                            </h1>
                            <button
                              onClick={returnToPage}
                              className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {doneTwo && (
                      <div className="px-8 md:px-0 absolute top-0 z-20 h-screen w-full  inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="md:max-w-[464px] py-8 rounded-[8px] bg-white m-auto">
                          <div className="md:w-[464px] px-8 flex flex-col justify-center items-center gap-5">
                            <Image
                              src={
                                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                              }
                              alt=""
                              height={48}
                              width={48}
                            />
                            <h1 className="text-BlackHomz text-center font-[700] text-[20px]">
                              Tenant Request Declined Successfully
                            </h1>
                            <button
                              onClick={returnToPage}
                              className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                            >
                              Close
                            </button>
                          </div>
                        </div>
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
