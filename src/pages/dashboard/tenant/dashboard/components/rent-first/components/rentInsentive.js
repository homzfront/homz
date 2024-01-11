import React from "react";

const RentInsentive = ({ data }) => {
  return (
    <div className="w-[454px] h-[203px] border p-[24px] rounded-[12px]">
      <div className="h-full w-full flex flex-col justify-between">
        <p className="text-[16px] font-[500] text-warning2">Rent Incentives</p>
        {data.length >= 1 ? (
          <p className="text-[13px] font-[400] text-GrayHomz w-[254px]">
            Get 10% cashback when you pay your rent within the first 6 month
            from your initial payment.
          </p>
        ) : (
          <p className="text-[13px] font-[400] text-GrayHomz w-[254px]">
            Incentives set by your property manager are displayed here for you.
          </p>
        )}
        <div>
          {data.length >= 1 ? (
            <button className="w-[110px] h-[37px] bg-BlueHomz text-white px-2 text-[14px] font-[500] rounded-lg">
              Pay rent now
            </button>
          ) : (
            <button disabled className="w-[110px] h-[37px] bg-GrayHomz6 text-GrayHomz5 px-2 text-[14px] font-[500] rounded-lg">
              Pay rent now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentInsentive;
