"use client";
import React, { useState } from "react";
// import NavBar from "../../Profiles/MainPro";
import Tenants from "./Tenants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TenantsPane = () => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(true);

  const handlePageChange = () => {
    setActive(true);
    setActiveTwo(false);
    const currentUrl = window.location.href;
const segments = currentUrl.split('/');
const profileSegmentIndex = segments.indexOf('Properties') + 1;
// Extract the profile ID from the segment
const profileId = segments[profileSegmentIndex];
handleRowClick(profileId);


  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(false);
  };
  const router = useRouter();

const handleRowClick = (ProfileId) => {
  // console.log(Profile);
  router.push(`/second_release/Profiles/${ProfileId}`);
};
  return (
    <div>
      <div className=" flex flex-col gap-2 mb-5">
        <div className="flex gap-6 items-center pb-1">
          <Link href="/second_release/user">
            <button className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
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
      <Tenants />
    </div>
  );
};

export default TenantsPane;
