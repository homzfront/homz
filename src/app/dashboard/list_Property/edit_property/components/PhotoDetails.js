"use client";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import LoadingII from "@/components/mainmenu/loadingII";
import {
  updatePropertyCoverPhoto,
  updatePropertyOtherPhoto,
} from "@/api/propertyService";
import pic from "/public/static/images/coverPhoto.png";
import add from "/public/static/images/add.svg";
import Image from "next/image";
import MiniOtherPhotosFrame from "@/components/mainmenu/miniPhotoFrame";
import Link from "next/link";
import displayHousePictures from "@/utils/displayHousePictures";

const PropertyPhoto = ({
  data,
  setSaveModalIsOpen,
  setSaveUpdate,
  saveUpdate,
  setEditMode,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileUpload = useRef(null);
  const [coverPhotoFile, setCoverPicture] = useState(null);
  const [fileUploaded, setFileUpload] = useState(false);
  const [youTubeClicked, setYouTubeClicked] = useState(false);
  const [instagramClicked, setInstagramClicked] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const [errorMsg, setErrorMsg] = useState(Array(10).fill(""));
  const [coverPhotoErrorMsg, setCoverPhotoErrorMsg] = useState("");
  const [imagesFiles, setImagesFiles] = useState([]);
  const fileUploads = useRef([]);
  const [coverPhoto, setCoverPhoto] = useState(pic);
  const initialHouses = Array(10).fill(null);
  const [houses, setHouses] = useState(initialHouses);

  // Store the original data for comparison
  const originalFormData = useRef({
    photos: initialHouses.map(() => ({ url: "" })),
    coverPhoto: { url: "" },
  });

  useEffect(() => {
    if (data) {
      // Extract URLs from incoming data
      const newHouses = [...initialHouses];
      data.photos.forEach((photo, index) => {
        newHouses[index] = photo;
      });
      setHouses(newHouses);
      const newCoverPhoto = data?.coverPhoto?.url;
      setCoverPhoto(newCoverPhoto);
      // Update originalFormData with new URLs
      originalFormData.current = {
        photos: newHouses,
        coverPhoto: newCoverPhoto,
      };
    }
  }, [data]);

  useEffect(() => {
    // Compare formData URLs with originalFormData URLs
    let isCoverPhotoChanged = false;
    if (fileUploaded) {
      isCoverPhotoChanged = !_.isEqual(
        coverPhoto,
        originalFormData.current.coverPhoto.url
      );
    }
    const isFormDataChanged = !_.isEqual(
      houses,
      originalFormData.current.photos
    );
    setSaveUpdate(isCoverPhotoChanged || isFormDataChanged);
  }, [houses, coverPhoto, fileUploaded, setSaveUpdate]);

  // console.log(originalFormData.current);
  // console.log(houses);

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
        // setUploadedCoverPhoto(file);
        setCoverPhoto(URL.createObjectURL(file));
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
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      // setUploadedImage(data.coverPhoto?.url || null);

      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  // console.log(houses);
  const Submit = () => {
    setSaveModalIsOpen(true);
  };
  const onSubmit = (e) => {
    handleUpdate(e, data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    // Create an array to hold all promises
    const updatePromises = [];

    // Cover photo
    if (coverPhotoFile) {
      updatePromises.push(updatePropertyCoverPhoto(data._id, coverPhotoFile));
    }

    // Other photos
    if (uploadedImage) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage,
          data?.photos?.[0].publicId
        )
      );
    }

    if (uploadedImage2) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage2,
          data?.photos?.[1]?.publicId
        )
      );
    }

    if (uploadedImage3) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage3,
          data?.photos?.[2]?.publicId
        )
      );
    }

    if (uploadedImage4) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage4,
          data?.photos?.[3]?.publicId
        )
      );
    }

    if (uploadedImage5) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage5,
          data?.photos?.[4]?.publicId
        )
      );
    }

    try {
      // Execute all promises simultaneously
      const responses = await Promise.all(updatePromises);

      // Handle responses
      responses.forEach(({ success, updatedImage, error }, index) => {
        if (success) {
          // console.log(`Image ${index + 1} successfully updated`, updatedImage);
          toast.success(`Update ${index + 1} successful`);
        } else {
          // console.error(`Update ${index + 1} failed`, error);
          toast.error(`Update ${index + 1} failed: ${error}`);
        }
      });
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false); // Set loading to false after all updates are attempted
    }
  };
  const deleteFile = (index) => {
    const updatedData = [...houses];
    const updatedFile = [...imagesFiles];
    updatedFile.splice(index, 1);
    updatedData[index] = null;
    setHouses(updatedData);
    setImagesFiles(updatedFile);
  };
  const deleteCoverPhoto = () => {
    setCoverPhoto(add);
    setCoverPicture(null);
    setFileUpload(false);
  };
  return (
    <div className="block w-full">
      {loading ? (
        <LoadingII />
      ) : (
        <>
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
                    className={` md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer mt-2 md:mt-0 `}
                  >
                    <form
                      enctype="multipart/form-data"
                      method="put"
                      className="relative "
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
                      <>
                        <Image
                          //   onClick={uploadCoverPhoto}
                          src={coverPhoto}
                          alt="Cover  Photo"
                          className="sm:w-[120px] sm:h-[120px] w-[96px] h-[96px] rounded-[14.13px]"
                          width={120}
                          height={120}
                        />
                      </>
                      {/* {fileUploaded ? (
                      ) : (
                        <Image
                          //   onClick={uploadCoverPhoto}
                          src={data?.coverPhoto?.url || add}
                          alt="Cover Photo"
                          className={`${
                            data?.coverPhoto?.url
                              ? "sm:w-[120px] sm:h-[120px] w-[96px] h-[96px]"
                              : "w-[38px] h-[38px]"
                          } rounded-[14.13px]`}
                          width={38}
                          height={38}
                        />
                      )} */}
                      {(fileUploaded || data?.coverPhoto?.url) && (
                        <Image
                          src={"/trush-square.png"}
                          height={24}
                          width={24}
                          className="cursor-pointer mt-2 absolute z-10 bottom-[-19px] sm:bottom-[-22px]"
                          alt="img"
                          onClick={deleteCoverPhoto}
                        />
                      )}
                      <Image
                        onClick={uploadCoverPhoto}
                        src="/static/images/cameraEdit.svg"
                        alt="Cover Photo"
                        className="hidden sm:block rounded-[14.13px] absolute sm:left-[40px] sm:top-[40px] left-[30px] top-[30px] sm:opacity-0 sm:hover:opacity-100"
                        width={40}
                        height={40}
                      />
                      <Image
                        onClick={uploadCoverPhoto}
                        src="/static/images/whiteCamera.svg"
                        alt="Cover Photo"
                        className="sm:hidden rounded-[14.13px] absolute sm:left-[40px] sm:top-[40px] left-[30px] top-[30px] sm:opacity-0 sm:hover:opacity-100"
                        width={40}
                        height={40}
                      />
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
                    editMode={true}
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
                      className={` md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer flex-col photos `}
                      key={index}
                    >
                      <form
                        enctype="multipart/form-data"
                        method="put"
                        className="relative "
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
                              src={house.url || house}
                              alt="photos"
                              className="md:w-[120px] md:h-[120px] w-[96px] h-[96px] rounded-[14.13px]"
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
                            width={48}
                            height={48}
                            onClick={() => uploadFile2(index)}
                          />
                        )}
                        <Image
                          onClick={() => uploadFile2(index)}
                          src="/static/images/cameraEdit.svg"
                          alt="Cover Photo"
                          className={`rounded-[14.13px] absolute sm:left-[40px] sm:top-[40px] left-[30px] top-[30px] ${
                            house?.url || house
                              ? "opacity-0 hover:opacity-100"
                              : "hidden"
                          }`}
                          width={40}
                          height={40}
                        />
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
                  editMode={true}
                  deleteFile={deleteFile}
                />
              </div>
            </div>
          </main>
          <section className="flex flex-col gap-[24px] mt-8">
            <p className="text-[14px] md:text-[18px] font-[400] text-black leading-[13.86px] md:leading-[19.5px]">
              Video links
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
                className={`h-[45px] p-[12px] rounded-[4px] text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] ${
                  youTubeClicked
                    ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                }  `}
                type="text"
                name="youTube"
                onClick={(e) => setYouTubeClicked(true)}
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
                className={`h-[45px] p-[12px] rounded-[4px] text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] ${
                  instagramClicked
                    ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                }  `}
                type="text"
                name="Instagram"
                onClick={(e) => setInstagramClicked(true)}
              />
            </div>
          </section>
        </>
      )}
      <div className="flex md:justify-end justify-center mt-8">
        <button
          className={`hidden sm:flex border justify-center md:w-[127px] w-[100%] items-center text-[14px] font-[500] py-[8px] px-[12px] border-white ${
            saveUpdate
              ? "bg-BlueHomz text-white"
              : "bg-[#E6E6E6] text-[#D5D5D5]"
          } 
                 rounded-[4px]`}
          onClick={Submit}
          disabled={!saveUpdate}
        >
          Save Update
        </button>

        <div className="md:hidden flex flex-col w-full">
          <Link
            href={`/dashboard/list_Property/PreviewProperty/${data?._id}`}
            className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
          >
            See public view
          </Link>

          <button
            className={`flex  border justify-center w-full md:w-[77px] items-center text-[14px] font-[500] py-[8px] px-[12px]  border-white ${
              saveUpdate
                ? "bg-BlueHomz text-white"
                : "bg-[#E6E6E6] text-[#D5D5D5]"
            } 
                 rounded-[4px]`}
            onClick={Submit}
            disabled={!saveUpdate}
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyPhoto;
