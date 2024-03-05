"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CreateNewRentSavings from "./components/createNewRent/createNewRentSavings";
import Savings from "./components/rentSavings/savings";

const RentSavings = () => {
  const [openCreateNewSavings, setOpenCreateNewSavings] = useState(false);
  const [data, setData] = useState([
    {
      wallet: "800000",
      Data: [],
    },
  ]);
  const [selectedSavings, setSelectedSavings] = useState(null); // Add this line
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditModalToSave, setOpenEditModalToSave] = useState(false);
  const [confirmModalII, setConfirmModalII] = useState(false);
  const [viewSavings, setViewSavings] = useState(false);
  const [displayWallet, setDisplayWallet] = useState(false);
  const [confirmModalIV, setConfirmModalIV] = useState(false);

  // useEffect to load data from localStorage when the component mounts
  useEffect(
    () => {
      const savedData = localStorage.getItem("Data");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    },
    [],
    confirmModalIV,
    openEditModalToSave
  );

  console.log(data);
  const datas = data[0].Data;

  // useEffect to store data from localStorage when the component mounts
  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(data));
  }, [data]);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      openCreateNewSavings ||
      confirmModalII ||
      openEditModalToSave ||
      openEditModal ||
      viewSavings ||
      displayWallet
        ? "hidden"
        : "auto";
    if (
      openCreateNewSavings ||
      confirmModalII ||
      openEditModalToSave ||
      openEditModal ||
      viewSavings ||
      displayWallet
    ) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [
    openCreateNewSavings,
    confirmModalII,
    openEditModalToSave,
    openEditModal,
    viewSavings,
    displayWallet,
  ]);

  const openNewSavings = () => {
    setOpenCreateNewSavings(!openCreateNewSavings);
  };

  const closeNewSavings = () => {
    setOpenCreateNewSavings(false);
  };

  const handleEditClick = (selectedData) => {
    setSelectedSavings(selectedData);
    setOpenEditModal(!openEditModal);
  };

  const handleEditClickToSave = (selectedData) => {
    setSelectedSavings(selectedData);
    setOpenEditModalToSave(!openEditModalToSave);
  };

  const closeEditRentTarget = () => {
    setOpenEditModal(false);
  };

  const closeEditRentTargetII = () => {
    setOpenEditModal(false);
    setConfirmModalII(false);
  };

  const closeEditRentToSave = () => {
    setOpenEditModalToSave(false);
  };

  const updateRentTarget = (newRentTarget) => {
    setData((prevData) => {
      // Find the selectedSavings in the data array and update its rentTarget
      const updatedData = prevData.map((item) => ({
        ...item,
        Data: item.Data.map((dataItem) =>
          dataItem.id === selectedSavings.id
            ? { ...dataItem, rentTarget: newRentTarget }
            : dataItem
        ),
      }));
      return updatedData;
    });
  };

  const updateSaveTarget = (newAmountToSave) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.Data.some((dataItem) => dataItem.id === selectedSavings.id)) {
          const updatedItem = {
            ...item,
            Data: item.Data.map((dataItem) => {
              if (dataItem.id === selectedSavings.id) {
                // Calculate the new wallet balance
                const newWalletBalance =
                  parseInt(item.wallet) +
                  parseInt(dataItem.amountToSave) -
                  parseInt(newAmountToSave);

                console.log(newWalletBalance);

                // Deduct amountToSave from the wallet balance
                setData((prevData) => [
                  {
                    ...prevData[0],
                    wallet: newWalletBalance.toString(),
                  },
                ]);
                // Return the updated data item
                return { ...dataItem, amountToSave: newAmountToSave };
              } else {
                return dataItem;
              }
            }),
          };

          return updatedItem;
        } else {
          return item;
        }
      });

      return updatedData;
    });
  };

  console.log(selectedSavings);

  const openSavings = (data) => {
    setViewSavings(!viewSavings);
    setSelectedSavings(data);
  };

  const closeSavings = () => {
    setViewSavings(false);
  };

  const openWallet = (data) => {
    setDisplayWallet(!displayWallet);
    setSelectedSavings(data);
  };
  const closeWallet = () => {
    setDisplayWallet(false);
  };

  return (
    <div>
      <div className="px-8 pb-8 pt-2 border-b">
        {openCreateNewSavings && (
          <CreateNewRentSavings
            setOpenCreateNewSavings={setOpenCreateNewSavings}
            closeNewSavings={closeNewSavings}
            setData={setData}
            data={data}
          />
        )}
        <div
          className="bg-cover h-[204px] w-[1108px] rounded-[12px] p-[24px] flex flex-col justify-between"
          style={{
            background: "#006AFF",
            backgroundImage: `url(/static/dashboard/tenant/finance/BackgroundImage.png)`,
          }}
        >
          <div className="flex gap-4 items-center">
            <Image
              src={"/static/dashboard/tenant/finance/Frame1022.png"}
              alt=""
              height={52}
              width={52}
            />
            <div className="">
              <p className="text-[16px] font-[500] text-white">Rent Savings</p>
              <p className="text-[13px] font-[400] text-white w-[672px]">
                Effortlessly build a financial cushion. Set aside a portion of
                your income specifically designated for rent, ensuring peace of
                mind and timely payments.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={openNewSavings}
              className="border text-[11px] font-[400] bg-walletBg text-BlueHomz w-[196px] h-[48px] flex items-center justify-center gap-2 rounded-[8px]"
            >
              <Image
                src={"/static/dashboard/tenant/finance/Frame715.png"}
                alt=""
                height={40}
                width={40}
              />
              Create new rent savings
            </button>
          </div>
        </div>
      </div>
      {data && (
        <Savings
          data={datas}
          closeEditRentTarget={closeEditRentTarget}
          handleEditClick={handleEditClick}
          openEditModal={openEditModal}
          selectedSavings={selectedSavings}
          updateRentTarget={updateRentTarget}
          confirmModalII={confirmModalII}
          setConfirmModalII={setConfirmModalII}
          handleEditClickToSave={handleEditClickToSave}
          openEditModalToSave={openEditModalToSave}
          closeEditRentToSave={closeEditRentToSave}
          updateSaveTarget={updateSaveTarget}
          setOpenEditModalToSave={setOpenEditModalToSave}
          closeEditRentTargetII={closeEditRentTargetII}
          viewSavings={viewSavings}
          openSavings={openSavings}
          closeSavings={closeSavings}
          displayWallet={displayWallet}
          openWallet={openWallet}
          closeWallet={closeWallet}
          dataWallet={data}
          setDataWallet={setData}
          confirmModalIV={confirmModalIV}
          setConfirmModalIV={setConfirmModalIV}
        />
      )}
    </div>
  );
};

export default RentSavings;
