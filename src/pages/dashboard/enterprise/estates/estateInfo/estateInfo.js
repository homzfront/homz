"use client";
import React from "react";
import Return from "../components/Return";
import Widget from "./widget";

const EstateInfo = () => {
  return (
    <div className="w-[1075px] p-8">
      <div>
        <div>
          <Return
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
