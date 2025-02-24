"use client";
import PersonalInfo from "./personalInfo/personalInfo.js";
import ChangePassword from "./changePassword/changePassword.js";
import { useState } from "react";
import ProfilePicture from "./profilePicture/profilePicture.js";
import RentInformation from "./rentInformation/rentInformation.js";
import AccountInfo from "./accountInfo/accountInfo.js";
import { useSearchParams } from "next/navigation.js";
import useTenantActiveKYC from "@/store/tenantKYC/useTenantActiveKYC.js";
import PendingCard from "./personalInfo/components/pendingCard.js";
import RejectedCard from "./personalInfo/components/rejectedCard.js";
import SuccessCard from "./personalInfo/components/successCard.js";


const Widget = ({ data }) => {
  const urlParams = useSearchParams();
  const tab = urlParams.get("tab")

  const [active, setActive] = useState(tab ? tab !== 'personal' : false);
  const [activeTwo, setActiveTwo] = useState(tab === "personalInfo");
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(tab === 'acctInfo');
  const [activeFive, setActiveFive] = useState(false);
  const { approve, rejected } = useTenantActiveKYC()


  const handlePageChange = (e) => {
    e.preventDefault()
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false);
    setActiveFive(false);
  };

  const handlePageChangeTwo = (e) => {
    e.preventDefault()
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    setActiveFour(false);
    setActiveFive(false);
  };

  const handlePageChangeThree = (e) => {
    e.preventDefault()
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
    setActiveFour(false);
    setActiveFive(false);
  };

  const handlePageChangeFour = (e) => {
    e.preventDefault()
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
    setActiveFive(false);
  };

  const handlePageChangeFive = (e) => {
    e.preventDefault()
    setActiveFour(false);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
    setActiveFive(true);
  };


  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className=" flex mt-5 gap-4 justify-between w-[650px] cursor-pointer">
          <div
            className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${!active ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
            onClick={(e) => handlePageChange(e)}
            justify-center
          >
            <p className="text-[14px] font-500">Rent Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
              onClick={(e) => handlePageChangeTwo(e)}
            >
              <p className="text-[14px] font-500">Personal Information</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
              onClick={(e) => handlePageChangeThree(e)}
            >
              <p className="text-[14px] font-500">Profile Picture</p>
            </div>
          </div>
          {/* <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeFour ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={(e) => handlePageChangeFour(e)}
            >
              <p className="text-[14px] font-500">Account Information</p>
            </div>
          </div> */}
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${activeFive ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
              onClick={(e) => handlePageChangeFive(e)}
            >
              <p className="text-[14px] font-500">Change Password</p>
            </div>
          </div>
        </div>

        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <RentInformation data={data} />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <div>
              {approve ? <SuccessCard /> : !rejected ? <PendingCard /> : <RejectedCard />}
              <PersonalInfo data={data} />
            </div>
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <ProfilePicture data={data} />
          </div>
          {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
            <AccountInfo />
          </div> */}
          <div className={`${activeFive ? "inline" : "hidden"}`}>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
