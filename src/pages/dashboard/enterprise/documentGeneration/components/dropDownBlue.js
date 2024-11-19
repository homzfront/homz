import React, { useState, useEffect, useRef, useCallback } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowDownWhite from "@/components/icons/arrowDownWhite";
import WhiteDoc from "@/components/icons/whiteDoc";
import PrintablePreviewedData from "./printablePreviewedData";
import PrintableReceiptData from "./printableReceiptData";
import PrintableQuitNoticeData from "./printableQuitNoticeData";
import { useReactToPrint } from "react-to-print";
import { saveAs } from 'file-saver';
import { handleDownloadDocx } from "./word";
import { handleDownloadAgreementDocx } from "./wordAgreement";

const DropDownBlue = ({ item, DocType, options, onSelect, className, width = "w-[240px]", placeholder = "Download document as...", show = "false" }) => {
    const printableRefTenancy = useRef(null);
    const printableRefQuitNotice = useRef(null);
    const printableRefReceipt = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState("down"); // New state to control position

    const dropdownRef = useClickOutside(() => setIsOpen(false));
    const dropdownContainerRef = useRef(null);

    const handleDropdownToggle = () => {
        setHover(false);
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (typeof onSelect === "function") {
            onSelect(option);
        } else {
            handleDownload(option);
        }
        setIsOpen(false);
    };
    // Adjust dropdown position based on available space
    useEffect(() => {
        if (isOpen && dropdownContainerRef.current) {
            const rect = dropdownContainerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            // Toggle position based on available space
            setDropdownPosition(spaceBelow < 240 && spaceAbove > 240 ? "up" : "down");
        }
    }, [isOpen]);
    
    const filteredOptions = options?.filter((option) => option?.toLowerCase());

    const handleDownload = (format) => {
        if (format === "PDF") {
          handlePrint();
        } else if (format === "Word") {
        //   handleSaveAsWord();
          if (DocType === "Quit Notice") {
              handleDownloadDocx(item)
          } else {
              handleDownloadAgreementDocx(item)
          }
        }
        // handleGeneratePdf();
        // setSelectedFormat(format);
      };
    
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
    

    return (
        <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
            <div
                className={`${width} text-walletBg hover:text-BlueHomz px-4 bg-BlueHomz hover:bg-white hover:border hover:border-BlueHomz h-[48px] flex items-center rounded-[4px] cursor-pointer ${isOpen ? "border" : ""}`}
                onMouseEnter={() => { setHover(true); setHoverII(true); }}
                onMouseLeave={() => { setHover(false); setHoverII(false); }}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full justify-between items-center gap-1">
                    <div className={`${show === "true" ? "" : "hidden"}`}>
                        {hoverII ? <WhiteDoc classname="#006AFF" /> : <WhiteDoc />}
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className={`font-[500] text-[14px] w-full truncate`}>
                            {selectedOption ? selectedOption : placeholder}
                        </div>
                        <div className={`${isOpen ? "transform rotate-180" : ""}`}>
                            {hover ? <ArrowDownWhite className="#006AFF" /> : <ArrowDownWhite />}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    ref={dropdownContainerRef}
                    className={`absolute z-[200] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container ${width}`}
                    style={{
                        top: dropdownPosition === "down" ? "54px" : "auto",
                        bottom: dropdownPosition === "up" ? "54px" : "auto",
                    }}
                >
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`${DocType === "Invoice and Receipt" && option === "Word" ? "hidden" : ""} p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            <div style={{ display: 'none' }}>
                <PrintablePreviewedData
                    printableRef={printableRefTenancy}
                    formData={item}
                />
            </div>
            <div style={{ display: 'none' }}>
                <PrintableReceiptData
                    printableRef={printableRefReceipt}
                    formData={item}
                />
            </div>
            <div style={{ display: 'none' }}>
                <PrintableQuitNoticeData
                    printableRef={printableRefQuitNotice}
                    formData={item}
                />
            </div>
        </div>
    );
};

export default DropDownBlue;
