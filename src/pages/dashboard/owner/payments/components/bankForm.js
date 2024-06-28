import Image from "next/image";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmModal from "../../components/confirmModal";
import BankSelect from "./selectBank";
import { addBankPropertyOwner } from "@/api/propertyService";
import { VerifyBank } from "@/api/bankCodes";
import Loading from "@/components/mainmenu/loading";
import LoadingForm from "@/components/mainmenu/loadingForm";

const BankForm = ({
  closeMenu,
  fetchDataAgain,
  Banks,
}) => {

  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [errorName, setErrorName] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingBank, setLoadingBank] = useState(false)

  useEffect(() => {
    const fetchBankName = async () => {
      try {
        if (accountNo.length === 10 && bankName) { 
          setLoadingBank(true)
          const { success, data, error } = await VerifyBank(accountNo, bankName);
          if (success) {
            setAccountName(data?.account_name);
            setLoadingBank(false)
          } else {
            setLoadingBank(false)
            if (
              error?.response?.data?.error?.errors &&
              error.response.data.error.errors.length > 0
            ) {
              const errorMessage = error.response.data.error.errors[0];
              setErrorName(`${errorMessage}`);
            } else if (error?.response?.data?.message) {
              const errorMessage = error.response.data.message;
              setErrorName(`${errorMessage?.message}`);
            } else {
              setError("Update failed");
            }
          }
        }
      } catch (error) {
        setLoadingBank(false)
        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          setErrorName(`${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          setErrorName(`${errorMessage}`);
        } else {
          setError("Update failed");
        }
      }
    };

    fetchBankName();
  }, [accountNo, bankName]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const bankDetails = {
      accountNumber: `${accountNo}`,
      bankName: bankName?.value,
      accountName,
    };

    try {
      const { success, upDateddata, error } = await addBankPropertyOwner(
        bankDetails
      );
      if (success) {
        setShowSubmitted(!showSubmitted);
        setLoading(false)
      } else {
        setLoading(false)
        setShowConfirmSubmit(false);
        setErrorName(error?.error?.errors)
      }
    } catch (error) {
      setLoading(false)
      setShowConfirmSubmit(false);
    }
  };

  const popHandleSubmit = () => {
    if (accountNo.length <= 9) {
      return setErrorName("Account Number should be at least 10 digits")
    } if (accountName === "") {
      return setErrorName('Invalid account provided.')
    } else {
      setShowConfirmSubmit(!showConfirmSubmit);
    }
  };

  const submitted = () => {
    // Close the form
    // setIlluminateWallet(false);
    // setLoading(false);
    fetchDataAgain();
    closeMenu();
  };

  const dropPopHandleSubmit = () => {
    setShowConfirmSubmit(false);
  };
  return (
    <div className="absolute top-0 z-20 px-8 md:px-0 h-auto w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      {
        loading && <Loading />
      }
      {showConfirmSubmit ? (
        <div>
          <AcAndRejModel
            header={"Add This Bank Account?"}
            body={
              "Be sure this is your bank account, once registered it cannot be changed until you contact us."
            }
            button={"Yes I’m sure"}
            buttonTwo={"No, go back"}
            returnHome={handleSubmit}
            returnHomeTwo={dropPopHandleSubmit}
          />
        </div>
      ) : (
        <div className="md:w-[550px] h-auto bg-white shadow-lg rounded-md p-8">
          <div className="flex justify-between items-center">
            <p className="text-BlueHomz text-[14px] font-[500]">
              Add Your Bank Account
            </p>
            <div
              onClick={closeMenu}
              className="cursor-pointer h-8 w-8 rounded-md flex items-center justify-center"
            >
              <Image
                src={"/static/dashboard/tenant/finance/close-square.png"}
                alt=""
                height={24}
                width={24}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <Input
              label={"Account Number"}
              placeholder={"00000000000"}
              onChange={(e) => {
                setAccountNo(e.target.value);
                setAccountName('')
                setErrorName('')
              }}
              value={accountNo}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-[14px] font-[500]">Bank Name</h1>
              <BankSelect
                banks={Banks?.data}
                setSelectedBank={setBankName}
                selectedBank={bankName}
                setErrorName={setErrorName}
              />
            </div>
            <div>
              <div className="w-full">
                <label className="text-[14px] font-[500]">
                  Account Name
                </label>
                <div
                  className={`border mt-2 rounded-md p-3 w-full flex items-center ${loadingBank ? "justify-center" : "justify-start"}`}>

                  {
                    loadingBank ? <LoadingForm /> : accountName ? accountName : "Account Name"}
                </div>
              </div>
              {
                errorName && (
                  <span className="text-[10px] text-red-500 italic">
                    {errorName}
                  </span>
                )
              }
            </div>


            <button
              onClick={popHandleSubmit}
              className="text-[16px] font-[700] w-full h-[48px] bg-BlueHomz rounded-md text-white mt-4"
            >
              Add bank account
            </button>
          </div>
        </div>
      )}
      {showSubmitted && (
        <div>
          <ConfirmModal
            header={"Bank Account Added"}
            body={"Your bank account has successfully been registered"}
            button={"Close"}
            returnHome={submitted}
          />
        </div>
      )}
    </div>
  );
};

export default BankForm;
