"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BodyPropertyImage from "./components/bodyPropertyImage";
import ImageModal from "./components/imageModal";
import StarRatingPL from "../starRatingPL/starRatingPL";
import { fetchSingleProperty } from "@/api/propertyService";
import { enterpriseMe } from "@/api/enterpriseManagerService";
import LoadingII from "@/components/mainmenu/loadingII";
import useBodyScroll from "@/utils/useBodyScroll";


const PropertyImages = ({ id }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [remainder, setRemainder] = useState(null);
  const [combinedData, setCombinedData] = useState([]); // Initialize combinedData state

  console.log(id);
  
  // useEffect to handle scrolling
  useBodyScroll([openSelectedImage]);

  useEffect(() => {
    const estateData = async () => {
      const response = await fetchSingleProperty(id);
      const data2 = await enterpriseMe();
      const estate = await response;
      setUser(data2.data);
      setData(estate);
      setLoading(false);
    };
    estateData();
  }, [id]);

  useEffect(() => {
    if (data && data.data && data.data.coverPhoto && data.data.photos) {
      const newData = {
        coverPhoto: data.data.coverPhoto,
        photos: data.data.photos,
      };
      const combinedData = [newData.coverPhoto, ...newData.photos].map((item) => ({
        url: item.url,
      }));
      setCombinedData(combinedData); // Update combinedData state
    } else {
      console.error("Invalid or missing data structure.");
    }
  }, [data]);

  useEffect(() => {
    // Update remainder state when combinedData length changes
    if (combinedData.length === 8) {
      setRemainder(combinedData.length - 7);
    }
  }, [combinedData]);

  console.log(user);
  console.log(data);
  console.log(selectedImage);
  console.log(openSelectedImage);
  console.log(currentImageIndex);

  const showRatingPage = () => {
    setShowRating(!showRating);
  };

  const goBack = () => {
    setShowRating(false);
  };

  const openImageModal = (imageIndex, item) => {
    setSelectedImage({ index: imageIndex, data: combinedData, item: item });
    setOpenSelectedImage(!openSelectedImage);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };

  return (
    <div className="p-8 w-full">
      {loading ? (
        <LoadingII />
      ) : showRating ? (
        <div>
          <StarRatingPL goBack={goBack} />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <Link
              href={"/dashboard/enterprise-property/propertylisting"}
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

            <Link
              href={`/dashboard/enterprise-property/propertylisting/property/${id}`}
              className="text-[14px] font-[400] text-BlueHomz"
            >
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
                      index === 0 ? "w-full flex-shrink-0" : "flex-grow"
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
                          index === 0 ? "w-full" : ""
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
            <BodyPropertyImage
              data={data}
              showRatingPage={showRatingPage}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImages;
