"use client";
import React, { useState } from "react";
import SliderAuth from "@/components/auth/slider";
import Widget from "./widget";
import Image from "next/image";

const OwnerLoginForm = ({ closeForm, data }) => {
  return (
    <div className="relative">
      <div className="flex m-auto max-w-full sm:max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <SliderAuth />
        </div>
        <div className=" sm:w-[794px] w-full px-6 flex flex-col mt-10 items-center">
          {/* <div className="w-full sm:block hidden">
            <button className=" cursor-pointer" onClick={closeForm}>
              <Image
                src={"/static/images/Link.png"}
                alt=""
                width={85}
                height={24}
              />
            </button>
          </div>
          <div className="w-full block sm:hidden">
            <button className=" cursor-pointer" onClick={closeForm}>
              <Image
                src={"/static/images/Button.png"}
                alt=""
                width={28}
                height={28}
              />
            </button>
          </div> */}
          <Widget data={data}/>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginForm;
