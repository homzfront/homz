"use client"
import React, { useEffect, useState } from "react";
import WidgetTwo from "./widgetTwo";
import Image from "next/image";
import CreateTransactionPin from "./createTransactionPin";



const PopUpWalletCreationForm = ({ closeForm, fetchDataAgain }) => {

  return (
    <div className="absolute px-0 top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="'w-full md:w-[550px]">
        <CreateTransactionPin closeForm={closeForm} fetchDataAgain={fetchDataAgain}/>
      </div>
    </div>
  );
};

export default PopUpWalletCreationForm;
