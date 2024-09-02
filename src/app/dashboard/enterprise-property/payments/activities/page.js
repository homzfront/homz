"use client"
import ArrowLeftSmall from '@/components/icons/arrowLeftSmall';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Widget from './widget/widget';
import WidgetMobile from './widget/widgetMobile';
import api from '@/utils/api';

const Activities = () => {
    const [currentData, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchData = async (page) => {
            setLoading(true);
            try {
                if (selectedDate) {
                    const response = await api.get(`/wallet/activies/enterprise?page=${page}&startDate=${selectedDate}`);
                    const result = response?.data;
                    setData(result?.data);
                    setTotalPages(result?.pagination?.totalPages);
                    setLoading(false);
                } else {
                    const response = await api.get(`/wallet/activies/enterprise?page=${page}`);
                    const result = response?.data;
                    setData(result?.data);
                    setTotalPages(result?.pagination?.totalPages);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData(currentPage);
    }, [currentPage, selectedDate]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const firstThreePages = [1, 2, 3];
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

    const clear = () => {
        if (selectedDate) {
            setSelectedDate(null);
        }
    };

    return (
        <div className='p-6'>
            <div className='flex gap-3 items-center'>
                <Link
                    href={"/dashboard/enterprise-property/payments?tab=wallet"}
                    className='flex gap-1 items-center'
                >
                    <ArrowLeftSmall />
                    <p className='text-[14px] font-[400] text-GrayHomz2'>
                        Go Back
                    </p>
                </Link>
                <p className='text-[20px] font-[500] text-BlackHomz'>
                    Activities
                </p>
            </div>

            <div className="hidden md:block">
                {(
                    <div>
                        <div>
                            <Widget
                                firstThreePages={firstThreePages}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handleNext={handleNext}
                                handlePageClick={handlePageClick}
                                handlePrev={handlePrev}
                                lastThreePages={lastThreePages}
                                currentData={currentData}
                                loading={loading}
                                setSelectedDate={setSelectedDate}
                                clear={clear}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='md:hidden'>
                {(
                    <div>
                        <div>
                            <WidgetMobile 
                             firstThreePages={firstThreePages}
                             currentPage={currentPage}
                             totalPages={totalPages}
                             handleNext={handleNext}
                             handlePageClick={handlePageClick}
                             handlePrev={handlePrev}
                             lastThreePages={lastThreePages}
                             currentData={currentData}
                             loading={loading}
                             setSelectedDate={setSelectedDate}
                             selectedDate={selectedDate}
                             clear={clear}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Activities;