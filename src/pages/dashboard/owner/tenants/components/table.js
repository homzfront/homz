"use client";
import useTenantRentPaymentOwner from "@/store/propertyOwnerStore/rentPaymentTenant";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../components/button";



const Table = ({ tenantData }) => {

  console.log(tenantData?.data);
  const tenantId = tenantData?.data?.data?._id
  console.log(tenantId);
  const {
    data: paymentData,
    loading,
    fetchData
  } = useTenantRentPaymentOwner();

  useEffect(() => {
    fetchData(tenantId)
  }, [tenantData])

  const data = paymentData?.data
  console.log(data);

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
              {currentData?.map((data) => (
                <tr key={data._id} className=" w-2 border-t-[1px] items-center">
                  <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                    {tenantData?.data?.data?.coverPhoto?.url === null ||
                      tenantData?.data?.data?.coverPhoto?.url === undefined ? (
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
                        src={tenantData?.data?.data?.coverPhoto?.url}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-[100%] py-[15px]"
                      />
                    )}
                    <span className="py-[15px]">  {tenantData?.data?.data?.fullName}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {changeBackendDateFormat(data?.dueDate)}
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {addCommasToNumber(data?.totalRent)}
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
                      {capitalizeFirstLetter(data?.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default Table;
