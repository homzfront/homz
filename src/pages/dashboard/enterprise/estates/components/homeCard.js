"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      data: [20, 80], // Outer circle represents the total
      backgroundColor: ["#EEF5FF", "#0058D4"],
    },
    {
      data: [20, 80], // Inner circle represents rented (20%) and available (80%)
      backgroundColor: ["#559CFF", "#EEF5FF"],
    },
  ],
};

const options = {
  cutout: "70%", // Adjust the cutout to control the size of the inner circle
};

const Data = [
  {
    id: 1,
    text: "Total Homes",
    value: "25",
  },
  {
    id: 2,
    text: "Rented Homes",
    value: "20",
  },
  {
    id: 3,
    text: "Vacant Homes",
    value: "5",
  },
];

const HomeCard = () => {
  return (
    <div className="border w-[100%] rounded-[12px] ">
      <div className="flex justify-between ">
        <h1 className="text-BlueHomz px-6 pt-6 pb-3 font-[500] text-[14px]">
          Homes
        </h1>
        <div className="flex flex-col pr-4 pt-4">
          <div>
            <h3 className="text-[11px] font-[400] text-BlackHomz">
              Add New Tenant
            </h3>
            <Image
              alt=""
              height={40}
              width={40}
              src={
                "/static/dashboard/enterprisemanager/dashboard/add-square-blue.png"
              }
              className="ml-10 cursor-pointer"
            />
          </div>
        </div>
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
                  data.text === "Vacant Homes" ? "bg-lightblue" : ""
                }  ${data.text === "Rented Homes" ? "bg-darkblue" : ""} ${
                  data.text === "Total Homes" ? "bg-whiteblue" : ""
                }`}
              >
                {}
              </h3>
              <div className="flex flex-col justify-start">
                <h3 className="text-[10px] font-[400] text-GrayHomz ">
                  {data.text}
                </h3>
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

export default HomeCard;
