"use client";
import React, { useEffect, useState, Suspense } from "react";
import Header from "./components/header";
import Widget from "./components/widget";
import useRentPaymentStore from "@/store/enterpriseStore/rentPaymentInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";
import Image from "next/image";
import FilterMobile from "./components/filterMobile";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";

const Payment = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);

  const {
    data: rentData,
    loading: rentLoading,
    fetchData: fetchRentData,
  } = useRentPaymentStore();

  useEffect(() => {
    fetchRentData();
  }, []);

  const clear = () => {
    setSelectedProperty(null);
    setSelectedStatus(null);
    setSelectedDate(null);
    setSearchQuery(null);
  };

  const options = [...new Set(rentData?.map((item) => item?.estateId.name))];

  const options2 = ["Pending", "Paid", "Over Due"];

  const filteredData = rentData?.filter((data) => {
    const matchesSearchQuery = !searchQuery || data?.tenantId?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const selectedDateTimestamp = Date.parse(selectedDate);
    const dueDateTimestamp = Date.parse(formatDateII(data?.paymentDate));
    return (
      (!selectedProperty || data?.estateId.name === selectedProperty) &&
      (!selectedStatus || data?.rentInfo?.paymentStatus === lowerCaseData(selectedStatus)) &&
      (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) &&
      matchesSearchQuery
    );
  });

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const closeMobileFilterModal = () => {
    setFilterModal(false);
  };

  useBodyScroll([filterModal]);

  return (
    <Suspense fallback={<div><LoadingII /></div>}>
      <div className="w-full p-8">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeButton={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {filterModal && (
          <div>
            <FilterMobile
              reset={clear}
              closeMobileModal={closeMobileFilterModal}
              setSelectedDate={setSelectedDate}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              options={options2}
              defaultName={"Status"}
            />
          </div>
        )}
        <div className="mt-4 flex justify-between md:hidden w-full">
          <div className="relative w-[86%] rounded-[4px]">
            <input
              type="text"
              className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tenant name"
            />
            <Image
              src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
              alt=""
              className="absolute top-3 left-3"
              height={16}
              width={16}
            />
          </div>
          <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
            <button onClick={openMobileFilterModal}>
              <Image
                src="/static/images/filter.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
        <Header
          options={options}
          options2={options2}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          setSelectedDate={setSelectedDate}
          setSelectedProperty={setSelectedProperty}
          selectedProperty={selectedProperty}
          clear={clear}
        />
        <Widget rentData={filteredData} fetchRentData={fetchRentData} rentLoading={rentLoading} />
      </div>
    </Suspense>
  );
};

export default Payment;
