"use client"
import React, { useState } from "react";
import Dropdown from "@/pages/dashboard/enterprise/components/dropDownFilter";
import Reset from "@/components/icons/reset";
import PluswithoutCircle from "@/components/icons/pluswithoutCircle";
import DocumentCreation from "./components/documentCreation";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import EditBlue from "@/components/icons/editBlue";
import DropDownBlue from "./components/dropDownBlue";
import DownloadConfirmModal from "./components/downloadConfirmModal";
import PreviewedData from "./components/previewedData";
import QuitNoticeData from "./components/quitNoticeData";
import ReceiptData from "./components/receiptData";
import FormSelection from "@/store/document/FormSelection";
import useTabForDocuGen from "@/store/document/useTabForDocuGen";



const App = () => {
  const { setTab } = useTabForDocuGen();
  const { DocType } = FormSelection();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const option = ["PDF", "Word"];
  const [documentCreation, setDocumentCreation] = useState(false);
  const [selectFormat, setSelectedFormat] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hover, setHover] = useState(false);
  const options = ["PDF", "Word"];
  const [showDocuments, setShowDocuments] = useState(false);


  const openDocumentCreation = () => {
    setSelectedFormat(false);
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setShowPreview(false);
    }
    setDocumentCreation(true);
  };

  const openDocumentPage = () => {
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setShowPreview(false);
      setSelectedFormat(false);
    }
    setShowDocuments(true);
  }

  return (
    <div className="overflow-y-auto h-screen scrollbar-container">
      {
        <CustomizedModal isOpen={selectFormat}>
          <DownloadConfirmModal
            header={"Download Successful"}
            body={"Your [Document Type] has successfully been downloaded to your device"}
            button={"My documents"}
            buttonTwo={"Generate New Doc"}
            returnHome={openDocumentPage}
            returnHomeTwo={openDocumentCreation}
          />
        </CustomizedModal>
      }
      {
        showPreview ?
          <div className="mx-4 px-4 py-4 my-2 bg-inputBg m-auto">
            <div className="flex items-center justify-between border-b-[1px] pb-4">
              <div className="w-[25%] flex gap-4 items-center">
                <p className="text-[18px] font-[400] text-BlackHomz">
                  Document Preview
                </p>
                <p className="text-[16px] font-[400] text-GrayHomz2">
                  Step 4/4
                </p>
              </div>
              <div>
                <div className="w-[55%] flex gap-4 items-center">
                  <button
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                      setShowPreview(false)
                      setTab("customInfo")
                    }}
                    className="px-6 flex justify-center items-center rounded-[4px] h-[48px] gap-1 font-[500] text-[14px] text-BlueHomz hover:text-white hover:bg-BlueHomz border border-BlueHomz">
                    {hover ? <EditBlue /> : <EditBlue className="#006AFF" />}
                    Edit
                  </button>
                  <DropDownBlue
                    options={options}
                    onSelect={(option) => setSelectedFormat(option)}
                    className={"text-[14px] font-[500]"}
                    show="false"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-[600px] h-[100vh] scrollbar-container overflow-hidden overflow-y-auto p-4 mb-8">
                <div className={`${DocType === "Tenancy Agreement" ? "" : "hidden"}`}>
                  <PreviewedData />
                </div>
                <div className={`${DocType === "Quit Notice" ? "" : "hidden"}`}>
                  <QuitNoticeData />
                </div>
                <div className={`${DocType === "Invoice and Receipt" ? "" : "hidden"}`}>
                  <ReceiptData />
                </div>
              </div>
            </div>
          </div>
          :
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="w-[25%] flex gap-4 items-center">
                <div className="w-[600%]">
                  <Dropdown
                    options={option}
                    onSelect={(option) => setSelectedStatus(option)}
                    selectOption={selectedStatus === null ? "Document Type" : selectedStatus}
                    className={"text-[14px] font-[500] text-GrayHomz2"}
                  />
                </div>
                <button
                  className="border w-[30%] h-[37px] p-[12px] border-BlueHomz bg-white items-center text-[14px] font-[500] flex justify-center gap-1 rounded-[4px] cursor-pointer"
                >
                  <span>
                    <Reset className="#006AFF" />
                  </span>
                  <span className="text-[14px] leading-[17.64px]  text-[500] text-BlueHomz">
                    Reset
                  </span>
                </button>
              </div>
              <div className="w-[25%]">
                <button
                  onClick={() => {
                    setDocumentCreation(!documentCreation)
                    setTab(null);
                  }}
                  className="w-full flex justify-center items-center rounded-[4px] h-[48px] gap-1 font-[500] text-[16px] text-white bg-BlueHomz">
                  <PluswithoutCircle />
                  Generate New Document
                </button>
              </div>
            </div>
            {
              showDocuments &&
              (
                <div className="flex flex-col justify-between h-auto py-4">
                  <div className="w-full">
                    <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz px-4">
                      <div className="w-[50%] md:w-[25%] ">Document Type</div>
                      <div className="w-[25%] hidden md:table-cell">Document Name</div>
                      <div className="w-[25%] hidden md:table-cell">Date Generated</div>
                      <div className="w-[25%] hidden md:table-cell">Action</div>
                    </div>
                    <div className="">
                      <div
                        className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                      >
                        <div className="hidden md:table-cell text-GrayHomz w-[25%] font-[500] text-[11px] text-start">
                          Tenancy Agreement
                        </div>
                        <div className="hidden md:table-cell text-GrayHomz w-[25%] font-[500] text-[11px] text-start">
                          [Document Name]
                        </div>
                        <div className="hidden md:table-cell text-GrayHomz w-[25%] font-[500] text-[11px] text-start">
                          [Date Generated]
                        </div>
                        <div className="hidden text-BlueHomz w-[25%] font-[500] text-[11px] text-start md:flex justify-center items-center gap-2">
                          <span className="cursor-pointer"> View</span>
                          <DropDownBlue
                            options={options}
                            onSelect={(option) => setSelectedFormat(option)}
                            className={"text-[14px] font-[500]"}
                            show="true"
                            width="w-[150px]"
                            placeholder="Download"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            {
              <CustomizedModal isOpen={documentCreation}>
                <DocumentCreation setDocumentCreation={setDocumentCreation} setShowPreview={setShowPreview} />
              </CustomizedModal>
            }
          </div>
      }
    </div>
  );
};

export default App;
