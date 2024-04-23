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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await enterpriseUserWallet();
        if (data.statuscode === 200 && data.success === true  && data.data !== null) {
          setIlluminateWallet(!illuminateWallet);
          const balance = await enterpriseWalletBalance();
          setWalletBalance(balance);
          const wallet = data;
          setWallet(wallet);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
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
          </div>
        </div>
        <div className="w-[50%]">
          <TransferDetails
            illuminateWallet={illuminateWallet}
            setIlluminateWallet={setIlluminateWallet}
            fetchDataAgain={fetchDataAgain}
          />
          {/* <div>
            <Withdraw illuminateWallet={illuminateWallet} />
          </div> */}
          <div>
            {/* <TransferHis illuminateWallet={illuminateWallet} /> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wallet;
