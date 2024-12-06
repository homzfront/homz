"use client"
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TenantsTwo from "../firstPage/tenantsTwo";
import TableFilter from "@/store/enterpriseStore/tableFilter";

const Widget = ({
    Data,
    selectedRows,
    setSelectedRows,
    fetchDataAgain,
    isMasterChecked,
    setIsMasterChecked,
    printableRef }) => {
    const { active: activeTab, setActive: setActiveTab, Data: KeptData, setData } = TableFilter();

    useEffect(() => {
        setData(Data)
    }, [])

    const RefinedData = activeTab ? Data?.sort((a, b) => {
        // Prioritize overdue payments
        if (a.rentInfo.paymentStatus === "over due" && b.rentInfo.paymentStatus !== "over due") return -1;
        if (a.rentInfo.paymentStatus !== "over due" && b.rentInfo.paymentStatus === "over due") return 1;

        // For same status, prioritize older due dates
        if (a.rentInfo.paymentStatus === b.rentInfo.paymentStatus) {
            return new Date(a.rentInfo.dueDate) - new Date(b.rentInfo.dueDate);
        }

        // Default order: pending after overDue
        if (a.rentInfo.paymentStatus === "pending" && b.rentInfo.paymentStatus !== "pending") return 1;
        if (a.rentInfo.paymentStatus !== "pending" && b.rentInfo.paymentStatus === "pending") return -1;
        return 0;
    }) : KeptData

    const pages = [
        {
            id: 1, name: "All", component: <TenantsTwo
                Data={RefinedData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                fetchDataAgain={fetchDataAgain}
                isMasterChecked={isMasterChecked}
                setIsMasterChecked={setIsMasterChecked}
                printableRef={printableRef}

            />
        },
        {
            id: 2, name: "Due Date", component: <TenantsTwo
                Data={RefinedData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                fetchDataAgain={fetchDataAgain}
                isMasterChecked={isMasterChecked}
                setIsMasterChecked={setIsMasterChecked}
                printableRef={printableRef}
            />
        },
    ];
    const [active, setActive] = useState(pages[0].id);

    const handlePageChange = (id) => {
        setActive(id);
    };

    return (
        <div className="w-full max-w-[1440px]">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="w-auto h-auto py-4">
                <div className="flex mt-1 gap-2 sm:gap-4 cursor-pointer">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className={`flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id ? "bg-BlueHomz text-white" : "bg-whiteblue text-BlueHomz "
                                }`}
                            onClick={() => {
                                if (page.id === 2) {
                                    setActiveTab(true)
                                } else {
                                    setActiveTab(false)
                                }
                                handlePageChange(page.id)
                            }}
                        >
                            <p className={`text-[14px] font-500`}>{page.name}</p>
                        </div>
                    ))}
                </div>
                <div className="my-5 rounded-[12px] ">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className={active === page.id ? "inline" : "hidden"}
                        >
                            {page.component}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Widget;
