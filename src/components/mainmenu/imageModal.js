// ImageModal.js
"use client";
import Image from "next/image";
import { useEffect } from "react";

const ImageModal = ({
  imageData = [],
  onClose,
  totalImages = 0,
  currentImageIndex = null,
  setCurrentImageIndex,
}) => {
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        goToPreviousImage();
      } else if (event.keyCode === 39) {
        // Right arrow key
        goToNextImage();
      }
    };

    // Add event listener for keydown event when the modal is open
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener when the modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex, totalImages]);


  

  return (
    <div className="text-white absolute  z-20 h-screen sm:max-w-[1440px]  m-auto  inset-0  bg-black flex justify-center items-center">
      <div className="h-screen flex justify-between py-4 flex-col">
        <div className="flex w-full justify-between h-[5%] px-2 sm:px-0">
          <span className="text-[14px] font-[400]">{`${
            currentImageIndex && currentImageIndex === 0
              ? currentImageIndex === 1
              : currentImageIndex + 1
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
        <div className="flex justify-around w-full gap-4 items-center h-full sm:pt-8">
          <button
            className="sm:p-4 p-1 border rounded-full"
            onClick={goToPreviousImage}
          >
            {" "}
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/left.png"}
              height={16}
              width={16}
              alt=""
            />
          </button>
          <div className=" m-auto sm:w-[1110px] sm:h-[540px] w-[200px] h-[200px] sm:pt-12">
            <Image
              src={imageData[currentImageIndex]?.url}
              alt=""
              height={542}
              width={1110}
              className="rounded-[12px] object-contain sm:w-[1110px] sm:max-h-[440px] w-[200px] h-[200px]"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
          <button className="sm:p-4 border p-1 rounded-full" onClick={goToNextImage}>
            {" "}
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/right.png"}
              height={16}
              width={16}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
