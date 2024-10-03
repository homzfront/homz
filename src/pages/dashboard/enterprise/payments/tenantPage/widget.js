"use client";
import React, { useEffect, useRef, useState } from "react";
import TenantData from "../components/tenantData";
import WalletPayement from "../components/walletPayement";
import OfflinePayment from "../components/offlinePayment";
import Send from "@/components/icons/send";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addCommasToNumberTwo from "@/utils/addCommasToNumberTwo;";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import DropDownBlue from "../components/dropDownBlue";
import Papa from "papaparse";
import PrintableAll from "../components/printableAll";
import useExportRentPayment from "@/store/enterpriseStore/exportRentPayment";

const Widget = () => {
    const printRefAll = useRef();
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { data, fetchData } = useExportRentPayment();

    useEffect(() => {
        fetchData();
    }, []);

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
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true);
    };

    const handlePrint = useReactToPrint({
        content: () => printRefAll.current,
        documentTitle: "Tenants_Rent_Payments",
        onAfterPrint: () => console.log("Document printed."),
    });

    const DataTwo = data?.data;

    const handleExportToExcel = () => {
        const data = DataTwo.map((item) => ({
            "Tenant": item.tenantId?.fullName,
            "Rent Amount": addCommasToNumber(item.rent),
            "Due Date": changeBackendDateFormat(item.dueDate),
            "Payment Status": item.status === "success" ? "Paid" : "Pending",
            "Amount Paid": addCommasToNumber(item.amountPaid),
            "Description": item.description || "N/A",
            "Rent Duration": item.duration === 1 ? `${item.duration} year` : `${item.duration} years`,
            "Payment Method": item?.paymentMethod || "N/A",
            "Payment Date": item?.paidAt ? changeBackendDateFormat(item?.paidAt) : "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rent Details");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Tenant_Rent_Payment_Report.xlsx");
    };

    const handleExportToCSV = () => {
        const data = DataTwo.map((item) => ({
            "Tenant": item.tenantId?.fullName,
            "Rent Amount": addCommasToNumberTwo(item.rent),
            "Due Date": changeBackendDateFormat(item.dueDate),
            "Payment Status": item.status === "success" ? "Paid" : "Pending",
            "Amount Paid": addCommasToNumberTwo(item.amountPaid),
            "Description": item.description || "N/A",
            "Rent Duration": item.duration === 1 ? `${item.duration} year` : `${item.duration} years`,
            "Payment Method": item?.paymentMethod || "N/A",
            "Payment Date": item?.paidAt ? changeBackendDateFormat(item?.paidAt) : "N/A",
        }));

        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "Tenant_Rent_Payment_Report.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            {DataTwo && <div className="w-full h-auto py-4">
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
                    <div className="flex flex-col md:flex-row gap-1 items-center">
                        <DropDownBlue
                            options={options}
                            onSelect={(option) => setSelectedOption(option)}
                            className={"text-[14px] font-[500]"}
                            width={"w-auto"}
                        />
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
            }
            <div style={{ display: 'none' }}>
                <PrintableAll
                    printRef={printRefAll}
                    data={DataTwo}
                />
            </div>
        </div>
    );
};

export default Widget;
