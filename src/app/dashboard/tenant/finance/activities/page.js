"use client"
import ArrowLeftSmall from '@/components/icons/arrowLeftSmall';
import Link from 'next/link';
import React, { useState } from 'react'
import Widget from './widget/widget';
import WidgetMobile from './widget/widgetMobile';

const Activities = () => {
    const Data = [
        {
            Id: 1, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "transfer"
        },
        {
            Id: 2, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
        {
            Id: 3, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "deposited"
        },
        {
            Id: 4, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000", tyepe: "withdrawal"
        },
        {
            Id: 5, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "transfer"
        },
        {
            Id: 6, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
        {
            Id: 7, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "deposited"
        },
        {
            Id: 8, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000", tyepe: "withdrawal"
        },
        {
            Id: 9, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "deposited"
        },
        {
            Id: 10, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000", tyepe: "withdrawal"
        },
        {
            Id: 11, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "deposited"
        },
        {
            Id: 12, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000", tyepe: "withdrawal"
        },
        {
            Id: 13, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
        {
            Id: 14, From: "You", Status: "Receive", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "deposited"
        },
        {
            Id: 15, From: "You", Status: "Sent", To: "your bank account", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N1, 500,000", tyepe: "withdrawal"
        },
        {
            Id: 16, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "transfer"
        },
        {
            Id: 17, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
        {
            Id: 18, From: "Adeyemo Olayemi", Status: "Receive", To: "you", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N4, 000,000", tyepe: "transfer"
        },
        {
            Id: 19, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
        {
            Id: 20, From: "You", Status: "Sent", To: "Adeyemo Olayemi", Image: "/static/dashboard/enterprisemanager/payment/Avatar.png", TransDate: "16 Nov, 2024", Amount: "N500,000", tyepe: "transfer"
        },
    ];

    const [selectedDate, setSelectedDate] = useState(null);
    const clear = () => {
        setSelectedDate(null)
    };
    const filteredData = Data?.filter(
        (data) => {
            // const selectedDateTimestamp = Date.parse(selectedDate);
            // const dueDateTimestamp = Date.parse(formatDateII(data?.requestDate));
            // return (
            //     (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
            // );
        });

    return (
        <div className='p-6'>
            <div className='flex gap-3 items-center'>
                <Link
                    href={"/dashboard/tenant/finance"}
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
                {Data && (
                    <div>
                        <div>
                            <Widget data={Data} />
                        </div>
                    </div>
                )}
            </div>
            <div className='md:hidden'>
                {Data && (
                    <div>
                        <div>
                            <WidgetMobile data={Data} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Activities;