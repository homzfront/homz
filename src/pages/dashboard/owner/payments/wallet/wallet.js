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
import tenantRentHisOwner from "@/store/propertyOwnerStore/tenantRentHisOwner";

const Wallet = () => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [showKYC, setShowKYC] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // fetchRentInfo()
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await propertyOwnerWallet();
        if (data.statuscode === 200 && data.success === true && data.data !== null) {
          setIlluminateWallet(!illuminateWallet);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        if (error?.response?.data?.message === "Please add a valid  National Identity Number or international Passport, before creating / viewing a wallet") {
          setShowKYC(true);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchData]);

  const fetchDataAgain = () => {
    setFetchData(!fetchData);
  };

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
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="md:w-[50%]">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              wallet={wallet}
              fetchDataAgain={fetchDataAgain}
              walletBalance={walletBalance}
              loading={loading}
              showKYC={showKYC}
            />
          </div>
          <div>
            <Withdraw illuminateWallet={illuminateWallet} />
            {/* <TransferDetails illuminateWallet={illuminateWallet} /> */}
          </div>
        </div>
        <div className="md:w-[50%]">
          <div>
          </div>
          <div>
            <TransferHis illuminateWallet={illuminateWallet} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
