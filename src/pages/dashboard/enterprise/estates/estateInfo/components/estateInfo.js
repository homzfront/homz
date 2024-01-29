"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDownTwo";
import Image from "next/image";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/components/general/useBodyScroll";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingII from "@/components/mainmenu/loadingII";
import { updateEstateInfo } from "@/api/estateService";

const PropertyInfo = ({ handlePageChangeTwo, data }) => {
  console.log(data);
  const [loading, setLoading] = useState(true);
  useBodyScroll([loading]);
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setName(data.name || "");
      setAddress(data.address || "");
      setSize(parseInt(data.size) || 0);
      setNumberOfHouses(data.numberOfHouses || "");
      setDescription(data.description || "");
      setLoading(false); // Set loading to false once data is available
      setSelectedArea(data?.area || "");
      setSelectedState(data?.state || "");
    }
  }, [data]);
  const [selectedArea, setSelectedArea] = useState(data?.area);
  const [selectedState, setSelectedState] = useState(data?.state);
  const [name, setName] = useState(data?.name);
  const [address, setAddress] = useState(data?.address);
  const [size, setSize] = useState(parseInt(data?.size));
  const [numberOfHouses, setNumberOfHouses] = useState(data?.numberOfHouses);
  const [description, setDescription] = useState(data?.description);

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

  const options = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikeja" },
  ];

  const optionsTwo = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
  ];

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        name,
        address,
        size: parseInt(size),
        numberOfHouses: parseInt(numberOfHouses),
        description,
        state: selectedState?.label || selectedState,
        area: selectedArea?.label || selectedArea,
      };

      const { success, upDateddata, error } = await updateEstateInfo(
        data._id,
        updatedData
      );

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
    }
  };

  return (
    <div className="">
      {
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
      }
      {loading ? (
        <LoadingII />
      ) : (
        <div>
          <div className="mt-8">
            <h1 className="font-[700] text-[23px] text-BlueHomz">
              Property Information
            </h1>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Kindly fill in the accurate property information
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 py-4 mt-2">
            <div className="w-[100%] flex flex-col gap-3">
              <div>
                <Input
                  label={"Property Name"}
                  placeholder={"Property Name"}
                  type={"text"}
                  span={"*"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-between ">
                <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                  Property Location <span className="text-error">*</span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <DropDown
                      options={options}
                      onSelect={handleSelectArea}
                      selectOption={`${
                        data?.area === undefined
                          ? "select area"
                          : ` ${data?.area}`
                      }`}
                      className={"w-[230px]"}
                    />
                  </div>
                  <div>
                    <DropDown
                      options={optionsTwo}
                      onSelect={handleSelectState}
                      selectOption={`${
                        data?.state === undefined
                          ? "select area"
                          : ` ${data?.state}`
                      }`}
                      className={"w-[230px]"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Input
                  label={"Property Address"}
                  placeholder={"Enter Property Address"}
                  type={"text"}
                  span={"*"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label={"Property Size"}
                  value={size}
                  placeholder={"0.00"}
                  type={"number"}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label={"Total No of Houses In Property"}
                  placeholder={"0"}
                  type={"number"}
                  value={numberOfHouses}
                  onChange={(e) => setNumberOfHouses(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
              <div>
                <label className="text-[14px] font-[500] text-BlackHomz ">
                  Property Description <span className="text-error">*</span>
                </label>
                <p className="text-[13px] font-[400] text-GrayHomz ">
                  Give short description of your property.
                </p>
              </div>
              <textarea
                className="mt-4 h-[363px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
                placeholder="Property Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="mt-[7%] flex justify-end">
            <button
              onClick={updateDone}
              className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
