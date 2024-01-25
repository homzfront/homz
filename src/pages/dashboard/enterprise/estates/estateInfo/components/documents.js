import React, { useRef, useState } from "react";
import Image from "next/image";
import PopUpMenuDoc from "../../components/popUpMenuDoc";
import useBodyScroll from "@/components/general/useBodyScroll";

const Data = [
  {
    id: 1,
    name: "Tenant Agreement",
    size: "156kb",
  },
  {
    id: 2,
    name: "New Document",
    size: "160kb",
  },
];

const Documents = ({ handlePageChangeThree }) => {
  const data = Data || [];
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [addNewDoc, setAddNewDoc] = useState(false);
  const [proceedToUpload, setProceedToUpload] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const fileInputRef = useRef(null);
  const [document, setDocument] = useState([]);

  console.log(document);

  const openFileInput = () => {
    setShowFileInput(true);
    // Trigger a click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
  }
  useBodyScroll([addNewDoc]);

  return (
    <div className="">
      
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
                Give a name to the new document
              </p>
              <input
                type="text"
                placeholder="E.g Tenancy Agreement"
                className="border h-[45px] w-full px-4"
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
                  console.log(e.target.files[0]);
                  setDocument(e.target.files[0]);
                  // Close the modal or perform any other actions
                 openProceed()
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
      <div className="flex gap-4">
        {data &&
          data.map((data) => (
            <div key={data.id} className="">
              <div className="h-[200px] w-[160px] border rounded-md py-5 px-2 flex flex-col justify-between">
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
            </div>
          ))}
        <div>
          <div className="h-[200px] w-[160px] border rounded-md py-5 px-2 flex flex-col">
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

      <div className="mt-[10%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default Documents;
