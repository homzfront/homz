"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance";
import TransferDetails from "./components/transferDetails";
import Withdraw from "./components/withdraw";
import TransferHis from "./components/transferHis";
import {
  propertyOwnerWallet,
  propertyOwnerWalletBalance,
} from "@/api/propertyService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallet = () => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");

  useEffect(() => {
    console.log("Component mounted, fetching data...");
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await propertyOwnerWallet();
        if (data.statuscode === 200 && data.success === true) {
          console.log("Form successfully updated", data);
          setIlluminateWallet(!illuminateWallet);
          const balance = await propertyOwnerWalletBalance();
          setWalletBalance(balance);
          const wallet = data;
          setWallet(wallet);
          setLoading(false);
        } else {
          console.error("Fetching data failed", data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchData]);

  const fetchDataAgain = () => {
    setFetchData(!fetchData);
  };

  console.log(wallet);
  console.log(illuminateWallet);
  console.log(walletBalance);

  return (
    <div className="">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full flex gap-8">
        <div className="w-[50%]">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              wallet={wallet}
              fetchDataAgain={fetchDataAgain}
              walletBalance={walletBalance}
              loading={loading}
            />
          </div>
          <div>
            {/* <TransferDetails illuminateWallet={illuminateWallet} /> */}
          </div>
        </div>
        <div className="w-[50%]">
          <div>
            <Withdraw illuminateWallet={illuminateWallet} />
          </div>
          <div>
            <TransferHis illuminateWallet={illuminateWallet} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wallet;
