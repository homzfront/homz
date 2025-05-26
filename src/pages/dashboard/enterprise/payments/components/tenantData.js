"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import addCommasToNumber from "@/utils/addCommasToNumber";
import PopUpMenuTwo from "./popMenuToTenantProfile";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import Pagination from "@/components/general/pagination";
import api from "@/utils/api";
import RefetchPayment from "@/store/enterpriseStore/paymentRefetch";
import usePaymentFilterStore from "@/store/enterpriseStore/usePaymentFilterStore";
import { useDebounce } from "@/utils/deBounce";

const TenantData = () => {
  const [currentData, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dropdownRef = useRef(null);
  const { Refetch } = RefetchPayment();
  const {
    selectedProperty,
    fromDate,
    toDate,
    search,
    setAllData,
    pageNo,
    setPageNo
  } = usePaymentFilterStore();

  const debouncedSearch = useDebounce(search, 500);
  const debounceToDate = useDebounce(toDate, 500);
  const debounceFromDate = useDebounce(fromDate, 500);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!deleteModal && !popUpMenu && !updateForm && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopUpMenuTwo(false);
      }
    };
    if (!deleteModal && !popUpMenu && !updateForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popUpMenu, updateForm, deleteModal]);

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
    if (popUpMenu) {
      setPopUpMenu(false);
    }
    if (updateForm) {
      setUpdateForm(false);
    }
    if (deleteModal) {
      setDeleteModal(false);
    }
    if (showReceipt) {
      setShowReceipt(false)
    }
  };

  const handleDataToggle = (id) => {
    setSelectedDataId(id);
    setPopUpMenu(!popUpMenu);
  };

  const handleUpdateForm = (id) => {
    setSelectedDataId(id);
    setUpdateForm(!updateForm);
  }

  const showReceiptOffline = (id) => {
    setSelectedDataId(id);
    setShowReceipt(true)
  }

  const handleDelete = (id) => {
    setSelectedDataId(id);
    setDeleteModal(!deleteModal)
  }

  const fetchData = async (page) => {
    if (fromDate && !toDate) return;
    if (!fromDate && toDate) return;
    setLoading(true);
    try {
      let query = `rentPayment/enterprise?limit=6&page=${page}`;
      if (selectedProperty) {
        query += `&property=${selectedProperty}`;
      }
      if (fromDate && toDate) {
        query += `&startRangeDate=${fromDate}&endRangeDate=${toDate}`;
      }
      if (search) {
        query += `&search=${search}`
      }
      const response = await api.get(query);
      const result = response?.data;
      setData(result?.data?.results);
      setAllData(result?.data)
      setTotalPages(result?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNo);
  }, [pageNo, selectedProperty, debounceFromDate, debounceToDate, Refetch, debouncedSearch]);

  const handlePageClick = (page) => {
    setPageNo(page);
  };

  const handleNext = () => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const firstThreePages = [1, 2, 3];
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

  // Skeleton Loader Component
  const SkeletonLoader = () => {
    return (
      <tr className="w-2 border-t-[1px] items-center">
        <td className="flex items-center gap-1 pr-2 py-[15px] pl-4">
          <div className="h-[40px] w-[40px] flex justify-center items-center bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="py-[15px]">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="sticky right-[-24px] md:right-0 bg-white py-[15px] pr-4 z-10">
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
        </td>
      </tr>
    );
  };

  console.log(currentData)

  return (
    <div className="mt-6 w-full mx-auto">
      <div className="border overflow-x-auto scrollbar-container">
        <div className="w-[500%] md:w-[150%]">
          <table border="1" className="w-full">
            <thead>
              <tr className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz">
                <th className="text-left pl-4" style={{ width: "120px" }}>Tenant</th>
                <th className="text-left" style={{ width: "100px" }}>Property</th>
                <th className="text-left" style={{ width: "100px" }}>Rent Amount</th>
                <th className="text-left" style={{ width: "110px" }}>Due Date</th>
                <th className="text-left" style={{ width: "110px" }}>Payment Status</th>
                <th className="text-left" style={{ width: "110px" }}>Amount Paid</th>
                <th className="text-left" style={{ width: "120px" }}>Description</th>
                <th className="text-left" style={{ width: "120px" }}>Rent Duration</th>
                <th className="text-left" style={{ width: "120px" }}>Payment Method</th>
                <th className="text-left" style={{ width: "120px" }}>Payment Date</th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {
                loading ? (
                  // Show skeleton loaders when loading
                  <>
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                  </>
                ) :
                  currentData &&
                  currentData.map((data) => (
                    <tr
                      key={data?._id}
                      className="w-2 border-t-[1px] items-center"
                    >
                      <td className="flex items-center gap-1 pr-2 py-[15px] pl-4 text-GrayHomz4 font-[500] text-[11px]">
                        {!data?.tenantId?.coverPhoto?.url ? (
                          <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                            <EmptyAvatar />
                          </div>
                        ) : (
                          <Image
                            src={data?.tenantId?.coverPhoto?.url}
                            alt="Tenant Image"
                            width={40}
                            height={40}
                            layout="full"
                            objectFit="cover"
                            objectPosition="center"
                            className="object-cover bg-center h-[40px] rounded-full"
                            priority
                          />
                        )}
                        <span>{data?.tenantId?.fullName || "N/A"}</span>
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.estateId?.name}</td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rent)}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {changeBackendDateFormat(data?.dueDate)}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data?.status.toLowerCase() !== "success" ? (
                          <div className="bg-warningBg text-warning rounded-md py-1 w-[95px] flex items-center justify-center">
                            Pending
                          </div>
                        ) : (
                          <div className="bg-successBg text-Success rounded-md py-1 w-[95px] flex items-center justify-center">
                            Paid
                          </div>
                        )}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amountPaid)}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data?.description || "N/A"}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data.duration === 1 ? `${data.duration} month` : `${data.duration} months`}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data?.paymentMethod && `${data?.paymentMethod}(${(data?.modeOfTransaction)})`}
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data?.paidAt ? changeBackendDateFormat(data?.paidAt) : "N/A"}
                      </td>
                      <td className="sticky right-[-24px] md:right-0 bg-white py-[15px] pr-4 z-10">
                        <button onClick={() => { handleToggleMenu(data._id) }}>
                          <Image
                            src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                            alt="Options"
                            height={21}
                            width={20}
                            style={{ height: "auto", width: "auto" }}
                          />
                        </button>
                        {popUpMenuTwo && selectedDataId === data._id && (
                          <PopUpMenuTwo
                            data={data}
                            handleDataToggle={handleDataToggle}
                            setPopUpMenu={setPopUpMenu}
                            popUpMenu={popUpMenu}
                            dropdownRef={dropdownRef}
                            handleUpdateForm={handleUpdateForm}
                            setUpdateForm={setUpdateForm}
                            updateForm={updateForm}
                            setDeleteModal={setDeleteModal}
                            deleteModal={deleteModal}
                            setDeleteSuccessModal={setDeleteSuccessModal}
                            deleteSuccessModal={deleteSuccessModal}
                            handleDelete={handleDelete}
                            fetchData={fetchData}
                            setShowReceipt={setShowReceipt}
                            showReceiptOffline={showReceiptOffline}
                            showReceipt={showReceipt}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {currentData && currentData.length >= 1 && <div className="mt-6">
        <Pagination
          firstThreePages={firstThreePages}
          currentPage={pageNo}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
          lastThreePages={lastThreePages}
        />
      </div>}
    </div>
  );
};

export default TenantData;