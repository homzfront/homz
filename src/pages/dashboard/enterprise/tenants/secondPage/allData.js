"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import addCommasToNumber from "@/utils/addCommasToNumber";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Pagination from "@/components/general/pagination";
import SkeletonLoader from "./skeletonLoader";
import api from "@/utils/api";
import PopUpMenuData from "./popUpMenu";
import PaymentRefetchTenant from "@/store/enterpriseStore/paymentRefetchTenant";
import useAllPaymentStore from "@/store/enterpriseStore/useAllPaymentStore";


const AllData = ({ TenantId, TenantData }) => {
    const {
        data: currentData,
        loading,
        currentPage,
        totalPages,
        fetchData,
        setCurrentPage,
    } = useAllPaymentStore();
    const [selectedDataId, setSelectedDataId] = useState(null);
    const [popUpMenu, setPopUpMenu] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const dropdownRef = useRef(null);
    const { Refetch } = PaymentRefetchTenant();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!deleteModal && !updateForm && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setPopUpMenu(false);
            }
        };
        if (!deleteModal && !updateForm) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [updateForm, deleteModal]);

    const handleToggleMenu = (id) => {
        setPopUpMenu(!popUpMenu);
        setSelectedDataId(id);
        if (updateForm) {
            setUpdateForm(false);
        }
        if (deleteModal) {
            setDeleteModal(false);
        }
    };

    const handleUpdateForm = (id) => {
        setSelectedDataId(id);
        setUpdateForm(!updateForm);
    }

    const handleDelete = (id) => {
        setSelectedDataId(id);
        setDeleteModal(!deleteModal)
    }

    useEffect(() => {
        if (TenantId) {
            fetchData(TenantId, currentPage);
        }
    }, [TenantId, currentPage, fetchData, Refetch]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const firstThreePages = [1, 2, 3];
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];


    return (
        <div className="mt-6 w-full mx-auto">
            <div className="border overflow-x-auto scrollbar-container">
                <div className="w-[500%] md:w-[200%]">
                    <table border="1" className="w-full">
                        <thead>
                            <tr className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz">
                                <th className="text-left pl-4" style={{ width: "120px" }}>Tenant</th>
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
                            {currentData !== null && currentData &&
                                currentData?.map((data) => (
                                    <tr
                                        key={data?._id}
                                        className={`w-2 border-t-[1px] items-center`}
                                    >
                                        <td className="flex items-center gap-1 pr-2 py-[15px] pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                            {!TenantData?.data?.coverPhoto ? (
                                                <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                                    <EmptyAvatar />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={TenantData?.data?.coverPhoto?.url}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    layout="full"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="object-cover bg-center h-[40px] rounded-full"
                                                    priority
                                                />
                                            )}
                                            <span className="">{TenantData?.data?.fullName}</span>
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.rent)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{changeBackendDateFormat(data?.dueDate)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.status === "success" ?
                                                <div className="bg-successBg text-Success rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Paid
                                                </div>
                                                : <div className="bg-warningBg text-warning rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Pending
                                                </div>
                                            }
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.amountPaid)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.description}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.duration === 1 ? "1 Month" : `${data?.duration} Months`}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paymentMethod && `${data?.paymentMethod}(${(data?.modeOfTransaction)})`}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paidAt ? changeBackendDateFormat(data?.paidAt) : "N/A"}</td>
                                        <td className="sticky right-[-24px] md:right-0 bg-white py-[15px] pr-4 z-10">
                                            <button onClick={() => handleToggleMenu(data._id)}>
                                                <Image
                                                    src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                                    alt="Options"
                                                    height={21}
                                                    width={20}
                                                    style={{ height: "auto", width: "auto" }}
                                                />
                                            </button>
                                            {popUpMenu && selectedDataId === data._id && (
                                                <PopUpMenuData
                                                    data={data}
                                                    dropdownRef={dropdownRef}
                                                    handleUpdateForm={handleUpdateForm}
                                                    setUpdateForm={setUpdateForm}
                                                    updateForm={updateForm}
                                                    setDeleteModal={setDeleteModal}
                                                    deleteModal={deleteModal}
                                                    setDeleteSuccessModal={setDeleteSuccessModal}
                                                    deleteSuccessModal={deleteSuccessModal}
                                                    handleDelete={handleDelete}
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
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleNext={handleNext}
                    handlePageClick={handlePageClick}
                    handlePrev={handlePrev}
                    lastThreePages={lastThreePages}
                />
            </div>}
        </div>
    );
}

export default AllData