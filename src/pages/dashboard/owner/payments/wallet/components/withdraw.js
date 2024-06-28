import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import BankForm from "../../components/bankForm";
import useBodyScroll from "@/utils/useBodyScroll";
import { bankCodes } from "@/api/bankCodes";
import {
  bankInfoPropertyOwner,
  withdrawPropertyOwner,
} from "@/api/propertyService";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import LoadingMutating from "@/components/mainmenu/loadingMutating";
import { toast } from "react-toastify";
import UseBankDataStore from "@/store/propertyOwnerStore/useBankDataStore";

const Withdraw = ({
  illuminateWallet,
  fetchDataAgain,
  setIlluminateWallet,
}) => {
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
  }, [fillBankDetails])

  const fetchDataAgainII = () => {
    fetchDataBankAcct();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bankDetails = {
      amount: amount,
    };

    try {
      const { success, upDateddata, error } = await withdrawPropertyOwner(
        bankDetails
      );
      if (success) {
        setIlluminateWallet(false);
        setLoading(false);
        fetchDataAgain();
        setAmount("");
        toast.success("withdrawal successfull");
        // // Add the bank details to the bankDetails state
        // setBankDetails((prevBankDetails) => [...prevBankDetails, bankDetails]);

        // setShowSubmitted(!showSubmitted);
      } else {
        // setError(error?.message);
        setLoading(false);
        toast.error(error);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <div className="mt-4 p-5 border rounded-[12px] flex flex-col gap-4 w-[100%]">
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
            <p className="text-[11px] font-[400] text-GrayHomz">Account Name</p>
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
            <div
              onClick={handleSubmit}
              className={`${amount !== ""
                ? "bg-BlueHomz text-white"
                : "text-GrayHomz2 bg-GrayHomz6 pointer-events-none"
                }  w-[full] h-[45px] rounded-md flex justify-center items-center cursor-pointer`}
            >
              <span className={loading ? "pointer-events-none" : ""}>
                {loading ? <LoadingFormII /> : "Withdraw"}
              </span>
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
          <BankForm
            closeMenu={closeMenu}
            Banks={banks}
            fetchDataAgain={fetchDataAgainII}
          />
        </div>
      )}
    </div>
  );
};

export default Withdraw;
