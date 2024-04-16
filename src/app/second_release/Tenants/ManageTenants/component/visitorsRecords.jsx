"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import StatusDropdown from "./statusDropDown";
import PopUpMenuTwo from "./popUpMenuTwo";
// import { Data } from "./components/Data";
// import DropDown from "../../AccessRecords/component/dropDown.js";

const VisitorRecords = ({ Data, setRows }) => {
  // console.log(Data)
  const [data, setData] = useState(Data || []);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = Data.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleCheckboxChange = (event, id, selectedName) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, id]);
      setRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const handleStatusChange = (status, dataId) => {
    // Handle status change logic here
    // console.log(`Changing status to: ${status} for data with ID: ${dataId}`);

    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));

    const dataIndex = Data.findIndex((item) => item._id === dataId);

    if (dataIndex !== -1) {
      // Update the DueDate property of the found item
      const updatedData = [...Data];
      updatedData[dataIndex].Status = status;

      // Update the state with the new data
      setData(updatedData);
      console.log;
    }
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  const router = useRouter();

  return (
    <div className=" flex flex-col pb-[3rem]">
      <table className="border w-full rounded-t-lg px-2 md:px-0">
        <thead className="bg-whiteblue h-[48px] text-[13px] font-semibold text-black rounded-t-lg">
          <tr>
            <th className="w-[36px] md:w-[44px] px-[24px] py-[12px] md:px-[12px] md:py-[14px] text-left">
              <Image
                src={"/static/images/_Checkbox base.svg"}
                alt=""
                height={20}
                width={20}
                className="hidden md:block"
              />
            </th>
            <th className="w-[131.8px] md:w-[182px] py-[12px] px-[24px] h-[48px] md:py-[14px] md:pr-[24px] md:pl-[16px] ">
              Tenant
            </th>
            <th className="hidden md:table-cell w-[109px] h-[48px] py-[14px] px-[16px]">
              Property
            </th>
            <th className="hidden md:table-cell w-[109.17px] h-[48px] py-[14px] px-[16px]">
              Apartment No
            </th>
            <th className="hidden md:table-cell w-[109.71px] h-[48px] py-[14px] px-[16px] text-left">
              Address
            </th>
            <th className="hidden md:table-cell w-[40px] md:w-[109.17px] md:py-[14px] md:px-[16px]">
              Email
            </th>
            <th className="hidden md:table-cell w-[109.17px] h-[48px] py-[14px] pr-[26px]">
              Phone No
            </th>
            <th className="hidden md:table-cell w-[109.71px] h-[48px] py-[14px] px-[16px]">
              Rent
            </th>
            <th className="hidden md:table-cell w-[124px] h-[48px] py-[14px] px-[16px] text-left">
              Status
            </th>
            <th className="md:hidden w-[131.8px] h-[44px] py-[12px] px-[16px] text-left">
              Rent Status
            </th>
            <th className="hidden md:table-cell w-[109.71px] h-[48px] py-[14px] px-[16px]">
              Due Date
            </th>
            <th className="md:hidden w-[36px] h-[44px] py-[12px] px-[24px]"></th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((data, index) => (
              <tr key={index} className="border-b py-0 px-[8px] text-[11px]">
                <td className="w-[30px] border-r md:px-[12px] md:py-[8px]">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id={data._id}
                      name={data._id}
                      checked={selectedRows.includes(data._id)}
                      value={data._id}
                      onChange={(e) =>
                        handleCheckboxChange(e, data._id, data.Tenant)
                      }
                    />
                    <span className="TenantCheckmark"></span>
                  </label>
                </td>
                <td className="w-[141.8px] flex items-center justify-start gap-[16px] md:mr-[16px] h-[64px] text-[11px] text-gray-700 md:pt-[24px]">
                  <Image
                    src="/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    alt=""
                    width={30}
                    height={30}
                    className="hidden md:block"
                  />
                  <span className="pb-1 md:pb-0">{data.Tenant}</span>
                </td>
                <td className="hidden md:table-cell w-[109px] h-[64px] text-[11px] text-gray-700 py-[8px]">
                  {data.Property}
                </td>
                <td className="hidden md:table-cell w-[101.83px] h-[64px] text-[11px] text-gray-700 py-[8px] px-[8px]">
                  {data.ApartmentNo}
                </td>
                <td className="hidden md:table-cell w-[101.83px] h-[64px] text-[11px] text-gray-700 px-[12px] py-[8px]">
                  {data.Address}
                </td>
                <td className="hidden md:table-cell h-[64px] text-[11px] text-gray-700 px-[12px] md:w-[101.83px]">
                  {data.Email}
                </td>
                <td className="hidden md:table-cell h-[64px] text-[11px] text-gray-700 py-[8px] w-[124.83px] leading-[16.8px]">
                  {data.PhoneNo}
                </td>
                <td className="hidden md:table-cell w-[101.83px] h-[64px] text-[11px] text-gray-700 px-[16px] py-[8px]">
                  {data.Rent}
                </td>
                <td className="md:w-[124px] h-[64px] text-[11px] text-gray-700 md:py-[8px] text-left">
                  <StatusDropdown
                    data={data}
                    handleStatusChange={(status) =>
                      handleStatusChange(status, data._id)
                    }
                    isOpen={openDropdowns[data._id] || false}
                    toggleDropdown={() => toggleDropdown(data._id)}
                  />
                </td>
                <td className="md:w-[135px] text-[11px] text-gray-700 px-[8px] flex justify-center items-center gap-2 relative md:bottom-4">
                  <span className="hidden md:block">{data.DueDate}</span>
                  <button onClick={() => handleToggleMenu(data._id)}>
                    <Image
                      src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      alt=""
                      height={20}
                      width={20}
                      style={{ height: "20", width: "20" }}
                    />
                  </button>
                  {popUpMenuTwo && selectedDataId === data._id && (
                    <PopUpMenuTwo data={data} />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          lastThreePages={lastThreePages}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default VisitorRecords;
