import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "../../components/confirmModal";
import AcAndRejModel from "../../components/acAndRejModel";

const Payment = () => {
  const [fillCard, setFillCard] = useState(false);
  const [data, setData] = useState([]);
  const [cvv, setCvv] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [removeCard, setRemoveCard] = useState(false);
  const [verifyDelete, setVerifyDelete] = useState(false)

  useEffect(() => {
    document.body.style.overflow = verified || verifyDelete ? "hidden" : "auto";
    if (verified || verifyDelete ) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [verified, verifyDelete ]);

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
  };
  const offCardInput = () => {
    setFillCard(false);
  };

  const popRemoveCard = () => {
    setRemoveCard(!removeCard);
  };

  const DeleteCardInput = (id) => {
    // Use the setData function to update the state by filtering out the card with the specified ID
    setData((prevData) => prevData.filter((card) => card.id !== id));
    setVerifyDelete(!verifyDelete)
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
    setSaveCard(true);
    setFillCard(false);
    setVerified(!verified);
  };


  const Close = () => {
    setVerified(false);
  };

  const CloseTwo = () => {
    setVerifyDelete(false);
  };
  console.log(data);
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

      <div className="py-4 rounded-lg  h-auto   bg-inputBg px-4 mt-2">
        {saveCard && data.length >= 1 ? (
          <div>
            {data.map((data) => (
              <div key={data.id} className="flex justify-between">
                <div className="mt-1 flex flex-col">
                  <label>Current Card</label>
                  {data.cardNumber}
                </div>
                {removeCard && (
                  <div>
                    <AcAndRejModel
                      header={"Remove Card?"}
                      body={"Are you sure about this?"}
                      button={"Yes"}
                      buttonTwo={"No, go back"}
                      returnHome={DeleteCardInput(data.id)}
                      returnHomeTwo={Close}
                    />
                  </div>
                )}
                {saveCard ? (
                  <div>
                    <button
                      onClick={showCardInput}
                      className="mt-2 font-[500] text-[16px] w-[145px] h-[37px] rounded-md bg-BlueHomz text-white"
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
                ) : (
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
                ) }
              </div>
            ))}
          </div>
        ) : fillCard ? (
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
              You’re currently on the enterprise plus plan
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
        <div className="mt-2 flex gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="cardNumber"
              className="text-[14px] font-[500] text-GrayHomz"
            >
              Card Number
            </label>
            <span className="text-[13px] font-[400] text-GrayHomz">
              Enter the 16 - digit card number on your card
            </span>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="border p-4 w-[100%] rounded-md"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000-0000-0000-0000"
              maxLength={19} // Set the maximum length to prevent exceeding the desired format
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="CVV"
              className="text-[14px] font-[500] text-GrayHomz"
            >
              CVV
            </label>
            <span className="text-[13px] font-[400] text-GrayHomz">
              Enter the 3 - digit number behind your card
            </span>
            <input
              type="number"
              placeholder="000"
              value={cvv}
              className="border p-4 w-[100%] rounded-md"
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="CVV"
              className="text-[14px] font-[500] text-GrayHomz"
            >
              Expiry Date
            </label>
            <span className="text-[13px] font-[400] text-GrayHomz">
              Enter the expiry date of your card
            </span>
            <input
              type="date"
              className="border p-4 w-[100%] rounded-md"
              placeholder="add card details"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </div>
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
          <ConfirmModal
            header={"Card Removed"}
            button={"Close"}
            returnHome={CloseTwo}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
