"use client";
import React, { useState } from "react";
import ImageUpload from "../../components/imageUpload";
import Image from "next/image";

const Photos = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);

  return (
    <div>
      <div className="flex gap-4 mt-10">
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Cover photo</p>
          <div className="mt-4 w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage}
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
              height={"200"}
              width={"210"}
            />
          </div>
        </div>
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Other photos</p>
          <div className="mt-4 flex gap-2 w-[750px]">
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                onImageUpload={setUploadedImage2}
                uploadedImage={uploadedImage2}
                height={"200"}
                width={"210"}
              />
            </div>
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                onImageUpload={setUploadedImage3}
                uploadedImage={uploadedImage3}
                height={"200"}
                width={"210"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;
