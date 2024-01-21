"use client";
import React, { useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDownTwo";
import useBodyScroll from "@/components/general/useBodyScroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingII from "@/components/mainmenu/loadingII";
import { updateEstateInfo } from "@/api/estateService";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const PropertyInfo = ({ handlePageChangeTwo, data }) => {
  console.log(data);
  const [loading, setLoading] = useState(false);
  useBodyScroll([loading]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
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

  console.log(data?._id);

  // Define a mutation for updating the data
  const mutation = useMutation(() => updateEstateInfo, {
    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries(["singleEstate", data?._id]);
    },
    queryClient: queryClient,
  });

  // Your updateDone function
  const updateDone = async (e) => {
    e.preventDefault();
    if (mutation.isLoading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        name,
        address,
        size: parseInt(size),
        numberOfHouses: parseInt(numberOfHouses),
        description,
        state: selectedState?.label,
        area: selectedArea?.label,
      };
      // Call the mutation to update the data
      await mutation.mutateAsync({
        estateId: data?._id,
        updatedData,
        queryClient,
      });

      setLoading(false);
      toast.success("Update successful");
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
    }
  };

  return (
    <div className="">
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
        {loading && <LoadingII />}
        <div className="mt-8">
          <h1 className="font-[700] text-[23px] text-BlueHomz">
            Estate Information
          </h1>
          <p className="text-[18px] font-[400] text-GrayHomz">
            Kindly fill in the accurate estate information
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 py-4 mt-2">
          <div className="w-[100%] flex flex-col gap-3">
            <div>
              <Input
                label={"Estate Name"}
                placeholder={"Estate Name"}
                type={"text"}
                span={"*"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-between ">
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Estate Location <span className="text-error">*</span>
              </div>
              <div className="flex justify-between ">
                <div>
                  <DropDown
                    options={options}
                    onSelect={handleSelectArea}
                    selectOption={`${data?.area}`}
                    className={"w-[230px]"}
                  />
                </div>
                <div>
                  <DropDown
                    options={optionsTwo}
                    onSelect={handleSelectState}
                    selectOption={`${data?.state}`}
                    className={"w-[230px]"}
                  />
                </div>
              </div>
            </div>
            <div>
              <Input
                label={"Estate Address"}
                placeholder={"Enter Estate Address"}
                type={"text"}
                span={"*"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Input
                label={"Estate Size"}
                value={size}
                placeholder={"0.00"}
                type={"number"}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div>
              <Input
                label={"Total No of Houses In Estate"}
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
                Estate Description <span className="text-error">*</span>
              </label>
              <p className="text-[13px] font-[400] text-GrayHomz ">
                Give short description of your estate.
              </p>
            </div>
            <textarea
              className="mt-4 h-[363px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
              placeholder="Estate Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="mt-[7%] flex justify-end ">
          <button
            onClick={updateDone}
            className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center"
          >
            Update
          </button>
        </div>
    </div>
  );
};



export default PropertyInfo;
