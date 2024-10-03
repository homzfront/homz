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

const Payment = () => {
  const {
    selectedProperty,
    setSelectedDate,
    setSelectedProperty,
  } = usePaymentFilterStore();

  const { data, fetchData } = useExportRentPayment();

  useEffect(() => {
    fetchData();
  }, []);

  const clear = () => {
    setSelectedProperty(null);
    setSelectedDate(null);
  };

  const options = [...new Set(data?.data?.map((item) => item?.estateId.name))];

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
        <div className="mt-2 flex justify-between md:hidden w-full">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[160px]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null
                    ? "Property"
                    : selectedProperty
                }
                className="mr-2"
              />
            </div>
          </div>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 h-[42px] w-[80px] text-GrayHomz2 border-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
          />
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
        <Header
          options={options}
          setSelectedDate={setSelectedDate}
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
