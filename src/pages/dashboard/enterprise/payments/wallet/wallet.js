"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance";
import TransferDetails from "./components/transferDetails";
import Withdraw from "./components/withdraw";
import TransferHis from "./components/transferHis";
import UseWalletStore from "@/store/enterpriseStore/useWalletStore";


const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");

  const { illuminateWallet, showKYC, data: walletInfo, fetchData: fetchWallet } = UseWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchDataAgain = () => {
    fetchWallet();
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-[50%]">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              wallet={walletInfo}
              fetchDataAgain={fetchDataAgain}
              walletBalance={walletBalance}
              loading={loading}
              showKYC={showKYC}
            />
          </div>
          <div className="mt-6">
            <TransferDetails
              illuminateWallet={illuminateWallet}
              setIlluminateWallet={null}
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
