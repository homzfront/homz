import { fetchSpecificTenantOwner } from "@/api/tenantSevice";
import tenantsDataForLoggedInOwner from "@/store/propertyOwnerStore/tenantsDataForLoggedInOwner";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TenantsCard = ({ tenants }) => {

  return (
    <div className="rounded-[12px] border w-full md:w-[55%] h-[514px] overflow-auto scrollbar-container">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
          <p>Tenants</p>
          <p>
            {tenants?.length ? `${tenants?.length}` : "0"}
            /{tenants?.length ? `${tenants?.length}` : "0"}
          </p>
        </div>
        <Link
          href={"/dashboard/property-owner/tenants"}
          className="flex gap-1 items-center"
        >
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
      <div className=" ">
        <table border="1" className="w-full ">
          <thead className="">
            <tr className="bg-whiteblue h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Tenant</th>
              <th className="text-left hidden md:table-cell">Property</th>
              <th className="text-left hidden md:table-cell">Rent</th>
              <th className="text-left ">Status</th>
              <th className="text-left pr-6 hidden md:table-cell">Due Date</th>
            </tr>
          </thead>
          <tbody className="">
            {tenants?.map((data) => (
              <tr key={data._id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {!data?.coverPhoto?.url ? (
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="py-[15px]"
                    />
                  ) : (
                    <Image
                      src={data?.coverPhoto?.url}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-[100%] py-[15px]"
                    />
                  )}
                  <span className="py-[15px]">{data?.fullName}</span>
                </td>
                <td className=" hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data?.estateId?.name}
                </td>
                <td className=" hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data?.rentInfo?.totalRent
                    ?
                    <>
                      <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rentInfo?.rent)}
                    </>
                    : "______"
                    }
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${data?.rentInfo?.paymentStatus === "pending"
                      ? "bg-warningBg text-warning2 px-[10px]"
                      : ""
                      } ${data?.rentInfo?.paymentStatus === "paid"
                        ? "bg-successBg text-Success  px-[21px]"
                        : ""
                      } ${data?.rentInfo?.paymentStatus === "over due"
                        ? "bg-error text-white px-2"
                        : ""
                      }`}
                  >
                    {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                  </span>
                </td>
                <td className=" hidden md:table-cell text-GrayHomz py-[15px] font-[500] text-[11px] pr-6">
                  {`${data?.rentInfo?.dueDate
                    ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                    : "______"
                    }`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default TenantsCard;
