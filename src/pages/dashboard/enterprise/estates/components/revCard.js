"use client";
import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";
import useEnterpriseRevenueForAnEstate from "@/store/enterpriseStore/useEnterpriseRevenueForAnEstate";
import addCommasToNumber from "@/utils/addCommasToNumber";


const RevCard = ({ id }) => {

  const { data: revData, fetchData } = useEnterpriseRevenueForAnEstate();

  useEffect(() => {
    fetchData(id);
  }, []);


  ChartJS.register(ArcElement, Tooltip, Legend);

  const totalHomes = () => {
    const pendingRent = (revData?.pendingRent / revData?.totalRevenue) * 100;
    const total = 100 - pendingRent;
    const rentCollected =
      (revData?.rentCollected / revData?.totalRevenue) * 100;
    const total2 = 100 - rentCollected;
    const rentExpectedNextMonth =
      (revData?.rentExpectedNextMonth / revData?.totalRevenue) * 100;
    const total3 = 100 - rentExpectedNextMonth;

    return {
      total,
      pendingRent,
      total2,
      rentCollected,
      total3,
      rentExpectedNextMonth,
    };
  };

  const data = {
    datasets: [
      {
        data: [totalHomes()?.total, totalHomes()?.pendingRent], // Outer circle represents the total
        backgroundColor: ["#EEF5FF", "#E89A57"],
      },
      {
        data: [totalHomes()?.total2, totalHomes()?.rentCollected], // Inner circle represents rented (20%) and available (80%)
        backgroundColor: ["#EEF5FF", "#039855"],
      },
      {
        data: [totalHomes()?.rentExpectedNextMonth, totalHomes()?.total3], // Inner circle represents rented (20%) and available (80%)
        backgroundColor: ["#81CBAA", "#EEF5FF"],
      },
    ],
  };

  const options = {
    cutout: "55%", // Adjust the cutout to control the size of the inner circle
  };


  return (
    <div className="border md:w-[120%] rounded-[12px] ">
      <div className="flex justify-between h-[100px] items-center px-6 pt-6 pb-3">
        <h1 className="text-BlueHomz font-[500] text-[14px]">Revenue</h1>
        <Link href={"/dashboard/enterprise-property/payments"} className="flex gap-1">
          <span className="text-[11px] font-[400] ">View all payments</span>
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
            <div className="flex justify-between gap-1  px-3 pb-6">
        <div className="h-[98px]">
          <Doughnut data={data} options={options} plugins={[]} />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <h3
              className={` h-[6px] w-[6px] rounded-full mt-1 bg-whiteblue `}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Total Revenue
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
              <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(revData?.totalRevenue)}
              </h3>
            </div>
          </div>
          <div key={data.id} className="flex gap-2">
            <h3
              className={` h-[6px] w-[6px] rounded-full mt-1 bg-darkgreen`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Rent Collected
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
              <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(revData?.rentCollected)}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={` h-[6px] w-[6px] rounded-full mt-1 bg-warning`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Pending Rent
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
              <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(revData?.pendingRent)}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={` h-[6px] w-[6px] rounded-full mt-1 bg-lightgreen`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Rent expected next month
              </h3>
              {/* <span className="text-Success text-[10px] font-[400]">
                {data?.date}
              </span> */}
              <h3 className="text-[14px] font-[700] text-BlackHomz">
              <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(revData?.rentExpectedNextMonth)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevCard;
