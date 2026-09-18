"use client";
import React, { useState } from "react";
import RentReviewPanel from "./rentReviewPanel";
import InspectionPanel from "./inspectionPanel";
import RentInfo from "./rentInfo";
import PaymentHis from "./paymentHis";
import Maintenance from "./maintenance";
import RentPeriodForm from "./rentPeriodForm";

const Widget = ({
  tenantId,
  tenantData,
  fetchTenantData,
  rentInfo,
  fetchRentInformation,
  setRentInfo,
  reFetchSummaryData,
  paymentData,
}) => {
  const [step, setStep] = useState(0);

  return (
    <div>
      <div className="inline-block min-w-[620px] w-[100%] h-auto p-4 shadow-md bg-white rounded-[12px]">
        <div className="flex mt-5 gap-4 cursor-pointer w-full">
          <div
            className={`rounded-md h-[37px] w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${step === 0 ? "bg-BlueHomz text-white" : ""}`}
            onClick={() => setStep(0)}
          >
            <p>Rent Information</p>
          </div>
          <div
            className={`rounded-md h-[37px] w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${step === 1 ? "bg-BlueHomz text-white" : ""}`}
            onClick={() => setStep(1)}
          >
            <p>Payment History</p>
          </div>
          <div
            className={`rounded-md h-[37px] flex flex-row gap-1 w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${step === 2 ? "bg-BlueHomz text-white" : ""}`}
            onClick={() => setStep(2)}
          >
            <p>Maintenance Request</p>
            <span
              className={`rounded-[40%] w-[30px] ${step === 2 ? "bg-white text-GrayHomz" : "bg-whiteblue text-BlueHomz"}`}
            >
              {tenantData?.data?.maintenanceRequests?.length}
            </span>
          </div>
          <div
  className={`rounded-md h-[37px] w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${step === 3 ? "bg-BlueHomz text-white" : ""}`}
  onClick={() => setStep(3)}
>
  <p>Inspection</p>
</div>
        </div>
        <div className="mt-5 rounded-[12px]">
          {step === 0 && (
  <>
    <RentReviewPanel tenantId={tenantId} rentInfo={rentInfo} />
    <RentPeriodForm
      fetchRentInformation={fetchRentInformation}
      rentInfo={rentInfo}
      fetchTenantData={fetchTenantData}
      setRentInfo={setRentInfo}
      tenantData={tenantData}
    />
  </>
)}
          {step === 1 && (
            <PaymentHis
              tenantId={tenantId}
              tenantData={tenantData}
              fetchTenantDataData={fetchTenantData}
              rentInfo={rentInfo}
              fetchRentInformation={fetchRentInformation}
              reFetchSummaryData={reFetchSummaryData}
            />
          )}
          {step === 2 && <Maintenance tenantData={tenantData} />}
          {step === 3 && <InspectionPanel tenantId={tenantId} />}
        </div>
      </div>
    </div>
  );
};

export default Widget;
