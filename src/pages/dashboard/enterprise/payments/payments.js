"use client";
import React, { useState, Suspense, useEffect } from "react";
import Widget from "./components/widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import LoadingII from "@/components/mainmenu/loadingII";
import Dropdown from "../components/dropDownFilter";
import Header from "./components/header";
import useExportRentPayment from "@/store/enterpriseStore/exportRentPayment";
import usePaymentFilterStore from "@/store/enterpriseStore/usePaymentFilterStore";
import formatDateII from "@/utils/formatDateII";
import estateStore from "@/store/enterpriseStore/estates";

const Payment = () => {
  const {
    selectedProperty,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setSelectedProperty,
  } = usePaymentFilterStore();

  const { data, fetchData } = useExportRentPayment();
  const { data: estates, loading, fetchData: fetchEnterpriseProperties } = estateStore();
  // User-selected date range
  const today = new Date();

  // Calculate the date one month later
  const prevMonth = new Date();
  prevMonth.setMonth(today.getMonth() - 1);

  useEffect(() => {
    fetchData();
    setFromDate(formatDateII(prevMonth));
    setToDate(formatDateII(today));
    fetchEnterpriseProperties()
  }, []);

  const clear = () => {
    setSelectedProperty(null);
    setFromDate(formatDateII(prevMonth));
    setToDate(formatDateII(today));
  };

  const options = [...new Set(estates?.map((item) => item?.name))];

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
        <div className="flex justify-between md:hidden w-full">
          <div className="flex flex-col items-start gap-2 mb-1 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="w-[160px]">
                <Dropdown
                  options={options}
                  onSelect={(option) => setSelectedProperty(option)}
                  selectOption={
                    selectedProperty === null
                      ? "Property"
                      : selectedProperty
                  }
                  className=""
                />
              </div>
              <button
                onClick={clear}
                type="text"
                className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] rounded cursor-pointer"
              >   <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                    }
                    alt=""
                    height={17}
                    width={16}
                  />
                </span>
              </button>
            </div>
            <div className="flex w-full md:w-[320px] md:justify-normal md:gap-4">
              <div className="">
                <label
                  htmlFor="fromDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  From:
                </label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                  className="mt-1 h-[36px] px-2 block w-[87%] md:w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="toDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  To:
                </label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                  className="mt-1 h-[36px] px-2 block w-[87%] md:w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

        </div>
        <Header
          options={options}
          setFromDate={setFromDate}
          setToDate={setToDate}
          toDate={toDate}
          fromDate={fromDate}
          setSelectedProperty={setSelectedProperty}
          selectedProperty={selectedProperty}
          clear={clear}
        />
        <Widget />
      </div>
    </Suspense>
  );
};

export default Payment;
