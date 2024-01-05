import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";

const BusinessInfo = () => {
  return (
    <div className="mt-8">
      <div className="w-[498px] flex gap-4 flex-col">
        <Input
          label={"Business Name"}
          placeholder={"Victostates"}
          type={"text"}
        />
        <Input
          label={"Business Address"}
          placeholder={"Business Address"}
          type={"text"}
        />
        <Input label={"Email"} placeholder={"Victor@gmail.com"} type={"text"} />
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
        />
      </div>
      <UpdateButton />
    </div>
  );
};

export default BusinessInfo;
