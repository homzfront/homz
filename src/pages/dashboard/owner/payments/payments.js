"use client"
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Widget from "./components/widget";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";
import useRentPaymentOwnerStore from "@/store/propertyOwnerStore/rentPaymentOwnerInfo";


const Payment = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    data: rentData,
    loading: rentLoading,
    fetchData: fetchRentData,
  } = useRentPaymentOwnerStore();

  useEffect(() => {
    fetchRentData()
  }, [])


  const clear = () => {
    setSelectedProperty(null);
    setSelectedStatus(null);
    setSelectedDate(null)
  };


  const options = [...new Set(rentData?.map((item) => item?.estateId.name))];


  const options2 = ["Pending", "Paid", "OverDue"];
  const filteredData = rentData?.filter(
    (data) => {
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.paymentDate));
      return (
        (!selectedProperty || data?.estateId.name === selectedProperty) &&
        (!selectedStatus || data?.rentInfo?.paymentStatus === lowerCaseData(selectedStatus)) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
      );
    });

  return (
    <div className=" w-full p-8">
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
      <Widget rentData={filteredData} />
    </div>
  );
};

export default Payment;
