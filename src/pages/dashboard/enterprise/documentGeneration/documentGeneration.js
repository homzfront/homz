"use client"
import React, { useEffect, useRef, useState, useCallback } from "react";
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
import useQuickNoticeFormStore from "@/store/document/useQuickNoticeFormStore";
import useReceiptFormStore from "@/store/document/useReceiptFormStore";
import useAgreementFormStore from "@/store/document/useAgreementFormStore";
import DateDotNowInHomz from "@/utils/dateDotNowInHomz";
import { useReactToPrint } from "react-to-print";
import { saveAs } from 'file-saver';
import PrintablePreviewedData from "./components/printablePreviewedData";
import PrintableReceiptData from "./components/printableReceiptData";
import PrintableQuitNoticeData from "./components/printableQuitNoticeData";
import useGetAllDocument from "@/store/document/getAllDocument";
import Pagination from "@/components/general/pagination";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import ArrowLeft from "@/components/icons/arrowLeft";

const DocumentGeneration = () => {
  const { setTab, homePage, setHomePage } = useTabForDocuGen();
  const { DocType, FormName, setDocType, setFormName } = FormSelection();
  const { formData, mergeFormData, resetAgreementFormData } = useAgreementFormStore();
  const { formData: receiptData, mergeFormData: mergeReceiptData, resetReceiptFormData } = useReceiptFormStore();
  const { formData: quitNoticeData, mergeFormData: mergeQuitNoticeData, resetQuitNoticeFormData } = useQuickNoticeFormStore();
  const option = ["PDF", "Word"];
  const [documentCreation, setDocumentCreation] = useState(false);
  const [selectFormat, setSelectedFormat] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hover, setHover] = useState(false);
  const [typeForDownload, setDocTypeForDownload] = useState(null)
  const options = ["PDF", "Word"];
  const options2 = ["Tenancy Agreement", "Receipt", "Quit Notice"];
  const [searchQuery, setSearchQuery] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const printableRefTenancy = useRef(null);
  const printableRefQuitNotice = useRef(null);
  const printableRefReceipt = useRef(null);
  const [dataState, setDataState] = useState([]);
  const [pdfData, setPdfData] = useState(null);

  const {
    page,
    limit,
    search,
    setPage,
    setSearchParams,
    totalCounts,
    data,
    loading,
    resetSearch,
    totalPages,
    currentPage,
  } = useGetAllDocument(state => ({
    page: state.page,
    limit: state.limit,
    search: state.search,
    totalPages: state.totalPages,
    setPage: state.setPage,
    setSearchParams: state.setSearchParams,
    data: state.data,
    resetSearch: state.resetSearch,
    loading: state.loading,
    totalCounts: state.totalCounts,
    currentPage: state.currentPage,
  }));

  useEffect(() => {
    // Manually trigger data fetch
    useGetAllDocument.getState().fetchData();
  }, [page, search]);

  const handlePageClick = () => {
    setPage(page);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const firstThreePages = [1, 2, 3];
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];


  const reset = () => {
    resetSearch();
  }
  const openDocumentCreation = () => {
    resetAgreementFormData();
    resetReceiptFormData();
    resetQuitNoticeFormData();
    setSelectedFormat(false);
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setShowPreview(false);
    }
    setDocumentCreation(true);
    setTab(null);
  };

  const clearFormForNewUpload = () => {
    const existingAgreeId = formData.id;
    const existingRcptId = receiptData.id;
    const existingQuNoId = quitNoticeData.id;
    if (existingAgreeId || existingRcptId || existingQuNoId) {
      resetAgreementFormData();
      resetReceiptFormData();
      resetQuitNoticeFormData();
    }
  }

  const openDocumentPage = () => {
    if (documentCreation === true || documentCreation === false) {
      setDocumentCreation(false);
      setSelectedFormat(false);
      setShowPreview(false);
    }
    resetAgreementFormData();
    resetReceiptFormData();
    resetQuitNoticeFormData();
  };

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  };

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  };

  const handleToggleMenuClick = (value) => {
    // handleToggleMenu(data?._id);
    setSelectedId(value?._id)
    setPopUpMenuVisible(!popUpMenuVisible);
  };


  // Helper function to save data to localStorage with expiration
  const saveToLocalStorage = useCallback((data) => {
    if (typeof window !== 'undefined') {
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2-hour expiration
      localStorage.setItem("myData", JSON.stringify(data));
      localStorage.setItem("expiryTime", expiryTime);
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("myData");
      const expiryTime = localStorage.getItem("expiryTime");

      if (savedData && expiryTime && new Date().getTime() < Number(expiryTime)) {
        setDataState(JSON.parse(savedData));
      }
    }

    if (homePage) {
      if (documentCreation === true || documentCreation === false) {
        setDocumentCreation(true);
        setShowPreview(false);
      }
      const timeoutId = setTimeout(() => {
        setHomePage(false);
      }, 3000);

      // Cleanup function to clear timeout when component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [homePage, documentCreation, setHomePage]);

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => {
      if (DocType === "Tenancy Agreement") return printableRefTenancy.current;
      if (DocType === "Quit Notice") return printableRefQuitNotice.current;
      if (DocType === "Invoice and Receipt") return printableRefReceipt.current;
    },
    documentTitle: `${DocType}`,
    onAfterPrint: () => console.log(`${DocType} printed.`),
  });

  // Function to handle saving as Word
  const handleSaveAsWord = useCallback(async () => {
    if (typeof window === 'undefined') return; // Ensure client-side

    const htmlDocx = await import('html-docx-js/dist/html-docx');
    let selectedRef;

    // Select the appropriate reference based on DocType
    if (DocType === "Tenancy Agreement") {
      selectedRef = printableRefTenancy;
    } else if (DocType === "Quit Notice") {
      selectedRef = printableRefQuitNotice;
    } else if (DocType === "Invoice and Receipt") {
      selectedRef = printableRefReceipt;
    }

    // Check if the reference is valid
    if (!selectedRef?.current) {
      console.error("No valid reference found for the selected document type.");
      return;
    }

    // Get the HTML content from the selected reference
    const contentHTML = selectedRef.current.innerHTML;

    // Convert the HTML content to a .docx file using html-docx-js
    const convertedDocx = htmlDocx.asBlob(contentHTML);

    // Use js-file-download to download the generated .docx file
    saveAs(convertedDocx, `${DocType}.docx`);
  }, [DocType]);

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

  const handleDownload = (format) => {
    if (format === "PDF") {
      handlePrint();
    } else if (format === "Word") {
      handleSaveAsWord();
    }
    // handleGeneratePdf();
    setSelectedFormat(format);
  };

  const TypeForDownload = (data, item) => {
    setDocType(item.DocType);
    setFormName(item.FormName)
    if (item.DocType === "Tenancy Agreement") {
      mergeFormData(item)
    }
    if (item.DocType === "Invoice and Receipt") {
      mergeReceiptData(item)
    }
    if (item.DocType === "Quit Notice") {
      mergeQuitNoticeData(item)
    }
    setDocTypeForDownload(data)
  }

  const GoBack = () => {
    if (formData?._id || receiptData?._id) {
      setShowPreview(false)
      setDocumentCreation(false);
    }
  }

  return (
    <div className="overflow-y-auto h-screen scrollbar-container">
      {
        < CustomizedModal isOpen={selectFormat} >
          <DownloadConfirmModal
            header={"Download Successful"}
            body={`Your ${typeForDownload ? typeForDownload : "[Document Type]"} has successfully been downloaded to your device`}
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
              <div className="md:w-[45%] flex flex-wrap gap-4 items-center">
                <p onClick={GoBack} className={`cursor-pointer font-[400] text-[14px] text-GrayHomz2 flex items-center gap-1 ${formData?._id || receiptData?._id ? "" : "hidden"}`}>
                  <ArrowLeft />
                  Go Back
                </p>
                <p className="text-[18px] font-[400] text-BlackHomz">
                  Document Preview
                </p>
                <p className="text-[16px] font-[400] text-GrayHomz2">
                  Step 4/4
                </p>
              </div>
              <div>
                <div className="md:w-[45%] flex gap-4 items-center">
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
                    onSelect={(option) => handleDownload(option)}
                    className={"text-[14px] font-[500]"}
                    width={"w-[190px] md:w-[240px]"}
                    show="false"
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
              <div className="w-[30%] flex gap-4 items-center">
                <div className="w-[60%] relative">
                  <input
                    type="text"
                    className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                    id="search"
                    value={search}
                    onChange={(e) => setSearchParams(e.target.value)}
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
                <button
                  onClick={reset}
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
              <div className="w-[30%] max-w-[280px]">
                <button
                  onClick={() => {
                    setDocumentCreation(!documentCreation)
                    setTab(null);
                    clearFormForNewUpload();
                    resetReceiptFormData();
                    resetAgreementFormData();
                    setDocType(null);
                    setFormName(null);
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
                    value={search}
                    onChange={(e) => setSearchParams(e.target.value)}
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
                    onClick={reset}
                  >
                    <Reset className="#006AFF" />
                  </button>
                </div>
              </div>
              <CustomizedModal isOpen={filterModal}>
                <FilterMobile
                  closeMobileModal={closeMobileFilterModal}
                  selectedStatus={documentType}
                  setSelectedStatus={setDocumentType}
                  options={options2}
                  defaultName={"Document Type"}
                />
              </CustomizedModal>
            </div>
            {
              data &&
              (
                <div className="flex flex-col gap-4 h-auto py-4">
                  <div className="w-full">
                    <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz px-4">
                      <div className="w-[45%] md:w-[25%]">Document Type</div>
                      <div className="w-[45%] md:w-[25%]">Document Name</div>
                      <div className="w-[25%] hidden md:table-cell">Date Generated</div>
                      <div className="w-[25%] hidden md:table-cell">Action</div>
                      <div className="w-[10px] md:hidden"></div>
                    </div>
                    <div>
                      {loading ? (
                        // Skeleton loader: Render this while loading is true
                        Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={index}
                              className="animate-pulse border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                            >
                              <div className="bg-gray-300 w-[45%] md:w-[25%] h-[10px] rounded-md"></div>
                              <div className="bg-gray-300 w-[45%] md:w-[25%] h-[10px] rounded-md"></div>
                              <div className="hidden md:table-cell bg-gray-300 w-[25%] h-[10px] rounded-md"></div>
                              <div className="hidden md:flex bg-gray-300 w-[25%] h-[10px] rounded-md"></div>
                            </div>
                          ))
                      ) : (
                        // Actual data display once loading is false
                        data.map((item) => (
                          <div
                            key={item?._id}
                            className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                          >
                            <div className="text-GrayHomz w-[45%] md:w-[25%] font-[500] text-[11px] text-start">
                              {item?.DocType}
                            </div>
                            <div className="text-GrayHomz w-[45%] md:w-[25%] font-[500] text-[11px] text-start">
                              {item?.FormName}
                            </div>
                            <div className="hidden md:table-cell text-GrayHomz w-[25%] font-[500] text-[11px] text-start">
                              {changeBackendDateFormat(item?.createdAt)}
                            </div>
                            <div className="hidden text-BlueHomz w-[25%] font-[500] text-[11px] text-start md:flex gap-2">
                              <div onClick={() => TypeForDownload(item?.DocType, item)}>
                                <DropDownBlue
                                  options={options}
                                  onSelect={(option) => handleDownload(option)}
                                  className={"text-[14px] font-[500]"}
                                  show="true"
                                  width="w-[170px]"
                                  placeholder="Download as..."
                                />
                              </div>
                            </div>
                            <div className="relative">
                              <Image
                                src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                alt=""
                                height={21}
                                width={19}
                                onClick={() => handleToggleMenuClick(item)}
                                className="cursor-pointer mr-8"
                                style={{ height: "auto", width: "auto" }}
                              />
                              {popUpMenuVisible && selectedId === item?._id && (
                                <PopUp item={item} openPreview={openPreview} />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  {data && data.length >= 1 && (
                    <Pagination
                      firstThreePages={firstThreePages}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handleNext={handleNext}
                      handlePrev={handlePrev}
                      handlePageClick={handlePageClick}
                      lastThreePages={lastThreePages}
                    />
                  )}
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
      <div style={{ display: 'none' }}>
        <PrintablePreviewedData
          printableRef={printableRefTenancy}
          formData={formData}
        />
      </div>
      <div style={{ display: 'none' }}>
        <PrintableReceiptData
          printableRef={printableRefReceipt}
          formData={receiptData}
        />
      </div>
      <div style={{ display: 'none' }}>
        <PrintableQuitNoticeData
          printableRef={printableRefQuitNotice}
          formData={quitNoticeData}
        />
      </div>
    </div >
  );
};

export default DocumentGeneration;
