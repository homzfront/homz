"use client"
import React, { useEffect, useState } from "react";
import DropDown from "./components/threeDropDown";
import Image from "next/image";
import TenantsTwo from "./tenantsTwo";
import Data from "../Data.json"
import Modal from "./components/modal";

const Tenants = () => {
  const [inviteTenant, setInviteTenant] = useState(false);
  const toggleInvite = () => {
    setInviteTenant(true);
  }
  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = inviteTenant ? "hidden" : "auto";
  }, [inviteTenant]);



  const data = Data.Data  
  return (
    <div className="w-[1081px] p-8">
      {inviteTenant ? (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <Modal setInviteTenant={setInviteTenant}/>
        </div>
      ) : (

    <div className="">
      <div className=" flex justify-between  items-center">
        <div className="flex gap-1">
          <p>Tenants</p>
          <span className="bg-whiteblue w-6 h-6 flex justify-center ">
            <span className="text-BlueHomz ">{data.length}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz">Filter by: </p>
          <DropDown />

          <input
            type="date"
            className="border items-center gap-4 flex text-GrayHomz2 px-4 h-10 w-[120px] mb-1 p-2 rounded cursor-pointer"
            />
          <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
                />
            </span >
            Reset
          </button>
          <button onClick={toggleInvite} className={`p-[12px] h-10 mt-[-5px] ml-8 w-[143px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700] ${data.length < 1 ? 'hidden' : 'inline'}`}>
          <Image src={"/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"} alt="" width={16} height={16} />
          Invite Tenant
        </button>
        </div>
      </div>
      {data.length < 1 ? (<div className="flex flex-col gap-3 mt-5">
        <h1 className="text-[41px] font-[700] text-BlueHomz">Get Started</h1>
        <p className="text-[18px] font-[400] text-GrayHomz">Share your unique link to invite your tenants to your properties.</p>
        <button onClick={toggleInvite} className="p-[12px] w-[143px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]">
          <Image src={"/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"} alt="" width={16} height={16} />
          Invite Tenant
        </button>
      </div>) : (
        <TenantsTwo Data={data} />
        )}
    </div>
      )}
        </div>
  );
};

export default Tenants;
