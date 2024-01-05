"use client"
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import Button from "../../components/button";

const MaintenanceTable = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
      RequestedDate: "4th January, 2024",
      Estate: "Sunrise Estate",
      ApartmentNo: "Apartment 1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      PhoneNo: "0801  000 0000"
    },
  ];

  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);

  const ITEMS_PER_PAGE = 6;

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

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  return (
    <div>
      {" "}
      <div className="mt-8">
        <div className=" border w-full">
          <div className="">
            <table border="1" className="w-full ">
              <thead className="">
                <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                  <th className="text-left pl-4" style={{ width: "160px" }}>Tenant</th>
                  <th className="text-left ">Subject</th>
                  <th className="text-left " >
                    Status
                  </th>
                  <th className="text-left ">Request Date</th>
                  <th className="text-left ">Estate</th>
                  <th className="text-left">Apartment No</th>
                  <th className="text-left " style={{ width: "110px" }}>Address</th>
                  <th className="text-left ">Phone No</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {currentData &&
                  currentData.map((data) => (
                    <tr
                      key={data.id}
                      className=" w-2 border-t-[1px] items-center"
                    >
                      <td className="flex items-center p-[10px] gap-1 pr-2  pl-4 text-GrayHomz4 font-[500] text-[11px]">
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
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
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
                      <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data.RequestedDate}
                      </td>
                      <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data.Estate}
                      </td>
                      <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data.ApartmentNo}
                      </td>
                     
                      <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data.Address}
                      </td>
                      <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data.PhoneNo}
                      </td>
                      <td className="relative py-[15px] pr-4">
                        <button onClick={() => handleToggleMenu(data.id)}>
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
                        {popUpMenuTwo && selectedDataId === data.id && (
                          <PopUpMenu
                            data={data}
                          />
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
    </div>
  );
};

export default MaintenanceTable;
