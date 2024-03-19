"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ListedProperties from "./listedProperties";
import PropertyForm from "./propertyListingForm/propertyForm";
import { propertyForMe } from "@/api/propertyService";
import usePropertyListedAllStore from "@/store/property";
import LoadingII from "@/components/mainmenu/loadingII";
import usePropertyStore from "@/store/propertyForMeStore";

const PropertyListing = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyName, setSelectedPropertyName] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);

  const clear = () => {
    setSelectedProperty(null);
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedRooms(null);
    setSelectedPropertyName(null);
  };

  const { propertyListedAll, loading, fetchData } = usePropertyStore();

  console.log(propertyListedAll);
  const data = propertyListedAll;
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const options = [...new Set(data?.map((item) => item?.location.state))];
  console.log(options);

  const options2 = [...new Set(data?.map((item) => item?.location.area))];
  console.log(options2);

  const options3 = [...new Set(data?.map((item) => item?.propertyType))];
  console.log(options3);

  const options4 = [...new Set(data?.map((item) => item?.numberOfBathrooms))];
  const optionsRoom = options4.sort((a, b) => a - b);
  console.log(optionsRoom);

  const options5 =  [...new Set(data?.map((item) => item?.name))];
  console.log(options5)


  const filteredData = data?.filter(
    (data) =>
      // (!selectedState || data?.location.state === selectedState) &&
      // (!selectedArea || data?.location.area === selectedArea) &&
      (!selectedPropertyName || data?.name === selectedPropertyName) &&
      (!selectedProperty || data?.propertyType === selectedProperty) &&
      (!selectedRooms || data?.numberOfBathrooms === selectedRooms)
  );

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
    <div className="w-full">
      {loading ? (
        <LoadingII />
      ) : data.length >= 1 ? (
        <ListedProperties
          Data={filteredData}
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
          selectedPropertyName={selectedPropertyName}
          selectedArea={selectedArea}
          selectedProperty={selectedProperty}
          selectedRooms={selectedRooms}
          selectedState={selectedState}
          optionsRoom={optionsRoom}
          options={options}
          options2={options2}
          options3={options3}
          options5={options5}
          setSelectedArea={setSelectedArea}
          setSelectedPropertyName={setSelectedPropertyName}
          setSelectedProperty={setSelectedProperty}
          setSelectedRooms={setSelectedRooms}
          setSelectedState={setSelectedState}
          clear={clear}
          fetchData={fetchData}
        />
      ) : registrationForm ? (
        <PropertyForm
          returnToStartRegistration={returnToStartRegistration}
          fetchData={fetchData}
        />
      ) : (
        <div className="w-full p-8">
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
          <div className="flex flex-col gap-3 mt-5 h-[450px] justify-center items-center">
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
