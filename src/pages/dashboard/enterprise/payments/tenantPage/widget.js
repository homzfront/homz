"use client";
import React, { useRef, useState } from "react";
import TenantData from "../components/tenantData";
import WalletPayement from "../components/walletPayement";
import OfflinePayment from "../components/offlinePayment";
import Document from "@/components/icons/document";
import Send from "@/components/icons/send";
import paymentData from "../components/payementData";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import addCommasToNumber from "@/utils/addCommasToNumber";

const Widget = ({ Data }) => {
    const printRefAll = useRef();
    const printRefWallet = useRef();
    const printRefOffline = useRef();

    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);

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
        content: () => {
            if (active) return printRefAll.current;
            if (activeTwo) return printRefWallet.current;
            if (activeThree) return printRefOffline.current;
        },
        documentTitle: "Tenants Data",
        onAfterPrint: () => console.log("Document printed."),
    });

    const DataTwo = paymentData;

    const handleExportToExcel = () => {
        const data = DataTwo.map((item) => ({
            Tenant: item?.tenantName,
            "Rent Amount": addCommasToNumber(item?.rentAmount),
            "Due Date": item?.dueDate,
            "Payment Status": item?.paymentStatus,
            "Amount Paid": addCommasToNumber(item?.amountPaid),
            Description: item?.description,
            "Rent Duration": item?.rentDuration,
            "Payment Method": item?.paymentMethod,
            "Payment Date": item?.paymentDate,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rent Details");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Tenant_Rent_Payment_Report.xlsx");
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
                    <div className="flex flex-col md:flex-row gap-1 items-center">
                        <button
                            className="hidden md:flex w-auto mt-2 items-center text-[11px] md:text-[14px] font-[500] gap-1 px-[10px] h-[42px] hover:bg-white text-BlueHomz hover:border hover:border-BlueHomz  hover:rounded cursor-pointer"
                        >
                            <Send />
                            <span className="">Share Page</span>
                        </button>
                        <button
                            className="md:hidden flex items-center justify-center h-[36px] w-[36px] bg-whiteblue rounded-md cursor-pointer"
                        >
                            <Send />
                        </button>
                        <button
                            onClick={handlePrint}
                            className="hidden border border-BlueHomz w-auto mt-2 items-center text-[11px] md:text-[14px] font-[500] gap-1 md:flex px-[10px] h-[42px] text-BlueHomz  hover:bg-whiteblue rounded cursor-pointer"
                        >
                            <Document className="#006AFF" />
                            <span className="">Download Page</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="md:hidden flex items-center justify-center h-[36px] w-[36px] bg-whiteblue rounded-md cursor-pointer"
                        >
                            <Document className="#006AFF" />
                        </button>
                        <button onClick={handleExportToExcel} className="btn btn-export">
                            Export to Excel
                        </button>
                    </div>
                </div>
                <div className="my-5 rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <TenantData data={DataTwo} printRef={printRefAll} />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <WalletPayement data={DataTwo} printRef={printRefWallet} />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <OfflinePayment data={DataTwo} printRef={printRefOffline} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Widget;
