"use client";
import React, { useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";

const TenantProfile = () => {
  return (
    <div className="max-w-[1081px] ">
      <div className="max-w-[1080px]">
        <Image
          alt=""
          src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
          height={204}
          width={1172}
          style={{ height: 'auto', width: 'auto' }}
          
        />
      </div>
      <div className="flex gap-6 mt-[-20px] px-8">
        <div className="w-[350px]">
          <ProfileCard />
        </div>
        <div className="">
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
