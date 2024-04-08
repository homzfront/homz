import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomizeModal from "../../components/CustomizedModal";
import AddProperty from "./addPropertyModal";

const AddPropertyModal = ({
  modalIsOpen,
  setModalIsOpen,
  selectedProperty,
}) => {
  const [success2ModalIsOpen, setSuccess2ModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setRevokeModalOpen] = useState(false);
  const [property, setPro] = useState("");
  const [data, setData] = useState(
    (selectedProperty && selectedProperty.Property) || []
  );
  const [propertySelected, setPropertySelected] = useState(null);
  const [proModalIsOpen, setProModalIsOpen] = useState(false);
  const [msg, setMessage] = useState("");

  const openProModal = (e) => {
    e.preventDefault();
    setProModalIsOpen(true);
    setMessage("")
  };

  const handleSaveProperty = (item) => {
    if (!data.some((existingItem) => existingItem === item)) {
      setData([...data, item]);
      setPropertySelected(null)
      setMessage("")
    } else {
      setMessage(`${item} is already in the list`);
    }
  };

  const handleSelectedProperty = (data) => {
    setPropertySelected(data);
  };

  useEffect(() => {
    if (selectedProperty && selectedProperty.Property) {
      setData(selectedProperty.Property);
    }
  }, [selectedProperty]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeSuccessModal = () => {
    setSuccess2ModalIsOpen(false);
  };
  const closeRevokeModal = () => {
    setRevokeModalOpen(false);
  };
  const revokeProperty = (revokePro) => {
    setPro(revokePro);
    setRevokeModalOpen(true);
  };
  const handleRevokeProperty = (revokePro) => {
    const newData = data.filter((row) => row !== revokePro);
    setData(newData);
    setRevokeModalOpen(false);
    setSuccess2ModalIsOpen(true);
  };

  return (
    <div>
      <CustomizeModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col md:w-[464px] bg-white rounded-[12px] p-[28px] space-y-7 w-[350px]">
          <div className=" flex items-center justify-between md:w-[400px]">
            <div className=" flex gap-[24px]">
              <div className="md:w-[291px]">
                <p className="text-[#202020] text-[20px] leading-[30px] font-[700] mb-2">
                  Property Access
                </p>
                <p className="text-[14px] leading-[21px] text-[#4E4E4E] w-[260px] pr-8">
                  <span className="text-blue-500 text-[600]">
                    {selectedProperty?.Name}
                  </span>{" "}
                  has access to all properties listed below
                </p>
              </div>
            </div>
            <div>
              <button onClick={closeModal} className="cursor-pointer mb-12">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-y-auto max-w-[400px] max-h-[120px] pr-3">
            {data.map((prop, index) => (
              <div
                className="flex  items-center justify-between accessBorder pb-[12px]"
                key={index}
              >
                <p className="text-[#4E4E4E] text-[14px] leading-[21px] text-[400]">
                  {prop}
                </p>
                <button
                  className="text-[#DC6803] text-[13px] leading-[19.5px] text-[400] "
                  onClick={() => revokeProperty(prop)}
                >
                  Revoke access
                </button>
              </div>
            ))}
          </div>
          <div className="">
            <p className="text-[14px] text-[#006AFF] pb-2">
              Grant access to new property
            </p>
            <div className=" rounded-[4px] filterBorder cursor-pointer py-2 px-4 md:w-[400px]">
              <button
                onClick={openProModal}
                className="flex  items-center justify-between w-full"
              >
                <p className="text-[14px] text-[#006AFF]">
                  {propertySelected?.Name
                    ? `${propertySelected.Name}`
                    : "Select a Property"}
                </p>
                <p>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                    }
                    height={16}
                    width={16}
                    alt=""
                  />
                </p>
              </button>
            </div>
          <span className="text-red-600 text-[11px]">{msg}</span>
          </div>
          <button
            className="bg-BlueHomz2 md:w-[400px]  text-white rounded-[4px] adminCellBorders h-[48px] p-[12px]"
            onClick={() =>
              handleSaveProperty(
                propertySelected?.Name && propertySelected.Name
              )
            }
          >
            Save Changes
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeRevokeModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Revoke Access?
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Clicking on ‘Yes’ will revoke{" "}
              <span className="text-red-600">{selectedProperty?.Name}</span>{" "}
              access to <span className="text-red-600">{property}</span> ?
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => handleRevokeProperty(property)}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeRevokeModal();
            }}
          >
            No, go back
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={success2ModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              User access revoked Successfully
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              <span className="text-blue-600 text-[700]">
                {selectedProperty?.Name}
              </span>{" "}
              access to{" "}
              <span className="text-blue-600 text-[700]">{property}</span> has
              successfully been revoked.
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            Close
          </button>
        </div>
      </CustomizeModal>
      <AddProperty
        modalIsOpen={proModalIsOpen}
        setModalIsOpen={setProModalIsOpen}
        setSelectedProperty={handleSelectedProperty}
      />
    </div>
  );
};

export default AddPropertyModal;
