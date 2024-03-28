import EmptyAvatar from "@/components/icons/emptyAvatar";
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

  const Data = data

  return (
    <div className="rounded-[12px] border sm:w-[55%] h-[514px] overflow-auto scrollbar-container">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[15px] sm:text-[18px] flex gap-1">
          <p>Tenants</p>
          <p>
          {Data?.length ? `${Data?.length}` : "0"}
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
              <th className="text-left  hidden sm:table-cell">Property</th>
              <th className="text-left hidden sm:table-cell">Rent</th>
              <th className="text-left">Status</th>
              <th className="text-left pr-6 hidden sm:table-cell">Due Date</th>
            </tr>
          </thead>
          <tbody className="">
            {Data?.map((data) => (
              <tr key={data._id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {!data?.coverPhoto?.url ? (
               <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
               <EmptyAvatar />
             </div>
           ) : (
             <Image
               src={data?.coverPhoto?.url}
               alt=""
               width={40}
               height={40}
               layout="full" // Specify the desired height
               objectFit="cover"
               objectPosition="center"
               className="object-cover bg-center h-[40px] rounded-full"
               priority
             />
           )}
                  <span className="py-[15px]">{data?.fullName}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px] hidden sm:table-cell">
                  {data?.estateId?.name}
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px] hidden sm:table-cell">
                  {`${data?.rentInfo?.totalRent
                      ? addCommasToNumber(data?.rentInfo?.rent)
                      : "______"
                    }`}
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
                <td className="text-GrayHomz py-[15px] font-[500] text-[11px] pr-6 hidden sm:table-cell">
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
