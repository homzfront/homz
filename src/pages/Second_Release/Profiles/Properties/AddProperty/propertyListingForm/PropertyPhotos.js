"use client";
import React, { useEffect, useRef, useState } from "react";
import pic from "/public/static/images/coverPhoto.png";
import add from "/public/static/images/add.svg";
import Image from "next/image";

const PropertyPhoto = ({ data, handlePageChangeTwo, handlePageChangeFour,setUploadedImageCoverPhoto }) => {
  const [ImageSrc, setImageScr] = useState(pic);
  const [ImageSrc2, setImageScr2] = useState(add);
  const fileUpload = useRef(null);
  const fileUpload2 = useRef(null);
  const [coverPhoto, setCoverPicture] = useState(null);
  const [otherPhotos, setOtherPhotos] = useState([]);
  const [fileUploaded, setFileUpload] = useState(false);
  const [fileUploaded2, setFileUpload2] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [houses, setHouses] = useState([]);

 

  useEffect(() => {
    try {
      //   const results = await axios.get("/api/user/:id");
      setUserProfile(data.Profile);
      //   setHouses((prevHouses) => [...prevHouses, ...data.house]);
      // fetch('/your-house-data-endpoint')
      // .then(response => response.json())
      // .then(data => {
      //   // Combine initially defined houses with the fetched houses using spread operator
      //   setHouses(prevHouses => [...prevHouses, ...data]);
      //   setUserProfile(data.Profile);
      // })
      // .catch(error => {
      //   console.error('Error fetching house data:', error);
      // });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteFile = (index) => {
    const updatedData = [...houses];
    const updatedFile = [...otherPhotos]
    updatedData.splice(index, 1);
    updatedFile.splice(index, 1);
    setHouses(updatedData);
    setOtherPhotos(updatedFile);
  };
  const uploadFile = (e) => {
    fileUpload.current.click();
    // setImageScr(e.target.value);
    // console.log(ImageSrc);
  };
  const uploadFile2 = (e) => {
    fileUpload2.current.click();
    // setImageScr(e.target.value);
    // console.log(ImageSrc2);
  };

  const displayCoverPhoto = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFileUpload(true);
      setUploadedImageCoverPhoto(file)
      setImageScr(URL.createObjectURL(file));
      setCoverPicture(file);
    }
  };
  const displayHousePic = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFileUpload2(true);
      setOtherPhotos(prevPhotos => {
        if (!Array.isArray(prevPhotos)) {
          console.log('Initializing otherPhotos as an empty array');
          return [];
        }
        // Spread the previous photos and add the new file
        return [...prevPhotos, file];
      });
      setHouses([...houses, URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full mt-6">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>

        <p className="text-[13px] font-[400] text-GrayHomz2 leading-[19.5px]">
          Supported formats are .jpg and .png, and file size must not exceed 5
          MB
        </p>
      </div>
      <main className="User_body profiles flex flex-col  md:flex-row  gap-[7rem] w-full">
        <div className="profiles flex gap-[4rem]">
          <div className="space-y-4">
            <label for="CoverPhoto " className="text-[14px]">
              Cover photo
            </label>
            <br />

            <div
              className="pi-update w-[170px] h-[197.77px] p-[63.57] rounded-[14.13px] gap-[7.06px] cursor-pointer"

              // style={{ pointerEvents: edit ? "auto" : "none" }}
            >
              <form
                enctype="multipart/form-data"
                method="put"
                // action="/api/updateUser/"
              >
                <input
                  type="file"
                  name="ProfilePic"
                  // accept="image/*"
                  ref={fileUpload}
                  id="uploadImage"
                  onChange={displayCoverPhoto}
                  style={{ display: "none" }}
                />
                {fileUploaded ? (
                  <Image
                    src={
                      !fileUploaded ? `/${userProfile.profilePic}` : ImageSrc
                    }
                    alt="Cover  Photo"
                    className="w-[170px] h-[170px] rounded-[14.13px]"
                    onClick={uploadFile}
                    width={170}
                    height={170}
                  />
                ) : (
                  <Image
                    src={
                      //   userProfile.profilePic
                      //     ? `/${userProfile.profilePic}`
                      //     :
                      ImageSrc
                    }
                    alt="Cover Photo"
                    className="w-[170px] h-[170px] rounded-[14.13px]"
                    onClick={uploadFile}
                    width={170}
                    height={170}
                  />
                )}
              </form>
            </div>
          </div>

          <div className=" space-y-4">
            <label for="others" className="text-[14px]">
              Other Photos
            </label>
            <br />
            <div className="flex gap-7 flex-wrap">
              <div className=" flex gap-7 flex-wrap">
                {houses.map((house, index) => (
                  // Render each house dynamically
                  <div
                    key={index}
                    className="w-[170px] h-[170px] rounded-[14.13px]"
                  >
                    <Image
                      src={
                        //   userProfile.profilePic
                        //     ? `/${userProfile.profilePic}`
                        //     :
                        house
                      }
                      alt="Cover Photo"
                      className="w-[170px] h-[170px] rounded-[14.13px]"
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
            onClick={()=>deleteFile(index)}
          />
        )}
                  </div>
                ))}
                
                <div
                  className={` w-[170px] h-[170px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer`}
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
                      src={ImageSrc2}
                      alt="Cover Photo"
                      className="w-[70.63px] h-[70.63px] rounded-[14.13px]"
                      onClick={uploadFile2}
                      width={70.63}
                      height={70.63}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="flex justify-between mt-15">
        <div>
          <button
            onClick={handlePageChangeTwo}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div>
          
          <div className="">
            <button
              disabled={(!fileUploaded) ? true : false}
              onClick={handlePageChangeFour}
              className={`flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md ${
                (!fileUploaded)
                  ? "text-GrayHomz border bg-GrayHomz5"
                  : "text-white border bg-BlueHomz"
              }`}
            >
              Next
              <Image
                src={`${
                  (!fileUploaded)
                    ? "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                    : "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                  `}
                alt=""
                height={16}
                width={16}
              />
            </button>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default PropertyPhoto;
