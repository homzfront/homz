"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropDown";
import AcAndRejModel from "../../components/acAndRejModel";
import ReceiptModal from "../../components/receiptModal";
import Receipt from "../../components/receipt";
import { enterpriseMePropertyOwner, ReceiptEnterpriseToOwner, sendMoneyEnterpriseToOwner } from "@/api/enterpriseManagerService";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import addCommasToNumber from "@/utils/addCommasToNumber";
import Eye from "@/components/icons/Eye";
import BashedEye from "@/components/icons/BashedEye";
import ConfirmModal from "../../../components/confirmModal";

const TransferDetails = ({
  illuminateWallet,
  fetchDataAgain,
}) => {
  const [username, setUsername] = useState('')
  const [pincode, setPincode] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transferToggleModal, setTransferToggleModal] = useState(false);
  const [successfulTansferModal, setSuccessfulTansferModal] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [landlords, setLandlords] = useState([]);
  const [selectedLandlord, setSelectedLandlord] = useState(null)
  const [error, setError] = useState('')
  const [receiptData, setReceiptData] = useState(null);
  const [id, setId] = useState(null);
  const [transfer, setTransfer] = useState([]);
  const [showPending, setShowPending] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await enterpriseMePropertyOwner();
        setLandlords(data?.data);
      } catch { }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ReceiptEnterpriseToOwner(id);
        setReceiptData(data?.upDateddata?.data?.data);
      } catch { }
    };
    fetchData();
  }, [successfulTansferModal])


  const showTransferConfirmation = () => {
    setTransferToggleModal(!transferToggleModal);
  };
  const cancelTranser = () => {
    setTransferToggleModal(false);
    setSuccessfulTansferModal(false);
  };

  const handleSelect = (option) => {
    setSelectedLandlord(option);
  };

  const showReceipt = () => {
    if (receiptData?.status === 'pending') {
      setShowPending(!showPending);
      setSuccessfulTansferModal(false)
    } else {
      setReceipt(!receipt);
      setSuccessfulTansferModal(false)
    }
  };

  const closeReceipt = () => {
    setReceipt(false);
  };
  const options = landlords

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      pincode,
      recipientName: selectedLandlord?.fullName,
      amount,
      description,
      id: selectedLandlord?._id
    };
    try {
      const { success, upDateddata, error } = await sendMoneyEnterpriseToOwner(
        formData
      );
      setTransfer(formData);
      if (success) {
        setLoading(false);
        setDescription("");
        setPincode("")
        setAmount("");
        setTransferToggleModal(false);
        setSelectedLandlord(null);
        setSuccessfulTansferModal(!successfulTansferModal);
        fetchDataAgain()
        setId(upDateddata?.data?.data?._id)
      } else {
        setLoading(false);
        setTransferToggleModal(false)
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
      setTransferToggleModal(false)
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
    finally {
      setTimeout(() => {
      }, 2000);
    }
  };

  return (
    <div>
      <CustomizedModal isOpen={receipt}>
        <Receipt
          closeReceipt={closeReceipt}
          data={receiptData}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={successfulTansferModal}>
        <ReceiptModal
          body={`You have successfully sent ${addCommasToNumber(
            transfer?.amount
          )} to ${transfer?.recipientName}.`}
          header={"Transaction Complete"}
          button={"View Reciept"}
          buttonTwo={"Close"}
          returnHomeTwo={cancelTranser}
          returnHome={showReceipt}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={showPending}>
        <ConfirmModal
          header={"Processing receipt"}
          button={"Close"}
          returnHome={() => {
            setShowPending(false)
            setTransferToggleModal(false);
            setSuccessfulTansferModal(false);
          }}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={transferToggleModal}>
        <AcAndRejModel
          header={"Confirm Transaction"}
          body={`You’re sending ${addCommasToNumber(
            amount
          )} to ${selectedLandlord?.fullName}`}
          button={"Yes, Send"}
          buttonTwo={"Cancel Transaction"}
          returnHome={handleSend}
          returnHomeTwo={cancelTranser}
          loading={loading}
        />
      </CustomizedModal>
      <div className="p-5 border rounded-[12px] h-auto w-[100%]  flex flex-col gap-6">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {illuminateWallet ? (
              <Image
                src={"/static/dashboard/enterprisemanager/payment/send-2.png"}
                width={20}
                height={21}
                alt=""
              />
            ) : (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/payment/send-2-Gray.png"
                }
                width={20}
                height={21}
                alt=""
              />
            )}
            <p
              className={`text-[14px] font-[500] ${illuminateWallet ? "text-BlueHomz" : "text-GrayHomz6"
                }`}
            >
              Transfer Money To Landlord
            </p>
          </div>

        </div>
        <div
          className={`flex flex-col gap-4 justify-between ${illuminateWallet ? "" : "pointer-events-none"
            }`}
        >
          <div className="w-full">
            <div
              className={`pb-2 text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                } `}
            >
              Select Landlord
            </div>
            <Dropdown
              options={options}
              onSelect={handleSelect}
              illuminateWallet={illuminateWallet}
              selectOption={
                selectedLandlord ? selectedLandlord?.fullName : "Select landlord you’re transferring to"
              }
              className={`w-[500px] ${illuminateWallet ? "" : "pointer-events-none"
                }   `}
            />
          </div>

          <div>
            <label
              className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                }`}
            >
              Amount (N)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setError('')
                setAmount(e.target.value)
              }}
              placeholder="200,000"
              className={` mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>
          <div>
            <label
              className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                }`}
            >
              Description
            </label>
            <input
              value={description}
              onChange={(e) => {
                setError('')
                setDescription(e.target.value)
              }}
              type="text"
              placeholder="2023 Rent Payments"
              className={`mt-2 rounded-md  border p-3 bg-inputbg  h-[45px] w-full placeholder:text-GrayHomz6 placeholder:text-[14px] placeholder:font-[500]`}
            />
          </div>

          <div className="relative ">
            <form className="w-full flex flex-col gap-2 items-start">
              <div className='flex flex-col items-start'>
                <label
                  className={`text-[13px] font-[500] ${illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
                    }`}
                >
                  Transaction Pin
                </label>
              </div>
              <input
                type="text"
                name="username"
                autocomplete="username"
                value={username}
                className="hidden"
                hidden
              />
              <input
                className={`w-full border rounded-md p-3 h-[45px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500]`}
                type={visible ? "text" : "password"}
                placeholder="Enter transaction pin"
                autoComplete="new-password"
                value={pincode}
                onChange={(e) => {
                  setError('')
                  setPincode(e.target.value)
                }}
              />
              <div className="absolute top-[40px] right-4" onClick={Visible}>
                {visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <BashedEye className="w-4 h-4" />
                )}
              </div>
            </form>
          </div>
          {
            error && <span className="text-[10px] italic text-red-500">
              {error}
            </span>
          }

          {illuminateWallet ? (
            <button
              onClick={showTransferConfirmation}
              className={`w-full h-[37px]  ${selectedLandlord !== null &&
                pincode !== "" &&
                amount !== "" &&
                description !== ""
                ? "bg-BlueHomz text-white"
                : "bg-GrayHomz6 text-GrayHomz5 pointer-events-none"
                }  p-[5px] rounded-md text-center`}
            >
              Transfer
            </button>
          ) : (
            <button
              className={`w-full pointer-events-none h-[37px] bg-GrayHomz6 text-GrayHomz5  p-[5px] rounded-md text-center`}
            >
              Transfer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
