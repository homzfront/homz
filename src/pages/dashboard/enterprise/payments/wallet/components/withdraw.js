import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import BankForm from "../../components/bankForm";
import useBodyScroll from "@/utils/useBodyScroll";
import UseBankDataStore from "@/store/enterpriseStore/useBankDataStore";
import LoadingMutating from "@/components/mainmenu/loadingMutating";
import { bankCodes } from "@/api/bankCodes";

const Withdraw = ({ illuminateWallet }) => {
  const [fillBankDetails, setFillBankDetails] = useState(false);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const { loading: loadingAcctInfo, bankdata, fetchData: fetchDataBankAcct } = UseBankDataStore();



  useBodyScroll([fillBankDetails]);

  const handleAddBankDetails = () => {
    setFillBankDetails(!fillBankDetails);
  };

  const closeMenu = () => {
    setFillBankDetails(false);
  };

  useEffect(() => {
    fetchDataBankAcct();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fillBankDetails === true) {
        const data = await bankCodes();
        setBanks(data)
      }
    }
    fetchData()
  }, [fillBankDetails]);

  const fetchDataAgainII = () => {
    fetchDataBankAcct();
  };


  return (
    <div className="p-5 border rounded-[12px] flex flex-col gap-4 w-[100%] h-auto">
      <div className="flex gap-1 items-center">
        {illuminateWallet ? (
          <Image
            src={"/static/dashboard/enterprisemanager/payment/received.png"}
            width={20}
            height={21}
            alt=""
          />
        ) : (
          <Image
            src={"/static/dashboard/tenant/finance/received.png"}
            width={20}
            height={21}
            alt=""
          />
        )}

        <p
          className={`text-[14px] font-[500] ${illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
            } `}
        >
          Withdraw
        </p>
      </div>
      <p
        className={`text-[13px] font-[400]  ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
          }`}
      >
        Withdraw from your wallet balance to your local bank account
      </p>
      {loadingAcctInfo ? (
        <div className="w-full flex items-center justify-center">
          {" "}
          <LoadingMutating />{" "}
        </div>
      ) : bankdata && illuminateWallet ? (
        <div className="w-full">
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">
              Account Number
            </p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.accountNumber}
            </p>
          </div>
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">
              Account Name
            </p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.accountName}
            </p>
          </div>
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">Bank</p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.bankName}
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              value={amount}
              label={"Amount (N)"}
              placeholder={"200,000"}
              changeInput={(e) => setAmount(e.target.value)}
            />
            <div className=" bg-GrayHomz6 w-[full] h-[45px] rounded-md flex justify-center items-center">
              <span className=" text-GrayHomz2">Withdraw</span>
            </div>
          </div>
        </div>
      )
        :
        (
          <div
            className={`cursor-pointer rounded-md w-[212px] h-[37px] flex items-center justify-center  ${illuminateWallet
              ? "bg-BlueHomz"
              : "bg-GrayHomz6 pointer-events-none"
              }`}
            onClick={handleAddBankDetails}
          >
            <p className="text-[14px] font-[700] text-white">
              Add withdrawal destination
            </p>
          </div>
        )
      }
      {fillBankDetails && (
        <div>
          <BankForm closeMenu={closeMenu} fetchDataAgain={fetchDataAgainII} Banks={banks} />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
