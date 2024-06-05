import EmptyAvatar from "@/components/icons/emptyAvatar";
import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Maintenance = () => {
  const { request, loading, fetchData } =
    useMaintenanceRequestStore();

  useEffect(() => {
    fetchData();
  }, []);

  const Data = request?.results
  return (
    <div className="rounded-[12px] border md:w-[45%] h-[514px] overflow-auto scrollbar-container ">
      <div className="flex justify-between items-center p-6">
        <div className="text-BlueHomz font-[500] text-[15px] md:text-[18px] flex gap-1 items-center">
          <p>Maintenance Request</p>
          <p>
            {Data?.length ? `${Data?.length}` : "0"}/
            {Data?.length ? `${Data?.length}` : "0"}
          </p>
        </div>
        <Link href={"/dashboard/enterprise-property/maintenance"} className="hidden md:flex gap-1 items-center">
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
        <Link href={"/dashboard/enterprise-property/maintenance"} className="md:hidden">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
            }
            alt=""
            width={16}
            height={16}
          />
        </Link>
      </div>
      <div className="">
        <table border="1" className="w-full ">
          <thead className="">
            <tr className="bg-whiteblue h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Tenant</th>
              <th className="text-left  hidden md:table-cell">Subject</th>
              <th className="text-left md:w-[27%]">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {Data?.map((request) => (
              <tr key={request?._id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {request.tenant?.coverPhoto?.url === null ||
                    request.tenant?.coverPhoto?.url === undefined ? (
                    <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                      <EmptyAvatar />
                    </div>
                  ) : (
                    <Image
                      src={request.tenant?.coverPhoto?.url}
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
                  <span className="py-[15px]">     {request?.tenant?.fullName}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px] hidden md:table-cell">
                  {request?.subject}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500] md:w-[27%] text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${request?.status === "pending"
                      ? "bg-warningBg text-warning2 px-[18px]"
                      : ""
                      } ${request?.status === "resolved"
                        ? "bg-successBg text-Success px-4"
                        : ""
                      } ${request?.status === "in-progress"
                        ? "bg-warning2  text-warningBg px-[10px]"
                        : ""
                      }`}
                  >
                    {capitalizeFirstLetter(request?.status)}
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
