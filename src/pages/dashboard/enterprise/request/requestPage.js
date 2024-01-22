"use client";
import React, { useEffect, useState } from "react";
import PendingRequest from "./pendingRequest";
import Image from "next/image";
import Modal from "../tenants/components/modal";
import { fetchTenantRequest } from "@/api/estateService";
import useTenantRequestStore from "@/store/tenantRequest";
import LoadingII from "@/components/mainmenu/loadingII";
import { fetchSpecificTenant } from "@/api/tenantSevice";
import { ConfirmTenantRequest } from "@/api/requestService";

const RequestPage = () => {
  const { request, setRequest } = useTenantRequestStore();
  const [data, setData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [inviteTenant, setInviteTenant] = useState(false);
  const [done, setDone] = useState(false);
  const [doneTwo, setDoneTwo] = useState(false);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      inviteTenant || popUpMenu || popUpMenuTwo ? "hidden" : "auto";
    if (inviteTenant || popUpMenu || popUpMenuTwo) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [inviteTenant, popUpMenu, popUpMenuTwo]);

  console.log(data);
  console.log(request);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTenantRequest();
        console.log(data);
        const request = data.data?.tenantRequest;
        console.log(request);
        const tenantPromises = await request?.map((tenant) => fetchSpecificTenant(tenant.tenant));
        const tenantData = await Promise.all(tenantPromises);
        console.log(tenantData);
        setRequest(request);
        setTenantData(tenantData);
        setData(request);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);


  const toggleInvite = () => {
    setInviteTenant(true);
  };


  const returnToPage = () => {
    setDone(false);
    setDoneTwo(false);
    setPopUpMenu(false);
    setPopUpMenuTwo(false);
  };

  const handleAccept = async (id) => {
    try {
      // Call ConfirmTenantRequest with "accepted" status
      await ConfirmTenantRequest(id, "accepted");
      setDone(!done);
    } catch (error) {
      console.error("Error accepting tenant request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Call ConfirmTenantRequest with "declined" status
      await ConfirmTenantRequest(id, "declined");
      setDoneTwo(!doneTwo);
    } catch (error) {
      console.error("Error declining tenant request:", error);
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
      {data ? (
        <PendingRequest
          selectedDataId={selectedDataId}
          popUpMenu={popUpMenu}
          popUpMenuTwo={popUpMenuTwo}
          friendRequests={data}
          handleAccept={handleAccept}
          handleReject={handleReject}
          handleToggleMenu={handleToggleMenu}
          handleToggleMenuTwo={handleToggleMenuTwo}
          returnHomeTwo={returnHomeTwo}
          done={done}
          doneTwo={doneTwo}
          returnToPage={returnToPage}
          tenantData={tenantData}
          setTenantData= {setTenantData}
        />
      ) : inviteTenant ? (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal setInviteTenant={setInviteTenant} />
        </div>
      ) : (
        <div className="w-[1147px] p-8">
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
