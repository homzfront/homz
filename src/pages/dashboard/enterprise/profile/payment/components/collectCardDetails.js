import React from "react";

const CollectCardDetails = ({handleCardNumberChange, cardNumber, setCvv, cvv, expireDate, setExpireDate}) => {
  return (
    <div>
      <div className="mt-2 flex gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cardNumber"
            className="text-[14px] font-[500] text-GrayHomz"
          >
            Card Number
          </label>
          <span className="mt-1 text-[13px] font-[400] text-GrayHomz">
            Enter the 16 - digit card number on your card
          </span>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="border  p-4 w-[350px] h-[45px] rounded-md"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000-0000-0000-0000"
            maxLength={19} // Set the maximum length to prevent exceeding the desired format
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="CVV" className="text-[14px] font-[500] text-GrayHomz">
            CVV
          </label>
          <span className="mt-1 text-[13px] font-[400] text-GrayHomz">
            Enter the 3 - digit number behind your card
          </span>
          <input
            type="number"
            placeholder="000"
            value={cvv}
            className="border  p-4  w-[270px] h-[45px] rounded-md"
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="CVV" className="text-[14px] font-[500] text-GrayHomz">
            Expiry Date
          </label>
          <span className="mt-1 text-[13px] font-[400] text-GrayHomz">
            Enter the expiry date of your card
          </span>
          <input
            type="date"
            className="border  p-4  w-[270px] h-[45px] rounded-md"
            placeholder="add card details"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectCardDetails;
