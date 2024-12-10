import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "../../components/confirmModal";
import AcAndRejModel from "../../components/acAndRejModel";
import CollectCardDetails from "./components/collectCardDetails";
import YesNOModal from "../../tenants/components/yesNOModal";
import useBodyScroll from "@/utils/useBodyScroll";
import { calculateSubDate } from "@/utils/calculateSubDate";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import { cancelEnterprisePlanSub } from "@/api/tenantSevice";
import FailedModal from "../../components/failedModal";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";

const Payment = ({ data: userProfile }) => {
  const [fillCard, setFillCard] = useState(false);
  const {fetchData} = useProfileEnterpriseMe()
  const [data, setData] = useState([]);
  const [cvv, setCvv] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [removeCard, setRemoveCard] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyII, setVerifyII] = useState(false);
  const [openCancelSub, SetOpenCancelSub] = useState(false);
  const [openFailedModal, setOpenFailedModal] = useState(false);
  const [subError, setSubError] = useState(null);
  const [isLoadingCancelSub, setIsLoadingCancelSub] = useState(false);
  const [openCompleteModalForCancelSub, setOpenCompleteModalForCancelSub] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [hideCancel, setHideCancel] = useState(false);

  useBodyScroll([verified, verifyDelete, removeCard]);

  const handleCardNumberChange = (e) => {
    // Remove non-numeric characters from the input
    const rawInput = e.target.value.replace(/\D/g, "");

    // Format the input into groups of four digits separated by hyphens
    const formattedInput = rawInput
      .replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/, "$1-$2-$3-$4")
      .slice(0, 19); // Limit the length to 19 characters

    setCardNumber(formattedInput);
  };
  const showCardInput = () => {
    setFillCard(!fillCard);
    setVerify(!verify);
  };
  const showCardInputII = () => {
    setFillCard(!fillCard);
    setVerifyII(!verifyII);
  };
  const offCardInput = () => {
    setFillCard(false);
    setVerify(false);
  };

  const popRemoveCard = () => {
    setVerifyDelete(!verifyDelete);
  };

  const DeleteCardInput = (id) => {
    // Use the setData function to update the state by filtering out the card with the specified ID
    setData((prevData) => prevData.filter((card) => card.id !== id));
    // setVerifyDelete(!verifyDelete);
    setVerifyDelete(false);
    setRemoveCard(!removeCard);
  };

  const AcceptCardInput = (e) => {
    e.preventDefault();
    // Generate a unique ID using uuid
    const id = uuidv4();

    const newData = {
      id,
      cardNumber,
      cvv,
      expireDate,
    };

    setData((prevData) => [...prevData, newData]);
    setCvv("");
    setCardNumber("");
    setExpireDate("");
    setFillCard(false);
    setVerified(!verified);
  };

  const Close = () => {
    setVerified(false);
    setVerifyII(false);
    setVerify(false);
  };

  const CloseTwo = () => {
    setVerifyDelete(false);
    setRemoveCard(false);
  };

  const reversedData = data.slice().reverse();
  const lastData = () => {
    return data[data.length - 1];
  };

  const handleCancelSub = async () => {
    setIsLoadingCancelSub(true);
    try {
      if (userProfile?.subscriptionCode && userProfile?.email_token) {
        const { success, data, error } = await cancelEnterprisePlanSub(
          userProfile?.email_token,
          userProfile?.subscriptionCode,
        );
        if (success) {
          setOpenCompleteModalForCancelSub(true)
          setHideCancel(true)
          fetchData()
        }
        if (error) {
          setSubError(error)
          setOpenFailedModal(true)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingCancelSub(false);
    }
  };

  return (
    <div>
      {openCancelSub &&
        <CustomizedModal isOpen={openCancelSub}>
          <AcAndRejModel
            header={"Cancel Subscription?"}
            body={`You’re about to cancel your ${userProfile?.planName} Plan Subscription`}
            button={"Proceed"}
            buttonTwo={"Close"}
            returnHome={handleCancelSub}
            loading={isLoadingCancelSub}
            returnHomeTwo={() => SetOpenCancelSub(false)}
          />
        </CustomizedModal>
      }
      {openFailedModal &&
        <CustomizedModal isOpen={openFailedModal}>
          <FailedModal
            header={"Subscription Cancellation Failed"}
            // body={`We encountered an issue while attempting to cancel your ${userProfile?.planName} Plan Subscription. Please try again or contact support for assistance.`}
            body={subError}
            button={"Close"}
            returnHome={() => {
              setOpenFailedModal(false)
              // SetOpenCancelSub(false)
            }}
          />
        </CustomizedModal>
      }
      {openCompleteModalForCancelSub &&
        <CustomizedModal isOpen={openCompleteModalForCancelSub}>
          <ConfirmModal
            header={"Subscription Canceled Successfully"}
            body={`Your ${userProfile?.planName} Plan Subscription has successfully been canceled.`}
            button={"Close"}
            returnHome={() => {
              setOpenCompleteModalForCancelSub(false)
              SetOpenCancelSub(false)
            }}
          />
        </CustomizedModal>
      }
      <p className="font-[700] text-[14px] text-GrayHomz">Enterprise Plan</p>
      <div className=" flex justify-between h-[69px] items-center rounded-lg bg-inputBg px-4 mt-2">
        <div>
          <p className="font-[400] text-[13px] md:text-[16px] text-BlackHomz">
            You’re currently on the {userProfile?.planName === "" ? "free trial" : userProfile?.planName} plan
          </p>
          <p className={`font-[400] text-[12px] md:text-[14px] text-GrayHomz ${userProfile?.planName === "Enterprise Free" ? "hidden" : ""}`}>
            {userProfile?.interval === "annually" ? "[Yearly subscription]" : "[Monthly subscription]"} |  [{calculateSubDate(userProfile?.next_payment_date)}]
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href={"/plans"}
            className="font-[500] text-[12px] md:text-[14px] text-white w-[150px] md:w-[135px] h-[37px] flex justify-center items-center rounded-md bg-BlueHomz border"
          >
            {userProfile?.planName === "Enterprise Free" ? "Buy Plan" : "Upgrade Plan"}
          </Link>
          <button
            onClick={() => SetOpenCancelSub(!openCancelSub)}
            className={`${(userProfile?.cancellationRequested === true || hideCancel) ? "hidden" : ""} font-[500] text-[12px] md:text-[14px] px-4 h-[37px] flex justify-center items-center rounded-md text-BlueHomz border border-BlueHomz  ${userProfile?.planName === "Enterprise Free" ? "hidden" : ""}`}
          >
            Cancel subscription
          </button>
        </div>
      </div>
      {/* <p className="font-[700] text-[14px] text-GrayHomz mt-4">
        Payment Method
      </p>
      <p className="font-[400] text-[13px] text-GrayHomz mt-1">
        Link your debit card for easy and seamless payments
      </p>

      <div className="py-4 rounded-lg  h-auto bg-inputBg px-4 mt-2 relative ">
        {data.length >= 1 ? (
          <div>
            <div className="absolute right-4 top-4">
              {verifyII ? (
                <div className="flex justify-between  items-center">
                  <div>
                    <button
                      onClick={AcceptCardInput}
                      className="font-[500] text-[16px] w-[105px] h-[37px] rounded-md bg-BlueHomz text-white"
                    >
                      Verify card
                    </button>
                    <button
                      onClick={offCardInput}
                      className="font-[500] text-[16px] w-[95px] h-[37px] rounded-md ml-4 text-BlueHomz border border-BlueHomz"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={showCardInputII}
                    className="mt-2 font-[500] px-2 text-[16px] w-[165px] h-[37px] rounded-md bg-BlueHomz text-white"
                  >
                    Add Another Card
                  </button>
                  <button
                    onClick={popRemoveCard}
                    className="ml-4 font-[500] text-[16px] w-[145px] h-[37px] rounded-md text-BlueHomz border border-BlueHomz"
                  >
                    Remove Card
                  </button>
                </div>
              )}
            </div>
            <div className="mt-12">
              {reversedData.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-col text-GrayHomz2 gap-2"
                >
                  <div className="text-[16px] font-400">
                    {data.id === lastData().id && "Current Card "}
                  </div>
                  <label
                    htmlFor={`card-${data.id}`}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="selectedCard"
                      className="h-6 w-6 radio-input"
                      id={`card-${data.id}`}
                      value={data.id}
                      checked={selectedCardId === data.id}
                      onChange={() => setSelectedCardId(data.id)}
                    />
                    <div className="border w-[524px] h-[45px] px-4 flex items-center rounded-md">
                      {data.cardNumber}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : verify ? (
          <div className="flex justify-between  items-center">
            <p className="font-[500] text-[16px] text-GrayHomz2">
              Add a new card
            </p>
            <div>
              <button
                onClick={AcceptCardInput}
                className="font-[500] text-[16px] w-[105px] h-[37px] rounded-md bg-BlueHomz text-white"
              >
                Verify card
              </button>
              <button
                onClick={offCardInput}
                className="font-[500] text-[16px] w-[95px] h-[37px] rounded-md ml-4 text-BlueHomz border border-BlueHomz"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between  items-center">
            <p className="font-[500] text-[16px] text-GrayHomz2">
              Add a new card
            </p>
            <button
              onClick={showCardInput}
              className="font-[500] text-[16px] w-[95px] h-[37px] rounded-md text-BlueHomz border border-BlueHomz"
            >
              Add Card
            </button>
          </div>
        )}
      </div>

      {fillCard && (
        <div>
          <CollectCardDetails
            handleCardNumberChange={handleCardNumberChange}
            cardNumber={cardNumber}
            setCvv={setCvv}
            cvv={cvv}
            expireDate={expireDate}
            setExpireDate={setExpireDate}
          />
        </div>
      )}
      {verified && (
        <div>
          <ConfirmModal
            header={"Card verified"}
            body={"Your card has successfully been verified and added"}
            button={"Close"}
            returnHome={Close}
          />
        </div>
      )}
      {verifyDelete && (
        <div>
          <AcAndRejModel
            header={"Remove Card?"}
            body={"Are you sure about this?"}
            button={"Yes"}
            buttonTwo={"No, go back"}
            returnHome={() => DeleteCardInput(selectedCardId)}
            returnHomeTwo={CloseTwo}
          />
        </div>
      )}
      {removeCard && (
        <ConfirmModal
          header={"Card Removed"}
          button={"Close"}
          returnHome={CloseTwo}
        />
      )} */}
    </div>
  );
};

export default Payment;
