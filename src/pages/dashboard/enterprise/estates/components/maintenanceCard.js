"use client"
import { maintenanceRequestForATenantEnterprise } from "@/api/maintenanceService";
import useMaintenanceTenantOfAnEstate from "@/store/enterpriseStore/useMaintenanceTenantOfAnEstate";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Maintenance = ({ data }) => {
  const ids = data?.map((data) => data._id)
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
 
  },  []); // Empty dependency array ensures this effect runs only once on component mount

  const Data = Object.values(maintenanceData)
  .filter(array => array.length > 0) // Filter out empty arrays
  .flat();

  return (
    <div className="rounded-[12px] border w-[45%] h-[514px] overflow-auto scrollbar-container">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
          <p>Maintenance Request</p>
          <p> {Data?.length ? `${Data?.length }` : "0"}/
            {Data?.length ? `${Data?.length }` : "0"}</p>
        </div>
        <Link href={"/dashboard/enterprise-property/maintenance"} className="flex gap-1 items-center">
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
              <th className="text-left ">Subject</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {Data?.map((data) => (
              <tr key={data.id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {data?.tenant?.coverPhoto?.url ?
                    <Image src={
                      data?.tenant?.coverPhoto?.url
                    }
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-[100%] py-[15px]"
                    /> : <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="py-[15px]"
                    />}

                  <span className="py-[15px]">{data?.tenant?.fullName}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data?.subject}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
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
