"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchEstatesMe } from "/src/api/estateService";
import { toast } from "react-toastify";
import useBodyScroll from "/src/components/general/useBodyScroll";
import Loading from "/src/components/mainmenu/loading";
import api from "/src/utils/api";

const Modal = ({setInviteTenant}) => {
  const [dropdowns, setDropdowns] = useState({
    estateOptions: false,
  });
  const [selectedOptions, setSelectedOptions] = useState({
    estate: null,
  });
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [estates, setEstates] = useState([]);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);


  useBodyScroll([loading])
  console.log(selectedOptions?.estate);
  console.log(link)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEstatesMe();
        const estate = data.data?.results?.[0].data;
        setEstates(estate);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  // console.log(estates);


  const handleDropdownClick = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleGetLink = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.post(`/enterprisePlan/generate-invitation-link`, {
        estate: selectedOptions?.estate
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setLoading(false);
        toast.success("update successful");
        setLink(response.data.data)
        setShowLinkBox(true);

      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      toast.error("update falied");
      // setLoginError(error.response?.data?.message);
      console.log(error.response?.data?.message)
    }
  }


  const handleDropdown = (option) => {
    setDropdowns((prev) => ({
      ...prev,
      estateOptions: false,
    }));
    setSelectedOptions((prev) => ({
      ...prev,
      estate: option,
    }));
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };
  const returnHome = () => {
    setInviteTenant(false);
  
  }

  {
    estates && estates.map((estate) => (
      <div key={estate._id}>
        {estate.name || "Select Estate"}
      </div>
    ))
  }

  return (
    <div className=" w-[375px] md:max-w-[591px] px-[28px] py-[36px] h-auto bg-white rounded-[12px]">
      {loading && <Loading/>}
      {copied ? (
        <div className="w-[375px] md:max-w-[464px] m-auto">
          <div className="w-[464px] px-8 flex flex-col justify-center items-center gap-5">
            <Image src={"/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"} alt="" height={48} width={48}/>
            <h1 className="text-BlackHomz font-[700] text-[20px]">
              Link Copied
            </h1>
            <button onClick={returnHome} className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]">
              Close
            </button>
          </div>
        </div>
      ) : (

        <div className="">
        <div className=" w-full">
          <h1 className="font-[700] text-[20px] text-BlackHomz">
            Invite Tenants
          </h1>
          <p className="text-[13px] pt-2 font-[400] text-GrayHomz">
            Copy and share your unique link to invite your Tenants to your
            properties.
          </p>
          <p
            className={`font-[400] pt-6 text-[13px] text-BlackHomz  ${
              showLinkBox ? "hidden" : ""
            }`}
          >
            Select the property you’re inviting your Tenant(s) to
          </p>
        </div>
        <div className="relative inline-block w-full">
          <div
            className={`text-BlackHomz px-4 border h-[48px] mt-2 mb-1 p-3 rounded-md cursor-pointer ${
              dropdowns["estateOptions"] ? "border" : ""
            }  ${showLinkBox ? "hidden" : ""}`}
            onClick={() => handleDropdownClick("estateOptions")}
          >
            <div
              className={`flex text-[14px] font-[500] text-GrayHomz2 justify-between items-center `}
            >
              <span className="mr-2">
                {selectedOptions?.estate || "Select Property"}
              </span>
              <div
                className={`w-5 h-5 ${
                  dropdowns["estateOptions"]
                    ? "transform rotate-180 transition duration-300 ease-in-out"
                    : ""
                  }`}
                  >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                  />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 mt-4  ${
              showLinkBox ? "hidden" : ""
            }`}
            >
            <p className="text-[14px] font-[400] text-GrayHomz">
              Yet to add a property?{" "}
            </p>
            <Link href={""} className="text-BlueHomz text-[14px]  font-[700]">
              Add New Property
            </Link>
          </div>
          {dropdowns["estateOptions"] && (
            <div className="absolute top-14 w-full text-GrayHomz2 text-[14px]   bg-white rounded-md shadow-md">
              {estates && estates.map((estate) => (
                <div
                  key={estate._id}
                  className="p-2  cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                  onClick={() => handleDropdown(estate.name)}
                >
                  {estate.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={handleGetLink}
            className={`mt-4 border rounded-md w-full h-[48px] py-[8px] px-4 text-white bg-BlueHomz text-[16px] font-[700] ${
              showLinkBox ? "hidden" : ""
            }`}
          >
            Get Link
          </button>
        </div>
        {showLinkBox && (
          <div className="mt-[-15px] rounded-md">
            <div className="flex border justify-between h-[48px] bg-whiteblue rounded-md p-2 items-center mb-2">
              <span className="mr-2 text-GrayHomz2 text-[14px] font-[500]">
                {link}
              </span>
              <span onClick={handleCopyClick}>
                {" "}
                <Image
                  src={"/static/dashboard/enterprisemanager/dashboard/copy.png"}
                  height={16}
                  width={16}
                  alt=""
                />
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleCopyClick}
                className="mt-4 border rounded-md w-full h-[48px] py-[8px] px-4 text-white bg-BlueHomz text-[16px] font-[700]"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    )}
    </div>
  );
};

export default Modal;
