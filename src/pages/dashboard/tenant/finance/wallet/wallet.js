import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance/walletBalance";
import TransferHis from "./components/transferHis/transferHis";
import Withdraw from "./components/withdraw/withdraw";
import Activities from "./components/activities/ativities";
import { tenantUserWallet } from "@/api/tenantSevice";
import LoadingII from "@/components/mainmenu/loadingII";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallet = ({ activeTwo }) => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");
  const [showKYC, setShowKYC] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await tenantUserWallet();
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
      <div className="w-full flex flex-col md:flex-row gap-8 px-8">
        <div className="flex flex-col w-full md:w-[50%] gap-4 md:h-[400px] justify-between">
          <div>
            <WalletBalance
              illuminateWallet={illuminateWallet}
              fetchDataAgain={fetchDataAgain}
              wallet={wallet}
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
