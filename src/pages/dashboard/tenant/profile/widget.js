"use client";
import PersonalInfo from "./personalInfo/personalInfo.js";
import ChangePassword from "./changePassword/changePassword.js";
import { useState } from "react";
import ProfilePicture from "./profilePicture/profilePicture.js";
import RentInformation from "./rentInformation/rentInformation.js";


const Widget = ({ data }) => {

  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false); // State for the fourth page

  console.log(data);

  const handlePageChange = (e) => {
    e.preventDefault()
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeTwo = (e) => {
    e.preventDefault()
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeThree = (e) => {
    e.preventDefault()
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeFour = (e) => {
    e.preventDefault()
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className=" flex mt-5 gap-4 justify-between w-[650px] cursor-pointer">
          <div
            className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
              !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
            }`}
            onClick={(e) => handlePageChange(e)}
            justify-center
          >
            <p className="text-[14px] font-500">Rent Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={(e) => handlePageChangeTwo(e)}
            >
              <p className="text-[14px] font-500">Property Information</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={(e) => handlePageChangeThree(e)}
            >
              <p className="text-[14px] font-500">Profile Picture</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeFour ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={(e) => handlePageChangeFour(e)}
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
            <PersonalInfo data={data} />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <ProfilePicture data={data} />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
