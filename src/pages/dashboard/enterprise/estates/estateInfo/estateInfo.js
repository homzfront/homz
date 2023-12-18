"use client";
import React from "react";
import Widget from "./widget";
import ToggleReturn from "../components/Return";

const EstateInfo = () => {
  return (
    <div className="w-[1075px] p-8">
      <div>
        <div>
          <ToggleReturn
            first={"Go Back"}
            second={"Estate Name"}
            third={"Estate Information"}
            href2={"/dashboard/enterprise-property/estates"}
            href3={""}
            href1={""}
          />
        </div>
        <div><Widget /></div>
      </div>
    </div>
  );
};

export default EstateInfo;
