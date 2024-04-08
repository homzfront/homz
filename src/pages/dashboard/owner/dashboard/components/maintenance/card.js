import Image from "next/image";
import Link from "next/link";
import React from "react";

const Maintenance = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "In-progress",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Pending",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
  ];

  return (
    <div className="rounded-[12px] border w-[100%] h-[514px] overflow-auto scrollbar-container md:w-[42%] ">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] md:text-[18px] flex gap-1">
          <p>Maintenance Request</p>
          <p>6/50</p>
        </div>
        <Link href={"/dashboard/property-owner/maintenance"} className="flex gap-1 items-center">
          <p className=" hidden text-[13px] font-[400] md:inline-block">View All</p>
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
      <div className="d">
        <table border="1" className="w-full ">
          <thead className="">
            <tr className="bg-whiteblue h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Tenant</th>
              <th className="hidden md:table-cell text-left">Subject</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {Data.map((data) => (
              <tr key={data.id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="py-[15px]"
                  />
                  <span className="py-[15px]">{data.Tenant}</span>
                </td>
                <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data.Subject}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${
                      data.Status === "Pending"
                        ? "bg-warningBg text-warning2 px-[18px]"
                        : ""
                    } ${
                      data.Status === "Resolved"
                        ? "bg-successBg text-Success px-4"
                        : ""
                    } ${
                      data.Status === "In-progress"
                        ? "bg-warning2  text-warningBg px-[10px]"
                        : ""
                    }`}
                  >
                    {data.Status}
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
