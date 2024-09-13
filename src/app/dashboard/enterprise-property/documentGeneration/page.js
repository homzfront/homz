"use client"
import React, { useEffect, useRef, useState } from "react";
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
import AddBigBlue from "@/components/icons/addBigBlue";
import Image from "next/image";
import FilterMobile from "./components/filterMobile";
import PopUp from "./components/popUp";
import { useReactToPrint } from "react-to-print";
import html2pdf from 'html2pdf.js';
import { pdf } from 'pdfjs';
import useQuickNoticeFormStore from "@/store/document/useQuickNoticeFormStore";
import useReceiptFormStore from "@/store/document/useReceiptFormStore";
import useAgreementFormStore from "@/store/document/useAgreementFormStore";
import DateDotNowInHomz from "@/utils/dateDotNowInHomz";



const App = () => {
  const { setTab } = useTabForDocuGen();
  const { DocType, FormName, setDocType, setFormName } = FormSelection();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { formData, setFormData, mergeFormData } = useAgreementFormStore();
  const { formData: receiptData, setFormData: setReceiptData, mergeFormData: mergeReceiptData } = useReceiptFormStore();
  const { formData: quitNoticeData, setFormData: setQuitNoticeData, mergeFormData: mergeQuitNoticeData } = useQuickNoticeFormStore();
  const option = ["PDF", "Word"];
  const [documentCreation, setDocumentCreation] = useState(false);
  const [selectFormat, setSelectedFormat] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hover, setHover] = useState(false);
  const options = ["PDF", "Word"];
  const options2 = ["Tenancy Agreement", "Receipt", "Quit Notice"];
  const [showDocuments, setShowDocuments] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  const printableRefTenancy = useRef(null);
  const printableRefQuitNotice = useRef(null);
  const printableRefReceipt = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  const [dataState, setDataState] = useState([]);

  const openDocumentCreation = () => {
    setSelectedFormat(false);
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setShowPreview(false);
    }
    setDocumentCreation(true);
    setTab(null);
  };

  const openDocumentPage = () => {
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setSelectedFormat(false);
      setShowPreview(false);
    }
    setShowDocuments(true);
  };

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  };

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  };

  const handleToggleMenuClick = () => {
    setPopUpMenuVisible(!popUpMenuVisible);
  };

  // Save the state to localStorage with a 2-hour expiration
  const saveToLocalStorage = (data) => {
    const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in ms
    localStorage.setItem('myData', JSON.stringify(data));
    localStorage.setItem('expiryTime', expiryTime);
  };

  // Load from localStorage on mount if not expired
  useEffect(() => {
    const savedData = localStorage.getItem('myData');
    const expiryTime = localStorage.getItem('expiryTime');

    if (savedData && expiryTime && new Date().getTime() < Number(expiryTime)) {
      setDataState(JSON.parse(savedData));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => {
      if (DocType === "Tenancy Agreement") return printableRefTenancy.current;
      if (DocType === "Quit Notice") return printableRefQuitNotice.current;
      if (DocType === "Invoice and Receipt") return printableRefReceipt.current;
    },
    documentTitle: `${DocType}`,
    onAfterPrint: () => console.log(`${DocType} printed.`),
  });

  const handleGeneratePdf = async () => {

    // handlePrint()
    let element;

    switch (DocType) {
      case "Tenancy Agreement":
        element = printableRefTenancy.current;
        break;
      case "Quit Notice":
        element = printableRefQuitNotice.current;
        break;
      case "Invoice and Receipt":
        element = printableRefReceipt.current;
        break;
      default:
        return;
    }

    if (!element) return;

    const html = element.innerHTML;

    // Generate the PDF using html2pdf.js
    const pdfOpts = {
      margin: 1,
      filename: `${FormName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    await html2pdf().from(html).set(pdfOpts).save();

    // Generate PDF and get the blob
    const pdfBlob = await html2pdf().from(html).set(pdfOpts).outputPdf('blob');

    // Create a Blob URL for downloading the PDF
    const downloadUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${FormName}.pdf`;

    // Automatically trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);

    // Store the generated PDF in state
    setPdfData(pdfBlob);

    if (formData?.tenantName && formData?.tenantName !== "") {
      const updatedFormData = {
        ...formData,
        DocType,
        FormName,
        Date: DateDotNowInHomz(),
        pdf: pdfOpts
      };


      setDataState((prevState) => {
        const updatedState = prevState.map((item) =>
          item.id === formData.id ? updatedFormData : item
        );
  
        // If the id doesn't exist, add the new formData
        if (!updatedState.some(item => item.id === updatedFormData.id)) {
          updatedState.push(updatedFormData);
        }
  
        saveToLocalStorage(updatedState);
        return updatedState;
      });
  
      // Update dataState with the new formData
      setDataState((prevState) => {
        const updatedState = [...prevState, updatedFormData];
        saveToLocalStorage(updatedState);  // Save to localStorage
        return updatedState;
      });
    }

    if (receiptData?.tenantName && receiptData?.tenantName !== "") {
      const updatedFormData = {
        ...receiptData,
        DocType,
        FormName,
        Date: DateDotNowInHomz(),
        pdf: pdfOpts
        
      };

      // Update dataState with the new formData
      setDataState((prevState) => {
        const updatedState = [...prevState, updatedFormData];
        saveToLocalStorage(updatedState);  // Save to localStorage
        return updatedState;
      });
    }

    if (quitNoticeData?.tenantName && quitNoticeData?.tenantName !== "") {
      const updatedFormData = {
        ...quitNoticeData,
        DocType,
        FormName,
        Date: DateDotNowInHomz(),
        pdf: pdfOpts
      };

      // Update dataState with the new formData
      setDataState((prevState) => {
        const updatedState = [...prevState, updatedFormData];
        saveToLocalStorage(updatedState);  // Save to localStorage
        return updatedState;
      });
    }
  };

  console.log(pdfData);
  console.log(dataState);
  console.log(formData);
  console.log(showDocuments);

  const handleRemoveData = (index) => {
    setDataState((prevState) => {
      const updatedState = prevState.filter((_, i) => i !== index);
      saveToLocalStorage(updatedState);
      return updatedState;
    });
  };


  const openPreview = (data) => {
    setDocType(data.DocType);
    setFormName(data.FormName)
    if (data.DocType === "Tenancy Agreement") {
      mergeFormData(data)
    }
    if (data.DocType === "Invoice and Receipt") {
      mergeReceiptData(data)
    }
    if (data.DocType === "Quit Notice") {
      mergeQuitNoticeData(data)
    }
    setShowPreview(true)
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
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between border-b-[1px] pb-4">
              <div className="md:w-[25%] flex gap-4 items-center">
                <p className="text-[18px] font-[400] text-BlackHomz">
                  Document Preview
                </p>
                <p className="text-[16px] font-[400] text-GrayHomz2">
                  Step 4/4
                </p>
              </div>
              <div>
                <div className="md:w-[55%] flex gap-4 items-center">
                  <button
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => {
                      setShowPreview(false)
                      setTab("customInfo")
                      setDocumentCreation(true)
                    }}
                    className="px-6 flex justify-center items-center rounded-[4px] h-[48px] gap-1 font-[500] text-[14px] text-BlueHomz hover:text-white hover:bg-BlueHomz border border-BlueHomz">
                    {hover ? <EditBlue /> : <EditBlue className="#006AFF" />}
                    Edit
                  </button>
                  <DropDownBlue
                    options={options}
                    onSelect={(option) => setSelectedFormat(option)}
                    className={"text-[14px] font-[500]"}
                    width={"w-[190px] md:w-[240px]"}
                    show="false"
                    handlePrint={handleGeneratePdf}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-[600px] h-[100vh] scrollbar-container overflow-hidden overflow-y-auto p-4 mb-8">
                <div className={`${DocType === "Tenancy Agreement" ? "" : "hidden"}`}>
                  <PreviewedData printableRef={printableRefTenancy} />
                </div>
                <div className={`${DocType === "Quit Notice" ? "" : "hidden"}`}>
                  <QuitNoticeData printableRef={printableRefQuitNotice} />
                </div>
                <div className={`${DocType === "Invoice and Receipt" ? "" : "hidden"}`}>
                  <ReceiptData printableRef={printableRefReceipt} />
                </div>
              </div>
            </div>
          </div>
          :
          <div className="p-8">
            <div className="hidden md:flex items-center justify-between">
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
                  className="border w-[30%] h-[42px] p-[12px] border-BlueHomz bg-white items-center text-[14px] font-[500] flex justify-center gap-1 rounded-[4px] cursor-pointer"
                >
                  <span>
                    <Reset className="#006AFF" />
                  </span>
                  <span className="text-[14px] leading-[17.64px]  text-[500] text-BlueHomz">
                    Reset
                  </span>
                </button>
              </div>
              <div className="w-[28%]">
                <button
                  onClick={() => {
                    setDocumentCreation(!documentCreation)
                    setTab(null);
                  }}
                  className="w-full flex px-4 justify-center items-center rounded-[4px] h-[48px] gap-1 font-[500] text-[16px] text-white bg-BlueHomz">
                  <PluswithoutCircle />
                  Generate New Document
                </button>
              </div>
            </div>
            <div className="md:hidden flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <p>
                  Document Generation
                </p>
                <div
                  onClick={() => {
                    setDocumentCreation(!documentCreation)
                    setTab(null);
                  }}
                >
                  <AddBigBlue />
                </div>
              </div>
              <div className="mt-4 flex justify-between md:hidden w-full">
                <div className="relative w-[86%] rounded-[4px]">
                  <input
                    type="text"
                    className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                  />
                  <Image
                    src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                    alt=""
                    className="absolute top-3 left-3"
                    height={16}
                    width={16}
                  />
                </div>
                <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
                  <button
                    onClick={openMobileFilterModal}
                  >
                    <Image
                      src="/static/images/filter.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
              <CustomizedModal isOpen={filterModal}>
                <FilterMobile
                  // reset={clear}
                  closeMobileModal={closeMobileFilterModal}
                  selectedStatus={documentType}
                  setSelectedStatus={setDocumentType}
                  options={options2}
                  defaultName={"Document Type"}
                />
              </CustomizedModal>
            </div>
            {
               dataState &&
              (
                <div className="flex flex-col justify-between h-auto py-4">
                  <div className="w-full">
                    <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz px-4">
                      <div className="w-[45%] md:w-[25%]">Document Type</div>
                      <div className="w-[45%] md:w-[25%]">Document Name</div>
                      <div className="w-[25%] hidden md:table-cell">Date Generated</div>
                      <div className="w-[25%] hidden md:table-cell">Action</div>
                      <div className="w-[10px] md:hidden"></div>
                    </div>
                    <div>
                      {dataState.map((item, index) => (
                        <div
                          key={index}
                          className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                        >
                          <div className="text-GrayHomz w-[45%] md:w-[25%] font-[500] text-[11px] text-start">
                            {item.DocType}
                          </div>
                          <div className="text-GrayHomz w-[45%] md:w-[25%] font-[500] text-[11px] text-start">
                            {item.FormName}
                          </div>
                          <div className="hidden md:table-cell text-GrayHomz w-[25%] font-[500] text-[11px] text-start">
                            {item.Date}
                          </div>
                          <div className="hidden text-BlueHomz w-[25%] font-[500] text-[11px] text-start md:flex justify-center items-center gap-2">
                            <span onClick={() => openPreview(item)} className="cursor-pointer">View</span>
                            <DropDownBlue
                              options={options}
                              onSelect={(option) => setSelectedFormat(option)}
                              className={"text-[14px] font-[500]"}
                              show="true"
                              width="w-[150px]"
                              placeholder="Download"
                              handlePrint={handleGeneratePdf}
                              data={item}
                              printableRefTenancy={printableRefTenancy}
                              printableRefQuitNotice={printableRefQuitNotice}
                              printableRefReceipt={printableRefReceipt}
                            />
                          </div>
                          <div className="md:hidden relative">
                            <Image
                              src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                              alt=""
                              height={21}
                              width={19}
                              onClick={handleToggleMenuClick}
                              className="cursor-pointer"
                              style={{ height: "auto", width: "auto" }}
                            />
                            {popUpMenuVisible && <PopUp />}
                          </div>
                        </div>
                      ))}
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
    </div >
  );
};

export default App;
