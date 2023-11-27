"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ], // remove formatting button
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const ContactDoc = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {}

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, document_options: value });
    setDropdownOpen(false);
  };
  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1200px] w-full">
        <div className="max-w-[420px] gap-6 justify-center flex flex-col">
          <h1 className="text-[60px] font-[700] leading-tight text-BlackHomz">
            We'd Love to Hear From You
          </h1>
          <p className="text-[20px] font-[400] text-GrayHomz ">
            Any questions or remarks? Just send us a message. Fill up the form
            and our team will get back to you.
          </p>
          <div className="hidden mt-5 sm:flex gap-4">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/call.png"}
                height={24}
                width={24}
                alt={`call-img`}
              />
            </div>
            <div>
              <div className="hidden  sm:flex gap-2">
                <p className="text-[20px] font-[500] text-GrayHomz ">
                  +23481012345678
                </p>
                <div>
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <p className="text-[20px] font-[500] text-GrayHomz ">
                  +2349012345678
                </p>
                <div>
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden mt-1 sm:flex gap-6">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image src={"/sms.png"} height={24} width={24} alt={`call-img`} />
            </div>
            <div className="hidden sm:flex gap-2">
              <p className="text-[20px] font-[500] underline text-GrayHomz ">
                info@homz.ng
              </p>
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
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
            <div>
              <Image
                className="cursor-pointer"
                src={"/copy.png"}
                alt="copy-img"
                height={12}
                width={17}
              />
            </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-[780px]">
            <label className="text-BlackHomz mt-4 text-[16px] font-[500] mb-1">
              What will you like to enquire about?
            </label>
            <select
              value={name}
              className="border px-4 h-[45px] rounded-md mb-4"
              onChange={(e) => setName(e.target.value)}
            >
              <option value="Property Management">Property Management</option>
              <option value="Property Listing">Property Listing</option>
              <option value="Enterprise Solution">Enterprise Solution</option>
              <option value="Renter Management">Renter Management</option>
            </select>
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
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
            <div className="ml-[-19px]">
              <PhoneInput
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                className="px-5 mr-[-10px] rounded-md"
                fullWidth="true"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <label className="text-BlackHomz mt-4 text-[14px] font-[500] mb-1">
              Your Message
            </label>
            <ReactQuill
              placeholder="Your Message"
              value={message}
              className="rounded-md h-[156px] border text-[18px] "
              onChange={(e) => setMessage(e.target.value)}
              theme="bubble"
              modules={modules}
              formats={formats}
            />
            <button className="bg-BlueHomz mt-4 hover:bg-blue-400 text-white h-10 w-full rounded-md">
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
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
              </div>
            </div>
            <div className="flex sm:hidden gap-2">
              <p className="text-[20px] font-[500] text-GrayHomz ">
                +2349012345678
              </p>
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
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
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
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
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={12}
                  width={17}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDoc;
