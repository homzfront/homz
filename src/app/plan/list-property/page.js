"use client";
import api from "@/utils/api";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

const ListProperty = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [formError, setFormError] = useState(false);
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setUploadedImage(formData);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      fullName === "" ||
      phoneNumber === "" ||
      businessName === "" ||
      whatsappLink === ""
    ) {
      return setFormError("Fill in all fields");
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("businessName", businessName);
    formData.append("whatsappLink", whatsappLink);
    // formData.append("email", Cookies.get("profile")); // Using the email from the user context
    if (uploadedImage) {
      formData.append("file", uploadedImage.get("file"));
    }
    console.log(uploadedImage)
    
   // Log the contents of formData
// Log the contents of formData
console.log("FormData contents:");

formData.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});


    // Send the data to your API endpoint
    try {
      const response = await api.post(
        "/listingProperty/createAccount",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
 
      if (
        response.data.statuscode === 200 ||
        response.data.statuscode === 201
      ) {
        setSubmitConfirmationVisible(true);
        console.log("form successfully filled ", response.data);
      } else {
        setFormError(response.data.message);

      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setFormError(error.response?.data?.message);
      setFormError(error.response?.data?.error);
    }
  };

  return (
    <div className="pt-[64px] relative">
      {isSubmitConfirmationVisible && (
        <div className="absolute top-0 p-8 sm:p-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
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
        <div className="h-[29px] mt-10 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse sm:items-center p-7 justify-between">
          <p className="text-[23px] font-[700] text-BlackHomz">List Property</p>
          <Link href={"/select-plan"}>
            <Image src={"/Link.png"} height={24} alt="img" width={132} />
          </Link>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="max-w-[552px] mx-10">
                <div className="flex justify-between flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-[500] text-BlackHomz">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your business name"
                      value={businessName}
                      className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="font-[700] text-[14px] text-BlackHomz">
                      Business Logo
                    </h1>
                    <p className="font-[400] text-[14px] mt-[-12px] text-GrayHomz">
                      Upload your business logo
                    </p>
                    <div className="flex gap-2 ">
                      <div
                        className={
                          !uploadedImage
                            ? `h-[111px] bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]`
                            : `h-[111px] justify-center flex rounded-[12px] w-[111px] bg-none`
                        }
                      >
                        {uploadedImage ? (
                          <Image
                            src={URL.createObjectURL(uploadedImage.get("file"))}
                            height={100}
                            width={100}
                            className="object-cover"
                            alt="img"
                            style={{ width: "auto", height: "auto" }}
                          />
                        ) : (
                          <Image
                            src={"/uploadimage.png"}
                            height={40}
                            width={40}
                            className=""
                            alt="img"
                          />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          ref={inputRef}
                        />
                        <Image
                          src={"/add-square.png"}
                          height={24}
                          width={24}
                          className="mb-2 cursor-pointer"
                          alt="img"
                          onClick={() => inputRef.current.click()}
                        />
                        {uploadedImage && (
                          <Image
                            src={"/trush-square.png"}
                            height={24}
                            width={24}
                            className="cursor-pointer"
                            alt="img"
                            onClick={handleImageRemove}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col mb-8">
                      <span className="text-[13px] font-[400] text-GrayHomz2">
                        Supported formats are .jpg and .png
                      </span>
                      <span className="text-[11px] font-[400] text-GrayHomz2">
                        Fill size must not exceed 5 mb
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <form className="grid grid-cols-1 gap-6 px-8 sm:pr-6 sm:pl-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    WhatsApp Link
                  </label>
                  <input
                    type="text"
                    placeholder="Add WhatsApp link"
                    value={whatsappLink}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setWhatsappLink(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </form>
              {formError && (
                <span className="px-10 mt-2 text-red-500 text-[14px] font-normal">
                  {formError}
                </span>
              )}
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
