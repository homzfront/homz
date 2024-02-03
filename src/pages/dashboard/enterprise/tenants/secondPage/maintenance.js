"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../components/button.js";
import { updateMaintenanceReqestByTenant } from "@/api/maintenanceService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingTable from "../../../../../components/mainmenu/loadingTable.js";
import StatusDropDownMain from "../components/statusDropDownMain.js";
const Maintenance = ({ data }) => {
  const [loadingRows, setLoadingRows] = useState({});

  const MaintenanceRequests = data?.data?.maintenanceRequests;
  console.log(MaintenanceRequests);
  console.log(data);

  // Create a new array with each element containing maintenance request and user information
  const newDataArray = data?.data?.maintenanceRequests.map(
    (maintenanceRequest) => {
      return {
        _id: maintenanceRequest?._id,
        maintenanceRequest,
        user: {
          fullName: data?.data?.fullName,
          coverPhoto: data?.data?.coverPhoto,
        },
      };
    }
  );

  console.log(newDataArray);

  const [openDropdowns, setOpenDropdowns] = useState({});

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newDataArray?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = newDataArray?.slice(startIndex, endIndex);

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

  const handleStatusChange = async (status, dataId) => {
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));
    try {
      // Handle status change logic here
      console.log(`Changing status to: ${status} for data with ID: ${dataId}`);
      const data = await updateMaintenanceReqestByTenant({
        id: dataId,
        status,
      });
      console.log(data);
      toast.success("status updated successfully");
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
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
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-6 w-[40%]">Tenant</th>
                <th className="text-left w-[35%] ">Subject</th>
                <th className="text-left w-[25%] pl-1">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((data) => (
                <tr key={data._id} className=" border-t-[1px] items-center">
                  <td className="pt-2 flex items-center gap-1  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                    {data?.user?.coverPhoto?.url === null ||
                    data?.user?.coverPhoto?.url === undefined ? (
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                        }
                        alt=""
                        width={40}
                        height={40}
                        className=" rounded-full"
                      />
                    ) : (
                      <Image
                        src={data?.user?.coverPhoto?.url}
                        alt=""
                        width={40}
                        height={40}
                        className=" rounded-[100%]"
                      />
                    )}
                    <span className="">{data?.user?.fullName}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] w-[35%] font-[500] text-[11px]">
                    {data?.maintenanceRequest?.subject}
                  </td>

                  <td
                    className={`text-GrayHomz py-[15px] pl-1  w-[25%] font-[500]  text-[11px]`}
                  >
                      <StatusDropDownMain
                        data={data}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data._id)
                        }
                        isOpen={openDropdowns[data._id] || false}
                        toggleDropdown={() => toggleDropdown(data._id)}
                        loading={loadingRows[data._id] || false}
                      />
                
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
