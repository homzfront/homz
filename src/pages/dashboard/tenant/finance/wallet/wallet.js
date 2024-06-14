import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance/walletBalance";
import TransferHis from "./components/transferHis/transferHis";
import Withdraw from "./components/withdraw/withdraw";
import Activities from "./components/activities/ativities";
import { tenantWallet, tenantWalletBalance } from "@/api/tenantSevice";
import LoadingII from "@/components/mainmenu/loadingII";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tenantRentHis from "@/store/tenantStore/tenantRentHis";
import { tenantWalletStore } from "@/store/tenantStore/useTenantWallet";

const Wallet = ({ activeTwo }) => {
  // const [illuminateWallet, setIlluminateWallet] = useState(true);
  const { data, fetchData: fetchRentInfo } = tenantRentHis();
  const { wallet, walletBalance, loading, fetchData: walletData, illuminateWallet } = tenantWalletStore();

  useEffect(() => {
    walletData()
    if (wallet !== null) {
      fetchRentInfo()
    }
  }, [])

  const fetchDataAgain = () => {
    walletData();
    fetchRentInfo()
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
      <div className="w-full flex gap-8 px-8">
        <div className="flex flex-col w-[50%] h-[400px] justify-between">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              fetchDataAgain={fetchDataAgain}
              wallet={wallet}
              activeTwo={activeTwo}
              walletBalance={walletBalance}
              loading={loading}
            />
          </div>
          {/* <div>
            <Withdraw illuminateWallet={illuminateWallet} />
              </div> */}
          <div>
            {/* <Activities illuminateWallet={illuminateWallet} /> */}
          </div>
        </div>
        <div className="w-[50%]">
          <TransferHis illuminateWallet={illuminateWallet} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
