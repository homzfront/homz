import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import DropDown from "../../components/dropDownTwo";
import AcAndRejModel from "../../components/acAndRejModel";
import SelectState from "@/pages/selectStateAndArea/selectState";
import SelectArea from "@/pages/selectStateAndArea/selectArea";
import Select from 'react-select';
import useStateStore from "@/store/useStateAndAreaStore/useStateStore";
import useAreaStore from "@/store/useStateAndAreaStore/useAreaStore";

const PropertyInfo = ({
  returnToStartRegistration,
  handlePageChangeTwo,
  formData,
  handleChange,
}) => {
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showCancelDialogue ? "hidden" : "auto";
    if (showCancelDialogue) {
      window.scrollTo(0, 0);
    }
  }, [showCancelDialogue]);

  const handleShowCancelDialogue = () => {
    setShowCancelDialogue(!showCancelDialogue);
  };

  const returnHomeTwo = () => {
    setShowCancelDialogue(false);
  };

  const { data: stateData, chooseState } = useStateStore();
  const { loading, success, error, data, chooseArea } = useAreaStore();

  useEffect(() => {
    if (formData?.state?.value) {
      chooseArea(formData?.state.value);
    }
  }, [formData?.state?.value]);


  const optionsArea = data?.data?.data?.map((state) => ({
    value: state,
    label: `${state}`,
  }));

  useEffect(() => {
    chooseState();
  }, []);

  console.log(data);

  const optionsState = stateData?.map((state) => ({
    value: state,
    label: `${state}`,
  }));

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


  const optionsTwo = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];


  const optionsThree = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  const optionsFour = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  return (
    <div className="px-8 w-full">
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Property Details
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="mt-4 w-full flex justify-between items-start">
        <div className="flex flex-col justify-between gap-4 w-[47%]">
          <div className="">
            <Input
              label={"Title"}
              placeholder={"Property Title"}
              type={"text"}
              span={"*"}
              value={formData?.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Type <span className="text-error">*</span>
            </div>
            <div className="flex flex-col justify-between ">
              <div>
                <DropDown
                  options={options} // Replace with appropriate options
                  onSelect={(option) => handleChange("propertyType", option)}
                  selectOption={"Select Property Type"}
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
                <Select
                  value={formData?.state}
                  onChange={(option) => handleChange("state", option)}
                  options={optionsState}
                  placeholder="Select State..."
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      height: '45px', // Set desired height here
                      borderRadius: '6px', // Add border radius
                      backgroundColor: 'transparent', // Set background color to transparent
                      cursor: 'pointer',
                      borderColor: state.isFocused ? 'grey' : '',
                      '&:hover': {
                        borderColor: '', // Change border color on hover
                      },
                    }),
                    indicatorSeparator: (base) => ({
                      ...base,
                      backgroundColor: '', // Customize the color of the separator line
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: 'grey', // Customize the color of the dropdown indicator arrow
                    }),
                  }}
                  formatOptionLabel={(option) => <span>{option?.label}</span>}
                />

              </div>
              <div className={`w-full ${formData?.state === null ? "pointer-events-none" : ""}`}>
                <Select
                  value={formData?.area}
                  onChange={(option) => handleChange("area", option)}
                  options={optionsArea}
                  placeholder="Select Area..."
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      height: '45px', // Set desired height here
                      borderRadius: '6px', // Add border radius
                      backgroundColor: 'transparent', // Set background color to transparent
                      cursor: 'pointer',
                      borderColor: state.isFocused ? 'grey' : '',
                      '&:hover': {
                        borderColor: '', // Change border color on hover
                      },
                    }),
                    indicatorSeparator: (base) => ({
                      ...base,
                      backgroundColor: '', // Customize the color of the separator line
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: 'grey', // Customize the color of the dropdown indicator arrow
                    }),
                  }}
                  formatOptionLabel={(option) => <span>{option?.label}</span>}
                />

              </div>
            </div>
          </div>
          <div className="">
            <Input
              label={"Street"}
              placeholder={"Enter street name"}
              type={"text"}
              span={"*"}
              value={formData?.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div>
            <div className="">
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Rooms <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsTwo} // Replace with appropriate options
                onSelect={(option) => handleChange("numberOfRooms", option)}
                selectOption={"Total Numbers of Rooms"}
                className={"w-full"}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[47%]">
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Bathrooms <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsThree}
              onSelect={(option) => handleChange("numberOfBathrooms", option)}
              selectOption={"Total Numbers of Bathrooms"}
              className={"w-full"}
            />
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Toilets <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsFour}
              onSelect={(option) => handleChange("numberOfToilets", option)}
              selectOption={"Total Numbers of Toilets"}
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
              value={formData?.description}
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <button
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz"
            onClick={handleShowCancelDialogue}
          >
            Cancel
          </button>
        </div>
        {!formData?.name ||
          !formData?.area ||
          !formData?.state ||
          !formData?.address ||
          !formData?.numberOfRooms ||
          !formData?.description ||
          !formData?.numberOfBathrooms ||
          !formData?.numberOfToilets ||
          !formData?.propertyType ? (
          <div className="">
            <button
              disabled
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
            >
              Next
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={handlePageChangeTwo}
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
            >
              Next
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                alt=""
                height={16}
                width={16}
              />
            </button>
          </div>
        )}
      </div>
      {showCancelDialogue && (
        <div>
          <AcAndRejModel
            header={"Are you sure you want to cancel?"}
            button={"Yes"}
            buttonTwo={"No, take me back"}
            returnHome={returnToStartRegistration}
            returnHomeTwo={returnHomeTwo}
          />
        </div>
      )}

    </div>

  );
};

export default PropertyInfo;
