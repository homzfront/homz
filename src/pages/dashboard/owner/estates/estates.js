"use client";
import Image from "next/image";
import React, { useState } from "react";
import DropDown from "./components/dropDown";
import EstateForm from "./estateForm/estateForm";

import ListedEstates from "./listedEstates";

const Estate = () => {
  const Data = [
    {
      id: 1,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 2,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 3,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 4,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 5,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 6,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 7,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 8,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 9,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 10,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Estate",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
  ];

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [data, setData] = useState(Data || []);

  console.log(data);

  const openRegistrationForm = () => {
    setRegistrationForm(true);
  };

  const returnToStartRegistration = () => {
    setRegistrationForm(false);
  }

  const addNewEstate = () => {
    setRegistrationForm(true);
  }
  return (
    <div>
      {data.length >= 1 ? (
        <ListedEstates
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
        <EstateForm returnToStartRegistration={returnToStartRegistration}/>
      ) : (
        <div className="w-[1147px] p-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <p>Estates</p>
              <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                <span className="text-BlueHomz ">0</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="text-[41px] font-[700] text-BlueHomz">
              Get Started
            </h1>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Add your estates so your Tenants can see them
            </p>
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
              Add New Estates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estate;
