import React, { useEffect } from "react";
import WalletBalance from "./components/walletBalance/walletBalance";
import TransferHis from "./components/transferHis/transferHis";
import Activities from "./components/activities/ativities";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseWalletStore from "@/store/tenantStore/useWalletStore";

const Wallet = () => {
  const { rentHis, illuminateWallet, walletBalance, showKYC, walletPin, fetchData: fetchWallet, rentData, walletActivities } = UseWalletStore();

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
        <div className="flex flex-col w-full md:w-[50%] gap-4 md:h-[400px]">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              fetchDataAgain={fetchDataAgain}
              walletPin={walletPin}
              walletBalance={walletBalance}
              showKYC={showKYC}
              rentData={rentData}
            />
          </div>
          <div>
            {/* <Withdraw illuminateWallet={illuminateWallet} /> */}
          </div>
          <div>
            <Activities walletActivities={walletActivities} illuminateWallet={illuminateWallet} />
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <TransferHis illuminateWallet={illuminateWallet} data={rentHis} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
