"use client";
import React, { useEffect, useRef, useState } from "react";
import TenantData from "../components/tenantData";
import WalletPayement from "../components/walletPayement";
import OfflinePayment from "../components/offlinePayment";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Papa from "papaparse";
import PrintableAll from "../components/printableAll";
import useExportRentPayment from "@/store/enterpriseStore/exportRentPayment";
import BlueSearch from "@/components/icons/blueSearch";
import Ticked from "@/components/icons/ticked";
import UnTicked from "@/components/icons/unTicked";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";
import FilterIconBlue from "@/components/icons/filterIconBlue";
import useClickOutside from '@/utils/clickOutside';
import usePaymentFilterStore from "@/store/enterpriseStore/usePaymentFilterStore";
import Reset from '@/components/icons/reset';
import { formatDateRange } from "@/utils/formatDateRange";
import Document from "@/components/icons/document";
import addCommasToNumber from "@/utils/addCommasToNumber";
import api from "@/utils/api";
import { useDebounce } from "@/utils/deBounce";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import CloseSmall from "@/components/icons/closeSmall";
import ImportStatement from "@/components/icons/importStatement";
import FeeList from "../components/feeList";
import FeeManagementModal from "./feeManagementModal";


const Widget = ({
    property,
    setShowPop,
    include,
    setInclude
}) => {
    const printRefAll = useRef();
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(false);
    const { data, fetchData } = useExportRentPayment();
    const [isOpen, setIsOpen] = React.useState(false);
    const closeFilter = useClickOutside(() => setIsOpen(false));
    const [printData, setPrintData] = React.useState(null)
    const [isOpenI, setIsOpenI] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpenI(false));
    const [isLoading, setIsLoading] = React.useState(false);
    const [openPropertyFilter, setOpenPropertyFilter] = React.useState(false);
    const [docHover, setDocHover] = React.useState(false);
    const {
        selectedProperty,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        setSelectedProperty,
        selectedOption,
        setSelectedOption,
        search,
        setSearch,
        setActiveState,
        allData,
        walletData,
        offlineData,
        activeState,
        pageNo,
        setPageNo,
        fee,
        setFee
    } = usePaymentFilterStore();
    // User-selected date range
    const today = new Date();

    // Calculate the date one month later
    const prevMonth = new Date();
    prevMonth.setMonth(today.getMonth() - 1);

    React.useEffect(() => {
        fetchData();
    }, []);


    const clear = () => {
        setSelectedProperty(null);
        setFromDate(null);
        setToDate(null);
        setSearch('')
        setPageNo(1)
    };

    const options = [".CSV", ".XLSX", ".PDF"];

    useEffect(() => {
        if (selectedOption === ".CSV") {
            handleExportToCSV();
        }
        if (selectedOption === ".XLSX") {
            handleExportToExcel();
        }
        if (selectedOption === ".PDF") {
            handlePrint();
        }
        setSelectedOption(null);
    }, [selectedOption])

    const handlePageChange = () => {
        setActive(true);
        setActiveTwo(false);
        setActiveThree(false);
        setActiveFour(false);
        setActiveState('one');
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
        setActiveFour(false);
        setActiveState('two');
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true);
        setActiveFour(false);
        setActiveState('three');
    };

    const handlePageChangeFour = () => {
        setActiveTwo(false);
        setActiveFour(true);
        setActive(false);
        setActiveThree(false);
        setActiveState('four');
    }

    const handlePrint = useReactToPrint({
        content: () => printRefAll.current,
        documentTitle: "Rent Payments",
        onAfterPrint: () => console.log("Document printed."),
        removeAfterPrint: true
    });


    const fetchDataAOW = async (page = 1, limit = 6) => {
        setIsLoading(true);
        try {
            let query = `rentPayment/enterprise?limit=${limit}&page=${page}`;

            // Add payment method based on activeState
            if (activeState === 'two') {
                query += `&paymentMethod=wallet`;
            } else if (activeState === 'three') {
                query += `&paymentMethod=offline`;
            }

            // Optional filters
            if (selectedProperty) {
                query += `&property=${selectedProperty}`;
            }
            if (fromDate && toDate) {
                query += `&startRangeDate=${fromDate}&endRangeDate=${toDate}`;
            }
            if (search) {
                query += `&search=${search}`;
            }

            const response = await api.get(query);
            const result = response?.data;
            setPrintData(result?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentData =
        activeState === 'one'
            ? allData
            : activeState === 'two'
                ? walletData
                : offlineData;
    const summary = currentData?.summary
    const debouncedSearch = useDebounce(search, 500);
    const debounceToDate = useDebounce(toDate, 500);
    const debounceFromDate = useDebounce(fromDate, 500);

    React.useEffect(() => {
        if (summary?.totalTranscation) fetchDataAOW(1, summary?.totalTranscation);
    }, [activeState, selectedProperty, debounceFromDate, debounceToDate, debouncedSearch, summary?.totalTranscation]);



    const handleExportToExcel = () => {
        // Create summary row with all possible fee-related fields
        const summaryRow = {
            "Total Expected Revenue": `${addCommasToNumber(summary?.totalPayment)}`,
            "Rent Collected": `${addCommasToNumber(summary?.amountPaid)}`,
            "Pending Rent": `${addCommasToNumber(summary?.pendingPayment)}`,
            "Total Fees": fee?.data?.totalFeeList ? `${addCommasToNumber(fee?.data?.totalFeeList)}` : "",
            "Total (After Fees)": fee?.data?.totalAfterFees ? `${addCommasToNumber(fee?.data?.totalAfterFees)}` : "",
            "No of Transactions": summary?.totalTranscation,
            "Transaction Date": `${fromDate} - ${toDate}`,
            "Tenant": "",
            "Rent Amount": "",
            "Due Date": "",
            "Payment Status": "",
            "Amount Paid": "",
            "Description": "",
            "Rent Duration": "",
            "Payment Method": "",
            "Payment Date": "",
        };

        // Add fee breakdown to the summary row if fees exist
        if (fee?.data?.fees?.length > 0) {
            fee?.data.fees.forEach((feeItem, index) => {
                const feeName = `${feeItem.name} ${feeItem.amountPct}%`;
                summaryRow[feeName] = `${addCommasToNumber(feeItem?.amountN)}`;
            });
        }

        const dataRows = printData?.results.map((item) => ({
            "Total Expected Revenue": "",
            "Rent Collected": "",
            "Pending Rent": "",
            "Total Fees": "",
            "Total (After Fees)": "",
            // Add empty values for each fee column if fees exist
            ...(fee?.data?.fees?.length > 0 ?
                fee?.data.fees.reduce((acc, feeItem) => {
                    acc[`${feeItem.name} ${feeItem.amountPct}%`] = "";
                    return acc;
                }, {})
                : {}),
            "No of Transactions": "",
            "Tenant": item.tenantId?.fullName,
            "Rent Amount": addCommasToNumber(item.rent),
            "Due Date": changeBackendDateFormat(item.dueDate),
            "Payment Status": item.status === "success" ? "Paid" : "Pending",
            "Amount Paid": addCommasToNumber(item.amountPaid),
            "Description": item.description || "",
            "Rent Duration": item.duration === 1 ? `${item.duration} month` : `${item.duration} months`,
            "Payment Method": item?.paymentMethod || "",
            "Payment Date": item?.paidAt ? changeBackendDateFormat(item?.paidAt) : "",
        }));

        const fullData = [summaryRow, ...dataRows];

        const worksheet = XLSX.utils.json_to_sheet(fullData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rent Details");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `Tenant_Rent_Payment_Report_Page_${pageNo}.xlsx`);
    };


    const handleExportToCSV = () => {
        // Create summary row with all possible fee-related fields
        const summaryRow = {
            "Total Expected Revenue": `${summary?.totalPayment}`,
            "Rent Collected": `${summary?.amountPaid}`,
            "Pending Rent": `${summary?.pendingPayment}`,
            "Total Fees": fee?.data?.totalFeeList ? `${fee?.data?.totalFeeList}` : "",
            "Total (After Fees)": fee?.data?.totalAfterFees ? `${fee?.data?.totalAfterFees}` : "",
            "No of Transactions": summary?.totalTranscation,
            "Transaction Date": `${fromDate} - ${toDate}`,
            "Tenant": "",
            "Rent Amount": "",
            "Due Date": "",
            "Payment Status": "",
            "Amount Paid": "",
            "Description": "",
            "Rent Duration": "",
            "Payment Method": "",
            "Payment Date": "",
        };

        // Add fee breakdown to the summary row if fees exist
        if (fee?.data?.fees?.length > 0) {
            fee?.data.fees.forEach((feeItem, index) => {
                const feeName = `${feeItem.name} ${feeItem.amountPct}%`;
                summaryRow[feeName] = `${feeItem?.amountN}`;
            });
        }

        const dataRows = printData?.results.map((item) => ({
            "Total Expected Revenue": "",
            "Rent Collected": "",
            "Pending Rent": "",
            "Total Fees": "",
            "Total (After Fees)": "",
            // Add empty values for each fee column if fees exist
            ...(fee?.data?.fees?.length > 0 ?
                fee?.data.fees.reduce((acc, feeItem) => {
                    acc[`${feeItem.name} ${feeItem.amountPct}%`] = "";
                    return acc;
                }, {})
                : {}),
            "No of Transactions": "",
            "Tenant": item.tenantId?.fullName,
            "Rent Amount": item.rent,
            "Due Date": changeBackendDateFormat(item.dueDate),
            "Payment Status": item.status === "success" ? "Paid" : "Pending",
            "Amount Paid": item.amountPaid,
            "Description": item.description || "",
            "Rent Duration": item.duration === 1 ? `${item.duration} month` : `${item.duration} months`,
            "Payment Method": item?.paymentMethod || "",
            "Payment Date": item?.paidAt ? changeBackendDateFormat(item?.paidAt) : "",
        }));

        const csv = Papa.unparse([summaryRow, ...dataRows]);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Tenant_Rent_Payment_Report_Page_${pageNo}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <CustomizedModal isOpen={include === "withoutFee"} onRequestClose={() => setInclude("")}>
                <div className={`${isLoading && "pointer-events-none animate-pulse"} p-4 w-full md:w-[440px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[440px] overflow-y-auto scrollbar-container`}>
                    <div className="w-full flex justify-between items-start">
                        <div className="flex flex-col gap-1 w-[85%]">
                            <p className="text-BlackHomz font-[500] text-[14px] md:text-[18px]">
                                Export as:
                            </p>
                            <p className='text-sm text-GrayHomz font-normal'>
                                Select your preferred format
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setInclude("")
                                setFee(null);
                            }}
                            className="cursor-pointer"
                        >
                            <CloseSmall />
                        </div>
                    </div>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setDocHover(true)}
                            onMouseLeave={() => setDocHover(false)}
                            className="mt-4 py-2 bg-[#F6F6F6] px-4 cursor-pointer hover:text-white hover:bg-BlueHomz my-2 rounded-md flex justify-between items-center"
                            onClick={() => setSelectedOption(option)}
                        >
                            {option}
                            {docHover && option === selectedOption ? <ImportStatement className="#FFFFFF" /> : <ImportStatement />}
                        </div>
                    ))}
                </div>
            </CustomizedModal>
            <CustomizedModal isOpen={include === "withFee"} onRequestClose={() => setInclude("")}>
                <FeeManagementModal totalRentCollected={summary?.amountPaid || 0} setInclude={setInclude} />
            </CustomizedModal>
            <div className="w-full h-auto py-4">
                <div className="mt-5 flex flex-row items-end md:items-center justify-between">
                    <div className="flex gap-4 w-auto items-center">
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col items-center py-2 px-4 justify-center hover:text-BlueHomz ${active ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "}`}
                                onClick={handlePageChange}
                            >
                                <p className="text-[14px] font-500">All</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeTwo ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "}`}
                                onClick={handlePageChangeTwo}
                            >
                                <p className="text-[14px] font-500">Wallet Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeThree ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "}`}
                                onClick={handlePageChangeThree}
                            >
                                <p className="text-[14px] font-500">Offline Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeFour ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "}`}
                                onClick={handlePageChangeFour}
                            >
                                <p className="text-[14px] font-500">Statement History</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden md:flex flex-row flex-wrap gap-1 items-center">
                        {property &&
                            <p className="text-GrayHomz font-normal text-sm">
                                {formatDateRange(toDate, fromDate)}
                            </p>
                        }
                        <div ref={closeFilter}>
                            <div
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    setOpenPropertyFilter(false)
                                }}
                                className='cursor-pointer w-auto flex border border-BlueHomz px-3 py-2 rounded-[4px] items-center gap-1'>
                                <FilterIconBlue />
                                {isOpen ?
                                    <ArrowUpII className="#006AFF" /> :
                                    <ArrowDown className="#006AFF" />
                                }
                            </div>
                            {
                                isOpen &&
                                <div className='absolute z-50 top-10 right-[50px] md:right-[210px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px]'>
                                    {
                                        openPropertyFilter ?
                                            <div className='text-sm text-GrayHomz font-medium'>
                                                {property.map((prop, index) => (
                                                    <div
                                                        key={index}
                                                        className='flex gap-2 mt-1.5 items-center cursor-pointer'
                                                        onClick={() => setSelectedProperty(selectedProperty === prop ? null : prop)}
                                                    >
                                                        {selectedProperty === prop ? <Ticked /> : <UnTicked />}
                                                        {prop}
                                                    </div>
                                                ))}
                                            </div> :
                                            <div>
                                                <p className='text-[13px] text-GrayHomz font-medium'>
                                                    Filter by:
                                                </p>
                                                {/* Search Input */}
                                                <div className='mb-2 flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                                                    <BlueSearch />
                                                    <input
                                                        type='text'
                                                        className='placeholder:text-[#A9A9A9] w-full outline-none'
                                                        placeholder='name, email...'
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                                >
                                                    <input
                                                        type="date"
                                                        id="fromPayDate"
                                                        value={fromDate}
                                                        onChange={(e) => setFromDate(e.target.value)}
                                                        className="w-full py-2 outline-none"
                                                        placeholder='Start Date'
                                                    />
                                                    {/* <span className='absolute'><DateIconTwo /></span> */}
                                                </button>
                                                <button
                                                    className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                                >
                                                    <input
                                                        type="date"
                                                        id="toPayDate"
                                                        value={toDate}
                                                        onChange={(e) => setToDate(e.target.value)}
                                                        className="w-full py-2 outline-none"
                                                        placeholder='End Date'
                                                    />
                                                    {/* <span className='absolute'><DateIconTwo /></span> */}
                                                </button>
                                                {/* 
                                                <button onClick={() => setOpenPropertyFilter(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                                    {selectedProperty ? selectedProperty : "Property"}     <ArrowDown className="#4E4E4E" />
                                                </button> */}
                                                <button
                                                    onClick={() => clear()}
                                                    className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                                                    <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                                                </button>
                                            </div>
                                    }
                                </div>
                            }
                        </div>
                        {/* <DropDownBlue
                            options={options}
                            onSelect={(option) => setSelectedOption(option)}
                            className={"text-[14px] font-[500]"}
                            width={"w-auto"}
                            /> */}
                        <div ref={dropdownRef}>
                            <button
                                onClick={() => {
                                    // setIsOpenI(!isOpenI)
                                    setShowPop(true);
                                }}
                                className="text-walletBg px-4 md:bg-BlueHomz h-[36px] flex gap-1 items-center rounded-[4px]">
                                <Document className="#FFFFFF" /> Generate Statement
                            </button>
                        </div>

                    </div>
                </div>
                <div className="my-5 rounded-[12px]">
                    {active &&
                        <div>
                            <TenantData />
                        </div>
                    }
                    {activeTwo &&
                        <div>
                            <WalletPayement />
                        </div>
                    }
                    {activeThree &&
                        <div>
                            <OfflinePayment />
                        </div>
                    }
                    {activeFour &&
                        <div>
                            <FeeList />
                        </div>
                    }
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <PrintableAll
                    data={printData?.results}
                    summary={printData?.summary}
                    fee={fee?.data ?? null}
                    printRef={printRefAll}
                />
            </div>
        </div>
    );
};

export default Widget;