"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



const HomesCard = ({ statsData }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const totalHomes = () => {
    const vacant =
      (statsData?.totalVacantHomes / statsData?.totalNumberOfHouses) * 100;
    const total = 100 - vacant;
    const rented =
      (statsData?.totalRentedHomes / statsData?.totalNumberOfHouses) * 100;
    const total2 = 100 - rented;
    return {
      total,
      vacant,
      total2,
      rented,
    };
  };

  const data = {
    datasets: [
      {
        data: [totalHomes()?.total2, totalHomes()?.rented], // Outer circle represents the total
        backgroundColor: ["#EEF5FF", "#0058D4"],
      },
      {
        data: [totalHomes()?.vacant, totalHomes()?.total], // Inner circle represents rented (20%) and available (80%)
        backgroundColor: ["#559CFF", "#EEF5FF"],
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust the cutout to control the size of the inner circle
  };


  return (
    <div className="border w-[30%] rounded-[12px] ">
      <h1 className="text-BlueHomz px-6 pt-6 pb-3 font-[500] text-[14px]">Homes</h1>
      <div className="flex justify-between gap-1  px-3 pb-6">
        <div className="h-[98px]">
          <Doughnut data={data} options={options} plugins={[]} />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-whiteblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Total Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {statsData?.totalNumberOfHouses
                  ? `${statsData?.totalNumberOfHouses}`
                  : "0"}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-darkblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Rented Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {statsData?.totalRentedHomes
                  ? `${statsData?.totalRentedHomes}`
                  : "0"}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <h3
              className={`h-[6px] w-[6px] rounded-full mt-1 bg-lightblue`}
            ></h3>
            <div className="flex flex-col justify-start">
              <h3 className="text-[10px] font-[400] text-GrayHomz ">
                Vacant Homes
              </h3>
              <h3 className="text-[14px] font-[700] text-BlackHomz">
                {statsData?.totalVacantHomes
                  ? `${statsData?.totalVacantHomes}`
                  : "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomesCard;
