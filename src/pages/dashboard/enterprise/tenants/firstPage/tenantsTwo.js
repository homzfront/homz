"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../../components/button";
import StatusDropdown from "../../components/statusDropDown";
import { updatePaymentStatusTenant } from "/src/api/tenantSevice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingTable from "../../../../../components/mainmenu/loadingTable";

const TenantsTwo = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [loadingRows, setLoadingRows] = useState({});

  // console.log(openDropdowns);

  // console.log(Data);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = Data.slice(startIndex, endIndex);

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

  const handleStatusChange = async (status, dataId, id) => {
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));

    function lowerCase(str) {
      if (typeof str === "string" && str.trim() !== "") {
        return str.toLowerCase();
      } else {
        return "";
      }
    }

    const name = "AKin Idan";
    // console.log(lowerCase(name));

    try {
      // Handle status change logic here
      // console.log(`Changing status to: ${status} for data with ID: ${id}`);
      const data = await updatePaymentStatusTenant({
        id,
        status: lowerCase(status),
      });
      // console.log(data);
      toast.success("status updated successfully");
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
    finally {
      setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  function addCommasToNumber(number) {
    // Convert the number to a string
    const numberString = number?.toString();
    // Use regular expression to add commas
    const formattedNumber = numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `N ${formattedNumber}`;
  }

  function formatDate(inputDate) {
    if (inputDate === "" || inputDate === null || inputDate === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
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
  }

  return (
    <div className="mt-6">
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

      <div className=" border w-full rounded-t-[12px]">
        <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
          <div className="w-[15%] ">Tenant</div>
          <div className="w-[10%] ">Property</div>
          <div className="w-[11%] ">Apartment No</div>
          <div className="w-[11%] ">Address</div>
          <div className="w-[10%] ">Email</div>
          <div className="w-[10%] pl-1">Phone No</div>
          <div className="w-[7%] pl-1">Rent</div>
          <div className="w-[13%] pl-1">Status</div>
          <div className="w-[10%] ">Due Date</div>
          <div className="w-[3%] "></div>
        </div>

        <div className="">
          {currentData &&
            currentData.map((data) => (
              <div
                key={data.id}
                className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
              >
                {/* Apply the same styles as the header to each column in the body */}
                <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[15%]">
                  {!data?.coverPhoto?.url ? (
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                      }
                      alt=""
                      width={30}
                      height={30}
                      className=""
                    />
                  ) : (
                    <Image
                      src={data?.coverPhoto?.url}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-[100%]"
                    />
                  )}
                  <span className="">{data?.fullName}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                  {data?.estateId.name}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {`${
                    data?.rentInfo?.apartmentNumber
                      ? data?.rentInfo?.apartmentNumber
                      : "______"
                  }`}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {data?.houseAddress}
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start pl-1 pr-2">
                  <span className="break-words">{data?.user?.email}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start ">
                  {data?.phoneNumber}
                </div>
                <div className="text-GrayHomz w-[7%] font-[500] text-[11px] text-start ">
                  {`${
                    data?.rentInfo?.totalRent
                      ? addCommasToNumber(data?.rentInfo?.totalRent)
                      : "______"
                  }`}
                </div>
                <div
                  className={`text-GrayHomz w-[13%] font-[500] text-[11px] text-start`}
                >
                  {data?.rentInfo?.paymentStatus ? (
                    <StatusDropdown
                      data={data}
                      handleStatusChange={(status) =>
                        handleStatusChange(
                          status,
                          data._id,
                          data?.rentInfo?._id
                        )
                      }
                      isOpen={openDropdowns[data._id] || false}
                      toggleDropdown={() => toggleDropdown(data._id)}
                      loading={loadingRows[data._id] || false}
                    />
                  ) : (
                    "______"
                  )}
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                  {`${
                    data?.rentInfo?.dueDate
                      ? formatDate(data?.rentInfo?.dueDate)
                      : "______"
                  }`}
                </div>
                <div className="relative w-[3%]">
                  <button onClick={() => handleToggleMenu(data._id)}>
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
                  {popUpMenuTwo && selectedDataId === data._id && (
                    <PopUpMenuTwo data={data._id} />
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
  );
};

export default TenantsTwo;
