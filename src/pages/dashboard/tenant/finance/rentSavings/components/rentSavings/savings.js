import Image from "next/image";
import React from "react";
import EditRentTarget from "../editRentTarget/editRentTarget";
import EditAmountToSave from "../editAmountToSave/editAmountToSave";
import ViewSavings from "../viewSavings/viewSavings";
import Wallet from "../wallet/wallet";

const Savings = ({
  data,
  handleEditClick,
  openEditModal,
  selectedSavings,
  closeEditRentTarget,
  updateRentTarget,
  confirmModalII,
  setConfirmModalII,
  handleEditClickToSave,
  openEditModalToSave,
  closeEditRentToSave,
  updateSaveTarget,
  setOpenEditModalToSave,
  closeEditRentTargetII,
  openSavings,
  closeSavings,
  viewSavings,
  openWallet,
  closeWallet,
  displayWallet,
  dataWallet,
  setDataWallet,
  setConfirmModalIV,
  confirmModalIV
}) => {
  const formatDate = (inputDate) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculatePercentage = (data) => {
    const percentage =
      (Number(data.amountToSave) / Number(data.rentTarget)) * 100;
    return Math.round(percentage);
  };
  return (
    <div className="h-[400px] overflow-auto scrollbar-container">
      {openEditModal && (
        <div>
          <EditRentTarget
            closeEditRentTarget={closeEditRentTarget}
            selectedSavings={selectedSavings}
            updateRentTarget={updateRentTarget}
            confirmModalII={confirmModalII}
            setConfirmModalII={setConfirmModalII}
            closeEditRentTargetII={closeEditRentTargetII}
          />
        </div>
      )}
      {openEditModalToSave && (
        <EditAmountToSave
          closeEditRentToSave={closeEditRentToSave}
          selectedSavings={selectedSavings}
          updateSaveTarget={updateSaveTarget}
          setOpenEditModalToSave={setOpenEditModalToSave}
          data={dataWallet} setData={setDataWallet}
          setConfirmModalIV={setConfirmModalIV}
          confirmModalIV={confirmModalIV}
        />
      )}
      {viewSavings && (
        <ViewSavings
          closeSavings={closeSavings}
          selectedSavings={selectedSavings}
        />
      )}
      {displayWallet && (
        <Wallet closeWallet={closeWallet} selectedSavings={selectedSavings} data={dataWallet} setData={setDataWallet} />
      )}
      {data.map((data) => (
        <div key={data.id} className="p-8 border-b m-auto">
          <div className="flex w-full justify-between items-center ">
            <div className="flex gap-4">
              <div className="p-3 h-[95px] w-[216px] border border-warning3 bg-warning4 rounded-[12px] flex flex-col justify-between">
                <p className="text-[13px] font-[400] text-warning2">
                  Rent Target
                </p>
                <div className="flex items-center w-full justify-between">
                  <div>
                    <p className="text-[14px] font-[500] text-BlackHomz">
                      N{`${formatNumberWithCommas(data.rentTarget)}`}
                    </p>
                    <p className="text-[10px] font-[400] text-GrayHomz">{`${formatDate(
                      data.dueDate
                    )}`}</p>
                  </div>
                  <Image
                    src={"/static/dashboard/tenant/finance/editwarning.png"}
                    alt=""
                    height={40}
                    width={40}
                    className="cursor-pointer"
                    onClick={() => handleEditClick(data)}
                  />
                </div>
              </div>
              <div className="border rounded-[12px] border-Success2 bg-Success3 h-[95px] w-[342px] p-3 flex flex-col justify-between">
                <p className="text-Success text-[13px] font-[400]">
                  {data.savingsName}
                </p>
                <div className="w-full flex justify-between items-center">
                  <p className="text-[16px] font-[500] text-BlackHomz">
                    N{`${formatNumberWithCommas(data.amountToSave)}`}
                  </p>
                  <div>
                    <Image
                      src={"/static/dashboard/tenant/dashboard/addGreen.png"}
                      height={40}
                      width={40}
                      alt=""
                      className="cursor-pointer"
                      onClick={() => handleEditClickToSave(data)}
                    />
                  </div>
                </div>
                <div className="w-full rounded-lg bg-Success4 h-[7px] flex justify-start items-center">
                  <span
                    className={`rounded-lg h-[5px] bg-Success text-Success`}
                    style={{ width: `${calculatePercentage(data)}%` }}
                  >
                    <></>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => openSavings(data)}
                className="text-[14px] font-[500] text-BlueHomz h-[37px] w-[112px] border border-BlueHomz rounded-[4px]"
              >
                View Savings
              </button>
              <button
                onClick={() => openWallet(data)}
                className="text-[14px] font-[500] text-white bg-BlueHomz h-[37px] w-[154px] rounded-[4px]"
              >
                Withdraw to wallet
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Savings;
