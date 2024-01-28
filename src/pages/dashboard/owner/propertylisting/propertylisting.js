"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ListedProperties from "./listedProperties";
import PropertyForm from "./propertyListingForm/propertyForm";
import { fetchPropertyListedAll } from "@/api/propertyService";
import usePropertyListedAllStore from "@/store/property";
import useBodyScroll from "@/components/general/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";

const PropertyListing = () => {
  const { propertyListedAll, setPropertyListedAll } =
    usePropertyListedAllStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPropertyListedAll();
        console.log(data);
        const properties = data.data?.results?.[0].data;
        console.log(properties);
        setPropertyListedAll(properties);
        setData(properties);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  useBodyScroll([loading]);
  console.log(data);
  console.log(propertyListedAll);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  console.log(data);

  const openRegistrationForm = () => {
    setRegistrationForm(true);
  };

  const returnToStartRegistration = () => {
    setRegistrationForm(false);
  };

  const addNewProperty = () => {
    setRegistrationForm(true);
  };

  return (
    <div className="w-[1147px]">
      {loading ? (
        <LoadingII />
      ) : data.length >= 1 ? (
        <ListedProperties
          Data={data}
          selectedDataId={selectedDataId}
          setSelectedDataId={setSelectedDataId}
          popUpMenu={popUpMenu}
          setPopUpMenu={setPopUpMenu}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedValue={setSelectedValue}
          handleSelect={handleSelect}
          addNewProperty={addNewProperty}
          registrationForm={registrationForm}
          returnToStartRegistration={returnToStartRegistration}
        />
      ) : registrationForm ? (
        <PropertyForm returnToStartRegistration={returnToStartRegistration} />
      ) : (
<div className="w-[1147px] p-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Listed Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz  text-[18px] font-[400]">0</span>
              </span>
            </div>
            <p className="text-[18px] font-[400] text-GrayHomz">
              List your properties so Tenants can see them.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-5 h-[600px] justify-center items-center">
            <div className="bg-whiteblue rounded-[100%] flex justify-center items-center h-[120px] w-[120px]">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/propertyList/buliding.png"
                }
                height={88}
                width={89}
                alt=""
                className="mb-2"
              />
            </div>
            <h1 className="text-[41px] font-[700] text-BlueHomz">
              Get Started
            </h1>
          <button
            onClick={openRegistrationForm}
            className="p-[12px] w-[145px] mt-3 bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
              alt=""
              width={16}
              height={16}
            />
            List Property
          </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default PropertyListing;
