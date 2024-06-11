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

const Withdraw = ({
  illuminateWallet,
  fetchDataAgain,
  setIlluminateWallet,
}) => {
  const [bankDetails, setBankDetails] = useState([]);
  const [fillBankDetails, setFillBankDetails] = useState(false);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  const [amount, setAmount] = useState("");
  const [fetchData, setFetchData] = useState(false);

  // useEffect to handle scrolling
  useBodyScroll([fillBankDetails]);

  // Ensure Data is defined before use
  const bankdata = bankDetails || []; // Assign an empty array if Data is undefined

  const handleAddBankDetails = () => {
    setFillBankDetails(!fillBankDetails);
  };
  // console.log(bankDetails);
  const closeMenu = () => {
    setFillBankDetails(false);
  };

  useEffect(() => {
    // console.log("Component mounted, fetching data...");
    setLoadingII(true);
    const fetchData = async () => {
      try {
        const data = await bankCodes();
        setBanks(data);
        const bankData = await bankInfoPropertyOwner();
        setBankDetails(bankData);
        if (data.success === true) {
          setLoadingII(false);
        } else {
          setLoadingII(false);
        }
      } catch (error) {
        setLoadingII(false);
      }
    };

    fetchData();
  }, [fetchData]);

  const fetchDataAgainII = () => {
    setFetchData(!fetchData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create an object with the collected bank details
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
          className={`text-[14px] font-[500] ${
            illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
          } `}
        >
          Withdraw
        </p>
      </div>
      <p
        className={`text-[13px] font-[400]  ${
          illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
        }`}
      >
        Withdraw from your wallet balance to your local bank account
      </p>
      {loadingII ? (
        <div className="w-full flex items-center justify-center">
          {" "}
          <LoadingMutating />{" "}
        </div>
      ) : bankdata < 1 ? (
        <div
          className={` rounded-md w-[212px] h-[37px] flex items-center justify-center  ${
            illuminateWallet
              ? "bg-BlueHomz"
              : "bg-GrayHomz6 pointer-events-none"
          }`}
          onClick={handleAddBankDetails}
        >
          <p className="text-[14px] font-[700] text-white cursor-pointer">
            Add withdrawal destination
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">
              Account Number
            </p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.data?.accountNumber}
            </p>
          </div>
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">Account Name</p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.data?.accountName}
            </p>
          </div>
          <div className="flex gap-4 w-[240px] justify-between">
            <p className="text-[11px] font-[400] text-GrayHomz">Bank</p>
            <p className="text-[11px] font-[500] text-BlackHomz w-[120px] text-start">
              {bankdata?.data?.bankName}
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
              className={`${
                amount !== ""
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
      )}
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
