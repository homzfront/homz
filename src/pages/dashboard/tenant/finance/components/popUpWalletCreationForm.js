"use client"
import React, { useEffect, useState } from "react";
import WidgetTwo from "./widgetTwo";
import Image from "next/image";
import CreateTransactionPin from "./createTransactionPin";



const PopUpWalletCreationForm = ({ closeForm, fetchDataAgain }) => {

  return (
    <div className="">
      <div className="'w-full md:w-[550px]">
        <CreateTransactionPin closeForm={closeForm} fetchDataAgain={fetchDataAgain}/>
      </div>
    </div>
  );
};

export default PopUpWalletCreationForm;
