"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ListedEstates from "./listedEstates";
import ownerEstateStore from "@/store/propertyOwnerStore/ownerEstate";
import LoadingII from "@/components/mainmenu/loadingII";
import formatDateII from "@/utils/formatDateII";

const Estate = () => {
  const { data, loading, fetchData } = ownerEstateStore()

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const clear = () => {
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedProperty(null);
    setSearchQuery(null);
  };

  const options = [...new Set(data?.map((item) => item?.location.state))];


  const options2 = [...new Set(data?.map((item) => item?.location.area))];


  const option3 = [...new Set(data?.map((item) => item?.name))];


  const filteredData = data?.filter((data) => {
    const matchesSearchQuery = !searchQuery ||
      data?.name.toLowerCase().includes(searchQuery.toLowerCase())
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.requestDate));

    return (
      (!selectedState || data?.location.state === selectedState) &&
      (!selectedArea || data?.location.area === selectedArea) &&
      (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) &&
      (!selectedProperty || data?.name === selectedProperty)
      && matchesSearchQuery
    );
  });

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  }

  return (
    <div className="w-full">
      {loading ? (
        <LoadingII />) : data && data.length >= 1 ? (
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
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            setSelectedArea={setSelectedArea}
            setSelectedState={setSelectedState}
            clear={clear}
            options={options}
            options2={options2}
            options3={option3}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            closeMobileFilterModal={closeMobileFilterModal}
            openMobileFilterModal={openMobileFilterModal}
            setSelectedDate={setSelectedProperty}
            filterModal={filterModal}
          />
        ) : (
        <div className="w-full p-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz text-[18px] font-[400]">{data?.length}</span>
              </span>
            </div>
          </div>
          <div className="h-[450px] w-full flex items-center justify-around">
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
