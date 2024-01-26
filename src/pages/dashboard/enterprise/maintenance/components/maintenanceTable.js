"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import Button from "../../components/button";
import StatusDropDownMain from "./statusDropDownMain";
import { updateMaintenanceReqestByTenant } from "@/api/maintenanceService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/components/general/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";

const MaintenanceTable = ({ request, tenantData }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(openDropdowns);

  console.log(request);
  console.log(tenantData);
  // Assuming maintenanceRequests and tenantData are your arrays

  // Create a lookup object for faster access
  const tenantLookup = {};
  tenantData?.forEach((tenant) => {
    tenantLookup[tenant?.data._id] = tenant?.data;
  });

  // Now, you can iterate through maintenanceRequests and access the corresponding tenantData using the lookup
  const MaintenanceRequests = request?.map((request) => ({
    ...request,
    tenantData: tenantLookup[request?.tenant._id],
  }));
  console.log(MaintenanceRequests);

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MaintenanceRequests?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = MaintenanceRequests?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleStatusChange = async (status, dataId) => {
    setLoading(true);
    try {
      // Handle status change logic here
      console.log(`Changing status to: ${status} for data with ID: ${dataId}`);
      const data = await updateMaintenanceReqestByTenant({
        id: dataId,
        status,
      });
      console.log(data);
      setLoading(false);
      toast.success("status updated successfully");
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Function to add ordinal suffix to day
    function getOrdinalSuffix(day) {
      if (day > 10 && day < 20) {
        return "th";
      } else {
        const lastDigit = day % 10;
        switch (lastDigit) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
    }

    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;

    return formattedDate;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  useBodyScroll([loading]);

  return (
    <div>
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
      {loading && <LoadingII />}
      <div className="mt-8">
        <div className=" w-full rounded-t-xl border">
          <div className="flex rounded-t-xl bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz items-center px-8">
            <div className=" flex-[1.3]">Tenant</div>
            <div className=" flex-1">Subject</div>
            <div className=" flex-1">Status</div>
            <div className=" flex-1">Request Date</div>
            <div className=" flex-1">Property</div>
            <div className=" flex-1">Apartment No</div>
            <div className=" flex-1">Address</div>
            <div className=" flex-1">Phone No</div>
            <div className=" flex-[0.2]"></div>
          </div>
          <div className="flex flex-col">
            {currentData && currentData?.map((request) => (
              <div
                key={request?._id}
                className="flex bg-white border-t-[1px] items-center px-8 h-[64px]"
              >
                <div className="flex-[1.3] flex items-center gap-2 text-GrayHomz4 font-[500] text-[11px]">
                  {request.tenantData?.coverPhoto?.url === null ||
                  request.tenantData?.coverPhoto?.url === undefined ? (
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                      }
                      alt=""
                      width={40}
                      height={40}
                      className=" rounded-full"
                    />
                  ) : (
                    <Image
                      src={request.tenantData?.coverPhoto?.url}
                      alt=""
                      width={40}
                      height={40}
                      className=" rounded-[100%]"
                    />
                  )}
                  <span className="py-[15px] ">
                    {request?.tenantData?.fullName}
                  </span>
                </div>
                <div className="flex-1 text-GrayHomz  font-[500] text-[11px]">
                  {request?.subject}
                </div>
                <div className="flex-1 flex items-center ">
                  <div
                    className={` text-GrayHomz font-[500] w-[80%] py-1 h-[25px] rounded-md text-center text-[11px] ${
                      request?.status === "pending"
                        ? "bg-warningBg text-warning2 "
                        : ""
                    } ${
                      request?.status === "resolved"
                        ? "bg-successBg text-Success "
                        : ""
                    } ${
                      request?.status === "in-progress"
                        ? "bg-warning2  text-warningBg "
                        : ""
                    }`}
                  >
                    <StatusDropDownMain
                      data={request}
                      handleStatusChange={(status) =>
                        handleStatusChange(status, request._id)
                      }
                      isOpen={openDropdowns[request._id] || false}
                      toggleDropdown={() => toggleDropdown(request._id)}
                    />
                  </div>
                </div>
                <div className="flex-1 text-GrayHomz font-[500] text-[11px]">
                  {formatDate(request?.requestDate)}
                </div>
                <div className="flex-1 text-GrayHomz font-[500] text-[11px]">
                  {request?.tenantData?.estateId?.name}
                </div>
                <div className="flex-1 text-GrayHomz font-[500] text-[11px]">
                  {/* {data?.tenants?.ApartmentNo} */} -----
                </div>
                <div className="flex-1 text-GrayHomz font-[500] text-[11px]">
                  {request?.tenantData?.houseAddress}
                </div>
                <div className="flex-1 text-GrayHomz font-[500] text-[11px]">
                  {request?.tenantData?.phoneNumber}
                </div>
                <div className="flex-[0.2] relative ">
                  <button onClick={() => handleToggleMenu(request._id)}>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      }
                      alt=""
                      height={21}
                      width={20}
                      style={{ height: "auto", width: "auto" }}
                    />
                  </button>
                  {popUpMenuTwo && selectedDataId === request._id && (
                    <PopUpMenu data={request} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default MaintenanceTable;
