import Image from "next/image";
import React, { useState } from "react";
import Input from "../../components/input";
import AcAndRejModel from "../../components/acAndRejModel";
import ConfirmModal from "../../components/confirmModal";
import BankSelect from "./selectBank";

const BankForm = ({ closeMenu, setBankDetails, Banks }) => {
  console.log(Banks.data);

  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

  console.log(bankName?.value);
console.log(accountNo)
console.log(accountName)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the collected bank details
    const bankDetails = {
      accountNo,
      bankName: bankName?.value,
      accountName,
    };

    // Add the bank details to the bankDetails state
    setBankDetails((prevBankDetails) => [...prevBankDetails, bankDetails]);

    setShowSubmitted(!showSubmitted);
  };

  const popHandleSubmit = () => {
    setShowConfirmSubmit(!showConfirmSubmit);
  };

  const submitted = () => {
    // Close the form
    closeMenu();
  };

  const dropPopHandleSubmit = () => {
    setShowConfirmSubmit(false);
  };
  return (
    <div className="absolute top-0 z-20 h-auto w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
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
        <div className="w-[550px] h-auto bg-white shadow-lg rounded-md p-8">
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
              onChange={(e) => setAccountNo(e.target.value)}
              value={accountNo}
            />
            {/* <div className="flex flex-col gap-2">
              <label className="text-[14px] font-[500]">Bank Name</label>
              <DropDownWithdraw
                options={Banks.data}
                onSelect={(option) => setBankName(option.name)}
                selectOption={bankName || "Select Bank"}
                className={"w-full"}
              />
            </div> */}

            <div className="flex flex-col gap-2">
              <h1 className="text-[14px] font-[500]">Bank Name</h1>
              <BankSelect banks={Banks.data} setSelectedBank={setBankName} selectedBank={bankName} />
            </div>
            <Input
              label={"Account Name"}
              placeholder={"Account Name"}
              onChange={(e) => setAccountName(e.target.value)}
              value={accountName}
            />

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
