"use client";
import Image from "next/image";
import React, { useState } from "react";
import YesNOModal from "./components/yesNOModal";
import Button from "../components/button.js";

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
  const [showConfrim, setShowConfirm] = useState(false);
  const [showYesOrNo, setShowYesOrNo] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showYesAndNo = (id) => {
    const dataIndex = data.findIndex((item) => item.id === id);

    // Update the Action property to true
    data[dataIndex].Action = !data[dataIndex].Action;

    // Log the updated data to the console
    console.log("Updated data:", data);

    // Update the state with the modified data
    setData([...data]);
    setShowYesOrNo(true);
  };
  const handleToggleMenu = (id) => {
    setShowConfirm(true);
    if (showConfrim) {
      // Find the index of the selected data
      const dataIndex = data.findIndex((item) => item.id === id);

      // Update the Action property to true
      data[dataIndex].Action = !data[dataIndex].Action;

      // Log the updated data to the console
      console.log("Updated data:", data);

      // Update the state with the modified data
      setData([...data]);
    }
    setShowConfirmation(true);
  };
  const remove = () => {
    setShowConfirm(false);
  };

  const returnHome = () => {
    setShowConfirm(false);
  };
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
                <th className="text-left ">Subject</th>
                <th className="text-left ">Status</th>
                <th className="pl-12"></th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((data) => (
                <tr key={data.id} className=" w-2 border-t-[1px] items-center">
                  <td className="flex items-center gap-1  pl-6 text-GrayHomz4 font-[500] text-[11px]">
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
                  <td className="py-[15px] pl-12">
                    {showYesOrNo ? (
                      <YesNOModal
                        confirmH={handleToggleMenu(data.id)}
                        returnHome={returnHome}
                        removeH={remove(data.id)}
                        showConfirmation={showConfirmation}
                      />
                    ) : (
                      <button
                        onClick={() => showYesAndNo(data.id)}
                        className={`flex items-center px-2 py-1 rounded-md gap-1 ${
                          data.Action
                            ? "text-white bg-BlueHomz"
                            : "text-GrayHomz5 bg-GrayHomz6"
                        }`}
                      >
                        Confirm
                        <Image
                          src="/static/dashboard/enterprisemanager/tenants/tick-circle.png"
                          alt=""
                          height={16}
                          width={16}
                        />
                      </button>
                    )}
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
