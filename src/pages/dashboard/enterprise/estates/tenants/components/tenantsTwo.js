"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../../../tenants/components/popUpMenuTwo";
import Button from "../../../components/button";
import StatusDropdown from "../../../components/statusDropDown";
import { updatePaymentStatusTenant } from "@/api/tenantSevice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addCommasToNumber from "@/utils/addCommasToNumber";
import lowerCaseData from "@/utils/lowerCaseData";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useClickOutside from "@/utils/clickOutside";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import truncateText from "@/utils/truncateText";

const TenantsTwo = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingRows, setLoadingRows] = useState({});
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
  const dropdownRefII = useClickOutside(() => setOpenDropdowns({}));

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = Data?.slice(startIndex, endIndex);

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

  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleStatusChange = async (status, dataId, id) => {
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));
    try {
      const data = await updatePaymentStatusTenant({
        id,
        status: lowerCaseData(status),
      });
      toast.success("status updated successfully");
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
      fetchDataAgain();
    } catch (error) {
      toast.error(error);
    }
    finally {
      setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

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
      <div className="flex flex-col justify-between max-h-[900px]">
        <div className="border w-full rounded-t-[12px]">
          <table className="w-full border-collapse px-4">
            <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz rounded-t-[12px]">
              <tr className="h-[60px]">
                <th className="w-[50%] md:w-[20%] text-left pl-4">Tenant</th>
                <th className="w-[12%] hidden md:table-cell text-left">Apartment No</th>
                <th className="w-[20%] hidden md:table-cell text-left">Email</th>
                <th className="w-[10%] hidden md:table-cell text-left pl-1">Phone No</th>
                <th className="w-[10%] hidden md:table-cell text-left pl-1">Rent</th>
                <th className="w-[40%] md:w-[15%] text-left pl-1">Status</th>
                <th className="w-[8%] hidden md:table-cell text-left">Due Date</th>
                <th className="w-[10%] md:w-[5%] pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.map((data) => (
                <tr key={data?._id} className="border-b-[1px] h-[60px]">
                  <td className="w-[50%] md:w-[20%] text-left pl-4">
                    <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px]">
                      {!data?.coverPhoto?.url ? (
                        <div className="max-w-[40px] h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                          <EmptyAvatar />
                        </div>
                      ) : (
                        <Image
                          src={data?.coverPhoto?.url}
                          alt=""
                          width={40}
                          height={40}
                          className="object-cover h-[40px] rounded-full"
                          priority
                        />
                      )}
                      <span className="w-[60%] md:w-auto">{data?.fullName}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-GrayHomz text-[11px] text-left">
                    {data?.rentInfo?.apartmentNumber || "______"}
                  </td>
                  <td className="hidden md:table-cell text-GrayHomz text-[11px] text-left">
                    <span className="break-words">{truncateText(data?.user?.email, 35)}</span>
                  </td>
                  <td className="hidden md:table-cell text-GrayHomz text-[11px] text-left pl-1">
                    {data?.phoneNumber || "______"}
                  </td>
                  <td className="hidden md:table-cell text-GrayHomz text-[11px] text-left pl-1">
                    {data?.rentInfo?.totalRent ? addCommasToNumber(data?.rentInfo?.totalRent) : "______"}
                  </td>
                  <td className="text-GrayHomz w-[40%] md:w-[15%] text-[11px] text-left pl-1">
                    {data?.rentInfo?.paymentStatus ? (
                      <StatusDropdown
                        setSelectedStatus={(status) =>
                          setSelectedStatus((prev) => ({
                            ...prev,
                            [data._id]: status,
                          }))
                        }
                        value={capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                        selectedStatus={selectedStatus[data._id] || null}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data._id, data?.rentInfo?._id)
                        }
                        isOpen={openDropdowns[data?._id] || false}
                        toggleDropdown={() => toggleDropdown(data?._id)}
                        loading={loadingRows[data?._id] || false}
                        dropdownRef={dropdownRefII}
                      />
                    ) : (
                      "______"
                    )}
                  </td>
                  <td className="hidden md:table-cell text-GrayHomz text-[11px] text-left">
                    {data?.rentInfo?.dueDate ? changeBackendDateFormat(data?.rentInfo?.dueDate) : "______"}
                  </td>
                  <td className="relative w-[10%] md:w-[5%] text-center pr-4">
                    <button onClick={() => handleToggleMenu(data?._id)}>
                      <Image
                        src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                        alt=""
                        height={21}
                        width={20}
                      />
                    </button>
                    {popUpMenuTwo && selectedDataId === data?._id && (
                      <PopUpMenuTwo dropdownRef={dropdownRef} data={data?._id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default TenantsTwo;
