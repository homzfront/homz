"use client";
import React, { useEffect, useRef, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenant, getSpecificTenantRentInfo } from "@/api/tenantSevice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingII from "@/components/mainmenu/loadingII.js";
import MobileProfile from "../components/mobileProfile.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import useRentSummaryTenant from "@/store/enterpriseStore/rentSummaryTenant.js";
import WidgetKYC from "./widgetKYC.js";
import DownloadData from "./downloadData.js";
import { useReactToPrint } from "react-to-print";

const TenantProfile = ({ id }) => {
  const [tenantData, setData] = useState([]);
  const [loadingTenant, setLoading] = useState(true);
  const [rentInfo, setRentInfo] = useState(null);
  const [openKYC, setOpenKYC] = useState(false)
  const printableRef = useRef();


  const fetchTenantData = async () => {
    const response = await fetchSpecificTenant(`${id}`);
    const rentInfo = response;
    setData(rentInfo);
    if (rentInfo) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenantData();
  }, []);

  const fetchRentInformation = async () => {
    try {
      const response = await getSpecificTenantRentInfo(
        `${tenantData.data.rentInfo._id}`
      );
      const rentInfo = response;
      setRentInfo(rentInfo);
    } catch (error) {
    }
  };

  const {
    data: paymentData,
    loading,
    fetchData
  } = useRentSummaryTenant();

  useEffect(() => {
    fetchData(id, rentInfo?.upDateddata?.startDate, rentInfo?.upDateddata?.dueDate, rentInfo?.upDateddata?.rent)
  }, [rentInfo]);

  const reFetchSummaryData = () => {
    fetchData(id, rentInfo?.upDateddata?.startDate, rentInfo?.upDateddata?.dueDate, rentInfo?.upDateddata?.rent)
  }

  useEffect(() => {
    fetchRentInformation();
  }, [tenantData?.data]);

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `${tenantData?.data?.fullName}-KYC`,
    onAfterPrint: () => console.log("KYC printed."),
  });

  
  return (
    <div className="max-w-full">
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
      {loading || loadingTenant ? (
        <LoadingII />
      ) : (
        <div className="w-full">
          {
            openKYC &&
            <CustomizedModal isOpen={openKYC} onRequestClose={() => setOpenKYC(false)}>
              <WidgetKYC setOpenKYC={setOpenKYC} handlePrint={handlePrint} data={tenantData?.data} />
            </CustomizedModal>
          }
          <div className="hidden md:block">
            <div className="w-full">
              <Image
                alt=""
                src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
                height={204}
                width={1172}
                layout="responsive"
                style={{ height: "auto", width: "auto" }}
              />
            </div>
            <div className="w-full flex gap-6 mt-[-20px] px-8">
              <div className="w-[35%]">
                <ProfileCard tenantData={tenantData} openKYC={openKYC} setOpenKYC={setOpenKYC} fetchTenantData={fetchTenantData} />
              </div>
              <div className="w-[65%]">
                <Widget
                  tenantId={id}
                  rentInfo={rentInfo}
                  tenantData={tenantData}
                  fetchTenantData={fetchTenantData}
                  setRentInfo={setRentInfo}
                  fetchRentInformation={fetchRentInformation}
                  reFetchSummaryData={reFetchSummaryData}
                  paymentData={paymentData}
                />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <MobileProfile
              tenantId={id}
              rentInfo={rentInfo}
              tenantData={tenantData}
              setRentInfo={setRentInfo}
              fetchTenantData={fetchTenantData}
              fetchRentInformation={fetchRentInformation}
              reFetchSummaryData={reFetchSummaryData}
              paymentData={paymentData}
              openKYC={openKYC}
              setOpenKYC={setOpenKYC}
            />
          </div>
        </div>
      )}
      <div style={{ display: 'none' }}>
        <DownloadData
          ref={printableRef}
          data={tenantData?.data}
        />
      </div>
    </div>
  );
};

export default TenantProfile;
