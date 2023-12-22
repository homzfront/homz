import React from 'react'
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";

const PersonalInfo = () => {
  return (
    <div className="mt-8">
      <div className="w-[498px]">
        <Input
          label={"Full Name"}
          placeholder={"Victor Simon"}
          type={"text"}
        />
        <Input
          label={"House Address"}
          placeholder={"House Address"}
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
  )
}

export default PersonalInfo