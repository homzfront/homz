"use client";
import React, { useState } from "react";
import Minus from "../../components/icons/Minus";
import Plus from "../../components/icons/Plus";

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
        "How user-friendly is the software, and what kind of training is required?",
      answer:
        "Our software is designed with simplicity in mind, and minimal training is needed.",
    },
    {
      id: 2,
      question:
        "Is my financial information secure when using the software for rent payments?",
      answer:
        "Yes, we prioritize the security of your financial information. Our software uses encryption and follows industry standards to protect your data.",
    },
    {
      id: 3,
      question: "How can I request maintenance services through the software?",
      answer:
        "It's easy! Simply navigate to the maintenance section on the platform, fill out a brief request form, and the property management will address it promptly.",
    },
    {
      id: 4,
      question:
        "Can I receive notifications for important updates and announcements from property management?",
      answer:
        "Yes, our software allows you to customize your notification preferences, ensuring you receive important updates in real-time.",
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
    <div className="mt-[140px] mb-[60px] max-w-[1160px] m-auto px-6">
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
            className={`flex flex-col max-w-[380px] gap-2 h-auto pb-4 border-b-2 md:max-w-[768px] m-auto cursor-pointer ${
              expandedFAQs[data.id] ? "expanded" : ""
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
        <p className="md:text-[18px] text-center md:text-start text-[16px]  font-[400] ">
          Can’t find the answer you’re looking for? Please send a message to us.
        </p>
        <button className="text-BlueHomz mt-4 w-[134px] h-[48px] rounded-md bg-white p-1 hover:bg-transparent hover:border hover:border-white  hover:text-white">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default FAQs;
