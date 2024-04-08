"use client";
import Image from "next/image";
import React, { useState } from "react";
// import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../components/button";
import StatusDropdown from "../components/statusDropDown";
import { useRouter } from "next/navigation";
import { Data } from "../components/Data";
import DropDown from "./component/DropDown";

const Tenants = () => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || {});
  const [openDropdowns, setOpenDropdowns] = useState({});

  const ITEMS_PER_PAGE = 10;
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

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };
  const handleStatusChange = (status, dataId) => {
    // Handle status change logic here
    console.log(`Changing status to: ${status} for data with ID: ${dataId}`);

    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));

    const dataIndex = data.findIndex((item) => item.id === dataId);

    if (dataIndex !== -1) {
      // Update the DueDate property of the found item
      const updatedData = [...data];
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

  const handleRowClick = (Profile) => {
    console.log(Profile);
    // router.push(`/admin_dashboard/Profiles/${Profile.id}`);
  };
  return (
    <div className=" flex flex-col pb-[3rem]">
    {data.length >1
    ?
    ( 
      <div>
      <div className={` mb-5`}>
        {/* <div className=""> */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center ">
              <p className="font-[500]">Tenants</p>
              <span className="bg-blue-200 w-[30px] h-[30px] flex justify-center items-center rounded-[8px]">
                <span className="text-blue-600 text-[18px] font-[400]">
                  {data.length}
                </span>
              </span>
            </div>
            <div className="hidden md:flex items-center justify-evenly gap-2">
              <div className="pt-[5px]">
                <DropDown edit={true} />
              </div>
              <input
                type="date"
                className="adminBorders items-center flex text-GrayHomz2 py-[1.5px] px-[10px] rounded cursor-pointer"
                pattern="\d{2}-\d{2}-\d{4}"
                id="date"
                name="date"
                placeholder="Date"
              />
              <button className="adminBorders border-blue-600 items-center text-[14px] font-[500] flex text-blue-600 px-[10px] p-1 rounded cursor-pointer">
                <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                    }
                    alt=""
                    height={17}
                    width={16}
                  />
                </span>
                Reset
              </button>
            </div>
            <div className="mr-4">
              <button className="adminBord items-center text-[14px] font-[500] flex bg-[#006AFF] text-white px-[10px] p-1 rounded cursor-pointer gap-2">
                <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    height={12}
                    width={16}
                  />
                </span>
                Invite Tenant
              </button>
            </div>
          </div>
        {/* </div> */}
      </div>

      <table className="border w-full rounded-t-lg">
        <thead className="bg-blue-100  h-16 text-sm font-semibold text-black rounded-t-lg">
          <tr>
            <th className=" w-[138.5] h-[48px] py-[14px] px-[20px] text-left">
              Tenant
            </th>
            <th className="hidden md:table-cell w-[138.5] h-[48px] py-[14px] px-[20px]">
              Apartment No
            </th>
            <th className="hidden md:table-cell w-[138.5] h-[48px] py-[14px] px-[20px] text-left">
              Address
            </th>
            <th className="hidden md:table-cell text-left w-[138.5] h-[48px] py-[14px] px-[20px]">
              Email
            </th>
            <th className="hidden md:table-cell text-left w-[138.5] h-[48px] py-[14px] px-[20px]">
              Phone No
            </th>
            <th className="hidden md:table-cell text-left w-[108.5] h-[48px] py-[14px] px-[20px]">
              Rent
            </th>
            <th className="text-left w-[138.5] h-[48px] py-[14px] px-[20px]">
              Status
            </th>
            <th className=" w-[138.5] h-[48px] py-[14px] px-[20px] text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {currentData &&
            currentData.map((data, index) => (
              <tr key={index} className="border-b space-y-4 h-[64px]">
                <td className=" flex items-center gap-3 w-[168.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className=""
                  />
                  <span>{data.Tenant}</span>
                </td>

                <td className="w-[138.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  {data.ApartmentNo}
                </td>
                <td className="w-[138.5px] h-[64px] text-xs leading-[16.5px] text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  {data.Address}
                </td>
                <td className="w-[138.5px] h-[64px] text-xs leading-[16.5px] text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  {data.Email}
                </td>
                <td className="w-[138.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  {data.PhoneNo}
                </td>
                <td className="w-[128.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  {data.Rent}
                </td>
                <td className="w-[128.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  <StatusDropdown
                    data={data}
                    handleStatusChange={(status) =>
                      handleStatusChange(status, data.id)
                    }
                    isOpen={openDropdowns[data.id] || false}
                    toggleDropdown={() => toggleDropdown(data.id)}
                  />
                </td>

                <td className="w-[118.5px] h-[64px] text-xs text-gray-700 py-[12px] pr-[16px] pl-[20px]">
                  <div className="flex gap-3">
                    <button onClick={() => handleRowClick(data)}>
                      <Image
                        src={"/static/images/edit-2.svg"}
                        alt=""
                        height={16}
                        width={16}
                        className="w-9 h-9 p-2 rounded-lg cursor-pointer"
                      />
                    </button>
                    <button>
                      <Image
                        src={"/static/images/trash.svg"}
                        alt=""
                        height={16}
                        width={16}
                        className="w-9 h-9 p-2 rounded-lg cursor-pointer"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {
        totalPages > 1 &&
      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
      }
      </div>
     ) :
     (
      <div className="flex flex-col">
          <div className="flex gap-2 items-center pl-2">
            <p className="font-[500]">Tenants</p>
            <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
              <span className="text-blue-600 text-[18px] font-[400]">
                {data.length}
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
            <Image
              src={"/static/images/Frame 1318.svg"}
              alt=""
              height={100}
              width={100}
              className="rounded-[8px]"
            />
            <button className="flex items-center justify-center text-[14px] font-[500] bg-[#006AFF] text-white px-4 py-2 rounded cursor-pointer space-x-2">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                }
                alt=""
                height={12}
                width={16}
              />
              <span>Invite Tenant</span>
            </button>
          </div>
        </div>
     )
    }
    </div>
  );
};

export default Tenants;
