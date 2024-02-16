"use client";
import useMaintenanceTenantStore from "@/store/tenantStore/useMaintenanceTenantStore";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import lowerCaseData from "@/utils/lowerCaseData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Maintenance = () => {
  const { data, loading, fetchData } = useMaintenanceTenantStore();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="rounded-[12px] border w-[616px] h-[315px] overflow-auto scrollbar-container ">
      <div className="flex justify-between items-center px-6 p-5">
        <div className=" flex gap-4 items-center">
          <p className="font-[500] text-[14px]">Maintenance Request</p>
          <div className="bg-inputBg py-1 px-2 flex items-center justify-center">
            <p className="text-[14px] font-[500] text-GrayHomz">{data.length ? data.length : "0"}</p>
          </div>
        </div>

        <Link href={"/dashboard/tenant/maintenance"} className="text-[13px] font-[400] text-BlueHomz">
          Request for maintenance
        </Link >
      </div>
      <div className="h-auto">
        <table className="w-full  h-full">
          <thead className="">
            <tr className="bg-inputBg h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Subject</th>
              <th className="text-left ">Request Date</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.map((data) => (
              <tr key={data?._id} className="h-[60px] border-t-[1px] items-center">
                <td className="pr-2  pl-6 text-GrayHomz font-[500] text-[11px]">
                  <span className="py-[15px]">{data.subject}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {changeBackendDateFormat(data?.requestDate)}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${
                      lowerCaseData(data?.status) === "resolved"
                        ? "w-full bg-successBg text-Success"
                        : ""
                    } ${
                      lowerCaseData(data?.status) === "pending"
                        ? "w-full bg-warningBg text-warning2"
                        : ""
                    } ${
                      lowerCaseData(data?.status) === "in-progress"
                        ? "w-full bg-warning2 text-warningBg"
                        : ""
                    }`}
                  >
                    {lowerCaseData(data?.status) === "resolved"
                      ? "Resolved"
                      : ""}

                    {lowerCaseData(data?.status) === "pending" ? "Pending" : ""}
                    {lowerCaseData(data?.status) === "in-progress"
                      ? "In-progress"
                      : ""}
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
