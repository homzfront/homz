"use client";
import Image from "next/image";
import React, { useState } from "react";
import YesNOModal from "../components/yesNOModal";
import Button from "../../components/button.js";

const Maintenance = ({tenantData}) => {
  const data = tenantData?.data
  const maintenanceRequests = data?.maintenanceRequests

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(maintenanceRequests?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = maintenanceRequests?.slice(startIndex, endIndex);

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
                <th className="text-left pl-6">Tenant</th>
                <th className="text-left pl-[-10px]">Subject</th>
                <th className="text-left ">Status</th>
        
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((Maindata) => (
                <tr key={Maindata._id} className=" w-2 border-t-[1px] items-center">
                  <td className="flex items-center gap-1 mr-[-10px]  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {data?.coverPhoto?.url === null ||
                      data?.coverPhoto?.url === undefined ? (
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
                        src={data?.coverPhoto?.url}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-[100%] py-[15px]"
                      />
                    )}
                    <span className="py-[15px]">{data?.fullName}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                    {Maindata?.subject}
                  </td>

                  <td
                    className={`text-GrayHomz py-[15px]  font-[500]  text-[11px] w-44`}
                  >
                    <span
                      className={`p-[6px] rounded-lg text-center ${
                        Maindata?.status === "pending"
                          ? "bg-warningBg text-warning2 px-[18px]"
                          : ""
                      } ${
                        Maindata?.status === "resolved"
                          ? "bg-successBg text-Success px-4"
                          : ""
                      } ${
                        Maindata?.status === "in-progress"
                          ? "bg-warning2  text-warningBg px-[10px]"
                          : ""
                      }`}
                    >
                      {Maindata?.status}
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

export default Maintenance;
