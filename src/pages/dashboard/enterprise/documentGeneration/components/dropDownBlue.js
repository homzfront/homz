import React, { useState, useEffect, useRef } from "react";
import useClickOutside from "@/utils/clickOutside";
import ArrowDownWhite from "@/components/icons/arrowDownWhite";
import WhiteDoc from "@/components/icons/whiteDoc";

const DropDownBlue = ({ DocType, options, onSelect, className, width = "w-[240px]", placeholder = "Download document as...", show = "false" }) => {
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
        onSelect(option);
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
        </div>
    );
};

export default DropDownBlue;
