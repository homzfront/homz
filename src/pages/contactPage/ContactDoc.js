"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import axios from "axios";
import api from "@/utils/api";
import useBodyScroll from "@/utils/useBodyScroll";
import Loading from "@/components/mainmenu/loading";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';   

const ContactDoc = () => {
  const options = [
    { id: 1, label: "Property Management" },
    { id: 2, label: "Property Listing" },
    { id: 3, label: "Enterprise Solution" },
    { id: 4, label: "Renter Management" },
    // Add more options as needed
  ];
  const [copiedState, setCopiedState] = useState({
    copied: false,
    copiedII: false,
    copiedIII: false,
    copiedIV: false,
  });

  const [loading, setLoading] = useState(false);
  useBodyScroll([loading]);
  const handleCopyClick = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
      setTimeout(
        () =>
          setCopiedState((prevState) => ({
            ...prevState,
            [identifier]: false,
          })),
        2000
      ); // Clear the copied state after 2 seconds
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const [formData, setFormData] = useState({
    document_options: options[0].label, // Default value is the first option
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phoneNo || !message) {
      setFormError("Please fill in all fields.");
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await api.post("/enquires", {
        fullname: name,
        email,
        phoneNumber: phoneNo,
        message,
        enquireType: formData.document_options.toLocaleLowerCase(),
      });

      if (response.data.statuscode === 201) {
        console.log("Form submitted successfully:", response.data);
      
        // Clear form fields or reset form state
        setName("");
        setEmail("");
        setPhoneNo("");
        setMessage("");
        setFormData({
          document_options: options[0].label,
        });
        setFormError("");
        setLoading(false);
        toast.success("Message sent!")
      } else {
        // Handle unexpected status codes
        const errorw = response.data.message;
        console.log("Unexpected status code:", errorw);
        setFormError(errorw);
        setLoading(false);
        toast.error("Failed to send message.")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      toast.error("failed to send message")
    }
  };

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, document_options: value });
    setDropdownOpen(false);
  };

  return (
    <div className="flex w-full mt-20 justify-center">
      
     <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
 
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <div className="max-w-[420px] gap-6 pt-4 flex flex-col">
          <h1 className="text-[60px] font-[700] leading-tight text-BlackHomz">
            We'd Love to Hear From You
          </h1>
          <p className="text-[20px] mt-2 font-[400] text-GrayHomz ">
            Any questions or remarks? Just send us a message. Fill up the form
            and our team will get back to you.
          </p>
          <div className="hidden mt-8 sm:flex gap-8">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/call.png"}
                height={24}
                width={24}
                alt={`call-img`}
              />
            </div>
            <div className="flex gap-5 flex-col">
              <div className="hidden  sm:flex gap-2">
                <p className="text-[20px] font-[500] text-GrayHomz ">
                  +23481012345678
                </p>
                <div
                  onClick={() => handleCopyClick("+2348012345678", "copied")}
                  className="relative"
                >
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                  {copiedState.copied && (
                    <span className="text-[11px] text-Success italic absolute">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pl-4">
                <p className="text-[20px] font-[500] text-GrayHomz ">
                  +2349012345678
                </p>
                <div
                  onClick={() => handleCopyClick("+2349012345678", "copiedII")}
                  className="relative"
                >
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                  {copiedState.copiedII && (
                    <span className="text-[11px] text-Success italic absolute">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden mt-1 sm:flex gap-8">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image src={"/sms.png"} height={24} width={24} alt={`call-img`} />
            </div>
            <div className="hidden sm:flex gap-2">
              <p className="text-[20px] font-[500] underline text-GrayHomz ">
                info@homz.ng
              </p>
              <div
                onClick={() => handleCopyClick("info@homz.ng", "copiedIII")}
                className="relative"
              >
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
                {copiedState.copiedIII && (
                  <span className="text-[11px] text-Success italic absolute">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex mt-3 gap-5">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_insta.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_facebook.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_twitter.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_Linkedin.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="flex gap-1">
              <p className="text-[20px] font-[500] text-GrayHomz ">homz.ng</p>
              <div
                onClick={() => handleCopyClick("homz.ng", "copiedIV")}
                className="relative"
              >
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={12}
                  width={17}
                />
                {copiedState.copiedIV && (
                  <span className="text-[11px] text-Success italic absolute">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-[780px]">
            <label className="text-BlackHomz mt-4 text-[16px] font-[500] mb-1">
              What will you like to enquire about?
            </label>
            <div className="relative inline-block">
              <div
                className={`text-BlackHomz px-4 h-[45px]  border text-[16px] max-w-[780px] font-[500] mb-1 p-2 rounded cursor-pointer  ${
                  isDropdownOpen ? "border" : ""
                }`}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex justify-between  items-center">
                  <span className="mr-2">{formData.document_options}</span>
                  <svg
                    className={`w-5 h-5 ${
                      isDropdownOpen
                        ? "transform rotate-180 transition duration-300 ease-in-out"
                        : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute z-20 left-0 mt-2 w-full max-w-[780px] transition duration-1000  ease-in-out   bg-white border rounded shadow-lg">
                  {/* Dropdown Options */}
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className="cursor-pointer p-2 m-2 hover:rounded-md hover:text-white hover:bg-BlueHomz"
                      onClick={() => handleDropdownChange(option.label)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label className="text-BlackHomz mt-[60px] text-[14px] font-[500] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              className="border px-4 h-[45px] rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              className="border px-4 h-[45px] rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNo}
              className="border px-4 h-[45px] rounded-md"
              fullWidth="true"
              minLength={9} // Set the maximum length to 9 digits
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Your Message
            </label>
            <textarea
              placeholder="Your Message"
              value={message}
              className="rounded-md px-4 h-[156px] border py-2"
              onChange={(e) => setMessage(e.target.value)}
            />
            {formError && (
              <span className="text-red-500 mt-2">{formError}</span>
            )}
            <button
              type="submit"
              className="bg-BlueHomz mt-4 hover:bg-blue-400 text-white h-10 w-full rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="flex flex-col sm:hidden gap-4">
          <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
            <Image src={"/call.png"} height={24} width={24} alt={`call-img`} />
          </div>
          <div>
            <div className="flex sm:hidden gap-2">
              <p className="text-[20px] font-[500] text-GrayHomz ">
                +23481012345678
              </p>
              <div
                onClick={() => handleCopyClick("+2348012345678", "copied")}
                className="relative"
              >
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
                {copiedState.copied && (
                  <span className="text-[11px] text-Success italic absolute">
                    Copied!
                  </span>
                )}
              </div>
            </div>
            <div className="flex sm:hidden gap-2">
              <p className="text-[20px] font-[500] text-GrayHomz ">
                +2349012345678
              </p>
              <div
                onClick={() => handleCopyClick("+2349012345678", "copiedII")}
                className="relative"
              >
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
                {copiedState.copiedII && (
                  <span className="text-[11px] text-Success italic absolute">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:hidden gap-6">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image src={"/sms.png"} height={24} width={24} alt={`call-img`} />
            </div>
            <div className="flex sm:hidden gap-2">
              <p className="text-[20px] font-[500] underline text-GrayHomz ">
                info@homz.ng
              </p>
              <div
                onClick={() => handleCopyClick("info@homz.ng", "copiedIII")}
                className="relative"
              >
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
                {copiedState.copiedIII && (
                  <span className="text-[11px] text-Success italic absolute">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-3 sm:hidden gap-4">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_insta.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_facebook.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_twitter.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_Linkedin.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
          </div>
          <div className="flex">
            <p className="text-[20px] font-[500] text-GrayHomz ">homz.ng</p>
            <div
              onClick={() => handleCopyClick("homz.ng", "copiedIV")}
              className="relative"
            >
              <Image
                className="cursor-pointer"
                src={"/copy.png"}
                alt="copy-img"
                height={12}
                width={17}
              />
              {copiedState.copiedIV && (
                <span className="text-[11px] text-Success italic absolute">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDoc;
