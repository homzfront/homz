"use client";
import Image from "next/image";
import React, { useState } from "react";
import AcceptAndRejectModel from "./components/acceptAndRejectModel";
import ConfirmModal from "../components/confirmModal";

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
  setTenantData
}) => {
  console.log(tenantData);
  console.log(friendRequests);
  if (!friendRequests) {
    return null; // or display a loading state or any other fallback
  }


  return (
    <div className="w-[1147px] p-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>Tenancy Request</p>
              <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                <span className="text-BlueHomz ">{friendRequests?.length}</span>
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
        {friendRequests.map((data) => (
          <div key={data.Id} className="">
            {data.Request === true && (
              <div className="flex items-center justify-between border-t border-b py-2">
                <div className="flex gap-4">
                  <div>
                    {data.Image === null ||
                    data.Image === "" ||
                    data.Image === undefined ? (
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/request/AvatarEmpty.png"
                        }
                        alt=""
                        height={40}
                        width={40}
                      />
                    ) : (
                      <Image src={data.Image} alt="" height={40} width={40} />
                    )}
                  </div>
                  <div>
                    <p className="text-[16px] font-[600] text-BlackHomz">
                      {data.Name}
                    </p>
                    <p className="text-[14px] font-[400] text-GrayHomz">
                      {data.Name} has sent a request to join{" "}
                      <span className="text-[14px] font-[600] text-GrayHomz">
                        New Suncity Estate
                      </span>
                    </p>
                    <p className="text-[13px] font-[400] text-GrayHomz">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleToggleMenu(data.Id)}
                    className="text-[14px] font-[700] text-white bg-BlueHomz px-3 py-1 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleToggleMenuTwo(data.Id)}
                    className="text-[14px] font-[700] text-BlueHomz border border-BlueHomz px-3 py-1 rounded-md"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}
            {popUpMenu && selectedDataId === data.Id && (
              <div>
                <AcceptAndRejectModel
                  header={"Proceed To Add  tenant to Property?"}
                  body={`${data.Name} will be added as a tenant to New Suncity Estate.`}
                  button={"Yes, Proceed"}
                  buttonTwo={"Cancel"}
                  returnHome={() => handleAccept(data.Id)}
                  returnHomeTwo={returnHomeTwo}
                />
              </div>
            )}
            {popUpMenuTwo && selectedDataId === data.Id && (
              <div key={data.Id}>
                <AcceptAndRejectModel
                  header={"Decline Tenant Request?"}
                  body={`You’re about to decline ${data.Name}’s request to join New Suncity Estate.`}
                  button={"Yes, Proceed"}
                  buttonTwo={"Cancel"}
                  returnHome={() => handleReject(data.Id)}
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
        ))}
      </div>
    </div>
  );
};

export default PendingRequest;
