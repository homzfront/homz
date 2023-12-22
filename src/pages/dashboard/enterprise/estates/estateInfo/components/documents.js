import React from "react";
import Input from "../../../components/inputTwo";
import Image from "next/image";
import FileUpload from "../../components/fileUpload";

const Documents = ({ handlePageChangeThree }) => {
  return (
    <div className="">
      <div className="flex flex-col">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Document</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Upload necessary documents for your Tenants to acess.
        </p>
        {/* <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p> */}
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex flex-col gap-2">
          <Input type={"radio"} label={"Rent Receipt"} />
          <Input type={"radio"} label={"Tenant Agreement"} />
        </div>
        <div className="h-[394px] w-[786px]">
          <div className="w-full h-full border">
            <FileUpload />
          </div>
        </div>
      </div>
      <div className="mt-[10%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default Documents;
