"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [25, 75], // Outer circle represents the total
      backgroundColor: ["#EEF5FF", "#E89A57"],
    },
    {
      data: [80, 20], // Inner circle represents rented (20%) and available (80%)
      backgroundColor: ["#EEF5FF", "#039855"],
    },
    {
      data: [50, 50], // Inner circle represents rented (20%) and available (80%)
      backgroundColor: ["#81CBAA", "#EEF5FF"],
    },
  ],
};

const options = {
  cutout: "55%", // Adjust the cutout to control the size of the inner circle
};

const Data = [
  {
    id: 1,
    text: "Total Revenue",
    value: "N12,000,000",
  },
  {
    id: 2,
    text: "Rent Collected",
    value: "N3,000,000",
  },
  {
    id: 3,
    text: "Pending Rent",
    value: "N8,000,000",
  },
  {
    id: 4,
    text: "Rent expected next month",
    date: "January, 2014",
    value: "N6,000,000",
  },
];

const RevCard = () => {
  return (
    <div className="border w-[120%] rounded-[12px] ">
      <div className="flex justify-between items-center px-6 pt-6 pb-3">
        <h1 className="text-BlueHomz font-[500] text-[14px]">Revenue</h1>
        <Link href={"/dashboard/property-owner/payments"} className="flex gap-1">
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
      <div className="flex justify-between gap-1 pt-3 px-3 pb-3">
        <div className="h-[98px]">
          <Doughnut data={data} options={options} plugins={[]} />
        </div>
        <div className="grid grid-cols-2">
          {Data.map((data) => (
            <div key={data.id} className="flex gap-2">
              <h3
                className={` h-[6px] w-[6px] rounded-full mt-1 ${
                  data.text === "Total Revenue" ? "bg-whiteblue" : ""
                }${data.text === "Rent Collected" ? "bg-darkgreen" : ""}   ${
                  data.text === "Pending Rent" ? "bg-warning" : ""
                } ${
                  data.text === "Rent expected next month"
                    ? "bg-lightgreen"
                    : ""
                }`}
              >
                {}
              </h3>
              <div className="flex flex-col justify-start">
                <h3 className="text-[10px] font-[400] text-GrayHomz ">
                  {data.text}
                </h3>
                <span className="text-Success text-[10px] font-[400]">
                  {data.date}
                </span>
                <h3 className="text-[14px] font-[700] text-BlackHomz">
                  {data.value}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevCard;
