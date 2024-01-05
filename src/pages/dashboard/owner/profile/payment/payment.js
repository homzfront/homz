import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "../../components/confirmModal";
import AcAndRejModel from "../../components/acAndRejModel";
import CollectCardDetails from "./components/collectCardDetails";
import YesNOModal from "../../tenants/components/yesNOModal";

const Payment = () => {
  const [fillCard, setFillCard] = useState(false);
  const [data, setData] = useState([]);
  const [cvv, setCvv] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [removeCard, setRemoveCard] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyII, setVerifyII] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    document.body.style.overflow = verified || verifyDelete ? "hidden" : "auto";
    if (verified || verifyDelete) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [verified, verifyDelete]);

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
  console.log(data);
  const reversedData = data.slice().reverse();
  const lastData = () => {
    return data[data.length - 1];
  };
  console.log(lastData);
  return (
    <div>
      <p className="font-[700] text-[14px] text-GrayHomz">Enterprise Plan</p>
      <div className=" flex justify-between h-[69px] items-center rounded-lg bg-inputBg px-4 mt-2">
        <p className="font-[500] text-[16px] text-GrayHomz2">
          You’re currently on the enterprise plus plan
        </p>
        <Link
          href={"/plans"}
          className="font-[500] text-[16px] w-[125px] h-[37px] py-1 pl-2 rounded-md text-BlueHomz border border-BlueHomz"
        >
          Upgrade Plan
        </Link>
      </div>
      <p className="font-[700] text-[14px] text-GrayHomz mt-4">
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
      )}
    </div>
  );
};

export default Payment;
