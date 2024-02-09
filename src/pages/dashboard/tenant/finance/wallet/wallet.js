import React, { useEffect, useState } from "react";
import WalletBalance from "./components/walletBalance/walletBalance";
import TransferHis from "./components/transferHis/transferHis";
import Withdraw from "./components/withdraw/withdraw";
import Activities from "./components/activities/ativities";
import { tenantWallet, tenantWalletBalance } from "@/api/tenantSevice";
import LoadingII from "@/components/mainmenu/loadingII";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wallet = ({ activeTwo }) => {
  const [wallet, setWallet] = useState(false);
  const [illuminateWallet, setIlluminateWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await tenantWallet();
        if (data.statuscode === 200 && data.success === true) {
          const balance = await tenantWalletBalance();
          setWalletBalance(balance);
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
        <div className="w-full flex gap-4 py-8">
          {" "}
          <div className="flex flex-col w-[550px] h-[400px] justify-between mx-8">
            <WalletBalance
              illuminateWallet={illuminateWallet}
              fetchDataAgain={fetchDataAgain}
              wallet={wallet}
              activeTwo={activeTwo}
              walletBalance={walletBalance}
              setIlluminateWallet={setIlluminateWallet}
              loading={loading}
            />
            {/* <Withdraw illuminateWallet={illuminateWallet} /> */}
            <Activities illuminateWallet={illuminateWallet} />
          </div>
          <div className="w-[500px]">
            <TransferHis illuminateWallet={illuminateWallet} />
          </div>
        </div>
    </div>
  );
};

export default Wallet;
