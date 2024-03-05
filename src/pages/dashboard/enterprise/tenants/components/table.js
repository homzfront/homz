"use client";
import useRentPaymentStore from "@/store/enterpriseStore/rentPaymentInfo";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import React, { useEffect, useState } from "react";



const Table = ({tenantData}) => {
  console.log(tenantData?.data);
  const tenantId = tenantData?.data?._id
  const {
    data,
    loading,
    fetchData
  } = useRentPaymentStore();

  useEffect(() => {
    fetchData()
  }, [])




  console.log(data?.length);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6">
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-6">Date</th>
                <th className="text-left ">Due Date</th>
                <th className="text-left ">Rent Paid</th>
                <th className="text-left ">Property Type</th>
                <th className="text-left ">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((data) => (
                <tr key={data.id} className={`w-2 border-t-[1px] items-center ${tenantId === data?.tenantId?._id ? "" : "hidden"}`}>
                  <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                    {data?.tenantId?.coverPhoto?.url === null ||
                      data?.tenantId?.coverPhoto?.url === undefined ? (
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="py-[15px]"
                      />
                    ) : (
                      <Image
                        src={data?.tenantId?.coverPhoto?.url}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-[100%] py-[15px]"
                      />
                    )}
                    <span className="py-[15px]">     {changeBackendDateFormat(data?.paymentDate)}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {changeBackendDateFormat(data?.dueDate)}
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {addCommasToNumber(data?.rent)}
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {data?.propertyType}
                  </td>
                  <td
                    className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] w-24`}
                  >
                    <span
                      className={`p-[6px] rounded-md text-center  ${data?.rentInfo?.paymentStatus === "pending"
                          ? "bg-warningBg text-warning2 px-[13px]"
                          : ""
                        } ${data?.rentInfo?.paymentStatus === "paid"
                          ? "bg-Success text-warningBg"
                          : ""
                        }  ${data?.rentInfo?.paymentStatus === "over due" ? "bg-error text-white" : ""
                        }`}
                    >
                      {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center mt-4">
        <div>
          <button
            onClick={handlePrev}
            className={`text-[14px] font-[500] py-2 px-6 border rounded-md hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center${currentPage === 1 ? "pointer-events-none opacity-20" : ""
              }`}
          >
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="w-[350px] flex items-center justify-around">
          {firstThreePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${currentPage === page ? "bg-GrayHomz5   text-GrayHomz" : ""
                }`}
            >
              {page}
            </button>
          ))}
          {currentPage > 3 && totalPages - 2 > currentPage ? (
            <p className="text-[14px] font-[500] w-10 h-10 rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz">
              {currentPage}
            </p>
          ) : (
            <span className={`${totalPages <= 6 ? "hidden" : "inline"}`}>
              ...
            </span>
          )}
          {totalPages > 6 &&
            [totalPages - 2, totalPages - 1, totalPages].map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${currentPage === page ? "bg-GrayHomz5 text-GrayHomz" : ""
                  }`}
              >
                {page}
              </button>
            ))}
          {currentPage > 3 && currentPage < 7 && (
            <span
              className={`text-[14px] font-[500] w-10 h-10 border rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz ${totalPages > 6 ? "hidden" : "inline"
                }`}
            >
              {currentPage}
            </span>
          )}
        </div>
        <div>
          <button
            onClick={handleNext}
            className={`py-2 px-6 rounded-md text-[14px] font-[500] border hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${totalPages <= 6 ? "ml-[0]" : "ml-0"
              } ${currentPage === totalPages ? "pointer-events-none opacity-20" : ""
              }`}
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
