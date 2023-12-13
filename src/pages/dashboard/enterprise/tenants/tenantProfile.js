"use client";
import React, { useState } from "react";
import Widget from "./components/widget.js";
import ProfileCard from "./components/profileCard.js";
import Image from "next/image.js";
const TenantProfile = () => {
  return (
    <div className="max-w-[1081px] ">
      <div className="max-w-[1080px]">
        <Image
          alt=""
          src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
          height={1172}
          width={204}
          layout="responsive" // Set layout to responsive
          className="object-contain"
        />
      </div>
      <div className="flex gap-6 mt-[-20px] px-8">
        <div className="w-[350px]">
          <ProfileCard />
        </div>
        <div>
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
