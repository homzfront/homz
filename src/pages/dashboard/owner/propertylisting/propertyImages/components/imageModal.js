// ImageModal.js
"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageModal = ({
  imageData,
  onClose,
  totalImages,
  item,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null || item);
  console.log(currentImageIndex)

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
  };

  return (
    <div className="text-white modal-overlay absolute top-0 z-20 h-screen max-w-[1440px] m-auto inset-0 bg-black flex justify-center items-center">
      <div className="modal-content h-screen flex justify-between py-4 flex-col">
        <div className="flex w-full justify-between h-[5%]">
          <span className="text-[14px] font-[400]">{`${
            currentImageIndex + 1
          }/${totalImages}`}</span>
          <button className="flex gap-2 items-center" onClick={onClose}>
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/close.png"}
              height={17}
              width={16}
              alt=""
            />
            <span className="text-[14px] font-[400]">close</span>
          </button>
        </div>
        <div className="flex justify-around w-full gap-4 items-center h-[95%]">
          <button
            className="p-4 border rounded-full"
            onClick={goToPreviousImage}
          >
            {" "}
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/left.png"}
              height={36}
              width={36}
              alt=""
            />
          </button>
          <div className="w-[1110px] m-auto max-h-[540px]">
            <Image
              src={imageData[currentImageIndex].image}
              alt=""
              height={752}
              width={1110}
              className="rounded-[12px] object-contain w-[1110px] max-h-[540px]"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <button className="p-4 border rounded-full" onClick={goToNextImage}>
            {" "}
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/right.png"}
              height={36}
              width={36}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
