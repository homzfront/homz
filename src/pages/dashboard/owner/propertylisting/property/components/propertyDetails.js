"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDownTwo";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Loading from "@/components/mainmenu/loading";
import api from "@/utils/api";
import useBodyScroll from "@/components/general/useBodyScroll";

const PropertyDetails = ({ handlePageChangeTwo, data }) => {
  console.log(data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setName(data.name || "");
      setAddress(data.address || "");
      setDescription(data.description || "");
      setNumberOfBathrooms(parseInt(data.numberOfBathrooms));
      setNumberOfRooms(parseInt(data.numberOfRooms));
      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [name, setName] = useState(data?.name);
  const [address, setAddress] = useState(data?.address);
  const [propertyType, setPropertyType] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(null);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(null);
  const [description, setDescription] = useState(data?.description);


  console.log(name)
  console.log(address)
  console.log(description)
  console.log(selectedState?.label)
  console.log(selectedArea?.label)
  console.log(parseInt(numberOfRooms?.label))
  console.log(parseInt(numberOfBathrooms?.label))
  console.log(propertyType?.label)


  const options = [
    { id: 1, label: "apartment" },
    { id: 2, label: "duplex" },
    { id: 3, label: "self contain" },
    { id: 4, label: "studio room" },
  ];

  const optionsTwo = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikotun" },
    { id: 4, label: "Adolor" },
    { id: 5, label: "Challenge" },
    { id: 6, label: "Ekaite" },
    { id: 7, label: "Musa" },
    { id: 8, label: "Jalingo" },

  ];

  const optionsThree = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
    { id: 4, label: "Edo" },
    { id: 5, label: "Kwara" },
    { id: 6, label: "Kano" },
    { id: 7, label: "Abuja" },
    { id: 8, label: "Ondo" },
  ];

  const optionsFour = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  const optionsFive = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  const handleSelectArea = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedArea(option);
  };

  const handleSelectState = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedState(option);
  };

  const handleSelectPropertyType = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setPropertyType(option);
  };

  const handleSelectNumberOfRooms = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setNumberOfRooms(option);
  };

  const handleSelectNumberOfBathrooms = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setNumberOfBathrooms(option);
  };

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.patch(
        `/properties/${data._id}/property-detail`,
        {
          name,
          address,
          description,
          state: selectedState?.label,
          area: selectedArea?.label,
          numberOfRooms: parseInt(numberOfRooms?.label),
          numberOfBathrooms: parseInt(numberOfBathrooms?.label),
          propertyType: propertyType?.label,
        }
      );

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setLoading(false);
        toast.success("update successful");
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("update falied");
      setLoading(false);
      // setLoginError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  useBodyScroll([loading])

  return (
    <div className="mt-2">
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
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between gap-4">
          <div className="">
            <Input
              label={"Name"}
              placeholder={"Property Name"}
              type={"text"}
              span={"*"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Type <span className="text-error">*</span>
            </div>
            <div className="flex flex-col justify-between ">
              <div>
                <DropDown
                  options={options}
                  onSelect={handleSelectPropertyType}
                  selectOption={`${data?.propertyType}`}
                  className={"w-[460px]"}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Location <span className="text-error">*</span>
            </div>
            <div className="flex justify-between ">
              <div>
                <DropDown
                  options={optionsTwo}
                  onSelect={handleSelectArea}
                  selectOption={`${data?.area}`}
                  className={"w-[230px]"}
                />
              </div>
              <div>
                <DropDown
                  options={optionsThree}
                  onSelect={handleSelectState}
                  selectOption={`${data?.state}`}
                  className={"w-[230px]"}
                />
              </div>
            </div>
          </div>
          <div className="">
            <Input
              label={"Property Address"}
              placeholder={"Property Address"}
              type={"text"}
              span={"*"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <div className="">
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Total Number of Rooms <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsFour}
                onSelect={handleSelectNumberOfRooms}
                selectOption={`${data?.numberOfRooms}`}
                className={"w-[460px]"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Total Number of Bathrooms <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsFive}
              onSelect={handleSelectNumberOfBathrooms}
              selectOption={`${data?.numberOfBathrooms}`}
              className={"w-[460px]"}
            />
          </div>
          <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
            <div>
              <label className="text-[14px] font-[500] text-BlackHomz ">
                Estate Description <span className="text-error">*</span>
              </label>
              <p className="text-[13px] font-[400] text-GrayHomz ">
                Give short description of your estate.
              </p>
            </div>
            <textarea
              className="mt-1 h-[295px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
              placeholder="Estate Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-[20%] flex justify-end">
        <button onClick={updateDone} className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
