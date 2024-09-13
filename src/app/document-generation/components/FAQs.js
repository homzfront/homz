"use client";
import React, { useState } from "react";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Link from "next/link";
import DocFaqDoc from "@/components/icons/docFaqDoc";
import DocFaqDocII from "@/components/icons/docFaqDocII";
import useProfileStore from '@/store/profile';
import determineRoute from '@/utils/determineRoute';

const FAQs = () => {
    const { profile } = useProfileStore();
    const manager = "/dashboard/enterprise-property/dashboard"
    const page = determineRoute(profile, manager);
    const [expandedFAQs, setExpandedFAQs] = useState({});
    const toggleFAQ = (id) => {
        setExpandedFAQs((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const FAQsData = [
        {
            id: 1,
            question:
                "How do I create a tenancy agreement?",
            answer:
                "Choose the tenancy agreement template, fill in the necessary details, review the document, and generate it."
        },
        {
            id: 2,
            question: "Can I customize the document templates?",
            answer:
                "Yes, all our document templates can be customized to fit your specific needs and preferences."
        },
        {
            id: 3,
            question:
                "Is there a limit to the number of documents I can generate?",
            answer:
                "You can only generate 3 documents on free trial but you have access to unlimited document generation once you subscribe to our enterprise plan."
        },
    ];
    return (
        <div className="mt-[100px] md:mt-[160px] max-w-[1160px] w-full m-auto mb-[60px] bg-whiteblue rounded-[12px] p-8">
            <div className="flex flex-col justify-center items-center">
                <h1 className="sm:text-[36px] text-[23px]  font-[700] text-center text-BlackHomz">
                    Frequently Asked Questions
                </h1>
                <p className="sm:text-[20px] text-[18px] font-[500] text-center text-GrayHomz">
                    Everything you need to know about our document generation.
                </p>
            </div>
            <div>
                {FAQsData.map((data) => (
                    <div
                        key={data.id}
                        className={`flex flex-col max-w-[380px] gap-2 h-auto pb-4 border-b-2 md:max-w-[768px] m-auto cursor-pointer ${expandedFAQs[data.id] ? "expanded" : ""
                            }`}
                        onClick={() => toggleFAQ(data.id)}
                    >
                        <div className="mt-[50px] flex justify-between flex-row">
                            <h3 className="md:text-[18px] text-[16px] font-[500] text-BlackHomz pr-2">
                                {data.question}
                            </h3>
                            <div className="mt-[5px]">
                                {" "}
                                {expandedFAQs[data.id] ? <Minus /> : <Plus />}
                            </div>
                        </div>
                        {expandedFAQs[data.id] && (
                            <p className="text-[16px] text-GrayHomz font-[400]">
                                {data.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-[60px]">
                <div className="md:h-[210px] text-white flex justify-between bg-BlueHomz px-8 py-4 rounded-[16px] ">
                    <div className="hidden md:flex flex-col justify-between">
                        <div className="h-[50%]"></div>
                        <div className="h-[50%] flex flex-col justify-end">
                            <div className="h-[40px] w-[40px] flex items-center justify-center bg-whiteblue opacity-60 rounded-full">
                                <DocFaqDoc />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:h-[210px] gap-2 max-w-[1159px]">
                        <h1 className="text-[20px] font-[600] text-center">Ready to Simplify Your Property Management?</h1>
                        <p className="md:text-[18px] text-center md:text-start text-[16px] font-[400] text-walletBg">
                            Get started today and experience the ease of automated document generation.
                        </p>
                        <Link href={profile ? page : "/register"}>
                            <button className="text-BlueHomz mt-4 p-3 rounded-md bg-white hover:bg-transparent hover:border hover:border-white  hover:text-white">
                                Start Free Trial Now
                            </button>
                        </Link>
                    </div>
                    <div className="hidden md:flex flex-col justify-start">
                        <div className="h-[40px] w-[40px] flex items-center justify-center bg-whiteblue opacity-60 rounded-full">
                            <DocFaqDocII />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQs