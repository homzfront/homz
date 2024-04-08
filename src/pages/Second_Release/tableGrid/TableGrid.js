"use client;";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "./components/popUpMenuTwo";
import Button from "./components/button";
import UserRole from "./components/UserRole";
import Access from "./components/Access";
import Link from 'next/link';


const ManagerTwo = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);
  const [openUserRoleDropdowns, setOpenUserRoleDropdowns] = useState({});
  const [openAccessDropdowns, setOpenAccessDropdowns] = useState({});

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

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  const handleStatusChange = (role, dataId, fn, setOpenDropdowns) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    const dataIndex = data.findIndex((item) => item.id === dataId);
    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex][fn] = role;
      setData(updatedData);
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

  const toggleUserRoleDropdown = (dataId) => {
    setOpenUserRoleDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const toggleAccessDropdown = (dataId) => {
    setOpenAccessDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

const router = useRouter();

const handleRowClick = (Profile) => {
  // console.log(Profile);
  router.push(`/second_release/Profiles/${Profile.id}`);
};




  return (
    <div className="mt-6 w-full">
      <table className="border w-full">
  <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px]">
    <tr>
      <th className="w-[40px] h-[48px] px-[10px] py-[14px]"></th>
      <th className="md:w-[175.25px] h-[48px] px-[16px] py-[14px]">Name</th>
      <th className="hidden md:table-cell md:w-[175.25px] h-[48px] px-[16px] py-[14px]">Email</th>
      <th className="hidden md:table-cell md:w-[153px] h-[48px] px-[16px] py-[14px]">Profile Type</th>
      <th className="md:w-[96px] h-[48px] px-[16px] py-[14px]">Status</th>
      <th className="md:w-[170.25px] h-[48px] px-[16px] py-[14px]">User Role</th>
      <th className="hidden md:table-cell md:w-[170.25px] h-[48px] px-[16px] py-[14px]">Access</th>
      <th className="hidden md:table-cell md:w-[104px] h-[48px] px-[16px] py-[14px]">Action</th>
    </tr>
  </thead>
  <tbody className="">
    {currentData.map((data, index) => (
      <tr key={index} className="pl-3 cursor-pointer">
        <td className="w-[40px] h-[48px] px-[10px] py-[14px]">
          <label className="checkbox-container">
            <input
              type="checkbox"
              id={data.Name}
              name={data.Name}
              value={data.id}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td
          className="flex items-center gap-3 text-GrayHomz4 font-[500] text-[11px]  md:w-[173px] py-[12px] px-[16px] h-[64px]"
          onClick={() => handleRowClick(data)}
        >
          <Image
            src="/static/dashboard/enterprisemanager/dashboard/Avatar.png"
            alt=""
            width={30}
            height={30}
          />
          <span className="text-[12px]">{data.Name}</span>
        </td>
        <td
          className={`text-GrayHomz font-[500] text-[12px] break-words  md:w-[173px] py-[12px] px-[16px] h-[64px] ${
            'hidden md:table-cell' // Hide on mobile
          }`}
          // onClick={() => handleRowClick(data)}
        >
          {data.Email}
        </td>
        <td
          className={`text-GrayHomz font-[500] text-[12px]  md:w-[153px] py-[12px] pl-[16px] pr-[12px] h-[64px] ${
            'hidden md:table-cell' // Hide on mobile
          }`}
          // onClick={() => handleRowClick(data)}
        >
        <Link  href={{ pathname: `/second_release/Profiles/${data.id}`, query: data }}>
          {data.ProfileType}

        </Link>
        </td>
        <td
          className={`text-center md:text-left font-[500]  md:w-[96px] py-[12px] px-[16px] h-[64px] text-[12px] ${
            data.Status === "online" ? "text-green-500" : "text-gray-400"
          }`}
          // onClick={() => handleRowClick(data)}
        >
          <div className="flex items-center justify-center md:justify-normal gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                data.Status === "online" ? "bg-green-600" : "bg-gray-400"
              }`}
            ></span>
            <span className="hidden text-[12px] md:block">{data.Status}</span>
          </div>
        </td>
        <td
          className=' w-[100px] md:w-[170px] py-[12px] px-[16px] h-[64px] text-GrayHomz font-[500] text-[12px]'
        >
          <UserRole
            data={data}
            handleStatusChange={(role) =>
              handleStatusChange(role, data.id, "UserRole", setOpenUserRoleDropdowns)
            }
            isOpen={openUserRoleDropdowns[data.id] || false}
            toggleDropdown={() => toggleUserRoleDropdown(data.id)}
          />
        </td>
        <td className=" hidden md:table-cell md:w-[170px] md:py-[12px] md:px-[16px] text-GrayHomz font-[500] text-[12px]">
          <Access
            data={data}
            handleStatusChange={(access) =>
              handleStatusChange(access, data.id, "Access", setOpenAccessDropdowns)
            }
            isOpen={openAccessDropdowns[data.id] || false}
            toggleDropdown={() => toggleAccessDropdown(data.id)}
          />
        </td>
        <td className="hidden md:table-cell relative  md:w-[104px] py-[12px] px-[20px] h-[64px]">
          <button onClick={() => handleToggleMenu(data.id)}>
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
              alt=""
              height={21}
              width={20}
              style={{ height: "auto", width: "auto" }}
            />
          </button>
          {popUpMenuTwo && selectedDataId === data.id && (
            <PopUpMenuTwo data={data} />
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default ManagerTwo;
