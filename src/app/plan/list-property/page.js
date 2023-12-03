"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListProperty = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  const imageAdd = [
    {
      image: "/add-square (1).png",
    },
    {
      image: "/add-square (1).png",
    },
    {
      image: "/add-square (1).png",
    },
    {
      image: "/add-square (1).png",
    },
    {
      image: "/add-square (1).png",
    },
  ];
  const options = [
    // { id: 1, label: "Property Management" },
    // { id: 2, label: "Property Listing" },
    // { id: 3, label: "Enterprise Solution" },
    // { id: 4, label: "Renter Management" },
    // Add more options as needed
  ];

  const [formData, setFormData] = useState({
    document_options: "Select your preferred estate", // Default value is the first option
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);

  async function handleSubmit(e) {
    // Show the confirmation box
    setSubmitConfirmationVisible(true);
  }

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, document_options: value });
    setDropdownOpen(false);
  };
  return (
    <div className="pt-[64px] relative">
      {isSubmitConfirmationVisible && (
        <div className="absolute p-8 sm:p-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <Image
              className="m-auto my-2"
              src={"/Featured icon.png"}
              height={48}
              width={48}
              alt="img"
            />
            <p className="text-center text-[24px] font-[700] text-BlackHomz mb-4">
              Account Created
            </p>
            <p className="text-center text-[14px] sm:text-[16px] text-BlackHomz mb-8">
              Your account has been successfully created.
            </p>
            <Link href="/dashboard">
              <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-[1156px] m-auto flex flex-col gap-[80px]">
        <div className="h-[29px]  mt-10 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse  sm:items-center p-7 justify-between">
          <p className="text-[23px] font-[700] text-BlackHomz">List Property</p>
          <Link href={"/select-plan"}>
            <Image src={"/Link.png"} height={24} alt="img" width={132} />
          </Link>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <form className="grid grid-cols-1 gap-6 px-8 sm:pr-6 sm:pl-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your business name"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="md:hidden ">
                  <div>
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Business Logo
                    </h1>
                    <p className="font-[400] text-[14px] text-GrayHomz">
                      Upload your business logo
                    </p>
                    <div className="flex gap-2 mt-4 mb-6">
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/add-square (1).png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div className="flex flex-col mt-[70px]">
                        <span className="text-[13px] font-[400] text-GrayHomz2">
                          Supported formats are .jpg and .png
                        </span>
                        <span className="text-[11px] font-[400] text-GrayHomz2">
                          Fill size must not exceed 5 mb
                        </span>
                      </div>
                    </div>
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Property Photos
                    </h1>
                    <p className="font-[400] text-[14px]  text-GrayHomz">
                      Upload property photos
                    </p>
                    <Slider {...settings}>
                      {imageAdd.map((image, index) => (
                        <div className="grid " key={index}>
                          <div className="mt-4 h-[111px] cursor-pointer bg-blue-100 justify-around items-center flex rounded-[8px] w-[111px]">
                            <Image
                              src={image.image}
                              height={40}
                              width={40}
                              className=""
                              alt="img"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                    <div className="mt-6 flex flex-col">
                      <span className="text-[13px] font-[400] text-GrayHomz2">
                        Supported formats are .jpg and .png
                      </span>
                      <span className="text-[11px] font-[400] text-GrayHomz2">
                        Fill size must not exceed 5 mb
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your house address"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    WhatsApp Link
                  </label>
                  <input
                    type="text"
                    placeholder="Add WhatsApp link"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={name}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </form>
              <div className="md:inline hidden max-w-[552px] mx-10">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Business Logo
                    </h1>
                    <p className="font-[400] text-[14px] mt-[-12px] text-GrayHomz">
                      Upload your business logo
                    </p>
                    <div className="flex gap-2 ">
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/uploadimage.png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div>
                        <Image
                          src={"/add-square.png"}
                          height={24}
                          width={24}
                          className="mb-2 cursor-pointer"
                          alt="img"
                        />
                        <Image
                          src={"/trush-square.png"}
                          height={24}
                          width={24}
                          className="cursor-pointer"
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-[400] text-GrayHomz2">
                        Supported formats are .jpg and .png
                      </span>
                      <span className="text-[11px] font-[400] text-GrayHomz2">
                        Fill size must not exceed 5 mb
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Cover Image
                    </h1>
                    <p className="font-[400] text-[14px] mt-[-12px] text-GrayHomz">
                      Upload your cover image
                    </p>
                    <div className="flex gap-2 ">
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/uploadimage.png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div>
                        <Image
                          src={"/add-square.png"}
                          height={24}
                          width={24}
                          className="mb-2 cursor-pointer"
                          alt="img"
                        />
                        <Image
                          src={"/trush-square.png"}
                          height={24}
                          width={24}
                          className="cursor-pointer"
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-[400] text-GrayHomz2">
                        Supported formats are .jpg and .png
                      </span>
                      <span className="text-[11px] font-[400] text-GrayHomz2">
                        Fill size must not exceed 5 mb
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around mt-10">
                  <div>
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Property Photos
                    </h1>
                    <p className="font-[400] text-[14px]  text-GrayHomz">
                      Upload property photos
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="ListProperty">
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/uploadimage.png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/add-square (1).png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                          <Image
                            src={"/add-square (1).png"}
                            height={40}
                            width={40}
                            alt="img"
                            className=""
                          />
                        </div>
                        <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                          <Image
                            src={"/add-square (1).png"}
                            height={40}
                            width={40}
                            className=""
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/add-square (1).png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div className="h-[111px] cursor-pointer bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]">
                        <Image
                          src={"/add-square (1).png"}
                          height={40}
                          width={40}
                          className=""
                          alt="img"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-[400] text-GrayHomz2">
                          Supported formats are .jpg and .png
                        </span>
                        <span className="text-[11px] font-[400] text-GrayHomz2">
                          Fill size must not exceed 5 mb{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] mt-16 p-6">
              <Link href={""} className="max-w-[1156px] mt-[40px] m-auto">
                <button
                  onClick={handleSubmit}
                  className="w-full ml-1 rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz"
                >
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
