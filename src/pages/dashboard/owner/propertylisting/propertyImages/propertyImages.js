"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BodyPropertyImage from "./components/bodyPropertyImage";
import ImageModal from "./components/imageModal";

const Data = [
  {
    id: 1,
    image:
      "/static/dashboard/enterprisemanager/propertyList/parlorLandscape.png",
  },
  {
    id: 2,
    image: "/static/dashboard/enterprisemanager/propertyList/dinner.png",
  },
  {
    id: 3,
    image: "/static/dashboard/enterprisemanager/propertyList/kitchen.png",
  },
  {
    id: 4,
    image: "/static/dashboard/enterprisemanager/propertyList/parlor.png",
  },
  {
    id: 5,
    image: "/static/dashboard/enterprisemanager/propertyList/kitchen.png",
  },
  {
    id: 6,
    image: "/static/dashboard/enterprisemanager/propertyList/parlor2.png",
  },
  {
    id: 7,
    image: "/static/dashboard/enterprisemanager/propertyList/dinner2.png",
  },
  {
    id: 8,
    image: "/static/dashboard/enterprisemanager/propertyList/parlor.png",
  },
  {
    id: 9,
    image: "/static/dashboard/enterprisemanager/propertyList/kitchen.png",
  },
  {
    id: 10,
    image: "/static/dashboard/enterprisemanager/propertyList/dinner.png",
  },
  {
    id: 11,
    image: "/static/dashboard/enterprisemanager/propertyList/parlor.png",
  },
];

const PropertyImages = () => {
  const [data, setData] = useState(Data || []);
  //   const dataOne = data.map.splice(0,1)
  //   console.log(dataOne);
  console.log(data);

  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  console.log(selectedImage);
  const remainder = data.length - 7;

  const openImageModal = (imageIndex, item) => {
    setSelectedImage({ index: imageIndex, data: data, item: item });
    setOpenSelectedImage(!openSelectedImage);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };

  console.log(openSelectedImage);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = openSelectedImage ? "hidden" : "auto";
    if (openSelectedImage) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [openSelectedImage]);

  return (
    <div className="p-8 w-[1147px]">
      <div className="flex justify-between items-center">
        <Link
          href={"/dashboard/enterprise-property/propertylisting"}
          className="flex gap-2 items-center"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            height={16}
            width={16}
            alt=""
          />
          <p className="text-[11px] font-[400]">Go Back</p>
        </Link>
        <button>
          <p className="text-[14px] font-[400] text-BlueHomz">Edit Property</p>
        </button>
      </div>
      <div className="mt-4 ml-3">
        <div className="flex flex-wrap gap-4">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`cursor-pointer ${
                index === 0 ? "flex-shrink-0" : "flex-grow"
              }`}
              onClick={() => openImageModal(index, item)}
            >
              {index === 0 || index <= 5 ? (
                <Image
                  src={item.image}
                  alt=""
                  height={index === 0 ? 368 : 161}
                  width={index === 0 ? 1110 : 162}
                  className={`rounded-md ${index === 0 ? "w-[1055px]" : ""}`}
                />
              ) : index === 6 ? (
                <div className="relative inline-block rounded-md flex-grow">
                  <div className="bg-black opacity-[40%] absolute h-full w-full rounded-md text-[16px] font-[500] text-white flex justify-center items-center">
                    <p>+{remainder} more</p>
                  </div>
                  <Image
                    src={item.image}
                    alt=""
                    height={161}
                    width={162}
                    className="rounded-md"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {openSelectedImage && data.length >= 1 && (
          <ImageModal
            imageData={selectedImage.data}
            onClose={closeImageModal}
            totalImages={data?.length}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </div>
      <div>
        <BodyPropertyImage />
      </div>
    </div>
  );
};

export default PropertyImages;
