"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EstateForm from "./estateForm/estateForm";
import ListedEstates from "./listedEstates";
import useEstateStore from "@/store/estates";
import { fetchEstatesMe } from "@/api/estateService";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";
import estateStore from "@/store/estates";

const Estate = () => {
  const { data, loading, fetchData } = estateStore();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  
const estates = data
  console.log(estates);

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [inviteTenant, setInviteTenant] = useState(false);

  // useEffect to handle scrolling
  useBodyScroll([inviteTenant, loading]);

  console.log(data);

  const openRegistrationForm = () => {
    setRegistrationForm(true);
  };

  const returnToStartRegistration = () => {
    setRegistrationForm(false);
  };

  const addNewEstate = () => {
    setRegistrationForm(true);
  };
  return (
    <div className="w-[1147px]">
      {loading ? (
        <LoadingII />
      ) : data && data.length >= 1 ? (
        <ListedEstates
          setInviteTenant={setInviteTenant}
          inviteTenant={inviteTenant}
          Data={data}
          selectedDataId={selectedDataId}
          setSelectedDataId={setSelectedDataId}
          popUpMenu={popUpMenu}
          setPopUpMenu={setPopUpMenu}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          addNewEstate={addNewEstate}
          registrationForm={registrationForm}
          returnToStartRegistration={returnToStartRegistration}
        />
      
      ) : registrationForm ? (
        <EstateForm returnToStartRegistration={returnToStartRegistration} />
      ) : (
        <div className="w-[1147px] p-8">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz  text-[18px] font-[400]">0</span>
              </span>
            </div>
            <p className="text-[18px] font-[400] text-GrayHomz">
            Add your properties so you can seamlessly manage them
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-5 h-[600px] justify-center items-center">
            <div className="bg-whiteblue rounded-[100%] flex justify-center items-center h-[120px] w-[120px]">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/estate/buildings-2.png"
                }
                height={88}
                width={89}
                alt=""
                className="mt-1"
              />
            </div>
            <h1 className="text-[41px] font-[700] text-BlueHomz">
              Get Started
            </h1>
            <button
              onClick={openRegistrationForm}
              className="p-[12px] w-[185px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                }
                alt=""
                width={16}
                height={16}
              />
              Add New Property
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estate;
