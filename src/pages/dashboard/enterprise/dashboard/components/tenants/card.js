import tenantsDataForLoggedInEnterprise from "@/store/enterpriseStore/tenantData";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const TenantsCard = ({ statsData }) => {
  const { data, loading, fetchData } = tenantsDataForLoggedInEnterprise();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const Data = data?.results?.[0]?.data;

  return (
    <div className="rounded-[12px] border w-[55%] max-h-[514px] overflow-auto scrollbar-container">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
          <p>Tenants</p>
          <p>
            {statsData?.totalRentedHomes
              ? `${statsData?.totalRentedHomes}`
              : "0"}
            /{Data?.length ? `${Data?.length}` : "0"}
          </p>
        </div>
        <Link
          href={"/dashboard/enterprise-property/tenants"}
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
              <th className="text-left ">Property</th>
              <th className="text-left">Rent</th>
              <th className="text-left">Status</th>
              <th className="text-left pr-6">Due Date</th>
            </tr>
          </thead>
          <tbody className="">
            {Data?.map((data) => (
              <tr key={data.id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {!data?.coverPhoto?.url ? (
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
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
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data?.estateId?.name}
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {`${
                    data?.rentInfo?.totalRent
                      ? addCommasToNumber(data?.rentInfo?.totalRent)
                      : "______"
                  }`}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${
                      data?.rentInfo?.paymentStatus === "pending"
                        ? "bg-warningBg text-warning2 px-[10px]"
                        : ""
                    } ${
                      data?.rentInfo?.paymentStatus === "paid"
                        ? "bg-successBg text-Success  px-[21px]"
                        : ""
                    } ${
                      data?.rentInfo?.paymentStatus === "over due"
                        ? "bg-error text-white px-2"
                        : ""
                    }`}
                  >
                    {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                  </span>
                </td>
                <td className="text-GrayHomz py-[15px] font-[500] text-[11px] pr-6">
                  {`${
                    data?.rentInfo?.dueDate
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
