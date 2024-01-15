"use client";
import React, { useEffect, useState } from "react";
import AcAndRejModalII from "../modals/acAndRejModalII";
import ConfirmWallet from "../modals/confirmWallet";

const Wallet = ({
  selectedSavings = null,
  closeWallet,
  setData,
  data = null,
}) => {
  if (!selectedSavings) {
    return null
  }
  const [showConfirm, setShowConfirm] = useState(false);

  const confirm = () => {
    // Add the amountToSave back to the wallet
    const updatedWalletBalance =
      parseInt(data[0].wallet) + parseInt(selectedSavings.amountToSave);

    // Update the wallet balance in the data
    setData((prevData) => [
      {
        ...prevData[0],
        wallet: updatedWalletBalance.toString(),
        Data: prevData[0].Data.map((item) =>
          item.id === selectedSavings.id ? { ...item, amountToSave: 0 } : item
        ), // Set amountToSave to empty string for the selectedSavings
      },
    ]);

    // Close the wallet component
    closeWallet();
    setShowConfirm(true);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log(selectedSavings);

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {showConfirm ? (
        <ConfirmWallet
          header={"Withdrawal Successful"}
          body={`${selectedSavings.savingsName} has successfully been sent to your wallet`}
          button={"Go To Wallet"}
          buttonTwo={"Close"}
          returnHomeTwo={closeWallet}
        />
      ) : (
        <AcAndRejModalII
          header={"Proceed To Withdraw Savings?"}
          body={`Your rent savings of N${formatNumberWithCommas(
            selectedSavings.amountToSave
          )} will be sent to your wallet`}
          button={"Yes"}
          buttonTwo={"Cancel"}
          returnHome={confirm}
          returnHomeTwo={closeWallet}
        />
      )}
    </div>
  );
};

export default Wallet;
