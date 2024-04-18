"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BodyPropertyImage from "./components/bodyPropertyImage";
import ImageModal from "./components/imageModal";
import StarRatingPL from "../starRatingPL/starRatingPL";
import { fetchSingleProperty, propertyMe } from "/src/api/propertyService";
import LoadingII from "/src/components/mainmenu/loadingII";

const PropertyImages = ({ id }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.body.style.overflow = openSelectedImage ? "hidden" : "auto";
    if (openSelectedImage) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [openSelectedImage]);
  
  useEffect(() => {
    const estateData = async () => {
      const response = await fetchSingleProperty(id);
      const data2 = await propertyMe();
      const estate = await response;
      setUser(data2.data)
      setData(estate);
      setLoading(false);
    };
    estateData();
  }, [id]);

  const [showRating, setShowRating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const showRatingPage = () => {
    setShowRating(!showRating);
  };

  const goBack = () => {
    setShowRating(false);
  };
  console.log(data);

  const newData = {
    coverPhoto: data?.data?.coverPhoto,
    photos: data?.data?.photos,
  };

  

  let combinedData = []; // Declare combinedData outside the if block

  if (newData && newData.coverPhoto && newData.photos) {
    combinedData = [newData.coverPhoto, ...newData.photos].map((item) => ({
      url: item.url,
    }));

   
  } else {
    console.error("Invalid or missing data structure.");
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  console.log(selectedImage);
  if (combinedData.length === 8) {
   return remainder = combinedData.length - 7;
  }

  const openImageModal = (imageIndex, item) => {
    console.log(imageIndex)
    console.log(item)
    setSelectedImage({ index: imageIndex, data: combinedData, item: item });
    setOpenSelectedImage(!openSelectedImage);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };

  return (
    <div className="p-8 w-[1147px]">
     
      {loading ? <LoadingII/> : showRating ? (
        <div>
          <StarRatingPL goBack={goBack} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <Link
              href={"/dashboard/property-owner/propertylisting"}
              className="flex gap-2 items-center"
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                }
                height={16}
                width={16}
                alt=""
              />
              <p className="text-[11px] font-[400]">Go Back</p>
            </Link>
       
              <Link href={`/dashboard/property-owner/propertylisting/property/${id}`} className="text-[14px] font-[400] text-BlueHomz">
                Edit Property
              </Link>
   
          </div>
          <div className="mt-4 ml-3">
            <div className="flex flex-wrap gap-4">
              {combinedData &&
                combinedData?.map((item, index) => (
                  <div
                    key={item.id}
                    className={` ${
                      index === 0 ? "flex-shrink-0" : "flex-grow"
                    }`}
                    onClick={() => openImageModal(index, item)}
                  >
                    {index === 0 || index <= 5 ? (
                      <Image
                        src={item.url}
                        alt=""
                        height={index === 0 ? 368 : 161}
                        width={index === 0 ? 1110 : 162}
                        className={`rounded-md cursor-pointer ${
                          index === 0 ? "w-[1055px]" : ""
                        }`}
                      />
                    ) : index === 6 ? (
                      <div className="cursor-pointer relative inline-block rounded-md flex-grow">
                        <div className="bg-black opacity-[40%] absolute h-full w-full rounded-md text-[16px] font-[500] text-white flex justify-center items-center">
                          <p>+{remainder} more</p>
                        </div>
                        <Image
                          src={item.url}
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
            {openSelectedImage && combinedData.length >= 1 && (
              <ImageModal
                imageData={selectedImage.data}
                onClose={closeImageModal}
                totalImages={combinedData?.length}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            )}
          </div>
          <div>
            <BodyPropertyImage data={data} showRatingPage={showRatingPage} user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImages;
