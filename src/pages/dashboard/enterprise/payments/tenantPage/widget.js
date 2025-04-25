"use client";
import React, { useEffect, useRef, useState } from "react";
import TenantData from "../components/tenantData";
import WalletPayement from "../components/walletPayement";
import OfflinePayment from "../components/offlinePayment";
import Send from "@/components/icons/send";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import addCommasToNumberTwo from "@/utils/addCommasToNumberTwo;";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import DropDownBlue from "../components/dropDownBlue";
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
import formatDateII from "@/utils/formatDateII";
import Reset from '@/components/icons/reset';
import { formatDateRange } from "@/utils/formatDateRange";
import Document from "@/components/icons/document";
import addCommasToNumber from "@/utils/addCommasToNumber";
import api from "@/utils/api";

const Widget = ({
    property,
}) => {
    const printRefAll = useRef();
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const { data, fetchData } = useExportRentPayment();
    const [isOpen, setIsOpen] = React.useState(false);
    const closeFilter = useClickOutside(() => setIsOpen(false));
    const [printData, setPrintData] = React.useState(null)
    const [isOpenI, setIsOpenI] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpenI(false));
    const [isLoading, setIsLoading] = React.useState(false);
    const [openPropertyFilter, setOpenPropertyFilter] = React.useState(false)
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
        setPageNo
    } = usePaymentFilterStore();
    // User-selected date range
    const today = new Date();

    // Calculate the date one month later
    const prevMonth = new Date();
    prevMonth.setMonth(today.getMonth() - 1);

    React.useEffect(() => {
        fetchData();
        setFromDate(formatDateII(prevMonth));
        setToDate(formatDateII(today));
    }, []);


    const clear = () => {
        setSelectedProperty(null);
        setFromDate(formatDateII(prevMonth));
        setToDate(formatDateII(today));
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
        setActiveState('one');
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
        setActiveState('two');
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true);
        setActiveState('three');
    };

    const handlePrint = useReactToPrint({
        content: () => printRefAll.current,
        documentTitle: "Tenants_Rent_Payments",
        onAfterPrint: () => console.log("Document printed."),
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

    React.useEffect(() => {
        if (summary?.totalTranscation) fetchDataAOW(1, summary?.totalTranscation);
    }, [activeState, selectedProperty, fromDate, toDate, search, summary?.totalTranscation]);

    const handleExportToExcel = () => {
        const summaryRow = {
            "Total Revenue": `${addCommasToNumber(summary?.totalPayment)}`,
            "Rent Collected": `${addCommasToNumber(summary?.amountPaid)}`,
            "Pending Rent": `${addCommasToNumber(summary?.pendingPayment)}`,
            "No of Transactions": summary?.totalTranscation,
            "Transaction Date": `${fromDate} -${toDate}`,
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

        const dataRows = printData?.results.map((item) => ({
            "Total Revenue": "",
            "Rent Collected": "",
            "Pending Rent": "",
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
        const summaryRow = {
            "Total Revenue": `${addCommasToNumber(summary?.totalPayment)}`,
            "Rent Collected": `${addCommasToNumber(summary?.amountPaid)}`,
            "Pending Rent": `${addCommasToNumber(summary?.pendingPayment)}`,
            "No of Transactions": summary?.totalTranscation,
            "Transaction Date": `${fromDate} -${toDate}`,
            "Tenant": "", // Empty in summary row
            "Rent Amount": "",
            "Due Date": "",
            "Payment Status": "",
            "Amount Paid": "",
            "Description": "",
            "Rent Duration": "",
            "Payment Method": "",
            "Payment Date": "",
        };

        const dataRows = printData?.results.map((item) => ({
            "Total Revenue": "", // Empty in data rows
            "Rent Collected": "",
            "Pending Rent": "",
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
                                                        placeholder='email, address...'
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

                                                <button onClick={() => setOpenPropertyFilter(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                                    {selectedProperty ? selectedProperty : "Property"}     <ArrowDown className="#4E4E4E" />
                                                </button>
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
                            <button onClick={() => setIsOpenI(!isOpenI)} className="text-walletBg px-4 md:bg-BlueHomz h-[36px] flex gap-1 items-center rounded-[4px]">
                                <Document className="#FFFFFF" /> Generate Statement
                            </button>
                            {
                                isOpenI &&
                                <div className={`${isLoading && "pointer-events-none animate-pulse"} absolute z-20 w-[140px] md:w-[200px] right-[13px] md:right-0 md:top-[50px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container`}>
                                    <p className='px-4 text-[13px] text-GrayHomz font-medium'>
                                        Export as:
                                    </p>
                                    {options.map((option, index) => (
                                        <div
                                            key={index}
                                            className="py-2 bg-[#F6F6F6] px-4 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="my-5 rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <TenantData />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <WalletPayement />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <OfflinePayment />
                    </div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <PrintableAll
                    data={printData?.results}
                    summary={printData?.summary}
                    printRef={printRefAll}
                />
            </div>
        </div>
    );
};

export default Widget;
