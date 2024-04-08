"use client";
import Image from "next/image";
import React from "react";

const Business = () => {
  return (
    <div className="flex flex-col item gap-5">
      <div className="flex  gap-[3rem]">
        <div className="profiles flex  flex-col space-y-7 w-[313px]">
          <div className=" space-y-1">
            <label for="bussinessName" className="">
              Business Name
            </label>
            <br />
            <input
              type="text"
              id="bussinessName"
              className={`businessField`}
              name="bussinessName"
              placeholder="[bussiness Name]"
            />
          </div>

          <div className=" space-y-1">
            <label for="BusinessAddress">Business Address</label>
            <br />
            <input
              type="text"
              id="BusinessAddress"
              className={`businessField`}
              name="BusinessAddress"
              placeholder="[Business Address]"
            />
          </div>
          <div className=" space-y-1">
            <label for="BusinessEmail">Business Email</label>
            <br />
            <input
              type="text"
              id="BusinessEmail"
              className={`businessField`}
              name="BusinessEmail"
              placeholder="[BusinessEmail]"
            />
          </div>
          <div className=" space-y-1">
            <label for="BusinessPhone">Business Phone Number</label>
            <br />
            <input
              type="text"
              id="BusinessPhone"
              className={`businessField`}
              name="BusinessPhone"
              placeholder="[0000 - 000 - 0000]"
            />
          </div>
        </div>

        {/* <div className=" flex flex-col items-center justify-center pb-6"> */}
        <div className="relative">
          <div className="businessImage relative flex items-center justify-center">
            <Image
              src="/static/images/user.svg"
              height={52}
              width={52}
              alt=""
              className="m-auto"
            />
          </div>

          <Image
            src={"/static/images/camera.svg"}
            alt=""
            height={45}
            width={35}
            className="profileIcons p-[11px] w-[45px] h-[45px]  rounded-[8px] absolute bottom-[139px] left-[114px]"
          />

          <Image
            src={"/static/images/trash.svg"}
            alt=""
            height={45}
            width={35}
            className="profileIcons  w-[45px] h-[45px] p-[11px] rounded-[8px] absolute bottom-[139px] left-[167px]"
          />
        </div>
        {/* </div> */}
      </div>

      <div className="">
        <button
          className={`pl-3 editBtn w-[670px] h-[48px] p-[12px] rounded-[4px] text-center mx-auto  mt-[1.5rem] relative`}
          // onClick={(e) => handleEditBtn(e)}
        >
          Save Update
        </button>
      </div>
    </div>
  );
};

export default Business;
