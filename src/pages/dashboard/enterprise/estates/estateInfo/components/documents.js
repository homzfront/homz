import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PopUpMenuDoc from "../../components/popUpMenuDoc";
import useBodyScroll from "@/utils/useBodyScroll";
import { toast } from "react-toastify";
import {
  deleteEstateDocSpecificUSer,
  documentUpload,
  fetchEstateDocSpecificUSer,
} from "@/api/estateService";
import useClickOutside from "@/utils/clickOutside";

const Documents = ({ id }) => {
  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [addNewDoc, setAddNewDoc] = useState(false);
  const [proceedToUpload, setProceedToUpload] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const fileInputRef = useRef(null);
  const [document, setDocument] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // Track upload status: 'success' or 'failed'
  const [fetchData, setFetchData] = useState(false);
  const [error, setError] = useState(null)
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));

  const addDocument = () => {
    setAddNewDoc(!addNewDoc);
  };

  const closeAddDocument = () => {
    setAddNewDoc(false);
    setShowFileInput(false);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  const openProceed = () => {
    setProceedToUpload(true);
  };

  const closeProceed = () => {
    setProceedToUpload(false);
  };

  useBodyScroll([addNewDoc, proceedToUpload]);

  const random = () => {
    return Math.floor(Math.random() * 100); // Returns a random integer between 0 and 99
  };

  // Function to handle file selection and append new document to the data array
  const handleFileSelect = () => {
    const newDocument = {
      id: random(), // Assigning a unique id for the new document
      name: fileName,
      size: `${(document?.size / 1024).toFixed(2)}kb`, // Calculating size in kb
    };

    if (!data) {
      setData([newDocument]);
    } else {
      setData([...data, newDocument]);
    }

    // Update data state by appending newDocument to the existing array
    setData([...data, newDocument]);
  };

  const openFileInput = () => {
    if (fileName === null) {
      setError("Give the file a name")
      return;

    }
    setShowFileInput(true);
    // Trigger a click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Function to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEstateDocSpecificUSer(id);
        setDataTwo(response?.data.data);
      } catch (error) {
        // Handle errors if the fetch fails
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id, fetchData]); // Add id and fetchData to the dependency array

  // Function to refetch data
  const fetchDataAgain = () => {
    setFetchData(prev => !prev); // Toggle the fetchData state to trigger refetch
  };

  const upload = async () => {
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!document) {
      setLoading(false);
      return;
    }

    handleFileSelect();
    setProceedToUpload(false);

    try {
      const { success, uploadedData, error } = await documentUpload(
        id,
        document,
        fileName
      );
      if (success) {
        setLoading(false);
        setUploadStatus("success");
        toast.success("Upload successful");
        setFileName(null);
        setTimeout(async () => {
          setUploadStatus(null);
          setData(null);
          fetchDataAgain();
        }, 5000);
        // Reset upload status after 5 seconds
      } else {
        toast.error(error);
        setLoading(false);
        setUploadStatus("failed");
        setTimeout(() => {
          setUploadStatus(null);
          setData(null);
        }, 5000);
      }
    } catch (error) {
      setLoading(false);
      setUploadStatus("failed");
      setTimeout(() => {
        setUploadStatus(null);
        setData(null);
      }, 5000); // Reset upload status after 5 seconds
      toast.error("Update failed");
    }
  };

  return (
    <div className="w-full px-8">
      <div className="">
        {proceedToUpload && (
          <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-[12px] h-[225px] w-[464px] py-[26px] px-[32px] flex flex-col justify-between">
              <p className=" w-full text-center text-[20px] font-[700] text-BlackHomz">
                Proceed to Add Document?
              </p>
              <div className="flex flex-col w-full gap-4">
                <button
                  onClick={upload}
                  className="h-[48px] w-full text-white bg-BlueHomz hover:bg-lightblue "
                >
                  Yes
                </button>
                <button
                  onClick={closeProceed}
                  className="h-[48px] w-full border border-BlueHomz text-BlueHomz hover:bg-inputBg  hover:border-GrayHomz6"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {addNewDoc && (
          <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-[12px] h-[326px] w-[464px] py-[22px] px-[32px] flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/estate/Featured-icon.png"
                  }
                  height={56}
                  width={56}
                  alt=""
                />
                <p className="font-[700] text-[20px] text-BlackHomz">
                  Add New Document
                </p>
              </div>
              <div>
                <p className="text-[14px] mb-1 font-500 text-BlackHomz">
                  Give a name to the new document <span className="text-red-500 text-[10px]"> {error}</span>
                </p>
                <input
                  type="text"
                  placeholder="E.g Tenancy Agreement"
                  className="border h-[45px] w-full px-4"
                  value={fileName}
                  onChange={(e) => {
                    setFileName(e.target.value)
                    setError(null)
                  }}
                />
              </div>
              <div>
                {/* Use useRef for the file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    // Handle file selection logic if needed
                    // console.log(e.target.files[0]);
                    setDocument(e.target.files[0]);
                    // Close the modal or perform any other actions
                    openProceed();
                    closeAddDocument();
                  }}
                />
                <button
                  onClick={openFileInput}
                  className="h-[48px] w-full text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                >
                  Select document
                </button>
              </div>
              <button
                onClick={closeAddDocument}
                className="h-[48px] w-full border border-BlueHomz text-BlueHomz hover:bg-BlueHomz hover:text-white hover:border-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          {dataTwo &&
            dataTwo.map((data) => (
              <div
                key={data._id}
                className={`border  rounded-md h-[210px] w-[160px] py-5 px-2 flex flex-col justify-between `}
              >
                <div>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/estate/document-text.png"
                    }
                    height={64}
                    width={64}
                    alt=""
                    className="m-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <div className="flex justify-between items-center ">
                    <p className="text-[13px] font-[500] text-BlackHomz">
                      {data?.fileName}
                    </p>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      }
                      height={21}
                      width={20}
                      alt=""
                      onClick={() => handleToggleMenu(data._id)}
                      className="cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] font-[400] text-BlueHomz">PDF</p>
                  <p className="text-[11px] font-[400] text-GrayHomz">
                    {`${(data?.fileDocument?.size / 1024).toFixed(2)}kb`}
                  </p>
                  {popUpMenuTwo && selectedDataId === data._id && (
                    <PopUpMenuDoc
                      id={id}
                      data={data}
                      fetchDataAgain={fetchDataAgain}
                      dropdownRef={dropdownRef}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="flex gap-4">
          {data &&
            data.map((data) => (
              <div
                key={data.id}
                className={`border rounded-md h-[210px] w-[160px] py-5 px-2 flex flex-col justify-between ${uploadStatus === "success"
                  ? "border-green-500"
                  : uploadStatus === "failed"
                    ? "border-red-500"
                    : ""
                  }`}
              >
                <div>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/estate/document-text.png"
                    }
                    height={64}
                    width={64}
                    alt=""
                    className="m-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <div className="flex justify-between items-center ">
                    <p className="text-[13px] font-[500] text-BlackHomz">
                      {data.name}
                    </p>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      }
                      height={21}
                      width={20}
                      alt=""
                      onClick={() => handleToggleMenu(data.id)}
                      className="cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] font-[400] text-BlueHomz">PDF</p>
                  <p className="text-[11px] font-[400] text-GrayHomz">
                    {data.size}
                  </p>
                  {popUpMenuTwo && selectedDataId === data.id && (
                    <PopUpMenuDoc data={data} />
                  )}
                </div>
              </div>
            ))}
          <div>
            <div className="mt-4 h-[210px] w-[160px] border rounded-md py-5 px-2 flex flex-col">
              <div onClick={addDocument} className="m-auto">
                <Image
                  src={"/static/dashboard/enterprisemanager/estate/add.png"}
                  height={71}
                  width={72}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-[13px] font-[500] text-BlackHomz text-center">
                  Click to add new document
                </p>
                <p className="mt-2 text-[10px] font-[400] text-GrayHomz2 text-center">
                  PDF (max. 3mb)
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* 
      <div className="mt-[10%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div> */}
    </div>
  );
};

export default Documents;
