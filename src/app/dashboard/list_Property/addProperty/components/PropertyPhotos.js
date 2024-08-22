"use client";
import React, { useEffect, useRef, useState } from "react";
import pic from "/public/static/images/coverPhoto.png";
import add from "/public/static/images/add.svg";
import Image from "next/image";
import MiniOtherPhotosFrame from "@/components/mainmenu/miniPhotoFrame";
import displayHousePictures from "@/utils/displayHousePictures";

// (e, index,imagesFiles,setImagesFiles,errorMsg, setErrorMsg,houses,setHouses)
const PropertyPhoto = ({
  BackToRentalsInfo,
  handlePagePropertyPhoto,
  setUploadedCoverPhoto,
  setUploadedOtherPhotos,
  setSaveToDraft,
  setVideoLinksData,
}) => {
  const [ImageSrc, setImageScr] = useState(pic);
  const fileUpload = useRef(null);
  // const fileUpload2 = useRef(null);
  const [coverPhoto, setCoverPicture] = useState(null);
  const [fileUploaded, setFileUpload] = useState(false);
  // const [fileUploaded2, setFileUpload2] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const [houses, setHouses] = useState(Array(10).fill(null));
  const [numberOfHouses, setNumberOfHouses] = useState(Array(10).fill(null));
  const [errorMsg, setErrorMsg] = useState(Array(10).fill(""));
  const [coverPhotoErrorMsg, setCoverPhotoErrorMsg] = useState("");
  const [imagesFiles, setImagesFiles] = useState([]);
  const [videoLinks, setVideoLinks] = useState({
    youtubeUrl: "",
    instagramUrl: "",
  });

  const deleteFile = (index) => {
    const updatedData = [...houses];
    const updatedFile = [...imagesFiles];
    updatedFile.splice(index, 1);
    updatedData[index] = null;
    setHouses(updatedData);
    setImagesFiles(updatedFile);
  };
  const deleteCoverPhoto = () => {
    setImageScr(null);
    setCoverPicture(null);
    setFileUpload(false);
  };
  // console.log(imagesFiles);
  const submitData = () => {
    setVideoLinksData(videoLinks);
    setUploadedOtherPhotos(imagesFiles);
    setUploadedCoverPhoto(coverPhoto);
    handlePagePropertyPhoto();
  };
  const fileUploads = useRef([]);

  const uploadCoverPhoto = (e) => {
    fileUpload.current.click();
  };

  const uploadFile2 = (index) => {
    fileUploads.current[index].click();
  };

  const displayCoverPhoto = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setCoverPhotoErrorMsg("Only, JPG, JPEG or PNG files are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit
        setCoverPhotoErrorMsg("Photo size exceeds 5MB.");
        return;
      } else {
        setCoverPhotoErrorMsg("");
        setFileUpload(true);
        setImageScr(URL.createObjectURL(file));
        setCoverPicture(file);
      }
    }
  };

  const displayHousePic = (e, index) => {
    displayHousePictures(
      e,
      index,
      imagesFiles,
      setImagesFiles,
      errorMsg,
      setErrorMsg,
      houses,
      setHouses
    );
    
  };
  // console.log(houses);
  return (
    <div className=" w-full mt-6">
      <div className="flex flex-col gap-2 md:w-full w-[100%] fields">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Media</h1>

        <p className="text-[18px] flex sm:flex-row  sm:items-center items-start flex-col gap-1 font-[400] text-[#4E4E4E] leading-[19.5px] md:text-[18px] md:leading-[27px]">
          <span>Add Photos</span>
          <span className="text-[11px] md:text-[13px] font-[400] text-GrayHomz2 leading-[13.86px] md:leading-[19.5px]">
            (Supported formats are .jpg and .png, and file size must not exceed
            5 MB)
          </span>
        </p>
      </div>
      <main className="border-b pb-7 mt-5">
        <div
          className={`flex sm:flex-row flex-col sm:flex-nowrap flex-wrap gap-[0px] md:gap-[15px] h-fit `}
        >
          <div className="md:space-y-4 h-fit  w-fit sm:mr-[32px] flex gap-[15px]">
            <div className="">
              <label
                for="CoverPhoto "
                className="text-[13px] font-[500] leading-[19.5px] mb-3"
              >
                Cover photo
              </label>
              <br />

              <div
                className={`relative md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer mt-2 md:mt-0 `}
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
                    accept="image/jpg, image/png, image/jpeg"
                  />
                  {fileUploaded ? (
                    <>
                      <Image
                        onClick={uploadCoverPhoto}
                        src={fileUploaded && ImageSrc}
                        alt="Cover  Photo"
                        className=" md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px]"
                        width={120}
                        height={120}
                      />
                      {fileUploaded && (
                        <Image
                          src={"/trush-square.png"}
                          height={24}
                          width={24}
                          className="cursor-pointer mt-2 absolute z-10 bottom-[-19px] sm:bottom-[-22px]"
                          alt="img"
                          onClick={deleteCoverPhoto}
                        />
                      )}
                    </>
                  ) : (
                    <Image
                      onClick={uploadCoverPhoto}
                      src={add}
                      alt="Cover Photo"
                      className=" rounded-[14.13px]"
                      width={38}
                      height={38}
                    />
                  )}
                </form>
              </div>
              <p className="text-[11px] text-red-600">
                {coverPhotoErrorMsg ? coverPhotoErrorMsg : ""}
              </p>
            </div>
            <div className="sm:hidden">
              <MiniOtherPhotosFrame
                houses={houses}
                add={add}
                displayHousePic={displayHousePic}
                uploadFile2={uploadFile2}
                errorMsg={errorMsg}
                fileUploads={fileUploads}
                deleteFile={deleteFile}
              />
            </div>
          </div>

          <div className="hidden sm:block w-fit  ">
            <label
              for="others"
              className="text-[13px] font-[500] leading-[19.5px]"
            >
              Other photos
            </label>
            {/* <br /> */}
            {/* // Render each house dynamically */}

            <div
              className={`h-fit sm:grid sm:grid-cols-6 flex  flex-wrap gap-[15px] sm:gap-[20px] sm:w-full w-fit mt-2 sm:mt-0`}
            >
              {houses.map((house, index) => (
                <div
                  className={`relative md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer flex-col photos `}
                  key={index}
                >
                  <form
                    enctype="multipart/form-data"
                    method="put"
                    // action="/api/updateUser/"
                  >
                    <input
                      type="file"
                      name="HousePic"
                      ref={(el) => (fileUploads.current[index] = el)}
                      id={`uploadImage${index}`}
                      onChange={(e) => displayHousePic(e, index)}
                      style={{ display: "none" }}
                      accept="image/jpg, image/png, image/jpeg"
                    />
                    {house ? (
                      <>
                        <Image
                          onClick={() => uploadFile2(index)}
                          src={house}
                          alt="photos"
                          className=" md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px]"
                          width={120}
                          height={120}
                        />
                        {house && (
                          <Image
                            src={"/trush-square.png"}
                            height={24}
                            width={24}
                            className="cursor-pointer  absolute z-10 sm:bottom-[-22px]"
                            alt="img"
                            onClick={() => deleteFile(index)}
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        src={add}
                        alt="Photo"
                        className="w-[38px] h-[38px] rounded-[14.13px]"
                        onClick={() => uploadFile2(index)}
                        width={48}
                        height={48}
                      />
                    )}
                  </form>
                  <p className="text-[11px] text-red-600 pl-3">
                    {errorMsg[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* mobile view  */}
          <div className="sm:hidden mt-[7px]">
            <MiniOtherPhotosFrame
              houses={houses}
              add={add}
              displayHousePic={displayHousePic}
              uploadFile2={uploadFile2}
              errorMsg={errorMsg}
              fileUploads={fileUploads}
              secondDisplay={true}
              deleteFile={deleteFile}
            />
          </div>
        </div>
      </main>
      <section className="flex flex-col gap-[24px] mt-8">
        <p className="text-[14px] md:text-[18px] font-[400] text-black leading-[13.86px] md:leading-[19.5px]">
          Add video links of your property
        </p>
        <div className="">
          <label
            className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
            htmlFor="youTube"
          >
            YouTube video link
          </label>
          <br />

          <input
            placeholder="Youtube.com/agent"
            className="h-[45px] p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
            type="text"
            name="youTube"
            onChange={(e) =>
              setVideoLinks({ ...videoLinks, youtubeUrl: e.target.value })
            }
          />
        </div>
        <div className="">
          <label
            className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
            htmlFor="Instagram"
          >
            Instagram link
          </label>
          <br />

          <input
            placeholder="Instagram.com/agent"
            className="h-[45px] p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
            type="text"
            name="Instagram"
            onChange={(e) =>
              setVideoLinks({ ...videoLinks, instagramUrl: e.target.value })
            }
          />
        </div>
      </section>
      <div className="flex mb-0 flex-row justify-between sm:mt-20 mt-10  md:px-0 paginate">
        <div>
          <button
            onClick={BackToRentalsInfo}
            // className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex h-[36px w-[36px] md:w-[100px] justify-center items-center"
            className="text-[14px] font-[500] md:py-[8px] md:px-[12px] rounded-[4px] md:text-BlueHomz border text-[#D5D5D5]  h-[39px] w-[45px] md:h-full md:w-full flex items-center justify-center gap-1 "
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

        <div className="flex gap-3 items-center sm:flex-row flex-col">
          <div className="flex gap-3 items-center ">
            <button
              className={`hidden sm:flex gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz`}
              onClick={() => setSaveToDraft(true)}
            >
              <Image
                src={`/static/images/blueclock.svg`}
                alt=""
                height={16}
                width={16}
              />
              <span>Save to draft</span>
            </button>
            <button
              className={`border border-BlueHomz text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz`}
              onClick={handlePagePropertyPhoto}
            >
              Skip
            </button>
            <button
              onClick={submitData}
              // disabled={fileUploaded && houses.length >= 3 ? true : false}
              disabled={!fileUploaded || houses.length < 1}
              className={`flex md:mr-14 border gap-1 justify-center  md:w-[77px]  items-center text-[14px] font-[500] py-[8px] px-[12px] ${
                !fileUploaded || houses.length < 3
                  ? "text-[#D5D5D5] bg-[#E6E6E6] border-[#A9A9A9]"
                  : "text-white border-white bg-BlueHomz"
              } rounded-[4px] `}
              type="submit"
            >
              Next
              {!fileUploaded || houses.length < 1 ? (
                <Image
                  src={"/static/images/Vector.svg"}
                  alt=""
                  height={8}
                  width={8}
                />
              ) : (
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                  }
                  alt=""
                  height={16}
                  width={16}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <button
        className={`sm:hidden flex gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz mx-auto my-5 mb-2`}
        onClick={() => setSaveToDraft(true)}
      >
        <Image
          src={`/static/images/blueclock.svg`}
          alt=""
          height={16}
          width={16}
        />
        <span>Save to draft</span>
      </button>
    </div>
  );
};

export default PropertyPhoto;
