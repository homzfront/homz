"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TenantsTwoDueDate from "../firstPage/tenantsTwoDueDate";
import TableFilter from "@/store/enterpriseStore/tableFilter";
import useEnterpriseTenantStore from "@/store/enterpriseStore/useEnterpriseTenantStore";
// import { useSearchParams } from "next/navigation";
import useOpenDueDate from "@/store/enterpriseStore/useOpenDueDate";

const Widget = ({
    Data,
    selectedRows,
    setSelectedRows,
    fetchDataAgain,
    isMasterChecked,
    setIsMasterChecked,
    totalPages,
    setCurrentPage,
    currentPage,
    printableRef,
    loading
}) => {
    const {
        active: activeTab,
        setActive: setActiveTab,
        Data: KeptData,
        setData,
    } = TableFilter();
    const { setDueDatePage } = useEnterpriseTenantStore();
    const { tab } = useOpenDueDate();

    // Switch to the "Due Date" page (2) when the tab is "dueDate"
    useEffect(() => {
        if (tab === "dueDate") {
            setActive(2);
            setActiveTab(true);
            setDueDatePage(true);
        }
    }, [tab, setActiveTab, setDueDatePage]);


    useEffect(() => {
        setData(Data);
    }, [Data]);

    const RefinedData = activeTab
        ? Data
        : KeptData;

    const pages = [
        {
            id: 1,
            name: "All",
            component: (
                <TenantsTwoDueDate
                    Data={RefinedData}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    fetchDataAgain={fetchDataAgain}
                    isMasterChecked={isMasterChecked}
                    setIsMasterChecked={setIsMasterChecked}
                    printableRef={printableRef}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    loading={loading}
                />
            ),
        },
        {
            id: 2,
            name: "Due Date",
            component: (
                <TenantsTwoDueDate
                    Data={RefinedData}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    fetchDataAgain={fetchDataAgain}
                    isMasterChecked={isMasterChecked}
                    setIsMasterChecked={setIsMasterChecked}
                    printableRef={printableRef}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    loading={loading}
                />
            ),
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
                            className={`flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id
                                ? "bg-BlueHomz text-white"
                                : "bg-whiteblue text-BlueHomz "
                                }`}
                            onClick={() => {
                                if (page.id === 2) {
                                    setActiveTab(true);
                                    setDueDatePage(true);
                                } else {
                                    setActiveTab(false);
                                    setDueDatePage(false);
                                }
                                handlePageChange(page.id);
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
