"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StartConversionPopUp from "./startConversionPopUp";
import useConversationStore from "@/store/useConversationStore";
import Message from "./message";

const StartConversation = () => {
  const [startConvo, setStartConvo] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const { Data, setSelection } = useConversationStore();


  // useEffect to handle scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.body.style.overflow = startConvo ? "hidden" : "auto";
    if (startConvo) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [startConvo]);

  const handleStartConvo = () => {
    setStartConvo(!startConvo);
  };

  const dropStartConvo = () => {
    setStartConvo(false);
  };

  const onSelectData = (data) => {
    setSelection(data);
    setSelectedData(data);
    setSelectedTenantId(!selectedTenantId)
    setStartConvo(false)
  }

  return (
    <div>
      {selectedTenantId ? (
        <div>
            <Message/>
        </div>
      ) : (
        <div className=" h-[550px] w-full flex justify-center items-center flex-col">
          <p className="text-[20px] font-[700] text-BlackHomz">
            You have no messages yet
          </p>
          <p className="text-[16px] font-[400] text-GrayHomz">
            Click on the button below to start a new conversation with a tenant
          </p>
          <div className="cursor-pointer" onClick={handleStartConvo}>
            <Image
              src={
                "/static/dashboard/enterprisemanager/notification/message-add.png"
              }
              height={82}
              width={82}
              alt="img"
            />
          </div>
          {startConvo && (
            <div className="absolute top-0 z-20 h-screen w-full inset-0 flex  justify-center bg-black bg-opacity-30">
              <StartConversionPopUp
                dropStartConvo={dropStartConvo}
        
                onSelectData={onSelectData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartConversation;
