import React from "react";
import Input from "../../components/inputTwo";
import Image from "next/image";
import FileUpload from "../components/fileUpload";

const Documents = ({handlePageChangeThree}) => {
  return (
    <div className="px-8 py-4">
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
            <FileUpload/>
          </div>
        </div>
      </div>
      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            {" "}
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="flex gap-4">
          <button

            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Skip
          </button>
          <button
            disabled
            className="opacity-[20%] text-[14px] font-[500] p-4 rounded-md bg-BlueHomz border text-white flex w-[100px] justify-center items-center"
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
