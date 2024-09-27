"use client";
import React, { useEffect, useRef, useState } from "react";
import AddBlueSmall from "@/components/icons/addBlueSmall";
import WalletPayement from "./walletPayement";
import OfflinePayment from "./offlinePayment";
import AllData from "./allData";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import SetOfflineData from "./setOfflineData";
import ConfirmModal from "../../components/confirmModal";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import DropDownBlue from "./dropDownBlue";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addCommasToNumberTwo from "@/utils/addCommasToNumberTwo;";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useExportEnterpriseSingleTenant from "@/store/enterpriseStore/exportEnterpriseSingleTenant";
import PrintableAll from "./printableAll";

const Widget = ({ id, fetchDataAgain, Data, again, setAgain }) => {
    const [active, setActive] = useState(true);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [offlinepay, setOfflinepay] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const printRefAll = useRef();
    const [selectedOption, setSelectedOption] = useState(null);
    const { data, loading, fetchData } = useExportEnterpriseSingleTenant();

    useEffect(() => {
        fetchData(id);
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
        setActiveThree(false)
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false)
    };

    const handlePageChangeThree = () => {
        setActiveTwo(false);
        setActive(false);
        setActiveThree(true)
    };

    const openAddOfflinePayment = () => {
        setOfflinepay(true);
    };

    const successfullModal = () => {
        setOpenModel(!openModel);
        setOfflinepay(false);
        fetchDataAgain();
    };

    const handlePrint = useReactToPrint({
        content: () => printRefAll.current,
        documentTitle: `${Data?.data?.fullName}_Rent_Payment_Report`,
        onAfterPrint: () => console.log("Document printed."),
    });

    const DataTwo = data?.data;

    const handleExportToExcel = () => {
        const data = DataTwo.map((item) => ({
            "Tenant": Data?.data?.fullName,
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
        saveAs(blob, `${Data?.data?.fullName}_Rent_Payment_Report.xlsx`);
    };

    const handleExportToCSV = () => {
        const data = DataTwo.map((item) => ({
            "Tenant": Data?.data?.fullName,
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
        link.setAttribute("download", `${Data?.data?.fullName}_Rent_Payment_Report.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="w-full h-auto">
                <div className="mt-5 flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
                    <div className="flex gap-4 w-auto items-center">
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col items-center py-2 px-4 justify-center hover:text-BlueHomz ${active ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChange}
                                justify-center
                            >
                                <p className="text-[11px] md:text-[13px] font-500">All</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeTwo ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChangeTwo}
                            >
                                <p className="text-[11px] md:text-[13px] font-500">Wallet Payments</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 justify-center cursor-pointer">
                            <div
                                className={`flex flex-col py-2 px-4 items-center justify-center hover:text-BlueHomz ${activeThree ? "border-b-[2px] border-BlueHomz text-BlueHomz" : "text-BlackHomz "
                                    }`}
                                onClick={handlePageChangeThree}
                            >
                                <p className="text-[11px] md:text-[13px] font-500"> Offline Payments</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full md:w-auto justify-between md:justify-normal md:gap-1 items-center">
                        <div
                            onClick={openAddOfflinePayment}
                            className="flex flex-row gap-1 items-center cursor-pointer">
                            <AddBlueSmall />
                            <span className="text-[13px] font-[400] mt-[0.5px] text-BlueHomz">Add offline payment record</span>
                        </div>
                        <DropDownBlue
                            options={options}
                            onSelect={(option) => setSelectedOption(option)}
                            className={"text-[14px] font-[500]"}
                            width={"w-auto"}
                        />
                    </div>
                </div>
                <div className=" my-5  rounded-[12px]">
                    <div className={`${active ? "inline" : "hidden"}`}>
                        <AllData again={again} TenantId={id} TenantData={Data} />
                    </div>
                    <div className={`${activeTwo ? "inline" : "hidden"}`}>
                        <WalletPayement again={again} TenantId={id} TenantData={Data} />
                    </div>
                    <div className={`${activeThree ? "inline" : "hidden"}`}>
                        <OfflinePayment again={again} TenantId={id} TenantData={Data} />
                    </div>
                </div>
            </div>
            <CustomizedModal isOpen={offlinepay}>
                <SetOfflineData setAgain={setAgain} tenant={Data?.data?.fullName} id={id} setOfflinepay={setOfflinepay} successfullModal={successfullModal} />
            </CustomizedModal>
            <CustomizedModal isOpen={openModel}>
                <ConfirmModal
                    header={"Offline Payment Added Successfully"}
                    body={`You have successfully added an offline payment record for ${Data?.data?.fullName}`}
                    button={"Close"}
                    returnHome={successfullModal}
                />
            </CustomizedModal>
            <div style={{ display: 'none' }}>
                <PrintableAll
                    printRef={printRefAll}
                    data={DataTwo}
                    Data={Data?.data}
                />
            </div>
        </div>
    );
};

export default Widget;
