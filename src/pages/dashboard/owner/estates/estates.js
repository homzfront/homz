"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import ListedEstates from "./listedEstates";

const Estate = () => {
  const Data = [
    {
      id: 1,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 2,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 3,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 4,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 5,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 6,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 7,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 8,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 9,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
    {
      id: 10,
      estateImage:
        "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
      estateName: "Suncity New Property",
      estateAddress: "Alagomeji Area, Yaba, Lagos",
      noOfApartment: 22,
    },
  ];

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(Data || []);

  console.log(data);

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
        />
      ) : (
        <div className="w-[1147px] p-8">
          <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
               <span className="text-BlueHomz text-[18px] font-[400]">{data?.length}</span>
              </span>
            </div>
          </div>
          <div className="h-[850px] w-full flex items-center justify-around">
            <div className="">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/estate/EmptyEstate.png"
                }
                alt=""
                height={120}
                width={120}
                className="m-auto"
              />
              <p className="text-[36px] font-[700] text-BlueHomz text-center">Properties</p>
              <p className="text-[14px] font-[500] text-GrayHomz text-center">
                Your properties will be visible here once they’re added by your
                property manager
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estate;
