import React from 'react'
import AddNormal from '@/components/icons/addNormal';
import ArrowDown from '@/components/icons/arrowDown';
import ArrowUpII from '@/components/icons/arrowUpII';
import DeleteIcon from '@/components/icons/deleteIcon';
import DocDocuSmall from '@/components/icons/docDocuSmall';
import FilterIconBlue from '@/components/icons/filterIconBlue';
import Reset from '@/components/icons/reset';
import BlueSearch from '@/components/icons/blueSearch';
import DotsBlue from '@/components/icons/dotsBlue';
import Ticked from '@/components/icons/ticked';
import UnTicked from '@/components/icons/unTicked';
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Papa from "papaparse";
import addCommasToNumber from '@/utils/addCommasToNumber';

const HeaderAndFilter = ({
    setIsOpen,
    isOpen,
    setIsOpenTwo,
    isOpenTwo,
    closeAction,
    closeFilter,
    setOpenCreateExpenses,
    statusData,
    openStatus,
    setOpenStatus,
    selectedStatus,
    setSelectedStatus,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    search,
    setSearch,
    clear,
    setExpenseCate,
    expenseCate,
    categories,
    selectedCate,
    setSelectedCate,
    setSelectedOption,
    selectedOption,
    setIsOpenI,
    isOpenI,
    printData,
    onDelete,
    pageNo,
    printRefAll
}) => {
    const optionsTwo = [".CSV", ".XLSX", ".PDF"];


    const handlePrint = useReactToPrint({
        content: () => printRefAll.current,
        documentTitle: "Expenses",
        onAfterPrint: () => console.log("Document printed."),
        removeAfterPrint: true
    });

    React.useEffect(() => {
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

    const summary = printData?.summary
    const resultCount = printData?.resultCount

    const handleExportToExcel = () => {
        const summaryRow = {
            "Total Expense Amount": addCommasToNumber(summary?.totalExpenseAmount),
            "Total Rent Collected": addCommasToNumber(summary?.totalRentCollected),
            "Available Balance": addCommasToNumber(summary?.availableBalance),
            "Number of Expenses": resultCount,
            "Date Range": `${fromDate} - ${toDate}`,
            "Vendor": "",
            "Expense Name": "",
            "Amount": "",
            "Date": "",
            "Category": "",
            "Payment Status": "",
            "Enterprise Name": "",
        };

        const dataRows = printData?.results.map((item) => ({
            "Total Expense Amount": "",
            "Total Rent Collected": "",
            "Available Balance": "",
            "Number of Expenses": "",
            "Date Range": "",
            "Vendor": item.vendor?.name || "",
            "Expense Name": item.expenseName || "",
            "Amount": addCommasToNumber(item.amount),
            "Date": changeBackendDateFormat(item.date),
            "Category": item.expenseCategoryName || "",
            "Payment Status": item.paymentStatus || "",
            "Enterprise Name": item.enterPrise?.fullName || "",
        }));

        const fullData = [summaryRow, ...dataRows];

        const worksheet = XLSX.utils.json_to_sheet(fullData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Details");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `Expense_Report_Page_${pageNo}.xlsx`);
    };

    const handleExportToCSV = () => {
        const summaryRow = {
            "Total Expense Amount": summary?.totalExpenseAmount,
            "Total Rent Collected": summary?.totalRentCollected,
            "Available Balance": summary?.availableBalance,
            "Number of Expenses": resultCount,
            "Date Range": `${fromDate} - ${toDate}`,
            "Vendor": "",
            "Expense Name": "",
            "Amount": "",
            "Date": "",
            "Category": "",
            "Payment Status": "",
            "Enterprise Name": "",
        };

        const dataRows = printData?.results.map((item) => ({
            "Total Expense Amount": "",
            "Total Rent Collected": "",
            "Available Balance": "",
            "Number of Expenses": "",
            "Date Range": "",
            "Vendor": item.vendor?.name || "",
            "Expense Name": item.expenseName || "",
            "Amount": addCommasToNumber(item.amount),
            "Date": changeBackendDateFormat(item.date),
            "Category": item.expenseCategoryName || "",
            "Payment Status": item.paymentStatus || "",
            "Enterprise Name": item.enterPrise?.fullName || "",
        }));

        const csv = Papa.unparse([summaryRow, ...dataRows]);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `Expense_Report_Page_${pageNo}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div>
            <h2 className='md:hidden mb-4 font-normal text-[16px] text-BlackHomz'>
                Expenses
            </h2>
            <div className='flex w-full gap-4 justify-between'>
                <h2 className='hidden md:block font-medium text-[20px] text-BlackHomz'>
                    Expenses
                </h2>
                <div className='mb-2 md:hidden h-[38px] w-full border border-[#A9A9A9] rounded-[4px] px-3 flex items-center justify-center gap-2'>
                    <BlueSearch />
                    <input
                        type='text'
                        className='placeholder:text-[#A9A9A9] w-full outline-none placeholder:text-[13px] text-[13px]'
                        placeholder='Email, Expense, Property...'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
                <div className='relative flex justify-end md:justify-normal md:items-center gap-2'>
                    <div ref={closeFilter}>
                        <div
                            onClick={() => {
                                setIsOpen(!isOpen)
                                setExpenseCate(false)
                                setOpenStatus(false)
                            }}
                            className='cursor-pointer w-auto border border-BlueHomz px-3 h-[38px] flex justify-center items-center rounded-[4px] gap-1'>
                            <FilterIconBlue />
                            <span className='hidden md:block'>
                                {isOpen ?
                                    <ArrowUpII className="#006AFF" /> :
                                    <ArrowDown className="#006AFF" />
                                }
                            </span>
                        </div>
                        {
                            isOpen &&
                            <div className='absolute z-50 top-10 right-[50px] md:right-[104px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-auto scrollbar-container'>
                                {
                                    expenseCate ?
                                        <div className='text-sm text-GrayHomz font-medium overflow-auto scrollbar-container'>
                                            {categories?.map((prop, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2 mt-1.5 items-center cursor-pointer'
                                                    onClick={() => setSelectedCate(selectedCate === prop?.categoryName ? null : prop?.categoryName)}
                                                >
                                                    {selectedCate === prop?.categoryName ? <Ticked /> : <UnTicked />}
                                                    {prop?.categoryName}
                                                </div>
                                            ))}
                                        </div>
                                        : openStatus ?
                                            <div className='text-sm text-GrayHomz font-medium'>
                                                {statusData.map((prop, index) => (
                                                    <div
                                                        key={index}
                                                        className='flex gap-2 mt-1.5 items-center cursor-pointer'
                                                        onClick={() => setSelectedStatus(selectedStatus === prop ? null : prop)}
                                                    >
                                                        {selectedStatus === prop ? <Ticked /> : <UnTicked />}
                                                        {prop}
                                                    </div>
                                                ))}
                                            </div>
                                            : <div>
                                                <p className='text-[13px] text-GrayHomz font-medium'>
                                                    Filter by:
                                                </p>
                                                {/* Search Input */}
                                                <div className='mb-2 hidden md:flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                                                    <BlueSearch />
                                                    <input
                                                        type='text'
                                                        className='placeholder:text-[#A9A9A9] w-full outline-none'
                                                        placeholder='Email, Expense, Property...'
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)}
                                                    />
                                                </div>
                                                <button onClick={() => setExpenseCate(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                                    {selectedCate ? selectedCate : "Expense Category"}      <ArrowDown className="#4E4E4E" />
                                                </button>
                                                <button onClick={() => setOpenStatus(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                                    {selectedStatus ? selectedStatus : "Status"}      <ArrowDown className="#4E4E4E" />
                                                </button>
                                                <button
                                                    className='relative mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                                >
                                                    <input
                                                        type='date'
                                                        className="w-full py-2 outline-none"
                                                        placeholder='Start Date'
                                                        value={fromDate}
                                                        onChange={(e) => setFromDate(e.target.value)}
                                                    />
                                                    {/* <span className='absolute top-2 right-3 bg-white p-1'><DateIconTwo /></span> */}
                                                </button>
                                                <button
                                                    className='relative mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                                >
                                                    <input
                                                        type='date'
                                                        className="w-full py-2 outline-none"
                                                        value={toDate}
                                                        onChange={(e) => setToDate(e.target.value)}
                                                        placeholder='End Date'
                                                    />
                                                    {/* <span className='absolute top-2 right-3 bg-white p-1'><DateIconTwo /></span> */}
                                                </button>
                                                <button
                                                    onClick={() => clear()}
                                                    className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue hidden md:flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                                                    <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                                                </button>
                                                <button
                                                    onClick={() => clear()}
                                                    className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue md:hidden flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                                                    <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                                                </button>
                                            </div>
                                }
                            </div>
                        }
                    </div>
                    <div ref={closeAction}>
                        <div
                            onClick={() => {
                                setIsOpenTwo(!isOpenTwo)
                                setIsOpenI(false)
                            }}
                            className='cursor-pointer w-auto text-sm text-BlueHomz font-medium border border-BlueHomz px-3 h-[38px] flex justify-center items-center rounded-[4px] gap-1'>
                            <span className='hidden md:block'>
                                Actions
                            </span>
                            <span className='md:hidden'>
                                <DotsBlue />
                            </span>
                            <span className='hidden md:block'>
                                {isOpenTwo ?
                                    <ArrowUpII className="#006AFF" /> :
                                    <ArrowDown className="#006AFF" />
                                }
                            </span>
                        </div>
                        {
                            isOpenTwo &&
                            <div className={`absolute z-50 top-10 right-[0px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container`} >
                                {isOpenI ?
                                    <div className={`font-[500] text-BlackHomz text-[14px]`}>
                                        <p className="px-4 text-[13px] text-GrayHomz font-medium">Export as:</p>
                                        {optionsTwo.map((option, index) => (
                                            <div
                                                key={index}
                                                className="py-2 bg-[#F6F6F6] px-4 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedOption(option);
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className={`text-sm text-GrayHomz font-medium flex flex-col gap-0`}>
                                        <div
                                            onClick={() => setOpenCreateExpenses(true)}
                                            className="flex gap-2 items-center hover:bg-whiteblue p-2 cursor-pointer"
                                        >
                                            <span className="w-3">
                                                <AddNormal />
                                            </span>
                                            <span className="min-w-[80%]">New Expense</span>
                                        </div>
                                        <div className="flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer">
                                            <span className="w-3">
                                                <DocDocuSmall />
                                            </span>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsOpenI(true);
                                                }}
                                                className="min-w-[80%]"
                                            >
                                                Generate Report
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer">
                                            <span className="w-3">
                                                <DeleteIcon />
                                            </span>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete();
                                                }}
                                                className="min-w-[80%] text-error"
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAndFilter