"use client"
import { maintenanceRequestForATenantEnterprise } from "@/api/maintenanceService";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import useMaintenanceTenantOfAnEstate from "@/store/enterpriseStore/useMaintenanceTenantOfAnEstate";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Maintenance = ({ maintData }) => {
  const ids = maintData?.tenants?.map((data) => data)
  const [maintenanceData, setMaintenanceData] = useState({});

  useEffect(() => {
    if (ids === undefined) {
      setMaintenanceData({})
    } else {
      const fetchDataForId = async (id) => {
        try {
          if (id !== undefined) {
            const response = await maintenanceRequestForATenantEnterprise(id);
            setMaintenanceData(prevData => ({
              ...prevData,
              [id]: response // Store the response with the id as the key
            }));
          }
        } catch (error) {
        }
      };

      // Fetch additional data for each ID
      ids?.forEach(id => {
        fetchDataForId(id);
      });
    }

  }, [maintData]); // Empty dependency array ensures this effect runs only once on component mount

  const Data = Object.values(maintenanceData)
    .filter(array => array.length > 0) // Filter out empty arrays
    .flat();

  return (
    <div className="rounded-[12px] border w-full md:w-[45%] h-[514px] overflow-auto scrollbar-container">
      <div className="flex justify-between items-center p-6">
        <div className="w-[70%] flex items-center gap-1">
          <p className="text-BlueHomz font-[500] text-[18px] truncate">Maintenance Request</p>
          <p className="text-BlueHomz font-[500] text-[18px]"> {maintData?.maintenanceRequests?.length ? `${maintData?.maintenanceRequests?.length}` : "0"}/
            {maintData?.maintenanceRequests?.length ? `${maintData?.maintenanceRequests?.length}` : "0"}</p>
        </div>
        <Link href={"/dashboard/enterprise-property/maintenance"} className="w-[27%] flex gap-1 items-center">
          <p className="text-[13px] font-[400]">View All</p>
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
            }
            alt=""
            height={17}
            width={16}
          />
        </Link>
      </div>
      <div className="">
        <table border="1" className="w-full ">
          <thead className="">
            <tr className="bg-whiteblue h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Tenant</th>
              <th className="text-left w-[50%] md:w-[45%] hidden md:table-cell">Subject</th>
              <th className="text-left w-[40%] md:w-[27%] pr-6 md:pr-0">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {maintData?.maintenanceRequests?.length > 0 && Data && Data?.map((data) => (
              <tr key={data?._id} className={`border-t-[1px] items-center ${maintData?.maintenanceRequests?.map(request => request).includes(data._id) ? "" : "hidden"}`}>
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {!data?.tenant?.coverPhoto?.url ? (
                    <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                      <EmptyAvatar />
                    </div>
                  ) : (
                    <Image
                      src={data?.tenant?.coverPhoto?.url}
                      alt=""
                      width={40}
                      height={40}
                      layout="full" // Specify the desired height
                      objectFit="cover"
                      objectPosition="center"
                      className="object-cover bg-center min-w-[40px] h-[40px] rounded-full"
                      priority
                    />
                  )}

                  <span className="py-[15px]">{data?.tenant?.fullName}</span>
                </td>
                <td className="hidden md:table-cell w-full md:w-[45%] text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data?.subject}
                </td>
                <td
                  className={`text-GrayHomz w-[40%] md:w-[27%] py-[15px] md:pr-6 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${data?.status === "pending"
                      ? "bg-warningBg text-warning2 px-[18px]"
                      : ""
                      } ${data?.status === "resolved"
                        ? "bg-successBg text-Success px-4"
                        : ""
                      } ${data?.status === "in-progress"
                        ? "bg-warning2  text-warningBg px-[10px]"
                        : ""
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
  );
};

export default Maintenance;
