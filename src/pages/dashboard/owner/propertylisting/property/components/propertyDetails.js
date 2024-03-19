"use client";
import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDownTwo";
import { toast } from "react-toastify";
import { updatePropertyDetails } from "@/api/propertyService";
import LoadingII from "@/components/mainmenu/loadingII";
import SelectState from "@/pages/selectStateAndArea/selectState";
import SelectArea from "@/pages/selectStateAndArea/selectArea";
import lowerCaseData from "@/utils/lowerCaseData";

const PropertyDetails = ({ data }) => {
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
      setSelectedArea(data?.area || "");
      setSelectedState(data?.state || "");
      setNumberOfRooms(data?.numberOfRooms || "");
      setNumberOfBathrooms(data?.numberOfBathrooms || "");
      setPropertyType(data?.propertyType || "");
      setNumberOfToilets(data?.numberOfToilets || "")
    }
  }, [data]);
  const [selectedArea, setSelectedArea] = useState(data?.area);
  const [selectedState, setSelectedState] = useState(data?.state);
  const [name, setName] = useState(data?.name);
  const [address, setAddress] = useState(data?.address);
  const [propertyType, setPropertyType] = useState(data?.propertyType);
  const [numberOfRooms, setNumberOfRooms] = useState(data?.numberOfRooms);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(data?.numberOfBathrooms);
  const [description, setDescription] = useState(data?.description);
  const [numberOfToilets, setNumberOfToilets] = useState(data?.numberOfToilets);

  console.log(name);
  console.log(address);
  console.log(description);
  console.log(selectedState?.label);
  console.log(selectedArea?.label);
  console.log(parseInt(numberOfRooms?.label));
  console.log(parseInt(numberOfBathrooms?.label));
  console.log(propertyType?.label);
  console.log(numberOfToilets?.label)

  const options = [
    { id: 1, label: "Boys Quarters" },
    { id: 2, label: "Mini-flat" },
    { id: 3, label: "Penthouse" },
    { id: 4, label: "Self contain" },
    { id: 5, label: "Studio Apartment" },
    { id: 6, label: "Block of flats" },
    { id: 7, label: "Detached Bungalow" },
    { id: 8, label: "Semi-Detached Bungalow" },
    { id: 9, label: "Terraced Bungalow" },
    { id: 10, label: "Detached Duplex" },
    { id: 11, label: "Semi-Detached Duplex" },
    { id: 12, label: "Terraced Duplex" },
  ];

  // const optionsTwo = [
  //   { id: 1, label: "Ajah" },
  //   { id: 2, label: "Lekki" },
  //   { id: 3, label: "Ikotun" },
  //   { id: 4, label: "Adolor" },
  //   { id: 5, label: "Challenge" },
  //   { id: 6, label: "Ekaite" },
  //   { id: 7, label: "Musa" },
  //   { id: 8, label: "Jalingo" },
  // ];

  // const optionsThree = [
  //   { id: 1, label: "Lagos" },
  //   { id: 2, label: "Oyo" },
  //   { id: 3, label: "Calabar" },
  //   { id: 4, label: "Edo" },
  //   { id: 5, label: "Kwara" },
  //   { id: 6, label: "Kano" },
  //   { id: 7, label: "Abuja" },
  //   { id: 8, label: "Ondo" },
  // ];

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

  const optionsSix = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  // const handleSelectArea = (option) => {
  //   // Handle the selected value as needed
  //   console.log("Selected Option:", option);
  //   setSelectedArea(option);
  // };

  // const handleSelectState = (option) => {
  //   // Handle the selected value as needed
  //   console.log("Selected Option:", option);
  //   setSelectedState(option);
  // };

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

  const  handleSelectNumberOfToilets = (option) => {
        // Handle the selected value as needed
        console.log("Selected Option:", option);
        setNumberOfToilets(option);
  }

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        name,
        address,
        description,
        state: selectedState?.label ?? selectedState,
        area: selectedArea?.label ?? selectedArea,
        numberOfRooms: parseInt(numberOfRooms?.label ?? numberOfRooms),
        numberOfBathrooms: parseInt(numberOfBathrooms?.label ?? numberOfBathrooms),
        propertyType: lowerCaseData(propertyType?.label ?? propertyType),
        numberOfToilets: parseInt(numberOfToilets?.label ?? numberOfToilets),
      };
      const { success, upDateddata, error } = await updatePropertyDetails(
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
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        console.error("Error message:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        console.error("Unexpected status code:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
      }

    }
  };


  return (
    <div className="mt-2">
      {loading ? (
        <LoadingII />
      ) : (
        <div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-between gap-4 w-[47%]">
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

                    selectOption={`${data?.propertyType === undefined
                        ? "select property type"
                        : ` ${data?.propertyType}`
                      }`}
                    className={"w-full"}
                  />
                </div>
              </div>
            </div>
            <div>
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
            <div className="">
              <Input
                label={"Street"}
                placeholder={"Enter street name"}
                type={"text"}
                span={"*"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <div className="">
                <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                  Rooms <span className="text-error">*</span>
                </div>
                <DropDown
                  options={optionsFour}
                  onSelect={handleSelectNumberOfRooms}
                  selectOption={`${data?.numberOfRooms === undefined
                      ? "Select No of Rooms"
                      : ` ${data?.numberOfRooms}`
                    }`}
                  className={"w-full"}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4  w-[47%]">
            <div>
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Bathrooms{" "}
                <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsFive}
                onSelect={handleSelectNumberOfBathrooms}
                selectOption={`${data?.numberOfBathrooms === undefined
                    ? "Select No of Bathrooms"
                    : ` ${data?.numberOfBathrooms}`
                  }`}
                className={"w-full"}
              />
            </div>
            <div>
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Toilets <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsSix}
                onSelect={handleSelectNumberOfToilets}
                // selectOption={"Total Numbers of Toilets"}
                selectOption={`${data?.numberOfToilets === undefined
                    ? "Total Numbers of Toilets"
                    : ` ${data?.numberOfToilets}`
                  }`}
                className={"w-full"}
              />
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
                className="mt-1 h-[203px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
                placeholder="Property Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

          <div className="mt-[20%] flex justify-end">
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

export default PropertyDetails;
