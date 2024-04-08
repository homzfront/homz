import Image from "next/image";
import Link from "next/link";
import React from "react";

const TenantsCard = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
    },
    {
      id: 8,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
    },
    {
      id: 9,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
    },
    {
      id: 10,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
    },
  ];

  return (
    <div className="rounded-[12px] border w-[100%] h-[514px] overflow-auto scrollbar-container md:w-[55%] ">
      <div className="flex justify-between  p-6">
        <div className="text-BlueHomz font-[500] text-[16px] flex gap-1">
          <p>Tenants</p>
          <p>6/200</p>
        </div>
        <Link href={"/dashboard/enterprise-property/tenants"} className="flex gap-1 items-center">
          <p className="text-[11px] font-[400]">View All</p>
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
            <tr className="bg-whiteblue h-[30px] text-[12px] font-[500] text-BlackHomz">
              <th className="text-left  py-[7px] px-4 md:px-6">Tenant</th>
              <th className="hidden text-left md:table-cell">Property</th>
              <th className="hidden text-left md:table-cell">Rent</th>
              <th className="text-left py-[7px] px-4 md:px-6">Status</th>
              <th className="hidden text-left pr-6 md:table-cell">Due Date</th>
            </tr>
          </thead>
          <tbody className="">
            {Data.map((data) => (
              <tr key={data.id} className=" border-t-[1px] items-center">
                <td className="flex items-center gap-1 py-[7px] px-4 md:px-4 text-GrayHomz4 font-[500] text-[11px]">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="py-[15px]"
                  />
                  <span className="py-[7px]">{data.Tenant}</span>
                </td>
                <td className="hidden text-GrayHomz py-[7px] pr-2 font-[500] text-[11px] md:table-cell">
                  {data.Estate}
                </td>
                <td className="hidden text-GrayHomz py-[7px] pr-2 font-[500] text-[11px] md:table-cell">
                  {data.Rent}
                </td>
                <td
                  className={`text-GrayHomz py-[7px] px-4 md:px-5  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${
                      data.Status === "Pending"
                        ? "bg-warningBg text-warning2 px-[10px]"
                        : ""
                    } ${
                      data.Status === "Paid" ? "bg-successBg text-Success  px-[21px]" : ""
                    } ${
                      data.Status === "Over Due" ? "bg-error text-white px-2" : ""
                    }`}
                  > 
                    {data.Status}
                  </span>
                </td>
                <td className="hidden text-GrayHomz py-[7px] font-[500] text-[11px] pr-6 md:table-cell">
                  {data.DueDate}
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
