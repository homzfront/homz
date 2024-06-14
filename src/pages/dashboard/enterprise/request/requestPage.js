"use client";
import React, { useEffect, useState } from "react";
import PendingRequest from "./pendingRequest";
import Image from "next/image";
import Modal from "../tenants/components/modal";
import LoadingII from "@/components/mainmenu/loadingII";
import { ConfirmTenantRequest } from "@/api/requestService";
import useBodyScroll from "@/utils/useBodyScroll";
import useRequestEnterprise from "@/store/enterpriseStore/useRequestEnterprise";
import { Result } from "postcss";
import Loading from "@/components/mainmenu/loading";
import useClickOutside from "@/utils/clickOutside";

const RequestPage = () => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [inviteTenant, setInviteTenant] = useState(false);
  const [done, setDone] = useState(false);
  const [doneTwo, setDoneTwo] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));

  const clear = () => {
    setSelectedProperty(null);
  };
  // useEffect to handle scrolling
  useBodyScroll([inviteTenant, popUpMenu, popUpMenuTwo, inviteTenant]);

  const { request, tenantData, loading, fetchData } = useRequestEnterprise();

  useEffect(() => {
    fetchData();
  }, []);

  const data = request;

  const options = [...new Set(data?.map((item) => item.estate))];

  // Filter estateData based on selectedState, selectedArea, and searchQuery
  const filteredData = data?.filter(
    (data) => !selectedProperty || data?.estate === selectedProperty
  );

  const toggleInvite = () => {
    setInviteTenant(true);
  };

  const returnToPage = async () => {
    setDone(false);
    setDoneTwo(false);
    setPopUpMenu(false);
    setPopUpMenuTwo(false);
    try {
      fetchData();
    } catch (error) { }
  };

  const handleAccept = async (id) => {
    setLoadingII(true);
    try {
      // Call ConfirmTenantRequest with "accepted" status
      await ConfirmTenantRequest(id, "accepted");
      setDone(!done);
      setLoadingII(false);
    } catch (error) {
      setLoadingII(false);
    }
  };

  const handleReject = async (id) => {
    setLoadingII(true);
    try {
      // Call ConfirmTenantRequest with "declined" status
      await ConfirmTenantRequest(id, "declined");
      setLoadingII(false);
      setDoneTwo(!doneTwo);
    } catch (error) {
      setLoadingII(false);
    }
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

  return (
    <div>
      {loading && <LoadingII />}
      {loadingII && <Loading />}
      {data && data.length >= 1 ? (
        <PendingRequest
          selectedDataId={selectedDataId}
          popUpMenu={popUpMenu}
          popUpMenuTwo={popUpMenuTwo}
          friendRequests={filteredData}
          handleAccept={handleAccept}
          handleReject={handleReject}
          handleToggleMenu={handleToggleMenu}
          handleToggleMenuTwo={handleToggleMenuTwo}
          returnHomeTwo={returnHomeTwo}
          done={done}
          doneTwo={doneTwo}
          returnToPage={returnToPage}
          tenantData={tenantData}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          options={options}
          clear={clear}
        />
      ) : (
        <div className="w-full p-8">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Tenancy Request</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz  text-[18px] font-[400]">0</span>
              </span>
            </div>
            <p className="text-[18px] font-[400] text-GrayHomz">
              All requests from new tenants are displayed here
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-5 h-[450px] justify-center items-center">
            <div className="h-[120px] w-[120px] bg-whiteblue flex items-center justify-center rounded-[100%]">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/request/document-download.png"
                }
                alt=""
                height={89}
                width={89}
              />
            </div>
            <h1 className="text-[20px] font-[500] text-BlueHomz">
              You Have No Request At the Moment
            </h1>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Share your unique link to invite your tenants to your properties.
            </p>
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
        </div>
      )}
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} setInviteTenant={setInviteTenant} />
        </div>
      )}
    </div>
  );
};

export default RequestPage;
