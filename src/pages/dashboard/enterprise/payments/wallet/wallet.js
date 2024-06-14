"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance";
import TransferDetails from "./components/transferDetails";
import Withdraw from "./components/withdraw";
import TransferHis from "./components/transferHis";
import {
  enterpriseUserWallet,
  enterpriseWalletBalance,
} from "@/api/enterpriseManagerService";


const Wallet = () => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [showKYC, setShowKYC] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await enterpriseUserWallet();
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
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[50%]">
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
          <div className="mt-6">
            <TransferDetails
              illuminateWallet={illuminateWallet}
              setIlluminateWallet={setIlluminateWallet}
              fetchDataAgain={fetchDataAgain}
            />
          </div>
          <div>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
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
