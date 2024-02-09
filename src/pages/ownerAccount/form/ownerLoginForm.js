"use client";
import React, { useState } from "react";
import SliderAuth from "@/components/auth/slider";

import Widget from "./widget";

const OwnerLoginForm = ({ closeForm }) => {
  return (
    <div>
      <div className="flex m-auto max-w-full sm:max-w-[1440px] h-[1024px]">
        {/* {loading && <Loading />} */}
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <SliderAuth />
        </div>
        <div className="sm:w-[794px] w-full px-6 flex flex-col justify-around items-center">
          <Widget />
        <button onClick={closeForm}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginForm;
