"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ListedEstates from "./listedEstates";
import ownerEstateStore from "@/store/propertyOwnerStore/ownerEstate";

const Estate = () => {
  const { data, loading, fetchData } =   ownerEstateStore()

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  
  console.log(data);

  const clear = () => {
    setSelectedState(null);
    setSelectedArea(null);
  };

  const options = [...new Set(data?.map((item) => item?.location.state))];
  console.log(options);

  const options2 = [...new Set(data?.map((item) => item?.location.area))];
  console.log(options2);


  const filteredData = data?.filter((data) => {
    return (
      (!selectedState || data?.location.state === selectedState) &&
      (!selectedArea || data?.location.area === selectedArea)
    );
  });

  return (
    <div>
      {data.length >= 1 ? (
        <ListedEstates
        Data={filteredData}
          selectedDataId={selectedDataId}
          setSelectedDataId={setSelectedDataId}
          popUpMenu={popUpMenu}
          setPopUpMenu={setPopUpMenu}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedArea={selectedArea}
          selectedState={selectedState}
          setSelectedArea={setSelectedArea}
          setSelectedState={setSelectedState}
          clear={clear}
          options={options}
          options2={options2}
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
