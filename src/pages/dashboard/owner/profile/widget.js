"use client";
import PersonalInfo from "./personalInfo/personalInfo.js";
import ChangePassword from "./changePassword/changePassword.js";
import { useState } from "react";
import ProfilePicture from "./profilePicture/profilePicture.js";


const Widget = ({ data }) => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
  };

  return (
    <div>

      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[471px] cursor-pointer">
          <div
            className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
              !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
            }`}
            onClick={handlePageChange}
          >
            <p className="text-[14px] font-500">Personal Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeTwo}
            >
              <p className="text-[14px] font-500">Profile Picture</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeThree}
            >
              <p className="text-[14px] font-500">Change Password</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5 rounded-[12px]">
        <div className={`${!active ? "inline" : "hidden"}`}>
          <PersonalInfo data={data} />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <ProfilePicture data={data} />
        </div>
        <div className={`${activeThree ? "inline" : "hidden"}`}>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Widget;
