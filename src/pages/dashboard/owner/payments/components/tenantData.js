"use client";
import React, { useState } from "react";
import Image from "next/image";
import PopUpMenuTwo from "../../tenants/components/popUpMenuTwo";
import Button from "../../components/button";
import StatusDropdownII from "../../components/statusDropDownII";

const TenantData = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 8,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 9,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 10,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 11,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 12,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 13,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 14,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 15,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 16,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 17,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 18,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 19,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 20,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 21,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 22,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 23,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 24,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 25,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 26,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 27,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 28,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 29,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 30,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 31,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 32,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 33,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 34,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Confirmed",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 35,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
    {
      id: 36,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Property",
      Purpose: "2 years rents",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      PaymentDate: "4th December, 2023",
      Email: "AdeyemoOla@gmail.com",
      Amount: "N2,000,000",
    },
  ];
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleStatusChange = (status, dataId) => {
    // Handle status change logic here
    console.log(`Changing status to: ${status} for data with ID: ${dataId}`);
    // Close the corresponding dropdown
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    // Correctly update DueDate for the corresponding tenant:
    // const data = Data.find((tenant) => tenant.id === dataId).Status = status;
    // console.log(data)
    // Find the index of the data item with the given dataId
    const dataIndex = data.findIndex((item) => item.id === dataId);

    if (dataIndex !== -1) {
      // Update the DueDate property of the found item
      const updatedData = [...data];
      updatedData[dataIndex].Status = status;

      // Update the state with the new data
      setData(updatedData);
      console.log(data);
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const handleDelete = (profileId) => {
    // Logic to delete the profile with the given ID
    console.log(`Deleting profile with ID: ${profileId}`);
    // Perform your delete logic here...
    // For example, you can update the state to remove the profile
    const updatedData = data.filter((profile) => profile.id !== profileId);
    // Set the updated data to the state
    setData(updatedData); // Assuming you have a state variable 'setData'
  };

  return (
    <div className="mt-6">
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-4">Tenant</th>
                <th className="text-left ">Payment Date</th>
                <th className="text-left ">Due Date</th>
                <th className="text-left ">Amount</th>
                <th className="text-left ">Purpose</th>
                <th className="text-left " style={{ width: "110px" }}>Payment Status</th>
                <th className="text-left ">Property</th>
                <th className="text-left">Apartment No</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {currentData &&
                currentData.map((data) => (
                  <tr
                    key={data.id}
                    className=" w-2 border-t-[1px] items-center"
                  >
                    <td className="flex items-center gap-1 pr-2  pl-4 text-GrayHomz4 font-[500] text-[11px]">
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="py-[15px]"
                      />
                      <span className="py-[15px]">{data.Tenant}</span>
                    </td>
                    <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                      {data.PaymentDate}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.DueDate}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Amount}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Purpose}
                    </td>
                    <td
                      className={`text-GrayHomz py-[15px] pr-4 font-[500]  text-[11px] w-24`}
                    >
                      <StatusDropdownII
                        data={data}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data.id)
                        }
                        isOpen={openDropdowns[data.id] || false}
                        toggleDropdown={() => toggleDropdown(data.id)}
                      />
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Estate}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.ApartmentNo}
                    </td>
                    <td className="relative py-[15px] pr-4">
                      <button onClick={() => handleToggleMenu(data.id)}>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                          }
                          alt=""
                          height={21}
                          width={20}
                          style={{ height: "auto", width: "auto" }}
                        />
                      </button>
                      {popUpMenuTwo && selectedDataId === data.id && (
                        <PopUpMenuTwo data={data} />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default TenantData;
