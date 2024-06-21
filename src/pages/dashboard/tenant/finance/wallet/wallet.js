import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance/walletBalance";
import TransferHis from "./components/transferHis/transferHis";
import Withdraw from "./components/withdraw/withdraw";
import Activities from "./components/activities/ativities";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseWalletStore from "@/store/tenantStore/useWalletStore";

const Wallet = ({ activeTwo }) => {
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [data, setData] = useState(null);

  const { illuminateWallet, showKYC, data: walletInfo, fetchData: fetchWallet } = UseWalletStore();
  console.log(walletInfo)

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchDataAgain = () => {
    fetchWallet();
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
      <div className="w-full flex flex-col md:flex-row gap-8 px-8">
        <div className="flex flex-col w-full md:w-[50%] gap-4 md:h-[400px] justify-between">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              fetchDataAgain={fetchDataAgain}
              wallet={walletInfo}
              activeTwo={activeTwo}
              walletBalance={walletBalance}
              loading={loading}
              showKYC={showKYC}
            />
          </div>
          <div>
            <Withdraw illuminateWallet={illuminateWallet} />
          </div>
          <div>
            <Activities illuminateWallet={illuminateWallet} />
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <TransferHis illuminateWallet={illuminateWallet} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
