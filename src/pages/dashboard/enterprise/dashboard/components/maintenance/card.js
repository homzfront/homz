import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Maintenance = () => {
  const { request, tenantData, loading, fetchData } =
    useMaintenanceRequestStore();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(request);
  console.log(tenantData);

  const tenantLookup = {};
  tenantData?.forEach((tenant) => {
    tenantLookup[tenant?.data._id] = tenant?.data;
  });

  // Now, you can iterate through maintenanceRequests and access the corresponding tenantData using the lookup
  const Data = request?.results?.map((request) => ({
    ...request,
    tenantData: tenantLookup[request?.tenant._id],
  }));
  console.log(Data);

  return (
    <div className="rounded-[12px] border w-[45%] h-[514px] overflow-auto scrollbar-container ">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
          <p>Maintenance Request</p>
          <p>
            {Data?.length ? `${Data?.length}` : "0"}/
            {Data?.length ? `${Data?.length}` : "0"}
          </p>
        </div>
        <Link
          href={"/dashboard/enterprise-property/maintenance"}
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
            {Data?.map((request) => (
              <tr key={request?._id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  {request.tenantData?.coverPhoto?.url === null ||
                    request.tenantData?.coverPhoto?.url === undefined ? (
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
                      src={request.tenantData?.coverPhoto?.url}
                      alt=""
                      width={30}
                      height={30}
                      className=" rounded-[100%] py-[15px]"
                    />
                  )}
                  <span className="py-[15px]">     {request?.tenantData?.fullName}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {request?.subject}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
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
