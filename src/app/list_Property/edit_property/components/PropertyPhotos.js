"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import pic from "/public/static/images/coverPhoto.png";
import add from "/public/static/images/add.svg";
import Link from "next/link";

const PropertyPhoto = ({
  PhotosInfo,
  handlePagePropertyPhoto,
  setUploadedCoverPhoto,
  setUploadedOtherPhotos,
}) => {
  const { coverPhoto, otherPhotos } = PhotosInfo?.Photos ?? {};
  const [update, setUpdate] = useState(false);
  const [ImageSrc, setImageSrc] = useState(pic);
  const fileUpload = useRef(null);
  const fileUpload2 = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileUploaded2, setFileUploaded2] = useState(false);

  useEffect(() => {
    setHouses(otherPhotos || []);
  }, [otherPhotos]);

  const [houses, setHouses] = useState([]);

  const deleteFile = (index) => {
    const updatedData = [...houses];
    updatedData.splice(index, 1);
    setHouses(updatedData);
  };

  const uploadCoverPhoto = () => {
    fileUpload.current.click();
  };

  const uploadFile2 = () => {
    fileUpload2.current.click();
  };

  const displayCoverPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUploaded(true);
      setUploadedCoverPhoto(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const displayHousePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUploaded2(true);
      setHouses([...houses, URL.createObjectURL(file)]);
      setUploadedOtherPhotos((uploadedOtherPhotos) => [
        ...uploadedOtherPhotos,
        file,
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mt-6">
      <main className="User_body profiles flex flex-col md:flex-row gap-[7rem] w-full">
        <div className="profiles flex gap-[2rem] md:gap-[4rem] flex-col md:flex-row">
          <div className="md:space-y-4">
            <label htmlFor="coverPhoto" className="text-[14px]">
              Cover photo
            </label>
            <br />
            <div className="md:w-[170px] md:h-[170px] w-[157px] h-[158px] rounded-[14.13px] flex items-center justify-center cursor-pointer mt-3 md:mt-0">
              <form enctype="multipart/form-data" method="put">
                <input
                  type="file"
                  name="coverPhoto"
                  ref={fileUpload}
                  id="coverPhoto"
                  onChange={displayCoverPhoto}
                  style={{ display: "none" }}
                />
                <Image
                  onClick={uploadCoverPhoto}
                  src={fileUploaded ? ImageSrc : coverPhoto}
                  alt="Cover Photo"
                  className="rounded-[14.13px]"
                  width={170}
                  height={220}
                />
              </form>
            </div>
          </div>

          <div className="md:space-y-4">
            <label htmlFor="otherPhotos" className="text-[14px]">
              Other Photos
            </label>
            <br />
            <div className="flex gap-7 flex-wrap md:w-full w-[357px]">
              <div className="flex gap-4 md:gap-7 flex-wrap mt-2 md:mt-0">
                {houses.map((house, index) => (
                  <div
                    key={index}
                    className="md:w-[170px] md:h-[170px] w-[157px] h-[158px] rounded-[14.13px] mb-8"
                  >
                    <Image
                      src={house}
                      alt="House Photo"
                      className="h-full w-full rounded-[14.13px]"
                      width={170}
                      height={170}
                    />
                    <Image
                      src={"/trush-square.png"}
                      height={24}
                      width={24}
                      className="cursor-pointer mt-2"
                      alt="Delete"
                      onClick={() => deleteFile(index)}
                    />
                  </div>
                ))}
                {houses.length < 5 && (
                  <div className="md:w-[170px] md:h-[170px] w-[157px] h-[158px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer">
                    <form enctype="multipart/form-data" method="put">
                      <input
                        type="file"
                        name="HousePic"
                        ref={fileUpload2}
                        id="uploadImage"
                        onChange={displayHousePic}
                        style={{ display: "none" }}
                      />
                      <Image
                        src={add}
                        alt="Add Photo"
                        className="w-[70.63px] h-[70.63px] rounded-[14.13px]"
                        onClick={uploadFile2}
                        width={70.63}
                        height={70.63}
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="flex  md:justify-end justify-center mt-8 ">
        <button
          className="hidden md:flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
          onClick={handlePagePropertyPhoto}
        >
          Update
        </button>
        <div className="md:hidden flex flex-col ">
          <Link
            href=""
            className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-4"
          >
            See public view
          </Link>
          {update ? (
            <button
              className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
              onClick={handlePagePropertyPhoto}
            >
              Save Update
            </button>
          ) : (
            <div
              className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
              onClick={() => setUpdate(true)}
            >
              Update
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPhoto;
