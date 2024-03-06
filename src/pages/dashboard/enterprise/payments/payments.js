"use client"
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Widget from "./components/widget";
import useRentPaymentStore from "@/store/enterpriseStore/rentPaymentInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";

const Payment = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    data: rentData,
    loading: rentLoading,
    fetchData: fetchRentData,
  } = useRentPaymentStore();

  useEffect(() => {
    fetchRentData()
  }, [])


  const clear = () => {
    setSelectedProperty(null);
    setSelectedStatus(null);
    setSelectedDate(null)
  };


  const options = [...new Set(rentData?.map((item) => item?.estateId.name))];
  console.log(options);

  const options2 = ["Pending", "Paid", "OverDue"];
  const filteredData = rentData?.filter(
    (data) => {
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.paymentDate));
      console.log(dueDateTimestamp);
      console.log(selectedDateTimestamp)
      return (
        (!selectedProperty || data?.estateId.name === selectedProperty) &&
        (!selectedStatus || data?.rentInfo?.paymentStatus === lowerCaseData(selectedStatus)) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
      );
    });

  console.log(filteredData);

  console.log(selectedProperty);
  console.log(selectedStatus);

  console.log(rentData);

  return (
    <div className=" w-full p-8">
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
  );
};

export default Payment;
