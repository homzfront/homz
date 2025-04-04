import React, { useState } from "react";
import ArrowRightBlueLight from "@/components/icons/arrowRightBlueLight";
import ArrowLeftBrown from "@/components/icons/arrowLeftBrown";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";
import Tower from "@/components/icons/tower";
import { getSpecificTenantRentInfoOwner } from "@/api/tenantSevice";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumberWithoutN from "@/utils/addCommasToNumberWithoutN";

export default function RentPeriodForm({ profile, rentInfo }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!profile?.data?.rentInfo?._id) {
      return;
    }

    const rentInformation = async () => {
      try {
        const response = await getSpecificTenantRentInfoOwner(
          `${profile.data.rentInfo._id}`
        );
        const rentInfo = response;
        setData(rentInfo);
      } catch (error) {
        // Handle the error as needed
      }
    };

    rentInformation();
  }, [profile]);

  const [showForm, setShowForm] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Only one stays open
  };

  const rentDetails = profile?.data

  return (
    <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
      {!showForm ? (
        <div>
          <h2 className="text-BlackHomz font-medium text-base">Rent Property Information</h2>
          <p className="mt-1 text-GrayHomz font-normal text-sm">
            Manage rental properties, rental periods and track payment history.
          </p>
          {rentDetails?.rentInfo?._id && <div
            onClick={() => setShowForm(true)}
            className={`mt-4 p-4 bg-[#FCFCFC] rounded-[8px] flex items-center justify-between cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 flex justify-center items-center h-[44px] w-[44px] rounded-full bg-BlueHomz">
                <Tower />
              </div>
              <div className="text-GrayHomz font-medium flex flex-col gap-1 ml-1">
                <p className="text-sm">{rentDetails?.rentInfo?.propertyType}</p>
                <p className="text-[11px]">{rentDetails?.estateId?.name}</p>
              </div>
            </div>
            <ArrowRightBlueLight className="#4E4E4E" />
          </div>
          }
        </div>
      ) :
        <div>
          <div onClick={() => setShowForm(false)} className="flex gap-2 items-center cursor-pointer">
            <ArrowLeftBrown /> Back
          </div>
          <div className={`mt-4 mb-4 flex flex-col gap-2 text-GrayHomz bg-[#FCFCFC] rounded-[8px] p-4`}>
            <h2 className="mb-2 text-GrayHomz font-medium text-sm">Rent Property Information</h2>
            <div className="w-full flex gap-4 mt-2">
              <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                Property
              </p>
              <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                {rentDetails?.estateId?.name}
              </p>
            </div>
            <div className="w-full flex gap-4 mt-2">
              <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                Apartment Number
              </p>
              <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                {rentDetails?.rentInfo?.apartmentNumber}
              </p>
            </div>
            <div className="w-full flex gap-4 mt-2">
              <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                Property Type
              </p>
              <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
              {rentDetails?.rentInfo?.propertyType}
              </p>
            </div>
          </div>
          {rentDetails?.rentInfo?.periods
            ?.slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => (b.isActive ? 1 : -1)) // Sort based on isActive
            .map((item, index) => (
              <div key={index} className="w-full mt-1">
                <div onClick={() => toggleDropdown(index)} className={`${index === 0 ? "text-BlueHomz bg-whiteblue" : "text-BlueHomz bg-whiteblue"} cursor-pointer rounded-[8px] flex justify-between items-center p-4`}>
                  <p className="text-[14px] font-[500]">{index === 0 ? "Current period" : `Period ${index}`}</p>
                  {openIndex === index ? <ArrowUpII className="#006aff" /> : <ArrowDown className="#006aff" />}
                </div>
                {openIndex === index && (
                  <div>
                    <div className="rounded-lg bg-[#FCFCFC] p-4 hidden md:flex flex-col gap-2 mt-2">

                      <div className="w-full flex gap-4 mt-2">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Rent Duration
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          {item.duration} {item.durationLength}
                        </p>
                      </div>
                      <div className="w-full flex gap-4 mt-2">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Start Date
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          {changeBackendDateFormat(item.startDate)}
                        </p>
                      </div>
                      <div className="w-full flex gap-4 mt-2">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Due Date
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          {changeBackendDateFormat(item.dueDate)}
                        </p>
                      </div>
                      <div className="w-full flex gap-4 mt-2">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                         Total Rent
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          <span style={{ fontFamily: "Arial", }}>₦</span>{item.rent? addCommasToNumberWithoutN(item.rent) : 0}
                        </p>
                      </div>
                      <div className="w-full flex gap-4 mt-2">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Payment Status
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          {capitalizeFirstLetter(item.paymentStatus)}
                        </p>
                      </div>
                    </div>
                    <div className="md:hidden rounded-lg p-4 flex flex-col gap-2 mt-2">
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Property
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {rentDetails?.estateId?.name}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Apartment Number
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {rentDetails?.rentInfo?.apartmentNumber}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Property Type
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {rentDetails?.rentInfo?.propertyType}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Rent Duration
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          {item.duration} {item.durationLength}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Start Date
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {changeBackendDateFormat(item.startDate)}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Due Date
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {changeBackendDateFormat(item.dueDate)}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Total Rent
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                          <span style={{ fontFamily: "Arial", }}>₦</span>{item.rent? addCommasToNumberWithoutN(item.rent) : 0}
                        </p>
                      </div>
                      <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                        <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                          Payment Status
                        </p>
                        <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {capitalizeFirstLetter(item.paymentStatus)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      }
    </div>
  );
}