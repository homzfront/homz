"use client";
import React, { useState } from "react";
import Profile from "./Profile";
import SecondProfile from "./SecondProfile";
import Link from "next/link";
import Properties from "./Properties/PropertiesTable";
import { useRouter, useSearchParams } from 'next/navigation';

const Data = [
  {
    _id: 1,
    Name: "Sunrise Property",
    No_of_Houses: 5,
    No_of_Tenants: 8,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 2,
    Name: "Sunrise Property",
    No_of_Houses: 6,
    No_of_Tenants: 7,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 3,
    Name: "Sunrise Property",
    No_of_Houses: 5,
    No_of_Tenants: 5,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 4,
    Name: "Sunrise Property",
    No_of_Houses: 9,
    No_of_Tenants: 7,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 5,
    Name: "Sunrise Property",
    No_of_Houses: 5,
    No_of_Tenants: 8,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 6,
    Name: "Sunrise Property",
    No_of_Houses: 4,
    No_of_Tenants: 7,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
  {
    _id: 7,
    Name: "Sunrise Property",
    No_of_Houses: 5,
    No_of_Tenants: 8,
    Location: "Alagomeji Area, Yaba, Lagos",
  },
];
const MainProfileBody = () => {
  const router = useRouter();
  const search = useSearchParams()
  // console.log(search.get("data"))

  const [active, setActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);

  const handlePageChange = () => {
    setActive(true);
    setActiveTwo(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(false);
  };
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col gap-2">
        <div className="flex gap-6 items-center pb-1">
    
          <Link href="/second_release/user">
            <button className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-w_idth="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              <span className=" text-gray-400">Go Back</span>
            </button>
          </Link>
          <h2 className=" text-[24px] font-[500]">{"John Doe"}</h2>
        </div>

        <div className="flex items-center gap-5 py-[1rem] pl-4">
          <button
            className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
              active
                ? "bg-BlueHomz text-white"
                : "text-BlackHomz  hover:bg-blue-200"
            }`}
            onClick={(e) => handlePageChange(e)}
          >
            Profile
          </button>
          <button
            className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
              activeTwo
                ? "bg-BlueHomz text-white"
                : "text-BlackHomz hover:bg-blue-200"
            }`}
            onClick={(e) => handlePageChangeTwo(e)}
          >
            {/* className="px-4 py-2 rounded-md bg-transparent border border-blue-500 bg-BlueHomz text-black hover:text-white hover:bg-blue-300 focus:outline-none" */}
            Properties
          </button>
        </div>
      </div>
      {active && (
        <div className="flex gap-6 p-4">
          <div className="h_idden md:block">
            <Profile />
          </div>
          <div className="">
            <SecondProfile />
          </div>
        </div>
      )}
      {activeTwo && (
        <div className="properties">
          <Properties Data={Data} />
        </div>
      )}
    </div>
  );
};

export default MainProfileBody;
