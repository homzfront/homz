"use client";
import React, { useEffect, useRef, useState } from "react";
import pic from "/public/static/images/coverPhoto.png";
import house1 from "/public/static/images/house1.png";
import house2 from "/public/static/images/house2.png";
import add from "/public/static/images/add.svg";
import Image from "next/image";

const PropertyPhoto = ({ data }) => {
  const [ImageSrc, setImageScr] = useState(pic);
  const [ImageSrc2, setImageScr2] = useState(add);
  const fileUpload = useRef(null);
  const fileUpload2 = useRef(null);
  const [imagePath, setImagePath] = useState();
  const [imagePath2, setImagePath2] = useState();
  const [fileUploaded, setFileUpload] = useState(false);
  const [fileUploaded2, setFileUpload2] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  const [houses, setHouses] = useState([house1, house2]);

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

  const handleEditBtn = (event) => {
    event.preventDefault();
    setEdit(!edit);
    // console.log('clicked');
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
      setImageScr(URL.createObjectURL(file));
      setImagePath(file);
    }
  };
  const displayHousePic = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setFileUpload2(true);
      setImageScr2(URL.createObjectURL(file));
      setImagePath2(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-36 w-full">
      <main className="User_body profiles flex flex-col  md:flex-row  gap-[7rem] w-full">
        <div className="profiles flex gap-[4rem]">
          <div className="space-y-2">
            <label for="CoverPhoto " className="">
              Cover photo
            </label>
            <br />

            <div className="pi-update w-[170px] h-[197.77px] p-[63.57] rounded-[14.13px] gap-[7.06px] cursor-pointer"
            
            style={{ pointerEvents: edit ? "auto" : "none" }}

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
                {/* <button onClick={handleSubmit} type="submit" className="pi-Image">
              Upload pic
            </button>
            <p style={{ color: "red", fontSize: "14px", marginLeft: "1.5rem" }}>
              {fileUploaded ? "" : msg}
            </p> */}
              </form>
            </div>
          </div>

          <div className=" space-y-2">
            <label for="others">Others</label>
            <br />
            <div className="flex gap-7 flex-wrap">
              <div className=" flex gap-7">
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
                  </div>
                ))}
              </div>
              <div className={`${!edit && 'hidden'} w-[170px] h-[170px] rounded-[14.13px] bg-[#EEF5FF] flex items-center justify-center cursor-pointer`}>
                <form
                  enctype="multipart/form-data"
                  method="put"
                  // action="/api/updateUser/"
                >
                  <input
                    type="file"
                    name="HousePic"
                    // accept="image/*"
                    ref={fileUpload2}
                    id="uploadImage"
                    onChange={displayHousePic}
                    style={{ display: "none" }}
                  />
                  {fileUploaded2 ? (
                    <Image
                      src={
                        !fileUploaded2
                          ? `/${userProfile.profilePic}`
                          : ImageSrc2
                      }
                      alt="Cover  Photo"
                      className="w-[170px] h-[170px] rounded-[14.13px]"
                      onClick={uploadFile2}
                      width={170}
                      height={170}
                    />
                  ) : (
                    <Image
                      src={
                        //   userProfile.profilePic
                        //     ? `/${userProfile.profilePic}`
                        //     :
                        ImageSrc2
                      }
                      alt="Cover Photo"
                      className="w-[70.63px] h-[70.63px] rounded-[14.13px]"
                      onClick={uploadFile2}
                      width={70.63}
                      height={70.63}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button
        className={`${
          edit ? "hidden" : "block"
        }  editBtn md:w-[83px] h-[40px] bg-BlueHomz text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Update
      </button>
      <button
        className={`${
          !edit ? "hidden" : "block"
        }  editBtn md:w-[120px] h-[40px]   bg-BlueHomz text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Save Update
      </button>
    </div>
  );
};

export default PropertyPhoto;
