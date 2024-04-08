"use client";
import Image from "next/image";
import React, { useState } from "react";
import YesNOModal from "../components/yesNOModal";
import Button from "../../components/button.js";

const Maintenance = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
      Action: false,
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
      Action: false,
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      Action: false,
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      Action: false,
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
      Action: false,
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
      Action: false,
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      Action: false,
    },
  ];

  
  const [data, setData] = useState(Data);
  console.log(data);


  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data.slice(startIndex, endIndex);

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
              {currentData.map((data) => (
                <tr key={data.id} className=" w-2 border-t-[1px] items-center">
                  <td className="flex items-center gap-1 mr-[-30px]  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="py-[15px]"
                    />
                    <span className="py-[15px]">{data.Tenant}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                    {data.Subject}
                  </td>

                  <td
                    className={`text-GrayHomz py-[15px]  font-[500]  text-[11px] w-24`}
                  >
                    <span
                      className={`p-[6px] rounded-lg text-center ${
                        data.Status === "Pending"
                          ? "bg-warningBg text-warning2 px-[18px]"
                          : ""
                      } ${
                        data.Status === "Resolved"
                          ? "bg-successBg text-Success px-4"
                          : ""
                      } ${
                        data.Status === "In-progress"
                          ? "bg-warning2  text-warningBg px-[10px]"
                          : ""
                      }`}
                    >
                      {data.Status}
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
