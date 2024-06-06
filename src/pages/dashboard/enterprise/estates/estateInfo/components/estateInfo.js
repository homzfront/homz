"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDownTwo";
import Image from "next/image";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/utils/useBodyScroll";
import api from "@/utils/api";
import { toast } from "react-toastify";
import LoadingII from "@/components/mainmenu/loadingII";
import { updateEstateInfo } from "@/api/estateService";
import SelectState from "@/pages/selectStateAndArea/selectState";
import SelectArea from "@/pages/selectStateAndArea/selectArea";

const PropertyInfo = ({ handlePageChangeTwo, data }) => {
  const [loading, setLoading] = useState(true);
  const [propertySize, setPropertySize] = useState('')
  useBodyScroll([loading]);
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setName(data.name || "");
      setAddress(data.address || "");
      setSize((`${data?.size} sq m`) || 0);
      setNumberOfHouses(data.numberOfHouses || "");
      setDescription(data.description || "");
      setLoading(false); // Set loading to false once data is available
      setSelectedArea(data?.area || "");
      setSelectedState(data?.state || "");
    }
    if (!isNaN(data?.size) && data.size !== undefined) {
      setSize(`${data.size} sq m`);
    } else {
      setSize("0 sq m");
    }    
  }, [data]);



  const [selectedArea, setSelectedArea] = useState(data?.area);
  const [selectedState, setSelectedState] = useState(data?.state);
  const [name, setName] = useState(data?.name);
  const [address, setAddress] = useState(data?.address);
  const [size, setSize] = useState();
  const [numberOfHouses, setNumberOfHouses] = useState(data?.numberOfHouses);
  const [description, setDescription] = useState(data?.description);

  const trimSpaces = (input) => {
    if (typeof input === "string") {
      return input.trim();
    }
    return input;
  };


  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        name: trimSpaces(name),
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
        setLoading(false);
        toast.success("Update successful");
      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Update failed");
    }
  };

  return (
    <div className="">
      {loading ? (
        <LoadingII />
      ) : (
        <div>
          <div className="mt-8">
            <h1 className="font-[700] text-[20px] md:text-[23px] text-BlueHomz">
              Property Information
            </h1>
            <p className="text-[15px] md:text-[18px] font-[400] text-GrayHomz">
              Kindly fill in the accurate property information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 mt-2">
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
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <SelectState selectedState={selectedState} setSelectedState={setSelectedState} placeholder={data?.state} />
                  </div>
                  <div className={`w-full ${selectedState === null ? "pointer-events-none" : ""}`}>
                    <SelectArea state={selectedState?.value} selectedArea={selectedArea} setSelectedArea={setSelectedArea} placeholder={data?.area} />
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
                  span2={"650 square meters is equivalent to 1 plot."}
                  value={size}
                  placeholder={"0 sq m"}
                  type={"text"}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label={"Total No of Houses In Property"}
                  placeholder={"0"}
                  type={"number"}
                  span={"*"}
                  value={numberOfHouses}
                  onChange={(e) => setNumberOfHouses(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
              <div>
                <label className="text-[14px] font-[500] text-BlackHomz ">
                  Property Description
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
