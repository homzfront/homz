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
import Eye from "@/components/icons/Eye";
import BashedEye from "@/components/icons/BashedEye";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import addCommasToNumber from "@/utils/addCommasToNumber";

const Withdraw = ({
  illuminateWallet,
  fetchDataAgain,
  setIlluminateWallet,
}) => {
  const [fillBankDetails, setFillBankDetails] = useState(false);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const { loading: loadingAcctInfo, bankdata, fetchData: fetchDataBankAcct, noBank } = UseBankDataStore();
  const [withdraw, setWithdraw] = useState(false);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

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
    if (pincode != Number(pincode)) {
      setError("Input 4 digits");
      setLoading(false);
      return;
    }
    if (pincode.length !== 4) {
      setError("Wallet pin must be 4 characters long.");
      setLoading(false);
      return;
    }

    const bankDetails = {
      amount: amount,
      pincode: pincode
    };
    try {
      const { success, upDateddata, error } = await withdrawPropertyOwner(
        bankDetails
      );
      if (success) {
        setLoading(false);
        setSuccessModal(true);
        setError(null)
      } else {
        setLoading(false);
        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          setError(`${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          setError(`${errorMessage}`);
        }
        else if (error?.response?.data?.error) {
          const errorMessage = error.response.data.error;
          setError(`${errorMessage}`);
        }
        else {
          setError("Update failed");
        }
      }
    } catch (error) {
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        setError(`${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setError(`${errorMessage}`);
      } else {
        setError("Update failed");
      }
    }
  };

  return (
    <div className="mt-4 p-5 border rounded-[12px] flex flex-col gap-4 w-[100%]">
      <CustomizeModal isOpen={successModal}>
        <div className="p-2 m-auto bg-white h-auto rounded-md">
          <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
              }
              alt=""
              height={48}
              width={48}
            />
            <h1 className="text-BlackHomz text-center font-[700] text-[20px]">Withdrawal Processing</h1>
            <p className="text-GrayHomz text-center font-[400] text-[16px]">Your withdrawal of <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(amount)} will be credited into your account in 24 hours</p>
            <button
              onClick={() => {
                setSuccessModal(false)
                setWithdraw(false);
                setAmount("");
                setPincode("");
                fetchDataAgain();
              }}
              className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
            >
              Close
            </button>
          </div>
        </div>
      </CustomizeModal>
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

          {
            withdraw ? <div className={`flex flex-col gap-4 mt-4 ${loading ? "pointer-events-none" : ""}`}>
              <Input
                value={amount}
                label={"Amount (N)"}
                placeholder={"200,000"}
                changeInput={(e) => {
                  setAmount(e.target.value)
                  setError(null)
                }}
              />
              <div className="relative">
                <label className="text-[13px] font-[500]">
                  Transaction pin
                </label>
                <input
                  type={visible ? "text" : "password"}
                  value={pincode}
                  className='w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]'
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setError(null);
                  }}
                />
                <div className="absolute top-[37px] right-4" onClick={Visible}>
                  {visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <BashedEye className="w-4 h-4" />
                  )}
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-[12px] mt-1">{error}</p>
              )}
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
            </div> :
              <div
                onClick={() => setWithdraw(true)}
                className={`bg-BlueHomz text-white mt-4 w-[full] h-[45px] rounded-md flex justify-center items-center cursor-pointer`}
              >
                Withdraw
              </div>
          }
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
