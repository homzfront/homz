"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../../components/button";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";


const OfflinePayment = ({ data }) => {
    const ITEMS_PER_PAGE = 3;

    const walletData = data.filter(dat => dat.paymentMethod !== "Wallet");

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(walletData?.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentData = walletData?.slice(startIndex, endIndex);

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Use reduce to generate an array of the first three pages
    const firstThreePages = Array.from(
        { length: Math.min(totalPages, 3) },
        (_, index) => index + 1
    );


    return (
        <div className="mt-6 w-full mx-auto">
            <div className="border overflow-x-auto scrollbar-container">
                <div className="w-[500%] md:w-[200%]">
                    <table border="1" className="w-full">
                        <thead>
                            <tr className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz">
                                <th className="text-left pl-4" style={{ width: "120px" }}>Tenant</th>
                                <th className="text-left" style={{ width: "100px" }}>Rent Amount</th>
                                <th className="text-left" style={{ width: "110px" }}>Due Date</th>
                                <th className="text-left" style={{ width: "110px" }}>Payment Status</th>
                                <th className="text-left" style={{ width: "110px" }}>Amount Paid</th>
                                <th className="text-left" style={{ width: "120px" }}>Description</th>
                                <th className="text-left" style={{ width: "120px" }}>Rent Duration</th>
                                <th className="text-left" style={{ width: "120px" }}>Payment Method</th>
                                <th className="text-left" style={{ width: "120px" }}>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData &&
                                currentData?.map((data) => (
                                    <tr
                                        key={data?.id}
                                        className={`w-2 border-t-[1px] items-center`}
                                    >
                                        <td className="flex items-center gap-1 pr-2 py-[15px] pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                            {!data?.image ? (
                                                <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                                                    <EmptyAvatar />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={data?.image}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    layout="full" // Specify the desired height
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="object-cover bg-center h-[40px] rounded-full"
                                                    priority
                                                />
                                            )}
                                            <span className="">{data?.tenantName}</span>
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.rentAmount)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.dueDate}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                            {data?.paymentStatus === "Unpaid" ?
                                                <div className="bg-warningBg text-warning rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    Pending
                                                </div> :
                                                <div className="bg-successBg text-Success rounded-md py-1 w-[95px] flex items-center justify-center">
                                                    {capitalizeFirstLetter(data?.paymentStatus)}
                                                </div>}
                                        </td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{addCommasToNumber(data?.amountPaid)}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.description}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.rentDuration}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paymentMethod}</td>
                                        <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">{data?.paymentDate}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Button
                firstThreePages={firstThreePages}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePageClick={handlePageClick}
                handlePrev={handlePrev}
            />
        </div>
    );
}

export default OfflinePayment