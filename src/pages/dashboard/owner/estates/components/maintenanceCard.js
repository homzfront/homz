import useMaintenanceOwnerStore from "@/store/propertyOwnerStore/useMaintenance";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Maintenance = ({id}) => {
  const { data, loading, fetchData } =
  useMaintenanceOwnerStore();

useEffect(() => {
  fetchData();
}, []);
console.log(data);

const filteredData = data?.filter((data) => id !== data?.tenant?.estateId._id)

return (
  <div className="rounded-[12px] border w-[45%] h-[514px] overflow-auto scrollbar-container ">
    <div className="flex justify-between  p-6">
      <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
        <p>Maintenance Request</p>
        <p>     {filteredData?.length ? `${filteredData?.length}` : "0"}/
          {filteredData?.length ? `${filteredData?.length}` : "0"}</p>
      </div>
      <Link href={"/dashboard/property-owner/maintenance"} className="flex gap-1 items-center">
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
          {data?.map((data) => (
            <tr key={data._id} className=" border-t-[1px] items-center">
              <td className={`${id === data?.tenant?.estateId._id ? "" : "hidden"} flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]`}>
              {data?.tenant?.coverPhoto?.url === null ||
                        data?.tenant?.coverPhoto?.url === undefined  ? (
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
                  src={data?.tenant?.coverPhoto?.url}
                    alt=""
                    width={30}
                    height={30}
                    className=" rounded-[100%] py-[15px]"
                  />
                )}
                <span className="py-[15px]">{data?.tenant?.fullName}</span>
              </td>
              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
              {data?.subject}
              </td>
              <td
                className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
              >
                             <span
                        className={`p-[6px] rounded-lg text-center ${data.status === "pending"
                          ? "bg-warningBg text-warning2 px-[18px]"
                          : ""
                          } ${data.status === "resolved"
                            ? "bg-successBg text-Success px-4"
                            : ""
                          } ${data.status === "in-progress"
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
