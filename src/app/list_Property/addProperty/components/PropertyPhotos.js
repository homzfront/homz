"use client";
import React, { useEffect, useRef, useState } from "react";
import pic from "/public/static/images/coverPhoto.png";
import add from "/public/static/images/add.svg";
import Image from "next/image";

const PropertyPhoto = ({
  BackToRentalsInfo,
  handlePagePropertyPhoto,
  setUploadedCoverPhoto,
  setUploadedOtherPhotos,
}) => {
  const [ImageSrc, setImageScr] = useState(pic);
  const fileUpload = useRef(null);
  const fileUpload2 = useRef(null);
  const [coverPhoto, setCoverPicture] = useState(null);
  const [otherPhotos, setOtherPhotos] = useState([]);
  const [fileUploaded, setFileUpload] = useState(false);
  const [fileUploaded2, setFileUpload2] = useState(false);

  const [houses, setHouses] = useState([]);

  const deleteFile = (index) => {
    const updatedData = [...houses];
    const updatedFile = [...otherPhotos];
    updatedData.splice(index, 1);
    updatedFile.splice(index, 1);
    setHouses(updatedData);
    setOtherPhotos(updatedFile);
  };
  const uploadCoverPhoto = (e) => {
    fileUpload.current.click();
  };
  const uploadFile2 = (e) => {
    fileUpload2.current.click();
  };

  const displayCoverPhoto = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFileUpload(true);
      setUploadedCoverPhoto(file);
      setImageScr(URL.createObjectURL(file));
      setCoverPicture(file);
    }
  };
  const displayHousePic = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFileUpload2(true);
      setOtherPhotos((prevPhotos) => {
        if (!Array.isArray(prevPhotos)) {
          console.log("Initializing otherPhotos as an empty array");
          return [];
        }
        // Spread the previous photos and add the new file
        return [...prevPhotos, file];
      });
      setHouses([...houses, URL.createObjectURL(file)]);
      setUploadedOtherPhotos((uploadedOtherPhotos) => [
        ...uploadedOtherPhotos,
        file,
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mt-6">
      <div className="flex flex-col gap-2 md:w-full w-[334px]">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>

        <p className="text-[13px] font-[400] text-[#4E4E4E] leading-[19.5px] md:text-[18px] md:leading-[27px]">
          Add the cover photo and at least one (3) other photos of your property
        </p>
        <p className="text-[11px] md:text-[13px] font-[400] text-GrayHomz2 leading-[13.86px] md:leading-[19.5px]">
          Supported formats are .jpg and .png, and file size must not exceed 5
          MB
        </p>
      </div>
      <main className="User_body profiles flex flex-col  md:flex-row  gap-[7rem] w-full">
        <div className="profiles flex gap-[2rem] md:gap-[4rem] flex-col md:flex-row">
          <div className="md:space-y-4">
            <label for="CoverPhoto " className="text-[14px]">
              Cover photo
            </label>
            <br />

            <div
              className={` md:w-[170px] md:h-[170px] w-[157px] h-[158px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer mt-3 md:mt-0`}
            >
              <form
                enctype="multipart/form-data"
                method="put"
                // action="/api/updateUser/"
              >
                <input
                  type="file"
                  name="coverPhoto"
                  // accept="image/*"
                  ref={fileUpload}
                  id="coverPhoto"
                  onChange={displayCoverPhoto}
                  style={{ display: "none" }}
                />
                {fileUploaded ? (
                  <Image
                    onClick={uploadCoverPhoto}
                    src={fileUploaded && ImageSrc}
                    alt="Cover  Photo"
                    className="md:w-[170px] md:h-[170px] w-[157px] h-[158px] rounded-[14.13px]"
                    width={170}
                    height={170}
                  />
                ) : (
                  <Image
                    onClick={uploadCoverPhoto}
                    src={add}
                    alt="Cover Photo"
                    className=" rounded-[14.13px]"
                    width={70.63}
                    height={70.63}
                  />
                )}
              </form>
            </div>
          </div>

          <div className=" md:space-y-4">
            <label for="others" className="text-[14px]">
              Other Photos
            </label>
            <br />
            <div className="flex gap-7 flex-wrap md:w-full w-[357px]">
              <div className=" flex gap-4 md:gap-7 flex-wrap mt-2 md:mt-0">
                {houses.map((house, index) => (
                  // Render each house dynamically
                  <div
                    key={index}
                    className="md:w-[170px] md:h-[170px]  w-[157px] h-[158px] rounded-[14.13px] mb-8"
                  >
                    <Image
                      src={house}
                      alt="Cover Photo"
                      className="md:w-[170px] md:h-[170px] h-full w-full rounded-[14.13px]"
                      width={170}
                      height={170}
                    />
                    {fileUploaded2 && (
                      <Image
                        src={"/trush-square.png"}
                        height={24}
                        width={24}
                        className="cursor-pointer mt-2"
                        alt="img"
                        onClick={() => deleteFile(index)}
                      />
                    )}
                  </div>
                ))}
                {houses.length === 5 ? null : (
                  <div
                    className={` md:w-[170px] md:h-[170px]  w-[157px] h-[158px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer`}
                  >
                    <form
                      enctype="multipart/form-data"
                      method="put"
                      // action="/api/updateUser/"
                    >
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
                        alt="Cover Photo"
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

      <div className="flex justify-between mt-20 px-3 md:px-0">
        <div>
          <button
            onClick={BackToRentalsInfo}
            // className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex h-[36px w-[36px] md:w-[100px] justify-center items-center"
            className="text-[14px] font-[500] md:py-[8px] md:px-[12px]  rounded-[4px] md:text-BlueHomz adminBorders text-[#D5D5D5]  h-[36px] w-[36px] md:h-full md:w-full flex items-center justify-center gap-1 "
          >
            <Image
              src="/static/images/blue-arrow-left.svg"
              width={20}
              height={20}
              alt=""
              className="hidden md:block"
            />
            <Image
              src="/static/images/black-arrow-left.svg"
              width={22}
              height={22}
              alt=""
              className="md:hidden"
            />

            <span className="hidden md:block">Previous</span>
          </button>
        </div>

        <div className="">
          <button
            disabled={!fileUploaded && houses.length < 3}
            onClick={handlePagePropertyPhoto}
            className={`flex h-[36px] w-[36px] md:h-full md:w-[100px] justify-center items-center text-[14px] font-[500] md:p-2 rounded-md ${
              fileUploaded && houses.length >= 3
                ? "md:bg-BlueHomz text-white proBorders"
                : "bg-GrayHomz5 text-GrayHomz proBorders"
            }`}
          >
            <span className="hidden md:block">Next</span>

            <Image
              src={`/static/dashboard/enterprisemanager/dashboard/arrow-right${
                fileUploaded && houses.length >= 3 ? "-white" : ""
              }.png`}
              alt=""
              height={16}
              width={16}
              className="hidden md:block"
            />

            <Image
              src={
                fileUploaded && houses.length >= 3
                  ? "/static/images/right-arrow-Icon.svg"
                  : "/static/images/faded-right-arrow.svg"
              }
              width={16}
              height={16}
              alt=""
              className="md:hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPhoto;
