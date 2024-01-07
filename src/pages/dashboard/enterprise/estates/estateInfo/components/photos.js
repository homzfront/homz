"use client";
import React, { useState } from "react";
import ImageUpload from "../../components/imageUpload";
import Image from "next/image";

const Photos = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);

  return (
    <div className=" block">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Add at least one photo of your estate
        </p>
        <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Cover photo</p>
          <div className="mt-4 w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage}
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
            />
          </div>
        </div>
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Other photos</p>
          <div className="mt-4 flex">
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                onImageUpload={setUploadedImage2}
                uploadedImage={uploadedImage2}
              />
            </div>
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                onImageUpload={setUploadedImage3}
                uploadedImage={uploadedImage3}
              />
            </div>
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

export default Photos;
