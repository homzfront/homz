"use client";
import React, { useState } from "react";
import Minus from "../../components/icons/Minus";
import Plus from "../../components/icons/Plus";
import Link from "next/link";

const FAQs = () => {
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
        "How do you handle property maintenance, and what role do property owners play in the process?",
      answer:
        "  We streamline property maintenance with an efficient process. Property owners are informed of maintenance requests, and our team coordinates all necessary actions, ensuring a hassle-free experience for both owners and tenants.",
    },
    {
      id: 2,
      question:
        "What measures do you take to protect the property and its value during tenant occupancy?",
      answer:
        "  We conduct regular property inspections, address maintenance needs promptly, and enforce lease agreements to protect your property. Our goal is to maintain and enhance the value of your investment throughout tenancy.",
    },
    {
      id: 3,
      question: "How do I get started with your property management services?",
      answer:
        "  Simply click on the “Get started” buttons or reach out to us via our contact page. We'll guide you through the onboarding process and discuss how our services align with your property management goals.",
    },
    {
      id: 4,
      question:
        "Is there ongoing communication with property owners, and how can I stay informed about my property's status?",
      answer:
        "  Communication is key. We provide regular updates through the dedicated dashboard, monthly statements, and responsive customer support. Property owners are always in the loop regarding their property's status and performance.",
    },
    {
      id: 5,
      question:
        "Can I access the software from different devices and locations?",
      answer:
        "Yes, our software is cloud-based, allowing you to access it securely from any device with an internet connection, providing flexibility in managing your properties from various locations.",
    },
  ];
  return (
    <div className="mt-[160px] max-w-[1160px] m-auto px-6 mb-[60px]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="sm:text-[36px] text-[23px] font-[700] text-center text-BlackHomz">
          Frequently asked questions
        </h1>
        <p className="sm:text-[20px] text-[18px] font-[500] text-center text-GrayHomz">
          Everything you need to know about our management solution.
        </p>
      </div>

      <div>
        {FAQsData.map((data) => (
          <div
            key={data.id}
            className={`flex flex-col  max-w-[380px] gap-2 h-auto pb-4 border-b-2 md:max-w-[768px] m-auto cursor-pointer ${expandedFAQs[data.id] ? "expanded" : ""
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

      <div className="mt-[60px] text-white flex flex-col justify-center items-center h-[210px] gap-2  max-w-[1159px] rounded-md bg-BlueHomz">
        <h1 className="text-[20px] font-[600]">Still have questions?</h1>
        <p className="md:text-[18px] text-center md:text-start text-[16px] font-[400] ">
          Can’t find the answer you’re looking for? Please send a message to us.
        </p>
        <Link
          // href={"https://forms.gle/aCwKh8aW7goPoRGWA"}>
          href={"/contact-page"}>
          <button className="text-BlueHomz mt-4 w-[134px] h-[48px] rounded-md bg-white p-1 hover:bg-transparent hover:border hover:border-white  hover:text-white">
            Get in touch
            {/* Join Waitlist */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FAQs;
