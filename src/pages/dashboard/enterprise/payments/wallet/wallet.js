"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance";
import TransferDetails from "./components/transferDetails";
import Withdraw from "./components/withdraw";
import TransferHis from "./components/transferHis";
import { enterpriseUserWallet } from "@/api/enterpriseManagerService";
import LoadingII from "@/components/mainmenu/loadingII";

const Wallet = () => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await enterpriseUserWallet();
        if (data.statuscode === 200 && data.success === true) {
          console.log("Form successfully updated", data);
          setIlluminateWallet(!illuminateWallet);
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

  return (
    <div className="">
      {loading ? (
        <LoadingII />
      ) : (
        <div className="w-full flex gap-8">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              wallet={wallet}
              fetchDataAgain={fetchDataAgain}
            />
            <TransferDetails illuminateWallet={illuminateWallet} />
          </div>
          <div>
            <Withdraw illuminateWallet={illuminateWallet} />
            <TransferHis illuminateWallet={illuminateWallet} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
