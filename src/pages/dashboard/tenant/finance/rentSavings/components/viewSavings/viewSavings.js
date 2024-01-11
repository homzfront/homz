import React from "react";

const ViewSavings = ({ closeSavings, selectedSavings }) => {
  console.log(selectedSavings);
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex flex-col gap-[10px] w-[540px] h-[426px] p-8 bg-white rounded-[12px] justify-between">
        <p className="text-[14px] font-[700] text-GrayHomz mb-2">
          {selectedSavings.savingsName}
        </p>
        <div>
          <label className="text-[13px] font-[500] text-GrayHomz">
            Rent Target <span className="text-GrayHomz2"> (N)</span>
          </label>
          <input
            type="number"
            value={selectedSavings.rentTarget}
            className="text-warning px-4 outline-none mt-2 w-full h-[45px] rounded-[4px] bg-warning4"
          />
        </div>
        <div>
          <label className="text-[13px] font-[500] text-GrayHomz">
            Amount Saved
            <span className="text-GrayHomz2"> (N)</span>
          </label>
          <input
            type="number"
            value={selectedSavings.amountToSave}
            placeholder="50,000"
            className="outline-none text-Success mt-2 w-full h-[45px] rounded-[4px] bg-successBg placeholder:text-Success4 placeholder:text-[13px] placeholder:font-[500] px-4"
          />
        </div>
        <div>
          <label className="text-[13px] font-[500] text-GrayHomz">
            Rent Due Date
          </label>
          <input
            type="Date"
            value={selectedSavings.dueDate}
            placeholder="Select Date"
            className="text-BlueHomz outline-none mt-2 px-4 w-full h-[45px] rounded-[4px] bg-walletBg"
          />
        </div>
        <button
          onClick={closeSavings}
          className="w-full h-[48px] bg-BlueHomz text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewSavings;
