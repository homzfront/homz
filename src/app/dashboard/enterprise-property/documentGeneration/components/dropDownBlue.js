"use client"
import React, { useState } from "react";
import html2pdf from 'html2pdf.js';
import useClickOutside from "@/utils/clickOutside";
import ArrowDownWhite from "@/components/icons/arrowDownWhite";
import WhiteDoc from "@/components/icons/whiteDoc";

const DropDownBlue = ({ printableRefTenancy, printableRefQuitNotice, printableRefReceipt, data, handlePrint, options, onSelect, className, width = "w-[240px]", placeholder = "Download document as...", show = "false" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useClickOutside(() => setIsOpen(false));
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const handleDropdownToggle = () => {
        setHover(false);
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleGeneratePdfII = async (pdfOpts) => {

        let element;

        switch (data.DocType) {
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

        const html = element.innerHTML
        console.log(pdfOpts)
        const pdfBlob = await html2pdf().from(html).set(pdfOpts).outputPdf('blob');
        const downloadUrl = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${FormName}.pdf`;

        // Automatically trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
        handlePrint();
        if (data?.pdf) {
            handleGeneratePdfII(data?.pdf);
        }
    };



    const filteredOptions = options?.filter((option) =>
        option?.toLowerCase()
    );

    return (
        <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
            <div
                className={`${width} text-walletBg hover:text-BlueHomz px-4 bg-BlueHomz hover:bg-white hover:border hover:border-BlueHomz h-[48px] flex items-center rounded-[4px] cursor-pointer ${isOpen ? "border" : ""
                    }`}
                // onMouseEnter={() => {
                //     setHover(true)
                //     setHoverII(true)
                // }}
                // onMouseLeave={() => {
                //     setHover(false)
                //     setHoverII(false)
                // }}
                onClick={handleDropdownToggle}
            >
                <div className="flex w-full justify-between items-center gap-1">
                    <div

                        className={`${show === "true" ? "" : "hidden"} `}>
                        {hoverII ? <WhiteDoc classname="#006AFF" /> : <WhiteDoc />}
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className={`font-[500] text-[14px] w-full truncate`}>
                            {selectedOption ? selectedOption : placeholder}
                        </div>
                        <div
                            className={` ${isOpen ? "transform rotate-180" : ""}`}>
                            {hover ? <ArrowDownWhite className="#006AFF" /> : <ArrowDownWhite />}
                        </div>
                    </div>
                </div>
            </div >
            {
                isOpen && (
                    <div className={`absolute z-20 top-[74px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container ${width}`}>
                        {filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default DropDownBlue;
